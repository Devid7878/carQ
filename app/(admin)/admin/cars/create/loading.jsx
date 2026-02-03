import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='p-6 space-y-6'>
			<Skeleton className='h-8 w-48' />
			<div className='rounded-lg border p-6 space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className='space-y-2'>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-10 w-full' />
						</div>
					))}
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-32' />
					<Skeleton className='h-24 w-full' />
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className='space-y-2'>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-10 w-full' />
						</div>
					))}
				</div>
				<Skeleton className='h-10 w-40' />
			</div>
		</div>
	);
}
