import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<Skeleton className='h-12 w-64 mb-6' />
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className='rounded-lg border overflow-hidden'>
						<Skeleton className='h-40 w-full' />
						<div className='p-4 space-y-3'>
							<Skeleton className='h-5 w-2/3' />
							<Skeleton className='h-4 w-1/2' />
							<div className='space-y-2'>
								<Skeleton className='h-4 w-4/5' />
								<Skeleton className='h-4 w-3/5' />
							</div>
							<Skeleton className='h-9 w-full' />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
