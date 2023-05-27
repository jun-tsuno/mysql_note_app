import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: string | ReactNode;
	className?: string;
	primary?: boolean;
	secondary?: boolean;
	rounded?: boolean;
}

const CustomButton = (props: CustomButtonProps) => {
	const { children, className, primary, secondary, rounded, ...rest } = props;
	const classes = classNames(
		className,
		'text-secondary-dark-gray p-3 hover:brightness-125 hover:cursor-pointer',
		{
			'bg-secondary-dark-gray text-white': primary,
			'bg-secondary-light-gray': secondary,
			'rounded-full': rounded,
		}
	);

	return (
		<>
			<button className={classes} {...rest}>
				{children}
			</button>
		</>
	);
};

export default CustomButton;
