import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import CustomButton from '@/components/Button/CustomButton';
import TrashIcon from '@/public/svgIcons/TrashIcon';
import PencilIcon from '@/public/svgIcons/PencilIcon';
import CustomModal from '@/components/Modal/CustomModal';
import { useMContext } from '@/context/MainContext';
import EditPostField from '@/components/EditPost/EditPostField';

const NotePage = () => {
	const { noteCtx, authCtx } = useMContext();
	const { note, getNote, deleteNote } = noteCtx;
	const { user } = authCtx;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const router = useRouter();
	const noteId = router.query.noteId as string;

	useEffect(() => {
		if (user) {
			getNote(noteId, user.id);
		}
	}, [noteId, getNote, user]);

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleDelete = async () => {
		if (user) {
			deleteNote(user?.id, noteId);
			setIsOpen(false);
			router.push('/');
		}
	};

	return (
		<>
			<Layout>
				<div className='bg-primary-green rounded-md py-10 px-5 mt-5 max-w-[800px] mx-auto'>
					{!isEdit ? (
						<>
							<h1>{note?.title}</h1>
							<hr className='h-px my-5 bg-secondary-dark-gray border-0' />
							<p className='py-10'>{note?.description}</p>

							<div className='flex gap-x-2 justify-end pb-3'>
								<CustomButton
									secondary
									rounded
									onClick={() => setIsEdit(!isEdit)}
								>
									<PencilIcon fill='#1d3557' />
								</CustomButton>
								<CustomButton secondary rounded onClick={() => setIsOpen(true)}>
									<TrashIcon fill='#1d3557' />
								</CustomButton>
							</div>
						</>
					) : (
						<EditPostField
							noteId={noteId}
							title={note?.title}
							description={note?.description}
							setIsEdit={setIsEdit}
						/>
					)}

					<p className='self-end text-sm text-secondary-dark-gray-2'>
						Last Update: {note?.updatedAt}
					</p>
				</div>

				{/* modal for delete post */}
				<CustomModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					closeModal={closeModal}
					handleDelete={handleDelete}
				/>
			</Layout>
		</>
	);
};

NotePage.requireAuth = true;

export default NotePage;
