export const questions = [
	{
		question: 'Besteht für Ihre Liegenschaft eine Prüfpflicht?',
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
		question: 'Hat die Liegenschaft eine zentrale Warmwasser-Erwärmung?',
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
		question: 'Sind an die zentrale Warmwasser-Erwärmung drei oder mehr Wohnungen angeschlossen, von denen mindestens eine vermietet ist?',
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
		question: 'Ist die Trinkwasseranlage mit einem Wasserspeicher mit mehr als 400 Litern verbunden oder hat mehr als 3 Liter im Leitungssystem?',
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
		question: 'Kennen Sie das Strangschema Ihrer Trinkwasseranlage?',
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
		question: 'Konnten Sie das Strangschema ermitteln?',
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
		question: 'Sind Probeentnahmeventile verbaut?',
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
		question: 'Die Wohnung umfasst diese Räume:',
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
	{
		question: 'Sind Sie Kunde der Techem Heizkostenabrechnung?',
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

// {
// 	question: 'Sind Sie bereits Rauchwarnmelder-Service-Kunde von Techem?',
// 	choice: null,
// 	type: 'radio',
// 	btnActive: false,
// 	answers: [
// 		{
// 			name: '',
// 			type: '',
// 			amount: 0,
// 			required: false,
// 			house: 1,
// 		},
// 	],
// },
