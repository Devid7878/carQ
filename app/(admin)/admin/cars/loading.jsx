import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='p-6 space-y-6'>
			<Skeleton className='h-8 w-56' />
			<div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
				<Skeleton className='h-10 w-32' />
				<Skeleton className='h-10 w-full sm:w-64' />
			</div>
			<div className='rounded-lg border overflow-hidden'>
				<div className='p-4 space-y-3'>
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className='grid grid-cols-6 gap-4 items-center'>
							<Skeleton className='h-10 w-10' />
							<Skeleton className='h-4 w-full col-span-2' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-8 w-20' />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
