import { useMContext } from '@/context/MainContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import CustomButton from '@/components/Button/CustomButton';

const schema = z.object({
	title: z
		.string()
		.min(1, { message: 'This field is required.' })
		.max(255, { message: 'Maximum 255 characters' }),
	description: z
		.string()
		.min(0)
		.max(1000, { message: 'Maximum 1000 characters' }),
});

const CreateNotePage = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });

	const { noteCtx, authCtx } = useMContext();
	const { createNote } = noteCtx;
	const { user } = authCtx;

	const onSubmit = handleSubmit(async (data) => {
		if (user) {
			await createNote(data.title, data.description, user.id);
			reset();
		}
	});

	return (
		<>
			<Layout>
				<div className='h-full flex flex-col'>
					<h1>Create a Note</h1>
					<div className='w-[90%] max-w-[1000px] h-[80vh] my-auto mx-auto bg-primary-green rounded-md py-10 px-5'>
						<form
							onSubmit={onSubmit}
							className='flex flex-col h-full'
							data-testid='form-element'
						>
							<input
								{...register('title')}
								placeholder='Title'
								className='py-2 px-3 bg-transparent border-l-8 border-secondary-dark-gray-2 rounded-sm'
							/>
							{errors.title?.message && (
								<p
									className='my-2 text-sm font-semibold text-red-500'
									data-testid='title-error'
								>
									** {errors.title?.message as string}
								</p>
							)}
							<hr className='h-px my-5 bg-secondary-dark-gray border-0' />
							<textarea
								{...register('description')}
								placeholder='Description'
								className='py-2 px-3 bg-transparent border border-secondary-gray rounded-sm grow'
							/>
							{errors.description?.message && (
								<p className='my-2 text-sm font-semibold text-red-500'>
									** {errors.description?.message as string}
								</p>
							)}
							<CustomButton
								type='submit'
								primary
								className='w-[150px] mx-auto mt-10'
							>
								Create
							</CustomButton>
						</form>
					</div>
				</div>
			</Layout>
		</>
	);
};

CreateNotePage.requireAuth = true;

export default CreateNotePage;
