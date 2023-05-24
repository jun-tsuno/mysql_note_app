interface IconProps {
	width?: number;
	height?: number;
	fill?: string;
}

const AddIcon = ({ width = 16, height = 16, fill = '#000000' }: IconProps) => {
	return (
		<>
			<svg
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				width={width}
				height={height}
			>
				<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
				<g
					id='SVGRepo_tracerCarrier'
					strokeLinecap='round'
					strokeLinejoin='round'
				></g>
				<g id='SVGRepo_iconCarrier'>
					<title></title>
					<g id='Complete'>
						<g data-name='add' id='add-2'>
							<g>
								<line
									fill='none'
									stroke={fill}
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='1.9440000000000002'
									x1='12'
									x2='12'
									y1='19'
									y2='5'
								></line>
								<line
									fill='none'
									stroke={fill}
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='1.9440000000000002'
									x1='5'
									x2='19'
									y1='12'
									y2='12'
								></line>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</>
	);
};

export default AddIcon;
