import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<Skeleton className='h-12 w-80 mb-6' />
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				<div className='md:col-span-1 space-y-6'>
					<div className='rounded-lg border p-6 space-y-4'>
						<Skeleton className='h-6 w-32' />
						<Skeleton className='h-40 w-full rounded-md' />
						<Skeleton className='h-5 w-3/4' />
						<Skeleton className='h-6 w-32' />
						<div className='space-y-2'>
							{Array.from({ length: 4 }).map((_, index) => (
								<Skeleton
									key={index}
									className='h-4 w-full'
								/>
							))}
						</div>
					</div>
					<div className='rounded-lg border p-6 space-y-3'>
						<Skeleton className='h-6 w-40' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-4/5' />
						<Skeleton className='h-4 w-3/4' />
					</div>
				</div>

				<div className='md:col-span-2'>
					<div className='rounded-lg border p-6 space-y-6'>
						<Skeleton className='h-6 w-56' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-32' />
							<Skeleton className='h-10 w-full' />
						</div>
						<div className='space-y-2'>
							<Skeleton className='h-4 w-40' />
							<Skeleton className='h-10 w-full' />
						</div>
						<div className='space-y-2'>
							<Skeleton className='h-4 w-48' />
							<Skeleton className='h-24 w-full' />
						</div>
						<Skeleton className='h-10 w-full' />
						<div className='space-y-2'>
							<Skeleton className='h-5 w-40' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-4/5' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
