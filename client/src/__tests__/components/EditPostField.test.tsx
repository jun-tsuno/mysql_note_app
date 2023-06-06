import { act, fireEvent, render, screen } from '@testing-library/react';
import EditPostField from '@/components/EditPost/EditPostField';
import { MContextProvider } from '../../context/MainContext';

const mockedSetIsEdit = jest.fn();

const MockedEditPostField = () => {
	return (
		<MContextProvider>
			<EditPostField
				noteId='1'
				title='test1'
				description=''
				setIsEdit={mockedSetIsEdit}
			/>
		</MContextProvider>
	);
};

describe('EditPostField', () => {
	describe('Default input field', () => {
		it('should show the passed value in the fields', () => {
			render(
				<MContextProvider>
					<EditPostField
						noteId='1'
						title='test1'
						description=''
						setIsEdit={mockedSetIsEdit}
					/>
				</MContextProvider>
			);
			const inputEle = screen.getByPlaceholderText('Title') as HTMLInputElement;
			const textAreaEle = screen.getByPlaceholderText(
				'Description'
			) as HTMLTextAreaElement;

			expect(inputEle.value).toBe('test1');
			expect(textAreaEle.value).toBe('');
		});
	});

	describe('Form submit', () => {
		beforeAll(() => {
			render(<MockedEditPostField />);
		});

		it('Submit a form with valid inputs', async () => {
			const mockOnSubmit = jest.fn();

			const inputEle = screen.getByPlaceholderText('Title');
			const textareaEle = screen.getByPlaceholderText('Description');
			const formEle = screen.getByTestId('form-element');

			await act(async () => {
				fireEvent.change(inputEle, { target: { value: 'new title' } });
				fireEvent.change(textareaEle, { target: { value: 'new description' } });
				fireEvent.submit(formEle);
			});

			expect(mockOnSubmit).toHaveBeenCalled();
		});
	});
});
