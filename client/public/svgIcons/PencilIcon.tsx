interface IconProps {
	width?: number;
	height?: number;
	fill?: string;
}

const PencilIcon = ({
	width = 20,
	height = 20,
	fill = '#000000',
}: IconProps) => {
	return (
		<>
			<svg
				width={width}
				height={height}
				fill={fill}
				viewBox='0 0 32 32'
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
				<g
					id='SVGRepo_tracerCarrier'
					strokeLinecap='round'
					strokeLinejoin='round'
				></g>
				<g id='SVGRepo_iconCarrier'>
					<title>pen-clip</title>
					<path d='M30.75 7.002c0-0 0-0.001 0-0.002 0-0.207-0.084-0.395-0.219-0.531l-5-5c-0.136-0.136-0.324-0.22-0.531-0.22s-0.395 0.084-0.531 0.22v0l-4.462 4.462-2.477-2.462c-0.136-0.136-0.323-0.22-0.53-0.22s-0.395 0.084-0.53 0.22l-7.068 7.068c-0.131 0.135-0.212 0.319-0.212 0.523 0 0.414 0.336 0.75 0.75 0.75 0.203 0 0.388-0.081 0.523-0.213l6.538-6.538 1.945 1.933-15.476 15.476c-0.087 0.088-0.153 0.198-0.189 0.321l-0.001 0.005-2 7c-0.018 0.062-0.029 0.133-0.029 0.207 0 0.413 0.335 0.748 0.748 0.748 0.001 0 0.001 0 0.002 0h-0c0.001 0 0.002 0 0.003 0 0.075 0 0.146-0.011 0.214-0.033l-0.005 0.001 6.788-2c0.124-0.037 0.23-0.101 0.315-0.186l-0 0 21.212-21c0.137-0.135 0.223-0.323 0.223-0.531v-0zM8.395 27.334l-5.299 1.561 1.572-5.502 15.342-15.342 3.925 3.899zM25.001 10.894l-3.93-3.905 3.928-3.928 3.938 3.937z'></path>
				</g>
			</svg>
		</>
	);
};

export default PencilIcon;
