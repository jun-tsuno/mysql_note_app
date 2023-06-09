interface IconProps {
	width?: number;
	height?: number;
}

const NoteIcon = ({ width = 16, height = 16 }: IconProps) => {
	return (
		<>
			<svg
				width={width}
				height={height}
				viewBox='0 0 32 32'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				stroke='#000000'
			>
				<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
				<g
					id='SVGRepo_tracerCarrier'
					strokeLinecap='round'
					strokeLinejoin='round'
				></g>
				<g id='SVGRepo_iconCarrier'>
					<path
						d='M29 5V30C29 30.55 28.55 31 28 31H4C3.45 31 3 30.55 3 30V5C3 4.45 3.45 4 4 4H8V6C8 6.55 8.45 7 9 7H11C11.55 7 12 6.55 12 6V4H20V6C20 6.55 20.45 7 21 7H23C23.55 7 24 6.55 24 6V4H28C28.55 4 29 4.45 29 5Z'
						fill='#d8e2dc'
					></path>
					<path
						d='M24 6C24 6.55 23.55 7 23 7H21C20.45 7 20 6.55 20 6V4V2C20 1.45 20.45 1 21 1H23C23.55 1 24 1.45 24 2V4V6ZM12 4V6C12 6.55 11.55 7 11 7H9C8.45 7 8 6.55 8 6V4V2C8 1.45 8.45 1 9 1H11C11.55 1 12 1.45 12 2V4Z'
						fill='#d8e2dc668077'
					></path>
					<path
						d='M24 4H28C28.553 4 29 4.447 29 5V30C29 30.553 28.553 31 28 31H4C3.447 31 3 30.553 3 30V5C3 4.447 3.447 4 4 4H5M12 4H17M9 15H16M9 19H23M9 23H23M12 6C12 6.553 11.553 7 11 7H9C8.447 7 8 6.553 8 6V2C8 1.447 8.447 1 9 1H11C11.553 1 12 1.447 12 2V6ZM24 6C24 6.553 23.553 7 23 7H21C20.447 7 20 6.553 20 6V2C20 1.447 20.447 1 21 1H23C23.553 1 24 1.447 24 2V6Z'
						stroke='#d8e2dc000000'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					></path>
				</g>
			</svg>
		</>
	);
};

export default NoteIcon;
