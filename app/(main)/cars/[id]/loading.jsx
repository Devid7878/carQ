import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Image Gallery */}
				<div className='w-full lg:w-7/12'>
					<div className='aspect-video rounded-lg overflow-hidden mb-4'>
						<Skeleton className='h-full w-full' />
					</div>
					<div className='flex gap-2 overflow-x-auto pb-2'>
						{Array.from({ length: 4 }).map((_, index) => (
							<Skeleton
								key={index}
								className='h-20 w-24 rounded-md flex-shrink-0'
							/>
						))}
					</div>
					<div className='flex mt-4 gap-4'>
						<Skeleton className='h-10 flex-1' />
						<Skeleton className='h-10 flex-1' />
					</div>
				</div>

				{/* Car Details Sidebar */}
				<div className='w-full lg:w-5/12 space-y-4'>
					<Skeleton className='h-6 w-20' />
					<Skeleton className='h-10 w-3/4' />
					<Skeleton className='h-8 w-40' />

					<div className='grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg'>
						{Array.from({ length: 3 }).map((_, index) => (
							<Skeleton
								key={index}
								className='h-12 w-full'
							/>
						))}
					</div>

					<Skeleton className='h-24 w-full rounded-lg' />
					<Skeleton className='h-28 w-full rounded-lg' />
					<Skeleton className='h-12 w-full' />
				</div>
			</div>

			{/* Info Sections */}
			<div className='mt-12 space-y-8'>
				<div className='p-6 bg-white rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='space-y-3'>
						<Skeleton className='h-6 w-40' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-5/6' />
						<Skeleton className='h-4 w-2/3' />
					</div>
					<div className='space-y-3'>
						<Skeleton className='h-6 w-32' />
						<div className='grid grid-cols-2 gap-3'>
							{Array.from({ length: 4 }).map((_, index) => (
								<Skeleton
									key={index}
									className='h-4 w-full'
								/>
							))}
						</div>
					</div>
				</div>

				<div className='p-6 rounded-lg shadow-sm shapped-div'>
					<Skeleton className='h-7 w-56 mb-6' />
					<div className='flex flex-col md:flex-row gap-8 justify-between'>
						<div className='space-y-3'>
							<Skeleton className='h-5 w-40' />
							<Skeleton className='h-4 w-64' />
							<Skeleton className='h-4 w-48' />
						</div>
						<div className='md:w-1/3 space-y-3'>
							<Skeleton className='h-5 w-28' />
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton
									key={index}
									className='h-4 w-full'
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
