export const questions = {
	'Besteht für Ihre Liegenschaft eine Prüfpflicht?': {
		choice: undefined,
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	},
	'Hat die Liegenschaft eine zentrale Warmwasser-Erwärmung?': {
		choice: undefined,
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	},
	'Sind an die zentrale Warmwasser-Erwärmung drei oder mehr Wohnungen angeschlossen, von denen mindestens eine vermietet ist?': {
		choice: undefined,
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	},
	'Ist die Trinkwasseranlage mit einem Wasserspeicher mit mehr als 400 Litern verbunden oder hat mehr als 3 Liter im Leitungssystem?': {
		choice: undefined,
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	},
	'Kennen Sie das Strangschema Ihrer Trinkwasseranlage?': {
		choice: undefined,
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	},
	'Konnten Sie das Strangschema ermitteln?': {
		choice: '',
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	},
	'Sind Probeentnahmeventile verbaut?': {
		choice: '',
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	},
	'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?': {
		choice: '',
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'choice',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	},
	'Wo befindet sich die zu prüfende Liegenschaft?': {
		question: 'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?',
		choice: '',
		type: 'input',
		btnActive: true,
		answers: [
			{
				name: 'streetName',
				type: 'string',
				required: true,
				value: undefined
			},
			{
				name: 'houseNumber',
				type: 'string',
				required: true,
				value: undefined
			},
			{
				name: 'postalCode',
				type: 'string',
				required: true,
				value: undefined
			},
			{
				name: 'city',
				type: 'string',
				required: true,
				value: undefined
			},
		],
	}
};
