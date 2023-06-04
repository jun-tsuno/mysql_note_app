import { act, fireEvent, render, screen } from '@testing-library/react';
import HomePage from '@/pages/dashboard';
import { MContextProvider } from '@/context/MainContext';
import { SessionProvider } from 'next-auth/react';

const MockHomePage = () => {
	return (
		<SessionProvider>
			<MContextProvider>
				<HomePage />
			</MContextProvider>
		</SessionProvider>
	);
};

jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
//  mock for next-auth
jest.mock('next-auth/react', () => {
	const originalModule = jest.requireActual('next-auth/react');
	const mockSession = {
		user: { id: '1' },
	};
	return {
		__esModule: true,
		...originalModule,
		useSession: jest.fn(() => {
			return { data: mockSession, status: 'authenticated' };
		}),
		fetch: jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue({
				user: { id: '1' },
			}),
		}),
	};
});
// mock for context
jest.mock('@/context/MainContext', () => {
	const originalModule = jest.requireActual('@/context/MainContext');
	const mockNoteList: any = [];
	const useMContext = jest.fn(() => {
		return {
			noteCtx: {
				noteList: mockNoteList,
				getNoteList: jest.fn(),
			},
			authCtx: {
				userSignIn: jest.fn(),
			},
		};
	});
	return {
		__esModule: true,
		...originalModule,
		useMContext,
	};
});

describe('Dashboard HomePage', () => {
	it('should render message if there is no note', () => {
		act(() => {
			render(<MockHomePage />);
		});
		const messageEle = screen.getByText('You do not have a note');

		screen.debug();
		expect(messageEle).toBeInTheDocument();
	});
});
