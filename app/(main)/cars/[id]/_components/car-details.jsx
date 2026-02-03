'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import {
	AlertCircle,
	Calendar,
	Car,
	Fuel,
	Gauge,
	LocateFixed,
	Share2,
	Heart,
	MessageSquare,
	Currency,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toggleSavedCar } from '@/actions/car-listing';
import useFetch from '@/hooks/use-fetch';
import { formatCurrency } from '@/lib/helpers';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import EmiCalculator from './emi-calculator';

export function CarDetails({ car, testDriveInfo }) {
	const router = useRouter();
	const { isSignedIn } = useAuth();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isWishlisted, setIsWishlisted] = useState(car.wishlisted);

	const {
		loading: savingCar,
		fn: toggleSavedCarFn,
		data: toggleResult,
		error: toggleError,
	} = useFetch(toggleSavedCar);

	// Optimized: Memoize sorted working hours to prevent calculation on every render
	const sortedWorkingHours = useMemo(() => {
		if (!testDriveInfo.dealership?.workingHours) return null;
		const daysOrder = [
			'MONDAY',
			'TUESDAY',
			'WEDNESDAY',
			'THURSDAY',
			'FRIDAY',
			'SATURDAY',
			'SUNDAY',
		];
		return [...testDriveInfo.dealership.workingHours].sort((a, b) => {
			return daysOrder.indexOf(a.dayOfWeek) - daysOrder.indexOf(b.dayOfWeek);
		});
	}, [testDriveInfo.dealership?.workingHours]);

	useEffect(() => {
		if (toggleResult?.success) {
			setIsWishlisted(toggleResult.saved);
			toast.success(toggleResult.message);
		}
	}, [toggleResult]);

	useEffect(() => {
		if (toggleError) {
			toast.error('Failed to update favorites');
		}
	}, [toggleError]);

	const handleSaveCar = async () => {
		if (!isSignedIn) {
			toast.error('Please sign in to save cars');
			router.push('/sign-in');
			return;
		}
		if (savingCar) return;
		await toggleSavedCarFn(car.id);
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: `${car.year} ${car.make} ${car.model}`,
					text: `Check out this ${car.year} ${car.make} ${car.model} on carQ!`,
					url: window.location.href,
				})
				.catch(() => copyToClipboard());
		} else {
			copyToClipboard();
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
		toast.success('Link copied to clipboard');
	};

	const handleBookTestDrive = () => {
		if (!isSignedIn) {
			toast.error('Please sign in to book a test drive');
			router.push('/sign-in');
			return;
		}
		router.push(`/test-drive/${car.id}`);
	};

	return (
		<div className='animate-in fade-in duration-500'>
			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Image Gallery */}
				<div className='w-full lg:w-7/12'>
					<div className='aspect-video rounded-lg overflow-hidden relative mb-4 bg-gray-100'>
						{car.images && car.images.length > 0 ? (
							<Image
								src={car.images[currentImageIndex]}
								alt={`${car.year} ${car.make} ${car.model}`}
								fill
								className='object-cover'
								priority
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw'
							/>
						) : (
							<div className='w-full h-full flex items-center justify-center'>
								<Car className='h-24 w-24 text-gray-400' />
							</div>
						)}
					</div>

					{/* Thumbnails */}
					{car.images && car.images.length > 1 && (
						<div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
							{car.images.map((image, index) => (
								<button
									key={index}
									className={`relative rounded-md h-20 w-24 flex-shrink-0 transition-all overflow-hidden border-2 ${
										index === currentImageIndex
											? 'border-blue-600 scale-95'
											: 'border-transparent opacity-70 hover:opacity-100'
									}`}
									onClick={() => setCurrentImageIndex(index)}>
									<Image
										src={image}
										alt={`View ${index + 1}`}
										fill
										className='object-cover'
										sizes='96px'
									/>
								</button>
							))}
						</div>
					)}

					<div className='flex mt-4 gap-4'>
						<Button
							variant='outline'
							className={`flex-1 gap-2 ${isWishlisted ? 'text-red-500' : ''}`}
							onClick={handleSaveCar}
							disabled={savingCar}>
							<Heart
								className={`h-5 w-5 ${isWishlisted ? 'fill-red-500' : ''}`}
							/>
							{isWishlisted ? 'Saved' : 'Save'}
						</Button>
						<Button
							variant='outline'
							className='flex-1 gap-2'
							onClick={handleShare}>
							<Share2 className='h-5 w-5' />
							Share
						</Button>
					</div>
				</div>

				{/* Car Details Sidebar */}
				<div className='w-full lg:w-5/12'>
					<Badge className='mb-2'>{car.bodyType}</Badge>
					<h1 className='text-4xl font-bold mb-1'>
						{car.year} {car.make} {car.model}
					</h1>
					<div className='text-2xl font-bold text-blue-600 mb-6'>
						{formatCurrency(car.price)}
					</div>

					<div className='grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg'>
						<div className='flex flex-col items-center gap-1'>
							<Gauge className='text-gray-500 h-5 w-5' />
							<span className='text-xs font-medium'>
								{car.mileage.toLocaleString()} KM
							</span>
						</div>
						<div className='flex flex-col items-center gap-1'>
							<Fuel className='text-gray-500 h-5 w-5' />
							<span className='text-xs font-medium'>{car.fuelType}</span>
						</div>
						<div className='flex flex-col items-center gap-1'>
							<Car className='text-gray-500 h-5 w-5' />
							<span className='text-xs font-medium'>{car.transmission}</span>
						</div>
					</div>

					{/* EMI Calculator Dialog */}
					<Dialog>
						<DialogTrigger asChild>
							<Card className='mb-6 cursor-pointer hover:border-blue-300 transition-colors'>
								<CardContent className='pt-5'>
									<div className='flex items-center gap-2 text-lg font-medium mb-2'>
										<Currency className='h-5 w-5 text-blue-600' />
										<h3>EMI Calculator</h3>
									</div>
									<p className='text-sm text-gray-600'>
										Est. Monthly Payment:{' '}
										<span className='font-bold text-gray-900'>
											{formatCurrency(car.price / 60)}
										</span>
									</p>
									<p className='text-xs text-gray-500 mt-1'>
										*60 months at 4.5% interest
									</p>
								</CardContent>
							</Card>
						</DialogTrigger>
						<DialogContent className='max-w-2xl'>
							<DialogHeader>
								<DialogTitle>carQ Car Loan Calculator</DialogTitle>
							</DialogHeader>
							<EmiCalculator price={car.price} />
						</DialogContent>
					</Dialog>

					{/* Request Info */}
					<Card className='mb-6'>
						<CardContent className='p-4'>
							<div className='flex items-center gap-2 text-lg font-medium mb-2'>
								<MessageSquare className='h-5 w-5 text-blue-600' />
								<h3>Have Questions?</h3>
							</div>
							<p className='text-sm text-gray-600 mb-3'>
								Our team is ready to help with details about this {car.make}.
							</p>
							<Button
								variant='outline'
								className='w-full'
								asChild>
								<a
									href={`mailto:help@carQ.in?subject=Inquiry: ${car.year} ${car.make} ${car.model}`}>
									Request Info
								</a>
							</Button>
						</CardContent>
					</Card>

					{/* Status Alerts */}
					{car.status === 'SOLD' || car.status === 'UNAVAILABLE' ? (
						<Alert variant='destructive'>
							<AlertTitle className='capitalize'>
								This car is {car.status.toLowerCase()}
							</AlertTitle>
							<AlertDescription>
								Please browse our other available vehicles.
							</AlertDescription>
						</Alert>
					) : (
						<Button
							className='w-full py-6 text-lg'
							onClick={handleBookTestDrive}
							disabled={testDriveInfo.userTestDrive}>
							<Calendar className='mr-2 h-5 w-5' />
							{testDriveInfo.userTestDrive
								? `Booked: ${format(new Date(testDriveInfo.userTestDrive.bookingDate), 'MMM d, yyyy')}`
								: 'Book Test Drive'}
						</Button>
					)}
				</div>
			</div>

			{/* Info Sections */}
			<div className='mt-12 space-y-8'>
				<div className='p-6 bg-white rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div>
						<h3 className='text-xl font-bold mb-4 border-b pb-2'>
							Description
						</h3>
						<p className='whitespace-pre-line text-gray-700 leading-relaxed'>
							{car.description}
						</p>
					</div>
					<div>
						<h3 className='text-xl font-bold mb-4 border-b pb-2'>
							Key Features
						</h3>
						<ul className='grid grid-cols-2 gap-3'>
							{[
								car.transmission,
								car.fuelType,
								car.bodyType,
								car.color,
								`${car.seats} Seats`,
							].map((feat, i) => (
								<li
									key={i}
									className='flex items-center gap-2 text-sm text-gray-600'>
									<div className='h-1.5 w-1.5 bg-blue-600 rounded-full' />{' '}
									{feat}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Dealership Section */}
				<div className='p-6 rounded-lg shadow-sm shapped-div text-white'>
					<h2 className='text-2xl font-bold mb-6'>Dealership Location</h2>
					<div className='flex flex-col md:flex-row gap-8 justify-between'>
						<div className='flex items-start gap-3'>
							<LocateFixed className='h-6 w-6 text-blue-400 mt-1' />
							<div>
								<h4 className='font-bold text-lg'>carQ Motors</h4>
								<p className='text-gray-300 max-w-xs'>
									{testDriveInfo.dealership?.address ||
										'Location Details Pending'}
								</p>
								<div className='mt-4 space-y-1 text-sm'>
									<p>
										<span className='text-blue-300'>Phone:</span>{' '}
										{testDriveInfo.dealership?.phone || 'Contact support'}
									</p>
									<p>
										<span className='text-blue-300'>Email:</span>{' '}
										{testDriveInfo.dealership?.email || 'help@carq.in'}
									</p>
								</div>
							</div>
						</div>

						<div className='md:w-1/3'>
							<h4 className='font-medium mb-3 border-b border-blue-800 pb-1'>
								Working Hours
							</h4>
							<div className='space-y-2'>
								{sortedWorkingHours ? (
									sortedWorkingHours.map((day) => (
										<div
											key={day.dayOfWeek}
											className='flex justify-between text-xs'>
											<span className='text-gray-400 capitalize'>
												{day.dayOfWeek.toLowerCase()}
											</span>
											<span className='font-mono'>
												{day.isOpen
													? `${day.openTime} - ${day.closeTime}`
													: 'Closed'}
											</span>
										</div>
									))
								) : (
									<p className='text-xs text-gray-400'>
										Standard Hours: 9:00 AM - 6:00 PM
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
