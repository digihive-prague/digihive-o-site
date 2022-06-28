const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{twig,js,jsx}'],
	theme: {
		extend: {
			screens: {
				'3xl': '1600px'
			},
			colors: {
				primary: '#B553F1',
				gray: {
					50: '#F4F4F4',
					100: '#eeeeee',
					200: '#e3e4e7',
					300: '#ABABAB',
					500: '#626570',
					800: '#3D3E43',
					900: '#202124'
				}
			},
			fontFamily: {
				sans: ['Norms', ...defaultTheme.fontFamily.sans]
			},
			fontSize: {
				'5xl': ['3rem', { lineHeight: '1.2' }]
			},
			maxWidth: {
				container: '92rem'
			},
			borderRadius: {
				xl: '0.625rem'
			},
			boxShadow: {
				DEFAULT: '0 3px 6px 0 rgb(0 0 0 / 0.07)',
				md: '0 10px 15px 0 rgb(0 0 0 / 0.15)',
				lg: '0 5px 15px 0 rgb(0 0 0 / 0.07)',
				xl: '0 3px 30px 0 rgb(0 0 0 / 0.16)'
			},
			backgroundImage: {
				'corner-gradient': 'linear-gradient(to bottom left, #C52FEF, #6991F0 70%, #24D2EE)',
				'to-bottom-gradient': 'linear-gradient(to bottom, #C52FEF, #6991F0 70%, #24D2EE)',
				'to-left-gradient': 'linear-gradient(to left, #C52FEF, #6991F0 70%, #24D2EE)'
			},
			keyframes: {
				bounceX: {
					'0%, 20%, 50%, 80%, 100%': { transform: 'translateX(0)' },
					'40%': { transform: 'translateX(-2rem)' },
					'60%': { transform: 'translateX(-1rem)' }
				},
				bounceDown: {
					'0%, 20%, 53%, 80%, 100%': {
						'animation-timing-function': 'cubic-bezier(.215, .61, .355, 1)',
						transform: 'translateZ(0)'
					},
					'40%, 43%': {
						'animation-timing-function': 'cubic-bezier(.755, .05, .855, .06)',
						transform: 'translate3d(0, -30px, 0)'
					},
					'70%': {
						'animation-timing-function': 'cubic-bezier(.755, .05, .855, .06)',
						transform: 'translate3d(0, -15px, 0)'
					},
					'90%': {
						transform: 'translate3d(0, -4px, 0)'
					}
				}
			},
			animation: {
				bounceX: 'bounceX 4s linear infinite',
				bounceDown: 'bounceDown 3s linear infinite'
			}
		}
	},
	plugins: []
}
