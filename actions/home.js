'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/prisma';
import aj from '@/lib/arcjet';
import { request } from '@arcjet/next';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Helper to sleep for exponential backoff
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Process car image for AI search with automatic Retry logic
 */
export async function processImageSearch(file, retryCount = 0) {
	const MAX_RETRIES = 2; // Will try up to 3 times total

	try {
		// 1. ArcJet Protection (Only run on first attempt)
		if (retryCount === 0) {
			const req = await request();
			const decision = await aj.protect(req, { requested: 1 });
			if (decision.isDenied()) {
				throw new Error(
					decision.reason?.isRateLimit?.() ? 'Rate limit hit' : 'Blocked',
				);
			}
		}

		// 2. Validate API Key
		if (!process.env.GEMINI_API_KEY) throw new Error('API Key missing');

		// 3. Prepare Model - Using 1.5-flash for higher stability/quota
		const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
		const base64Image = await fileToBase64(file);

		const prompt = `Analyze this car image. Return ONLY JSON: { "make": "", "bodyType": "", "color": "", "confidence": 0.0 }`;

		const result = await model.generateContent({
			contents: [
				{
					role: 'user',
					parts: [
						{ text: prompt },
						{ inlineData: { mimeType: file.type, data: base64Image } },
					],
				},
			],
			generationConfig: { responseMimeType: 'application/json' },
		});
		const response = await result.response;
		const carDetails = JSON.parse(response.text());

		return { success: true, data: carDetails };
	} catch (error) {
		const isRateLimit = error.message?.includes('429') || error.status === 429;

		// 4. Automatic Retry Logic
		if (isRateLimit && retryCount < MAX_RETRIES) {
			const delay = Math.pow(2, retryCount + 1) * 1000; // 2s, 4s
			console.log(`Rate limited. Retrying in ${delay}ms...`);
			await sleep(delay);
			return processImageSearch(file, retryCount + 1);
		}

		console.error('Final Search Error:', error.message);
		return {
			success: false,
			error: 'AI is busy. Please try again in a moment.',
		};
	}
}

// --- Helper Functions ---

async function fileToBase64(file) {
	const bytes = await file.arrayBuffer();
	return Buffer.from(bytes).toString('base64');
}

function serializeCarData(car) {
	return {
		...car,
		price: car.price ? parseFloat(car.price.toString()) : 0,
		createdAt: car.createdAt?.toISOString(),
		updatedAt: car.updatedAt?.toISOString(),
	};
}

export async function getFeaturedCars(limit = 3) {
	try {
		const cars = await db.car.findMany({
			where: { featured: true, status: 'AVAILABLE' },
			take: limit,
			orderBy: { createdAt: 'desc' },
		});
		return cars.map(serializeCarData);
	} catch (error) {
		throw new Error('Database error');
	}
}
