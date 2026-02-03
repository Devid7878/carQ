import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/header';
import HeaderLoading from '@/components/header-loading';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'carQ',
	description: 'Find your Dream Car',
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<head>
					<link
						rel='icon'
						href='/logo.png'
						sizes='any'
					/>
				</head>
				<body className={`${inter.className}`}>
					<Suspense fallback={<HeaderLoading />}>
						<Header />
					</Suspense>
					<main className='min-h-screen'>{children}</main>
					<Toaster richColors />

					<footer className='bg-blue-50 py-12'>
						<div className='container mx-auto px-4 text-center text-gray-600'>
							<p>Copyright © 2026 carQ Inc. All rights reserved.</p>
						</div>
					</footer>
				</body>
			</html>
		</ClerkProvider>
	);
}
