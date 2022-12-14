export const INCREASE_APP_STEP = 'INCREASE_APP_STEP';
export const DECREASE_APP_STEP = 'DECREASE_APP_STEP';
export const SET_APP_STEP = 'SET_APP_STEP';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_BUTTON_ACTIVE = 'SET_BUTTON_ACTIVE';
export const INCREASE_STRANG_AMOUNT = 'INCREASE_STRANG_AMOUNT';
export const DECREASE_STRANG_AMOUNT = 'DECREASE_STRANG_AMOUNT';
export const UPDATE_POSTAL_CODE = 'UPDATE_POSTAL_CODE';
export const SET_UPLOAD = 'SET_UPLOAD';
export const SET_ANSWER = 'SET_ANSWER';
export const SET_MODAL = 'SET_MODAL';
export const SET_YEARS = 'SET_YEARS';
export const INCREASE_ROOMS = 'INCREASE_BEDROOMS';
export const DECREASE_ROOMS = 'DECREASE_BEDROOMS';
export const SET_ROOMS = 'SET_ROOMS';
export const ADD_HOUSE = 'ADD_HOUSE';
export const SET_PRICING = 'SET_PRICING';
export const SET_REGION = 'SET_REGION';

import { PostalCode } from '../reducers/App';

export function increaseAppStep() {
	return {
		type: INCREASE_APP_STEP,
	};
}

export function decreaseAppStep() {
	return {
		type: DECREASE_APP_STEP,
	};
}

export function setAppStep(step?: number, subStep?: number, maxSubStep?: number) {
	return {
		type: SET_APP_STEP,
		payload: {
			step,
			subStep,
			maxSubStep
		},
	};
}

export function setButtonActive(nextButtonActive: any, questionName: string) {
	return {
		type: SET_BUTTON_ACTIVE,
		payload: {
			questionName,
			nextButtonActive,
		},
	};
}

export function increaseStrangAmount(btnActive: boolean, questionName: string) {
	return {
		type: INCREASE_STRANG_AMOUNT,
		payload: {
			questionName,
			btnActive,
		},
	};
}

export function decreaseStrangAmount(btnActive: boolean, questionName: string) {
	return {
		type: DECREASE_STRANG_AMOUNT,
		payload: {
			questionName,
			btnActive,
		},
	};
}

export function updatePostalCode(postalCode: PostalCode) {
	return {
		type: UPDATE_POSTAL_CODE,
		payload: {
			postalCode,
		},
	};
}

export function showModal(showModal: boolean) {
	return {
		type: SET_MODAL,
		payload: {
			showModal,
		},
	};
}

export function setYears(years: number) {
	return {
		type: SET_YEARS,
		payload: {
			years,
		},
	};
}

export function setAnswers(
	btnActive: boolean,
	choice: any,
	questionName: string
) {
	return {
		type: SET_ANSWER,
		payload: {
			questionName,
			choice,
			btnActive,
		},
	};
}

export function setPricing(pricing: string) {
	return {
		type: SET_PRICING,
		payload: {
			pricing,
		},
	};
}

export function setRegion(questionName: string, value: boolean) {
	return {
		type: SET_REGION,
		payload: { questionName, value },
	};
}
