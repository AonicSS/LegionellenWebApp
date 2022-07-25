export const questions = {
	'Besteht für Ihre Liegenschaft eine Prüfpflicht?': {
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined,
			},
		],
	},
	'Hat die Liegenschaft eine zentrale Warmwasser-Erwärmung?': {
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined,
			},
		],
	},
	'Sind an die zentrale Warmwasser-Erwärmung drei oder mehr Wohnungen angeschlossen, von denen mindestens eine vermietet ist?':
		{
			answers: [
				{
					name: 'choice',
					type: 'string',
					required: true,
					value: undefined,
				},
			],
		},
	'Ist die Trinkwasseranlage mit einem Wasserspeicher mit mehr als 400 Litern verbunden oder hat mehr als 3 Liter im Leitungssystem?':
		{
			answers: [
				{
					name: 'choice',
					type: 'string',
					required: true,
					value: undefined,
				},
			],
		},
	'Kennen Sie das Strangschema Ihrer Trinkwasseranlage?': {
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined,
			},
		],
	},
	'Konnten Sie das Strangschema ermitteln?': {
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined,
			},
		],
	},
	'Sind Probeentnahmeventile verbaut?': {
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined,
			},
		],
	},
	'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?': {
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined,
			},
		],
	},
	'Wo befindet sich die zu prüfende Liegenschaft?': {
		answers: [
			{
				name: 'streetName',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'houseNumber',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'postalCode',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'city',
				type: 'string',
				required: true,
				value: undefined,
			},
		],
	},
	Anschrift: {
		answers: [
			{
				name: 'companyName',
				type: 'string',
				required: true,
				value: undefined
			},
			{
				name: 'streetName',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'houseNumber',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'postalCode',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'city',
				type: 'string',
				required: true,
				value: undefined,
			},
		],
	},
	Anrede: {
		answers: [
			{
				name: 'gender',
				type: 'string',
				required: true,
				value: 'Herr',
			},
			{
				name: 'gender',
				type: 'string',
				required: true,
				value: 'Herr'
			},
			{
				name: 'givenName',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'familyName',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'email',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'phone',
				type: 'string',
				required: true,
				value: undefined,
			},
			{
				name: 'isCustomer',
				type: 'boolean',
				required: true,
				value: undefined
			},
			{
				name: 'customerNumber',
				type: 'string',
				required: false,
				value: undefined,
			},
		],
	},
};
