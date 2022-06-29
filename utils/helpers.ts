// @ts-nocheck
import isEmail from 'validator/lib/isEmail';
import isPostalCode from 'validator/lib/isPostalCode';
import germanPostalCode from '../shared/federate_states_germany.json';
import { price, nonUserServices, userServices } from '../shared/constants';

export const validEmail = (email: string): boolean => isEmail(email);

// return True if iinput is 5 digit number and postal code is found else False
export const validPostalCode = (postalCode: string): boolean => {
	const postalCodeObject = getFederalStateArray(postalCode);
	return isPostalCode(postalCode, 'DE') && postalCodeObject.length > 0;
};

// return array if postal code is find in list
const getFederalStateArray = (plz: number) => {
	return germanPostalCode.filter(function (germanPostalCode) {
		return germanPostalCode.plz.toString() === plz;
	});
};

// return array if postal code is find in list
export const getFederalState = (postalCode: string) => {
	const plz = parseInt(postalCode);
	return germanPostalCode.filter(function (germanPostalCode) {
		return germanPostalCode.plz === plz;
	});
};

// return type as a string (slided after [object ...). Like typeof but covers also regex etc.
export const trueTypeOf = (obj: any) => {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

export const getStrangNumber = (data) => {
	return data.strangAmount;
};


export const getBasePrice = (data: any) => {
	const strangCount = getStrangNumber(data);

	return 49.00 + strangCount * 61.00;
};

export const getServicePrice = (type: string, data: any) => {
		return 0;
};


export const getMeasurementValvesInstalled = (appData) => (appData.questions['Sind Probeentnahmeventile verbaut?']!.answers.find((answer) => answer.name === 'choice')!.value === 'yes');
export const getStrangAmountKnown = (appData) => ((appData.questions['Kennen Sie das Strangschema Ihrer Trinkwasseranlage?']!.answers.find((answer) => answer.name === 'choice')!.value === 'yes')) || ((appData.questions['Kennen Sie das Strangschema Ihrer Trinkwasseranlage?']!.answers.find((answer) => answer.name === 'choice')!.value === 'no') && (appData.questions['Konnten Sie das Strangschema ermitteln?']!.answers.find((answer) => answer.name === 'choice')!.value === 'yes'));
