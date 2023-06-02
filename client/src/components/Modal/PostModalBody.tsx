interface PostModalBodyProps {
	handleDelete: () => void;
}

const PostModalBody = ({ handleDelete }: PostModalBodyProps) => {
	return (
		<>
			<div className='mt-2'>
				<p className='text-sm text-gray-500'>
					Are you sure to DELETE this post? Your post will be deleted
					permanently.
				</p>
			</div>
			<div className='mt-4'>
				<button
					type='button'
					className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
					onClick={handleDelete}
				>
					DELETE
				</button>
			</div>
		</>
	);
};

export default PostModalBody;
