import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useMContext } from '@/context/MainContext';
import Image from 'next/image';
import CustomButton from '../Button/CustomButton';
import CustomModal from '../Modal/CustomModal';
import UserModalBody from '../Modal/UserModalBody';
import userImage from '@/public/image/user-svgrepo-com.png';

const UserSection = () => {
	const { authCtx } = useMContext();
	const { user, userSignOut, userDelete } = authCtx;

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleLogout = () => {
		userSignOut();
		signOut();
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleDelete = async () => {
		if (user) {
			const result = await userDelete(user.id);

			if (!result) return alert('Something went wrong');

			signOut();
		}
	};

	return (
		<>
			<div className='flex flex-col items-center space-y-3'>
				<div
					className='hover:cursor-pointer hover:brightness-75'
					onClick={() => setIsOpen(true)}
				>
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

			{isOpen && (
				<CustomModal
					title={'Delete User'}
					isOpen={isOpen}
					closeModal={closeModal}
				>
					<UserModalBody handleDelete={handleDelete} />
				</CustomModal>
			)}
		</>
	);
};

export default UserSection;
