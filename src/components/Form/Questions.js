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
				house: 1,
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
				house: 1,
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
				house: 1,
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
				house: 1,
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
				house: 1,
			},
			{
				name: 'nurseries',
				type: 'ROOMS',
				amount: 1,
				required: true,
				house: 1,
			},
			{
				name: 'hallways',
				type: 'ROOMS',
				amount: 1,
				required: true,
				house: 1,
			},
			{
				name: 'common',
				type: 'ROOMS',
				amount: 0,
				required: false,
				house: 1,
			},
			{
				name: 'stairs',
				type: 'STAIRS',
				amount: 0,
				required: false,
				house: 1,
			},
		],
	},
];

export const rooms = [
	{
		name: 'bedrooms',
		type: 'ROOMS',
		amount: 1,
		required: true,
		house: 1,
	},
	{
		name: 'nurseries',
		type: 'ROOMS',
		amount: 1,
		required: true,
		house: 1,
	},
	{
		name: 'hallways',
		type: 'ROOMS',
		amount: 1,
		required: true,
		house: 1,
	},
	{
		name: 'common',
		type: 'ROOMS',
		amount: 0,
		required: false,
		house: 1,
	},
	{
		name: 'stairs',
		type: 'STAIRS',
		amount: 0,
		required: false,
		house: 1,
	},
];
