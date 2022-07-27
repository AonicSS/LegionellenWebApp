// @ts-nocheck
import isEmail from 'validator/lib/isEmail';
import isPostalCode from 'validator/lib/isPostalCode';
import germanPostalCode from '../shared/federate_states_germany.json';
import {price, nonUserServices, userServices} from '../shared/constants';
import {AppData} from "../redux/reducers/App";

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


//export const getMeasurementValvesInstalled = (appData) => (appData.questions['Sind Probeentnahmeventile verbaut?']!.answers.find((answer) => answer.name === 'choice')!.value === 'yes');
export const getStrangAmountKnown = (appData) => ((appData.questions['Kennen Sie das Strangschema Ihrer Trinkwasseranlage?']!.answers.find((answer) => answer.name === 'choice')!.value === 'yes')) || ((appData.questions['Kennen Sie das Strangschema Ihrer Trinkwasseranlage?']!.answers.find((answer) => answer.name === 'choice')!.value === 'no') && (appData.questions['Konnten Sie das Strangschema ermitteln?']!.answers.find((answer) => answer.name === 'choice')!.value === 'yes'));


export const getMeasurementValvesInstalled = function (appData) {
    switch (appData['questions']['Sind Probeentnahmeventile verbaut?'].answers.find((x) => x.name === 'choice').value) {
        case 'yes':
            return true;
        case 'no':
            return false;
        case 'unsure':
            switch (appData['questions']['Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?'].answers.find((x) => x.name === 'choice').value) {
                case 'yes':
                    return true;
                case 'no':
                    return false;
                default:
                    return false;
            }
        default:
            return false;
    }
}

export const checkStrangAmount = function (appData) {
    switch (appData['questions']['Kennen Sie das Strangschema Ihrer Trinkwasseranlage?'].answers.find((x) => x.name === 'choice').value) {
        case 'yes':
            return appData.strangAmount;
        case 'no':
            switch (appData['questions']['Konnten Sie das Strangschema ermitteln?'].answers.find((x) => x.name === 'choice').value) {
                case 'yes':
                    return appData.strangAmount;
                case 'no':
                    return undefined;
                default:
                    return undefined;
            }
        default:
            return undefined;
    }
}

export const demoCoupons = {
    'legionelle_5': {
        description: 'Rabattcode 5% auf Beprobung (auf 61 EUR/Probe) und Grundpreis (49 EUR/einmalig)',
        discount: function (appData: AppData) {
            if (checkStrangAmount(appData)) {
                return 2.45 * 3.05 * appData.strangAmount;
            } else {
                return 0;
            }
        },
    },
    '10legionelle22': {
        description: 'Rabattcode 10% auf Beprobung (auf 61 EUR/Probe) und Grundpreis (49 EUR/Probe)',
        discount: function (appData: AppData) {
            if (checkStrangAmount(appData)) {
                return 4.90 + 6.10 * appData.strangAmount;
            } else {
                return 0;
            }
        },
    },

    'techem15leg': {
        description: 'Rabattcode 15% auf Beprobung (auf 61 EUR/Probe) und Grundpreis (49 EUR/Probe)',
        discount: function (appData: AppData) {
            if (checkStrangAmount(appData)) {
                return 7.35 + 9.15 * appData.strangAmount;
            } else {
                return 0;
            }
        },
    },
    'qualitaet4you': {
        description: 'Rabattcode Qualitätscheck Trinkwasseranlage (1h Beratung)',
        discount: function (appData: AppData) {
            if (appData.selectedPricing.serviceFeatures['Prüfung Ihrer Angaben'] && appData.selectedPricing.serviceFeatures['Prüfung Ihrer Angaben'].active) {
                return 49.0
            }
            if (appData.selectedPricing.serviceFeatures['Quality Check vor Ort in Ihrer Liegenschaft (249€)'] && appData.selectedPricing.serviceFeatures['Quality Check vor Ort in Ihrer Liegenschaft (249€)'].active) {
                return 49.0
            } else {
                return 0;
            }
        },
    },
    'online4you': {
        description: 'Rabattcode kostenfreie online Begehung zum Kennenlernen',
        discount: function (appData: AppData) {
            if (Object.keys(appData.selectedPricing.serviceFeatures).includes('Ermittlung des Probennahme-Umfangs im Videotelefonat ')) {
                return 49.0
            } else {
                return 0;
            }
        },
    },
    'infoservice4you': {
        discount: function (appData: AppData) {
            if (appData.selectedPricing.extraServices && appData.selectedPricing.extraServices['Infoservice'] && appData.selectedPricing.extraServices['Infoservice'].selected) {
                return 5.0
            } else {
                return 0;
            }
        }
        ,
        description: 'Rabattcode kostenfreier Infoservice',
    },
};