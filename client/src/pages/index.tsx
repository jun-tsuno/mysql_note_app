import { useEffect } from 'react';
import { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const TopPage: NextPage = () => {
	const { data: session, status } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/dashboard');
		}
	}, [status, router]);

	return (
		<>
			<button onClick={() => signIn('google')}>Get Started</button>
		</>
	);
};

export default TopPage;
