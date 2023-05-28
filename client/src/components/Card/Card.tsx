import { Note } from '@/types/noteTypes';
import { dateFormat } from '@/helpers/dateFormat';
import Link from 'next/link';

interface CardProps {
	note: Note;
}

const Card = ({ note }: CardProps) => {
	const { note_id, title, description, updatedAt, flagged_id } = note;

	const formattedDate = dateFormat(updatedAt);

	return (
		<>
			<Link
				href={`/dashboard/${note_id}`}
				className={`flex flex-col w-[90%] aspect-square mx-auto sm:max-w-[330px] p-5 rounded-md shadow-sm hover:cursor-pointer hover:brightness-90 ${
					flagged_id ? 'bg-primary-pink' : 'bg-primary-green'
				}`}
			>
				<h3>{title}</h3>
				<hr className='h-px my-2 bg-secondary-dark-gray border-0' />
				<div className='grow flex flex-col'>
					<p className='py-4 grow'>{description}</p>
					<p className='self-end text-sm text-secondary-dark-gray-2'>
						{formattedDate}
					</p>
				</div>
			</Link>
		</>
	);
};

export default Card;
