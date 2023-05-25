import { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const TopPage: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();

	if (session) {
		router.push('/dashboard');
	}

	return (
		<>
			<button onClick={() => signIn()}>Get Started</button>
		</>
	);
};

export default TopPage;
