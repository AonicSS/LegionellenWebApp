import {questions} from '../../components/Form/Questions';
import {trueTypeOf, validPostalCode} from '../../utils/helpers';
import {
	INCREASE_APP_STEP,
	DECREASE_APP_STEP,
	SET_APP_STEP,
	SET_CURRENT_QUESTION,
	INCREASE_STRANG_AMOUNT,
	DECREASE_STRANG_AMOUNT,
	UPDATE_POSTAL_CODE,
	SET_MODAL,
	SET_ANSWER,
	SET_YEARS,
	INCREASE_ROOMS,
	DECREASE_ROOMS,
	SET_ROOMS,
	ADD_HOUSE,
	SET_PRICING,
	SET_REGION, SET_UPLOAD,
} from '../actions/App';

const initialState = {
	step: 1,
	subStep: 0,
	maxSubSteps: 10,
	maxSteps: 3,
	strangAmount: 1,
	showModal: false,
	acceptContact: false,
	acceptMarketing: false,
	questions: questions,
	selectedPricing: {},
	uploads: {},
};

export interface PostalCode {
	code: string;
	valid: boolean;
	area: string;
}

export interface Question {
	question: string;
	choice: any;
	type: string;
	btnActive: boolean;
	answers: Answers[];
}

export interface Questions {
	[question: string]: Question
}

export interface Answers {
	name: string;
	type: string;
	required: boolean;
	value: any;
}
export interface AppData {
	currentQuestion: string;
	subStep: number;
	maxSubSteps: number;
	step: number;
	maxSteps: number;
	strangAmount: number;
	years: number;
	showModal: boolean;
	acceptContact: boolean;
	acceptMarketing: boolean;
	questions: Questions;
	selectedPricing: any;
	uploads: any;
};
export interface AppReduxStoreProps {
	appData: AppData;
}

function getStateRules(state: any): any {
	let newState = {
		...state,
	};
	if (state.step === 1) {
		if (state.questions['Besteht für Ihre Liegenschaft eine Prüfpflicht?'].answers.find((answer: Answers) => answer.name === 'choice')!.value !== "unsure") {
			newState.maxSubSteps = 1;
		} else if (state.questions['Besteht für Ihre Liegenschaft eine Prüfpflicht?'].answers.find((answer: Answers) => answer.name === 'choice')!.value === "unsure") {
			newState.maxSubSteps = 4;
		}
	}
	if (state.step === 2) {
		newState.maxSubSteps = 1;
	}
	if (state.step === 3) {
		newState.maxSubSteps = 3;
	}
	return newState;
}

const appData = (
	state = initialState,
	action: { type: any; payload?: any }
) => {
	switch (action.type) {
		case INCREASE_APP_STEP: {
			let newState = getStateRules(state);
			if (state.subStep === newState.maxSubSteps) {
				let newState = getStateRules({
					...state,
					step:
						state.step < state.maxSteps
							? state.step + 1
							: state.maxSteps,
				});
				return {
					...newState,
					subStep: 0,
				};
			}

			return {
				...newState,
				subStep: state.subStep < state.maxSubSteps ? state.subStep + 1 : state.subStep,
			};
		}
		case DECREASE_APP_STEP: {
			let newState = getStateRules(state);
			if (state.subStep === 0) {
				let newState = getStateRules({
					...state,
					step: state.step > 1 ? state.step - 1 : 1,
				});
				return {
					...newState,
					subStep: newState.maxSubSteps,
				};
			}
			return {
				...newState,
				subStep: state.subStep > 0 ? state.subStep - 1 : state.subStep,
			};
		}
		case SET_APP_STEP: {
			let newState = {
				...state,
				...(action.payload.step !== undefined && {step: action.payload.step}),
				...(action.payload.subStep !== undefined && {subStep: action.payload.subStep}),
				...(action.payload.maxSubSteps !== undefined && {maxSubSteps: action.payload.maxSubSteps}),
			}
			// if (state.step !== action.payload.step) {
			// 	newState.subStep = 1;
			// 	newState.maxSubSteps = 1;
			// }
			return newState;
		}
		case SET_CURRENT_QUESTION: {
			let newState = {
				...state,
				...(action.payload.currentQuestion !== undefined && {currentQuestion: action.payload.currentQuestion}),
			}
			return newState;
		}
		case INCREASE_STRANG_AMOUNT:
			return {
				...state,
				strangAmount: state.strangAmount + 1,
			};
		case DECREASE_STRANG_AMOUNT:
			return {
				...state,
				strangAmount: state.strangAmount > 1 ? state.strangAmount - 1 : 1,
			};
		case UPDATE_POSTAL_CODE:
			return {
				...state,
				postalCode: action.payload.postalCode,
			};
		case SET_MODAL:
			return {
				...state,
				showModal: action.payload.showModal,
			};
		case SET_YEARS:
			return {
				...state,
				years: action.payload.years,
			};
		case SET_PRICING:
			return {
				...state,
				selectedPricing: action.payload.selectedPricing,
			};
		case SET_ANSWER: {
			let currentQuestion = (state.questions as any) [action.payload.questionName];
			let returnState = {
				...state
			};
			(returnState.questions as any)[action.payload.questionName].answers = (returnState.questions as any)[action.payload.questionName].answers.map((answer: Answers) => {
				if (answer.name === action.payload.answerName) {
					answer.value = action.payload.value;
				}
				return answer;
			});
			return returnState;
		}
		case SET_UPLOAD: {
			return {
				...state,
				uploads: action.payload.uploads
			};
		}
		default:
			return state;
	}
};

export default appData;
