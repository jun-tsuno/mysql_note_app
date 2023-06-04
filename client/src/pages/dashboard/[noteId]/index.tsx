import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMContext } from '@/context/MainContext';
import Layout from '@/components/Layout';
import CustomButton from '@/components/Button/CustomButton';
import CustomModal from '@/components/Modal/CustomModal';
import PostModalBody from '@/components/Modal/PostModalBody';
import EditPostField from '@/components/EditPost/EditPostField';
import TrashIcon from '@public/svgIcons/TrashIcon';
import PencilIcon from '@public/svgIcons/PencilIcon';
import FlagIcon from '@public/svgIcons/FlagIcon';

const NotePage = () => {
	const { noteCtx, authCtx } = useMContext();
	const { note, getNote, deleteNote, flagNote } = noteCtx;
	const { user } = authCtx;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const router = useRouter();
	const noteId = router.query.noteId as string;

	const isFlagged = note?.flagged_id ? true : false;

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
			await deleteNote(user?.id, noteId);
			setIsOpen(false);
			router.push('/');
		}
	};

	const handleFlag = async () => {
		const newIsFlagged = !isFlagged;
		if (user) {
			await flagNote(user?.id, noteId, newIsFlagged);
		}
	};

	return (
		<>
			<Layout>
				<div
					className={`rounded-md py-10 px-5 mt-5 max-w-[800px] mx-auto ${
						note?.flagged_id ? 'bg-primary-pink' : 'bg-primary-green'
					}`}
				>
					{!isEdit ? (
						<>
							<h1>{note?.title}</h1>
							<hr className='h-px my-5 bg-secondary-dark-gray border-0' />
							<p className='py-10'>{note?.description}</p>

							<div className='flex gap-x-2 justify-end pb-3'>
								<CustomButton secondary rounded onClick={handleFlag}>
									<FlagIcon />
								</CustomButton>
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
				<CustomModal isOpen={isOpen} closeModal={closeModal}>
					<PostModalBody handleDelete={handleDelete} />
				</CustomModal>
			</Layout>
		</>
	);
};

NotePage.requireAuth = true;

export default NotePage;
