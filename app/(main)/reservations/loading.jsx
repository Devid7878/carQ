import { Skeleton } from '@/components/ui/skeleton';

const ReservationCardSkeleton = () => {
	return (
		<div className='rounded-lg border overflow-hidden'>
			<div className='flex flex-col sm:flex-row'>
				<div className='sm:w-1/4 h-40 sm:h-auto'>
					<Skeleton className='h-full w-full' />
				</div>
				<div className='p-4 sm:w-1/2 sm:flex-1 space-y-3'>
					<Skeleton className='h-5 w-2/3' />
					<Skeleton className='h-4 w-1/2' />
					<Skeleton className='h-4 w-3/5' />
				</div>
				<div className='p-4 border-t sm:border-t-0 sm:border-l sm:w-1/4 space-y-2'>
					<Skeleton className='h-8 w-full' />
					<Skeleton className='h-8 w-full' />
				</div>
			</div>
		</div>
	);
};

export default function Loading() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<Skeleton className='h-12 w-72 mb-6' />
			<div className='space-y-6'>
				<div className='space-y-4'>
					<Skeleton className='h-7 w-56' />
					<div className='space-y-3'>
						{Array.from({ length: 2 }).map((_, index) => (
							<ReservationCardSkeleton key={index} />
						))}
					</div>
				</div>
				<div className='space-y-4'>
					<Skeleton className='h-7 w-48' />
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{Array.from({ length: 2 }).map((_, index) => (
							<ReservationCardSkeleton key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
