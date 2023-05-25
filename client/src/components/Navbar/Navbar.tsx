import { Disclosure } from '@headlessui/react';
import BurgerIcon from '@/public/svgIcons/BurgerIcon';
import CrossIcon from '@/public/svgIcons/CrossIcon';
import NoteIcon from '@/public/svgIcons/NoteIcon';
import FlagIcon from '@/public/svgIcons/FlagIcon';
import Link from 'next/link';
import AddButton from './AddButton';
import { signOut } from 'next-auth/react';

const navigation = [
	{
		name: 'Notes',
		href: '/dashboard',
		icon: <NoteIcon width={20} height={20} />,
	},
	{
		name: 'Flagged',
		href: '/dashboard/flagged',
		icon: <FlagIcon width={20} height={20} />,
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}
const Navbar = () => {
	return (
		<>
			<div>
				<Disclosure
					as='nav'
					className='md:border-r-[1.5px] md:border-r-secondary-light-gray md:h-[100vh]'
				>
					{({ open }) => (
						<>
							<div className='hidden md:block'>
								<div className='ml-20 pt-14 pb-8'>
									<Link href='/dashboard/create-note'>
										<AddButton iWidth={20} iHeight={20} />
									</Link>
								</div>
								<div className='flex flex-col space-y-4'>
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className={classNames(
												'text-secondary-dark-gray hover:bg-gray-700 hover:text-white',
												'rounded-md px-3 py-2 text-md font-medium'
											)}
										>
											<span className='flex align-center'>
												<span className='ml-5 mr-3'>{item.icon}</span>
												{item.name}
											</span>
										</Link>
									))}
								</div>
								<button onClick={() => signOut()}>SignOut</button>
							</div>

							{/* Mobile menu button */}
							<div className='absolute top-2 left-4 md:hidden z-20'>
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary-gray'>
									{open ? (
										<CrossIcon width={25} />
									) : (
										<BurgerIcon width={25} height={25} />
									)}
								</Disclosure.Button>
							</div>

							<Disclosure.Panel className='relative pt-16 bg-white  h-[100vh] w-[70vw] sm:w-[40vw] md:hidden z-10'>
								<div className='ml-20 pt-8 pb-4'>
									<Link href='/dashboard/create-note'>
										<AddButton iWidth={20} iHeight={20} />
									</Link>
								</div>
								<div className='space-y-4 px-2 pb-3 pt-2 sm:px-3'>
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className={classNames(
												'text-secondary-dark-gray hover:bg-gray-700 hover:text-white',
												'block rounded-md px-3 py-2 text-md font-medium'
											)}
										>
											<span className='flex align-center'>
												<span className='ml-5 mr-3'>{item.icon}</span>
												{item.name}
											</span>
										</Link>
									))}
								</div>
								<button onClick={() => signOut()}>SignOut</button>
							</Disclosure.Panel>
							{open && (
								<div className='max-md:absolute max-md:top-0 max-md:bg-black/50 max-md:w-[100vw] max-md:h-[100vh]' />
							)}
						</>
					)}
				</Disclosure>
			</div>
		</>
	);
};

export default Navbar;
