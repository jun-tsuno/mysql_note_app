import { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useMContext } from '@/context/MainContext';
import { Note } from '@/types/noteTypes';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Card from '@/components/Card/Card';
import EmptyIcon from '@/public/svgIcons/EmptyIcon';

const HomePage: NextPage = () => {
	const { noteCtx, authCtx } = useMContext();
	const { noteList, getNoteList } = noteCtx;
	const { userSignIn } = authCtx;
	const router = useRouter();
	const { data: session, status } = useSession();
	const authenticated = status === 'authenticated';
	const unauthenticated = status === 'unauthenticated';

	useEffect(() => {
		if (unauthenticated) {
			router.push('/');
		}
		if (authenticated) {
			userSignIn(session?.user);
			getNoteList(session?.user.id);
		}
	}, [
		getNoteList,
		session,
		router,
		unauthenticated,
		authenticated,
		userSignIn,
	]);

	return (
		<>
			{authenticated ? (
				<Layout>
					<h1 className='py-5'>Notes</h1>
					<div className='flex flex-wrap gap-y-3'>
						{noteList &&
							noteList.map((note: Note) => {
								return (
									<Fragment key={note.note_id}>
										<Card note={note} />
									</Fragment>
								);
							})}
					</div>
					{noteList && noteList.length < 1 && (
						<div className='flex flex-col items-center mt-20'>
							<EmptyIcon width={100} height={100} />
							<p className='text-secondary-dark-gray-2'>
								You do not have a note
							</p>
						</div>
					)}
				</Layout>
			) : (
				<></>
			)}
		</>
	);
};

export default HomePage;
