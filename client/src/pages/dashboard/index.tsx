import { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Note } from '@/types/noteTypes';
import Card from '@/components/Card/Card';
import { useMContext } from '@/context/MainContext';
import EmptyIcon from '@/public/svgIcons/EmptyIcon';
import { useSession } from 'next-auth/react';
import { User } from '@/types/userTypes';

const HomePage: NextPage = () => {
	const { noteCtx, authCtx } = useMContext();
	const { noteList, getNoteList } = noteCtx;
	const { userSignIn } = authCtx;
	const { data: session } = useSession();

	useEffect(() => {
		if (session?.user) {
			userSignIn(session.user as User);
		}
		getNoteList();
	}, [getNoteList, session, userSignIn]);

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
