interface IconProps {
	width?: number;
	height?: number;
}

const FlagIcon = ({ width = 16, height = 16 }: IconProps) => {
	return (
		<>
			<svg
				width={width}
				height={height}
				viewBox='0 0 32 32'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
				<g
					id='SVGRepo_tracerCarrier'
					strokeLinecap='round'
					strokeLinejoin='round'
				></g>
				<g id='SVGRepo_iconCarrier'>
					<g clipPath='url(#clip0_901_2959)'>
						<path
							d='M15.0004 3V19V21H30.9994L27.0004 12L30.9994 3H15.0004Z'
							fill='#FFC44D'
						></path>
						<path d='M1 1V19H15V3V1H1Z' fill='#FFE6EA'></path>
						<path
							d='M1 31V1H15V3H31L27 12L31 21H15V6M5 19H15'
							stroke='#000000'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						></path>
					</g>
					<defs>
						<clipPath id='clip0_901_2959'>
							<rect width='32' height='32' fill='white'></rect>
						</clipPath>
					</defs>
				</g>
			</svg>
		</>
	);
};

export default FlagIcon;
