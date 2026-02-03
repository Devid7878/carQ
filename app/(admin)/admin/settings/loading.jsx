import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='p-6 space-y-6'>
			<Skeleton className='h-8 w-32' />
			<div className='flex gap-2'>
				<Skeleton className='h-10 w-36' />
				<Skeleton className='h-10 w-36' />
			</div>
			<div className='rounded-lg border p-6 space-y-4'>
				<Skeleton className='h-6 w-40' />
				<Skeleton className='h-4 w-3/5' />
				<div className='space-y-3'>
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className='grid grid-cols-12 gap-4 items-center'>
							<Skeleton className='h-4 w-20 col-span-3' />
							<Skeleton className='h-4 w-16 col-span-2' />
							<Skeleton className='h-9 w-full col-span-3' />
							<Skeleton className='h-9 w-full col-span-3' />
						</div>
					))}
				</div>
				<div className='flex justify-end'>
					<Skeleton className='h-10 w-40' />
				</div>
			</div>
		</div>
	);
}
