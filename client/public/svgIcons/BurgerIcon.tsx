interface IconProps {
	width?: number;
	height?: number;
	fill?: string;
}

const BurgerIcon = ({
	width = 16,
	height = 16,
	fill = '#000000',
}: IconProps) => {
	return (
		<>
			<svg
				width={width}
				height={height}
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M4 18H10'
					stroke={fill}
					strokeWidth='2'
					strokeLinecap='round'
				/>
				<path
					d='M4 12L16 12'
					stroke={fill}
					strokeWidth='2'
					strokeLinecap='round'
				/>
				<path
					d='M4 6L20 6'
					stroke={fill}
					strokeWidth='2'
					strokeLinecap='round'
				/>
			</svg>
		</>
	);
};

export default BurgerIcon;
