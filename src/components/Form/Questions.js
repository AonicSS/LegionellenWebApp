export const questions = [
	{
		question:
			'Lassen Sie ihre Heizkostenabrechnung durch Techem durchführen?',
		choice: null,
		type: 'radio',
		btnActive: false,
		answers: [
			{
				name: '',
				type: '',
				amount: 0,
				required: false,
			},
		],
	},
	{
		question: 'Nehmen Sie bereits den Techem RWM Service in Anspruch?',
		choice: null,
		type: 'radio',
		btnActive: false,
		answers: [
			{
				name: '',
				type: '',
				amount: 0,
				required: false,
			},
		],
	},
	{
		question: 'Wie viele Wohneinheiten möchten Sie ausstatten?',
		choice: '1',
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: '',
				type: '',
				amount: 0,
				required: false,
			},
		],
	},
	{
		question: 'Wo befinden sich Ihre Wohneinheiten?',
		choice: '',
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: '',
				type: '',
				amount: 0,
				required: false,
			},
		],
	},
	{
		question: 'Wie viele Geräte werden gewünscht?',
		choice: 1,
		type: 'input',
		btnActive: true,
		showPrevious: false,
		showNext: false,
		answers: [
			{
				name: 'bedrooms',
				type: 'ROOMS',
				amount: 1,
				required: true,
			},
			{
				name: 'nurseries',
				type: 'ROOMS',
				amount: 1,
				required: true,
			},
			{
				name: 'hallways',
				type: 'ROOMS',
				amount: 1,
				required: true,
			},
			{
				name: 'common',
				type: 'ROOMS',
				amount: 0,
				required: false,
			},
			{
				name: 'stairs',
				type: 'STAIRS',
				amount: 0,
				required: false,
			},
		],
	},
];
