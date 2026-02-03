import React from 'react';
import { Button } from './ui/button';
import { Heart, CarFront, Layout, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';
import Image from 'next/image';
import PrefetchLink from './prefetch-link';

const Header = async ({ isAdminPage = false }) => {
	const user = await checkUser();
	const isAdmin = user?.role === 'ADMIN';
	const isSignedIn = !!user;

	return (
		<header className='fixed top-0 w-full bg-white backdrop-blur-md z-50 border-b'>
			<nav className='mx-auto px-4 py-4 flex items-center justify-between'>
				<Link
					href={isAdminPage ? '/admin' : '/'}
					className='flex'>
					<Image
						src={'/logo.png'}
						alt='carQ Logo'
						width={500}
						height={40}
						className='h-12 w-auto object-contain'
					/>
					{isAdminPage && (
						<span className='text-xs font-extralight'>admin</span>
					)}
				</Link>

				{/* Action Buttons */}
				<div className='flex items-center space-x-4'>
					{isAdminPage ? (
						<Link href='/'>
							<Button
								variant='outline'
								className='flex items-center gap-2'>
								<ArrowLeft size={18} />
								<span>Back to App</span>
							</Button>
						</Link>
					) : isSignedIn ? (
						<>
							{!isAdmin && (
								<Link
									href='/reservations'
									className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
									<Button variant='outline'>
										<CarFront size={18} />
										<span className='hidden md:inline'>My Reservations</span>
									</Button>
								</Link>
							)}
							<Link href='/saved-cars'>
								<Button className='flex items-center gap-2'>
									<Heart size={18} />
									<span className='hidden md:inline'>Saved Cars</span>
								</Button>
							</Link>
							{isAdmin && (
								<PrefetchLink href='/admin'>
									<Button
										variant='outline'
										className='flex items-center gap-2'>
										<Layout size={18} />
										<span className='hidden md:inline'>Admin Portal</span>
									</Button>
								</PrefetchLink>
							)}
						</>
					) : (
						!isAdminPage && (
							<SignInButton forceRedirectUrl='/'>
								<Button variant='outline'>Login</Button>
							</SignInButton>
						)
					)}

					{isSignedIn && (
						<UserButton
							appearance={{
								elements: {
									avatarBox: 'w-10 h-10',
								},
							}}
						/>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
