import { Fragment, useEffect, useState } from 'react';
import { useMContext } from '@/context/MainContext';
import { Note } from '@/types/noteTypes';
import Card from '@/components/Card/Card';
import Layout from '@/components/Layout';
import EmptyIcon from '@public/svgIcons/EmptyIcon';

const FlaggedPage = () => {
	const { noteCtx } = useMContext();
	const { getFlaggedList } = noteCtx;
	const [flaggedList, setFlaggedList] = useState<Note[] | null>(null);

	useEffect(() => {
		const flagged = getFlaggedList();
		setFlaggedList(flagged);
	}, [getFlaggedList]);

	return (
		<>
			<Layout>
				<h1 className='py-5'>Flagged Note</h1>
				<div className='flex flex-wrap gap-y-3'>
					{flaggedList &&
						flaggedList.map((note: Note) => {
							return (
								<Fragment key={note.note_id}>
									<Card note={note} />
								</Fragment>
							);
						})}
				</div>

				{flaggedList && flaggedList.length < 1 && (
					<div className='flex flex-col items-center mt-20'>
						<EmptyIcon width={100} height={100} />
						<p className='text-secondary-dark-gray-2'>
							You do not have a Flagged note
						</p>
					</div>
				)}
			</Layout>
		</>
	);
};

FlaggedPage.requireAuth = true;

export default FlaggedPage;
