import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import GoogleIcon from '@public/svgIcons/GoogleIcon';
import CustomButton from '@/components/Button/CustomButton';
import PostitIcon from '@public/svgIcons/PostitIcon';

const TopPage = () => {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/dashboard');
		}
	}, [status, router]);

	return (
		<>
			<div className='bg-primary-green h-[100vh]'>
				<div className='flex flex-col items-center pt-20'>
					<h1 className='text-4xl text-secondary-dark-gray my-5 font-della'>
						Note
					</h1>
					<PostitIcon />
					<CustomButton
						onClick={() => signIn('google')}
						className='flex border border-secondary-light-gray rounded-md bg-white shadow-lg hover:brightness-95 mt-10'
					>
						<GoogleIcon /> <span className='px-3'>SignIn with Google</span>
					</CustomButton>
				</div>
			</div>
		</>
	);
};

export default TopPage;
