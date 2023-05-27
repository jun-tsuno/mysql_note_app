import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMContext } from '@/context/MainContext';

type Props = {
	children: React.ReactElement;
};

export const ProtectedLayout = ({ children }: Props): JSX.Element => {
	const { authCtx } = useMContext();
	const { user } = authCtx;
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			console.log('unAuthorized');
			router.push('/');
		}
	}, [router, user]);

	return user ? <div>{children}</div> : <></>;
};
