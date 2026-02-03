import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<div className='w-full max-w-md rounded-lg border p-6 space-y-4'>
				<Skeleton className='h-6 w-32' />
				<Skeleton className='h-4 w-56' />
				<div className='space-y-3'>
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
				</div>
				<Skeleton className='h-4 w-40' />
			</div>
		</div>
	);
}
