import { render, screen } from '@testing-library/react';
import CustomButton from '@/components/Button/CustomButton';

describe('EditPostField', () => {
	it('should render submit button', () => {
		render(<CustomButton>Send</CustomButton>);
		const buttonEle = screen.getByRole('button');

		expect(buttonEle.textContent).toBe('Send');
	});
});
