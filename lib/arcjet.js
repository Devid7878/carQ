import arcjet, { tokenBucket } from '@arcjet/next';

const aj = arcjet({
	key: process.env.ARCJET_KEY,
	characteristics: ['ip.src'], // Track based on User IP
	rules: [
		// Rate limiting specifically for collection creation
		tokenBucket({
			mode: 'LIVE',
			refillRate: 50, // How many tokens added per interval
			interval: 60, // Every 60 seconds
			capacity: 100, // Maximum burst capacity
		}),
	],
});

export default aj;
