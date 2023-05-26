import React from 'react';
import { signOut } from 'next-auth/react';
import { useMContext } from '@/context/MainContext';
import Image from 'next/image';
import CustomButton from '../Button/CustomButton';
import userImage from '@/public/image/user-svgrepo-com.png';

const UserSection = () => {
	const { authCtx } = useMContext();
	const { user, userSignOut } = authCtx;

	const handleLogout = () => {
		userSignOut();
		signOut();
	};

	return (
		<>
			<div className='flex flex-col items-center space-y-3'>
				<div>
					<Image
						src={user?.image ? user.image : userImage}
						width={0}
						height={0}
						sizes='100vw'
						alt='icon'
						className='w-10 rounded-full'
					/>
				</div>
				<CustomButton primary onClick={handleLogout}>
					SignOut
				</CustomButton>
			</div>
		</>
	);
};

export default UserSection;
