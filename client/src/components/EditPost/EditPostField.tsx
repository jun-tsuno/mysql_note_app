'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dispatch, SetStateAction } from 'react';
import CustomButton from '../Button/CustomButton';
import SendIcon from '@/public/svgIcons/SendIcon';
import { useMContext } from '@/context/MainContext';

interface EditPostField {
	noteId: string;
	title: string | undefined;
	description: string | undefined;
	setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const schema = z.object({
	newTitle: z
		.string()
		.min(1, { message: 'This field is required.' })
		.max(255, { message: 'Maximum 255 characters' }),
	newDescription: z
		.string()
		.min(0)
		.max(1000, { message: 'Maximum 1000 characters' }),
});

const EditPostField = ({
	noteId,
	title,
	description,
	setIsEdit,
}: EditPostField) => {
	const { noteCtx } = useMContext();
	const { editNote, getNote } = noteCtx;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: { newTitle: title, newDescription: description },
	});

	const onSubmit = handleSubmit(async (data) => {
		await editNote(noteId, data.newTitle!, data.newDescription!);
		await getNote(noteId);
		setIsEdit(false);
	});
	return (
		<>
			<form onSubmit={onSubmit} className='flex flex-col h-full'>
				<input
					{...register('newTitle')}
					placeholder='Title'
					className='py-2 px-3 bg-transparent border-l-8 border-secondary-dark-gray-2 rounded-sm'
				/>
				{errors.newTitle?.message && (
					<p className='my-2 text-sm font-semibold text-red-500'>
						** {errors.newTitle?.message as string}
					</p>
				)}
				<hr className='h-px my-5 bg-secondary-dark-gray border-0' />
				<textarea
					{...register('newDescription')}
					placeholder='Description'
					className='py-2 px-3 bg-transparent border border-secondary-gray rounded-sm min-h-[350px]'
				/>
				{errors.newDescription?.message && (
					<p className='my-2 text-sm font-semibold text-red-500'>
						** {errors.newDescription?.message as string}
					</p>
				)}

				<div className='flex gap-x-2 justify-end my-3'>
					<CustomButton secondary rounded type='submit'>
						<SendIcon fill='#1d3557' />
					</CustomButton>
				</div>
			</form>
		</>
	);
};

export default EditPostField;
