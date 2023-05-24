import { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Note } from '@/types/noteTypes';
import Card from '@/components/Card/Card';
import { useNoteContext } from '@/context/NoteContext';
import EmptyIcon from '@/public/svgIcons/EmptyIcon';

const HomePage: NextPage = () => {
	const { noteCtx } = useNoteContext();
	const { noteList, getNoteList } = noteCtx;

	useEffect(() => {
		getNoteList();
	}, [getNoteList]);

	return (
		<>
			<Layout>
				<h1 className='py-5'>Notes</h1>
				<div className='flex flex-wrap gap-y-3'>
					{noteList &&
						noteList.map((note: Note) => {
							return (
								<Fragment key={note.id}>
									<Card note={note} />
								</Fragment>
							);
						})}
				</div>
				{noteList && noteList.length < 1 && (
					<div className='flex flex-col items-center mt-20'>
						<EmptyIcon width={100} height={100} />
						<p className='text-secondary-dark-gray-2'>You do not have a note</p>
					</div>
				)}
			</Layout>
		</>
	);
};

export default HomePage;
