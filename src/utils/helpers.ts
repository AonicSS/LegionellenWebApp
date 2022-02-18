import isEmail from 'validator/lib/isEmail';
import isPostalCode from 'validator/lib/isPostalCode';
import germanPostalCode from '../shared/federate_states_germany.json';

export const validEmail = (email: string): boolean => isEmail(email);

// return True if iinput is 5 digit number and postal code is found else False
export const validPostalCode = (postalCode: string): boolean => {
	const plz = parseInt(postalCode);
	const postalCodeObject = getFederalStateArray(plz);
	return isPostalCode(postalCode, 'DE') && postalCodeObject.length > 0;
};

// return array if postal code is find in list
const getFederalStateArray = (plz: number) => {
	return germanPostalCode.filter(function (germanPostalCode) {
		return germanPostalCode.plz === plz;
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
