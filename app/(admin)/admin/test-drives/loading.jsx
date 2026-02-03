import { Skeleton } from '@/components/ui/skeleton';

const TestDriveCardSkeleton = () => {
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
		<div className='p-6 space-y-6'>
			<Skeleton className='h-8 w-56' />
			<div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
				<Skeleton className='h-10 w-full sm:w-48' />
				<Skeleton className='h-10 w-full sm:w-80' />
				<Skeleton className='h-10 w-24' />
			</div>
			<div className='rounded-lg border p-4 space-y-4'>
				<Skeleton className='h-6 w-48' />
				<div className='space-y-4'>
					{Array.from({ length: 3 }).map((_, index) => (
						<TestDriveCardSkeleton key={index} />
					))}
				</div>
			</div>
		</div>
	);
}
