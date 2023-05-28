/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: {
					green: '#d6eadf',
					pink: '#ffb3c6',
					navy: '#264653',
				},
				secondary: {
					'dark-gray': '#343a40',
					'dark-gray-2': '#6c757d',
					gray: '#ced4da',
					'light-gray': '#e9ecef',
				},
			},
			fontFamily: {
				della: ['var(--font-della)'],
			},
		},
	},
	plugins: [],
};
