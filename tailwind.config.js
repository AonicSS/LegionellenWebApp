module.exports = {
	content: [
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/views/**/*.{js,jsx,ts,tsx}',
		'./public/**/*.html',
	],
	prefix: 'tw-',
	important: true,
	theme: {
		borderWidth: {
			DEFAULT: '1px',
			0: '0',
			2: '2px',
			3: '3px',
			4: '4px',
			5: '5px',
			6: '6px',
			7: '7px',
			8: '8px',
		},
		colors: {
			transparent: 'transparent',
			white: '#ffffff',
			black: '#000000',
			red: '#e20913',
			grey: '#f3f3f3',
			btnBgColorActive: '#e20613',
			btnBgColorDisabled: '#e3e3e3',
			btnColorDisabled: '#b2b2b1',
			borderInput: '#c8c8c8',
		},
		fontFamily: {
			headline: ['Univers55'],
			bold: ['Univers65'],
		},
		screens: {
			sm: '0px', // mobile
			md: '768px', // tablet
			lg: '1024px', // desktop
			xl: '1404px', // desktop-large
		},
	},
	extend: {},
	corePlugins: {
		fontSize: false, // Font sizes are defined in the plugins section below
		preflight: false,
	},
	plugins: [
		require('@tailwindcss/forms'),
		function ({ addUtilities, theme }) {
			const prefix = 'font-size-';
			const md = theme('screens.md');

			addUtilities({
				[`.${prefix}headline`]: {
					fontFamily: 'Univers65',
					fontSize: '26px',
					lineHeight: '34px',
					letterSpacing: '-0.11px',
					color: '#222222',
					textAlign: 'center',
					[`@media (min-width: ${md})`]: {
						fontSize: '34px',
						lineHeight: '46px',
						letterSpacing: '-0.15px',
					},
				},
				[`.${prefix}sub-title`]: {
					fontFamily: 'Univers65',
					fontSize: '16px',
					letterSpacing: '-0.11px',
					color: '#222222',
					textAlign: 'center',
					[`@media (min-width: ${md})`]: {
						fontSize: '16px',
						letterSpacing: '-0.15px',
					},
				},
				[`.${prefix}label`]: {
					fontFamily: 'Univers55',
					fontSize: '18px',
					letterSpacing: '0px',
					color: '#222222',
					[`@media (min-width: ${md})`]: {
						fontSize: '16px',
						lineHeight: '26px',
						letterSpacing: '-0.1px',
						color: '#4c4c4c',
					},
				},
				[`.${prefix}label-small`]: {
					fontFamily: 'Univers55',
					fontSize: '12px',
					letterSpacing: '0px',
					color: '#222222',
					[`@media (min-width: ${md})`]: {
						fontSize: '12px',
						lineHeight: '18px',
						letterSpacing: '-0.1px',
						color: '#4c4c4c',
					},
				},
				[`.${prefix}info`]: {
					fontFamily: 'Univers55',
					fontSize: '18px',
					letterSpacing: '0px',
					color: '#222222',
					[`@media (min-width: ${md})`]: {
						fontSize: '16px',
						lineHeight: '26px',
						letterSpacing: '-0.1px',
						color: '#4c4c4c',
					},
				},
				[`.${prefix}input`]: {
					fontFamily: 'Univers65',
					fontSize: '24px',
					lineHeight: '34px',
					letterSpacing: '0px',
					color: '#1d1d1b',
					borderRadius: '5px',
				},
				[`.${prefix}input-error`]: {
					fontFamily: 'Univers55',
					fontSize: '16px',
					lineHeight: '26px',
					letterSpacing: '-0.1px',
					color: '#e20613',
					textAlign: 'center',
				},
				[`.${prefix}overlay-headline`]: {
					fontFamily: 'Univers65',
					fontSize: '20px',
					letterSpacing: '0px',
					color: '#222222',
				},
				[`.${prefix}overlay-body`]: {
					fontFamily: 'Univers55',
					fontSize: '16px',
					letterSpacing: '0px',
					color: '#4c4c4c',
				},
				[`.${prefix}overlay-contact-headline`]: {
					fontFamily: 'Univers65',
					fontSize: '34px',
					lineHeight: '46px',
					letterSpacing: '-0.15px',
					color: '#222222',
				},
				[`.${prefix}overlay-contact-body`]: {
					fontFamily: 'Univers55',
					fontSize: '12px',
					lineHeight: '26px',
					letterSpacing: '0px',
					color: '#4c4c4c',
				},
				[`.${prefix}rooms-name`]: {
					fontFamily: 'Univers65',
					fontSize: '20px',
					lineHeight: '28px',
					letterSpacing: '0.2px',
					color: '#222222',
				},
				[`.${prefix}rooms-label`]: {
					fontFamily: 'Univers55',
					fontSize: '16px',
					lineHeight: '26px',
					letterSpacing: '-0.1px',
					color: '#4c4c4c',
				},
				[`.${prefix}rooms-continue-label`]: {
					fontFamily: 'Univers65',
					fontSize: '16px',
					lineHeight: '26px',
					letterSpacing: '-0.1px',
					color: '#e20613',
				},
				[`.${prefix}pricing-headline`]: {
					fontFamily: 'Univers65',
					fontSize: '20px',
					lineHeight: '28px',
					letterSpacing: '0.2px',
					color: '#222222',
				},
				[`.${prefix}pricing-label`]: {
					fontFamily: 'Univers65',
					fontSize: '16px',
					lineHeight: '28px',
					letterSpacing: '0',
					color: '#222222',
				},
				[`.${prefix}pricing-sublabel`]: {
					fontFamily: 'Univers55',
					fontSize: '16px',
					lineHeight: '25px',
					letterSpacing: '-0.1px',
					color: '#4c4c4c',
					[`@media (min-width: ${md})`]: {
						fontSize: '12px',
						lineHeight: '26px',
						letterSpacing: '0',
					},
				},
				[`.${prefix}pricing-body`]: {
					fontFamily: 'Univers55',
					fontSize: '16px',
					lineHeight: '25px',
					letterSpacing: '-0.1px',
					color: '#4c4c4c',
					[`@media (min-width: ${md})`]: {
						fontSize: '14px',
						lineHeight: '21px',
						letterSpacing: '-0.09px',
					},
				},
			});
		},
		function ({ addUtilities }) {
			const prefix = 'justify';

			addUtilities({
				[`.${prefix}-col`]: {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				},
				[`.${prefix}-row`]: {
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				},
			});
		},
		function ({ addUtilities, theme }) {
			const prefix = 'container';
			const md = theme('screens.md');
			const xl = theme('screens.xl');

			addUtilities({
				[`.${prefix}-headline`]: {
					width: '334px',
					height: '136px',
					[`@media (min-width: ${md})`]: {
						width: 'auto',
						height: 'auto',
					},
				},
				[`.${prefix}-radio-first`]: {
					width: '334px',
					height: '60px',
					marginTop: '30px',
					borderRadius: '5px',
					backgroundColor: ' #f3f3f3',
					[`@media (min-width: ${md})`]: {
						width: '224px',
						height: 'auto',
						marginTop: '0px',
						backgroundColor: '#ffffff',
					},
				},
				[`.${prefix}-radio`]: {
					width: '334px',
					height: '60px',
					marginTop: '10px',
					borderRadius: '5px',
					backgroundColor: ' #f3f3f3',
					[`@media (min-width: ${md})`]: {
						width: '224px',
						height: 'auto',
						marginTop: '0px',
						backgroundColor: '#ffffff',
					},
				},
				[`.${prefix}-pricing`]: {
					width: '334px',
					boxShadow: '0 3px 15px 1px rgba(0, 0, 0, 0.1)',
					[`@media (min-width: ${md})`]: {
						width: '464px',
					},
					[`@media (min-width: ${xl})`]: {
						width: '260px',
					},
				},
				[`.${prefix}-pricing-mobile`]: {
					borderRadius: '40px 0 40px 0',
				},
				[`.${prefix}-pricing-headline`]: {
					padding: '30px 19px 10px 21px',
				},
				[`.${prefix}-pricing-label`]: {
					padding: '0px 19px 0px 21px',
				},
				[`.${prefix}-pricing-sublabel`]: {
					padding: '0px 19px 20px 21px',
				},
				[`.${prefix}-pricing-list`]: {
					padding: '0px 19px 10px 21px',
				},
				[`.${prefix}-pricing-1`]: {
					borderRadius: '40px 0 0 0',
				},
				[`.${prefix}-pricing-2`]: {
					borderRadius: '0 0 0 0',
				},
				[`.${prefix}-pricing-3`]: {
					borderRadius: '0 0 40px 0',
				},
			});
		},
		function ({ addUtilities, theme }) {
			const prefix = 'rectangle';
			const md = theme('screens.md');

			addUtilities({
				[`.${prefix}`]: {
					width: '40px',
					height: '4px',
					margin: '0 7px;',
					[`@media (min-width: ${md})`]: {
						width: '79px',
						height: '4px',
						margin: '0 15px;',
					},
				},
				[`.${prefix}-active`]: {
					border: '1px solid #e20913',
					backgroundColor: '#e20913',
				},
				[`.${prefix}-disabled`]: {
					border: '1px solid #f3f3f3',
					backgroundColor: '#f3f3f3',
				},
			});
		},
		function ({ addUtilities, theme }) {
			const prefix = 'input';
			const md = theme('screens.md');

			addUtilities({
				[`.${prefix}`]: {
					width: '183px',
					height: '48px',
					padding: '0 10px 0 10px!important',
					// borderRadius: '5px;',
					border: 'solid 2px #c8c8c8',
					textAlign: 'center',
					[`@media (min-width: ${md})`]: {
						width: '156px',
					},
				},
				[`.${prefix}-active`]: {
					border: '1px solid #e20913',
					backgroundColor: '#e20913',
				},
				[`.${prefix}-disabled`]: {
					border: '1px solid #f3f3f3',
					backgroundColor: '#f3f3f3',
				},
				// [`.${prefix}-radio`]: {
				// 	backgroundImage:
				// 		'https://upload.wikimedia.org/wikipedia/commons/0/02/Red_Circle%28small%29.svg',
				// 	backgroundColor: 'red',
				// 	color: 'red',
				// },
			});
		},
		function ({ addUtilities, theme }) {
			const prefix = 'overlay-size';
			const md = theme('screens.md');

			addUtilities({
				[`.${prefix}-1`]: {
					width: '334px',
					height: '497px',
					borderRadius: '40px',
					[`@media (min-width: ${md})`]: {
						width: '676px',
						height: '400px',
					},
				},
				[`.${prefix}-2`]: {
					width: '334px',
					height: '334px',
					borderRadius: '40px',
					[`@media (min-width: ${md})`]: {
						width: '676px',
						height: '293px',
					},
				},
				[`.${prefix}-3`]: {
					width: '334px',
					height: '334px',
					borderRadius: '40px',
					[`@media (min-width: ${md})`]: {
						width: '984px',
						height: '745px',
					},
				},
				[`.${prefix}-5`]: {
					width: '334px',
					height: '450px',
					borderRadius: '40px',
					[`@media (min-width: ${md})`]: {
						width: '984px',
						height: '350px',
					},
				},
			});
		},
		function ({ addUtilities }) {
			const prefix = 'btn-size';

			addUtilities({
				[`.${prefix}`]: {
					width: '111px',
					height: '54px',
				},
				[`.${prefix}-close`]: {
					width: '308px',
					height: '54px',
					padding: '13px 28px 15px 30px',
				},
			});
		},
		function ({ addUtilities }) {
			const prefix = 'btn-border';

			addUtilities({
				[`.${prefix}-active`]: {
					border: '1px solid #e20613',
				},
				[`.${prefix}-disabled`]: {
					border: '1px solid #e3e3e3',
				},
			});
		},
		function ({ addUtilities }) {
			const prefix = 'btn-font';

			addUtilities({
				[`.${prefix}`]: {
					fontFamily: 'Univers65',
					fontSize: '16px',
					lineHeight: '26px',
					letterSpacing: '0.3px',
					textAlign: 'center',
				},
				[`.${prefix}-disabled`]: {
					fontFamily: 'Univers65',
					fontSize: '16px',
					lineHeight: '26px',
					letterSpacing: '0.3px',
					color: '#b2b2b1',
					textAlign: 'center',
				},
			});
		},
		function ({ addUtilities, theme }) {
			const prefix = 'margin';
			const md = theme('screens.md');

			addUtilities({
				[`.${prefix}-top`]: {
					marginTop: '48px',
					[`@media (min-width: ${md})`]: {
						marginTop: '70px',
					},
				},
			});
		},
		function ({ addUtilities, theme }) {
			const prefix = 'padding';
			const md = theme('screens.md');

			addUtilities({
				[`.${prefix}-top`]: {
					paddingTop: '48px',
					[`@media (min-width: ${md})`]: {
						paddingTop: '70px',
					},
				},
			});
		},
		function ({ addUtilities, theme }) {
			const prefix = 'icon';
			const md = theme('screens.md');

			addUtilities({
				[`.${prefix}`]: {
					visibility: 'hidden',
					[`@media (min-width: ${md})`]: {
						visibility: 'visible',
						width: '42px',
						height: '42px',
						stroke: '#505050',
						fill: '#505050',
						strokeWidth: '1.6px',
					},
				},
			});
		},
		require('@tailwindcss/forms'),
	],
};
