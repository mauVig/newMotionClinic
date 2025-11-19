/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				shine: {
					'0%': { 'background-position': '100%' },
					'100%': { 'background-position': '-100%' },
				}
			},
			animation: {
				shine: 'shine 5s linear infinite'
			},
		},
		screens: {
			'xs': '375px',
			'mid': '475px',
			'xsm': '510px',
			'sm': '640px',
			'md': '768px',
			'lx': '900px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		colors: {
			grey: '#e8e8e8',
			violet: '#5b5bc4',
			purple: '#cfb1fb',
			backBlack: '#131313',
			black: '#000000',
			white: '#ffffff',
		}
	},
	plugins: [],
}