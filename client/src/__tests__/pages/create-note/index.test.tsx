import { act, fireEvent, render, screen } from '@testing-library/react';
import CreateNotePage from '@/pages/dashboard/create-note';
import { MContextProvider } from '@/context/MainContext';
import { SessionProvider } from 'next-auth/react';

const MockCreateNotePage = () => {
	return (
		<SessionProvider>
			<MContextProvider>
				<CreateNotePage />
			</MContextProvider>
		</SessionProvider>
	);
};

describe('CreateNotePage', () => {
	beforeEach(() => {
		render(<MockCreateNotePage />);
	});

	describe('User Input', () => {
		it('should reset input fields with valid inputs', () => {
			const inputEle = screen.getByPlaceholderText('Title');
			const textareaEle = screen.getByPlaceholderText('Description');
			const formEle = screen.getByTestId('form-element');

			act(() => {
				fireEvent.change(inputEle, { target: { value: 'example' } });
				fireEvent.change(textareaEle, { target: { value: '' } });
				fireEvent.submit(formEle);
			});

			expect(inputEle.textContent).toBe('');
			expect(textareaEle.textContent).toBe('');
		});

		it('should show error title message with invalid input', async () => {
			const inputEle = screen.getByPlaceholderText('Title');
			const textareaEle = screen.getByPlaceholderText('Description');
			const formEle = screen.getByTestId('form-element');

			await act(async () => {
				fireEvent.change(inputEle, { target: { value: '' } });
				fireEvent.change(textareaEle, { target: { value: '' } });
				fireEvent.submit(formEle);
			});

			const titleErrorEle = screen.getByTestId('title-error');
			expect(titleErrorEle.textContent).toBe('** This field is required.');
		});
	});
});
