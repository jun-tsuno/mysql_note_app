import AddIcon from '@public/svgIcons/AddIcon';

interface AddButtonProps {
	iWidth?: number;
	iHeight?: number;
}

const AddButton = ({ iWidth, iHeight }: AddButtonProps) => {
	return (
		<>
			<div className='inline-block p-2 bg-black rounded-full hover:cursor-pointer hover:bg-secondary-dark-gray hover:scale-105'>
				<AddIcon width={iWidth} height={iHeight} fill='#FFFFFF' />
			</div>
		</>
	);
};

export default AddButton;
