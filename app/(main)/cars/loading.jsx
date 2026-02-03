import { Skeleton } from '@/components/ui/skeleton';
import CarListingsLoading from './_components/car-listing-loading';

export default function Loading() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<Skeleton className='h-10 w-64 mb-6' />
			<div className='flex flex-col lg:flex-row gap-8'>
				<div className='w-full lg:w-80 flex-shrink-0 space-y-4'>
					<Skeleton className='h-10 w-44' />
					<div className='border rounded-lg overflow-hidden bg-white'>
						<div className='p-4 border-b bg-gray-50'>
							<Skeleton className='h-5 w-24' />
						</div>
						<div className='p-4 space-y-4'>
							{Array.from({ length: 6 }).map((_, index) => (
								<div
									key={index}
									className='space-y-2'>
									<Skeleton className='h-4 w-20' />
									<Skeleton className='h-10 w-full' />
								</div>
							))}
						</div>
						<div className='px-4 py-4 border-t'>
							<Skeleton className='h-10 w-full' />
						</div>
					</div>
				</div>
				<div className='flex-1'>
					<CarListingsLoading />
				</div>
			</div>
		</div>
	);
}
