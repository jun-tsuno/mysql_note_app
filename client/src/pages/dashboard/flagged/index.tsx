import Layout from '@/components/Layout';

const FlaggedPage = () => {
	return (
		<>
			<Layout>
				<h1>flagged item</h1>
			</Layout>
		</>
	);
};

FlaggedPage.requireAuth = true;

export default FlaggedPage;
