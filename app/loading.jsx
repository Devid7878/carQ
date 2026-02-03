import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='flex flex-col pt-20'>
			<section className='relative py-16 md:py-28'>
				<div className='max-w-4xl mx-auto text-center space-y-6'>
					<Skeleton className='h-12 md:h-20 w-3/4 mx-auto' />
					<Skeleton className='h-6 w-2/3 mx-auto' />
					<div className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Skeleton className='h-12 w-full sm:w-72' />
						<Skeleton className='h-12 w-32' />
					</div>
				</div>
			</section>

			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex justify-between items-center mb-8'>
						<Skeleton className='h-7 w-40' />
						<Skeleton className='h-9 w-28' />
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Array.from({ length: 3 }).map((_, index) => (
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
			</section>

			<section className='py-12 bg-gray-50'>
				<div className='container mx-auto px-4'>
					<div className='flex justify-between items-center mb-8'>
						<Skeleton className='h-7 w-40' />
						<Skeleton className='h-9 w-28' />
					</div>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
						{Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className='bg-white rounded-lg shadow p-4 text-center space-y-3'>
								<Skeleton className='h-12 w-12 mx-auto rounded-md' />
								<Skeleton className='h-4 w-16 mx-auto' />
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='py-16'>
				<div className='container mx-auto px-4'>
					<Skeleton className='h-7 w-64 mx-auto mb-12' />
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={index}
								className='text-center space-y-3'>
								<Skeleton className='h-16 w-16 mx-auto rounded-full' />
								<Skeleton className='h-5 w-32 mx-auto' />
								<Skeleton className='h-4 w-3/4 mx-auto' />
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='py-12 bg-gray-50'>
				<div className='container mx-auto px-4'>
					<div className='flex justify-between items-center mb-8'>
						<Skeleton className='h-7 w-48' />
						<Skeleton className='h-9 w-28' />
					</div>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{Array.from({ length: 4 }).map((_, index) => (
							<div
								key={index}
								className='relative rounded-lg overflow-hidden'>
								<Skeleton className='h-28 w-full' />
								<div className='absolute inset-0 flex items-end p-3'>
									<Skeleton className='h-4 w-20' />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='py-12 bg-gray-50'>
				<div className='container mx-auto px-4'>
					<Skeleton className='h-7 w-64 mx-auto mb-8' />
					<div className='space-y-4 max-w-3xl mx-auto'>
						{Array.from({ length: 4 }).map((_, index) => (
							<Skeleton
								key={index}
								className='h-12 w-full'
							/>
						))}
					</div>
				</div>
			</section>

			<section className='py-16'>
				<div className='container mx-auto px-4 text-center space-y-4'>
					<Skeleton className='h-8 w-80 mx-auto' />
					<Skeleton className='h-5 w-2/3 mx-auto' />
					<div className='flex flex-col sm:flex-row justify-center gap-4'>
						<Skeleton className='h-12 w-40' />
						<Skeleton className='h-12 w-40' />
					</div>
				</div>
			</section>
		</div>
	);
}
