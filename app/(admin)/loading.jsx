import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='min-h-screen pt-20'>
			<div className='flex'>
				<aside className='hidden md:flex w-56 flex-col border-r px-4 py-6 space-y-3'>
					<Skeleton className='h-6 w-32' />
					{Array.from({ length: 6 }).map((_, index) => (
						<Skeleton
							key={index}
							className='h-9 w-full'
						/>
					))}
				</aside>
				<main className='flex-1 p-6 space-y-6'>
					<Skeleton className='h-8 w-48' />
					<Skeleton className='h-10 w-32' />
					<Skeleton className='h-64 w-full' />
				</main>
			</div>
		</div>
	);
}
