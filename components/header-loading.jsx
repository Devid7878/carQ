import { Skeleton } from '@/components/ui/skeleton';

const HeaderLoading = () => {
	return (
		<header className='fixed top-0 w-full bg-white backdrop-blur-md z-50 border-b'>
			<nav className='mx-auto px-4 py-4 flex items-center justify-between'>
				<Skeleton className='h-10 w-32' />
				<div className='flex items-center space-x-4'>
					<Skeleton className='h-9 w-36' />
					<Skeleton className='h-9 w-28' />
					<Skeleton className='h-10 w-10 rounded-full' />
				</div>
			</nav>
		</header>
	);
};

export default HeaderLoading;
