import Navbar from './Navbar/Navbar';

interface LayoutProps {
	children: React.ReactNode;
	noPaddingY?: boolean;
	noPaddingX?: boolean;
}

const Layout = ({ children, noPaddingX, noPaddingY }: LayoutProps) => {
	return (
		<>
			<div className='flex'>
				<div className='fixed h-[100vh] md:w-[200px]'>
					<Navbar />
				</div>
				<div
					className={`h-[100vh] w-full max-md:mt-10 md:ml-[200px] ${
						noPaddingX ? '' : 'px-[calc(5%)]'
					} ${noPaddingY ? '' : 'py-5'}`}
				>
					{children}
				</div>
			</div>
		</>
	);
};

export default Layout;
