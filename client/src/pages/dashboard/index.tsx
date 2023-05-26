import { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Note } from '@/types/noteTypes';
import Card from '@/components/Card/Card';
import { useMContext } from '@/context/MainContext';
import EmptyIcon from '@/public/svgIcons/EmptyIcon';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { User } from '@/types/userTypes';

const HomePage: NextPage = () => {
	const { data: session, status } = useSession();
	const { noteCtx, authCtx } = useMContext();
	const { noteList, getNoteList } = noteCtx;
	const { userSignIn } = authCtx;
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
		if (status === 'authenticated') {
			console.log(session.user);

			userSignIn(session.user);
			getNoteList(session.user.id);
		}
	}, [getNoteList, session, router, status, userSignIn]);

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
