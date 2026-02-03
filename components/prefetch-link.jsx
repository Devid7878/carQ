'use client';

import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PrefetchLink = ({
	href,
	prefetch = true,
	children,
	onMouseEnter,
	onFocus,
	onTouchStart,
	...props
}) => {
	const router = useRouter();

	const triggerPrefetch = useCallback(() => {
		if (prefetch) {
			router.prefetch(href);
		}
	}, [prefetch, router, href]);

	useEffect(() => {
		triggerPrefetch();
	}, [triggerPrefetch]);

	return (
		<Link
			href={href}
			prefetch={prefetch}
			onMouseEnter={(event) => {
				triggerPrefetch();
				onMouseEnter?.(event);
			}}
			onFocus={(event) => {
				triggerPrefetch();
				onFocus?.(event);
			}}
			onTouchStart={(event) => {
				triggerPrefetch();
				onTouchStart?.(event);
			}}
			{...props}>
			{children}
		</Link>
	);
};

export default PrefetchLink;
