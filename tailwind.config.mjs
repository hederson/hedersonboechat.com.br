/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		logs: true,
		themes: [
			{
				'hederson': {                          /* your theme name */
					'primary': '#4F77E5',           /* Primary color */
					'primary-focus': '#2900B0',     /* Primary color - focused */
					'primary-content': '#fafafa',   /* Foreground content color to use on primary color */
	
					'secondary': '#E66B4E',         /* Secondary color */
					'secondary-focus': '#05D78C',   /* Secondary color - focused */
					'secondary-content': '#3d4451', /* Foreground content color to use on secondary color */
	
					'accent': '#A7E64E',            /* Accent color */
					'accent-focus': '#C2E817',      /* Accent color - focused */
					'accent-content': '#3d4451',    /* Foreground content color to use on accent color */
	
					'neutral': '#3d4451',           /* Neutral color */
					'neutral-focus': '#2a2e37',     /* Neutral color - focused */
					'neutral-content': '#fafafa',   /* Foreground content color to use on neutral color */
	
					'base-100': '#fafafa',          /* Base color of page, used for blank backgrounds */
					'base-200': '#EDEFF0',          /* Base color, a little darker */
					'base-300': '#DFE4EB',          /* Base color, even more darker */
					'base-content': '#1f2937',      /* Foreground content color to use on base color */
	
					'info': '#2094f3',              /* Info */
					'success': '#009485',           /* Success */
					'warning': '#ff9900',           /* Warning */
					// 'error': '#ff5724',             /* Error */
				}
			}
		]
	  }
}
