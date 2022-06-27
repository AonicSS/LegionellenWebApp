import {questions} from '../../components/Form/Questions';
import {trueTypeOf, validPostalCode} from '../../utils/helpers';
import {
	INCREASE_APP_STEP,
	DECREASE_APP_STEP,
	SET_APP_STEP,
	SET_CURRENT_QUESTION,
	INCREASE_RENTINGS_STEP,
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
	SET_REGION,
} from '../actions/App';

const initialState = {
	step: 1,
	subStep: 0,
	maxSubSteps: 10,
	maxSteps: 3,
	rentings: 1,
	strangAmount: 1,
	showModal: false,
	acceptContact: false,
	acceptMarketing: false,
	years: 10,
	postalCode: {code: '', valid: false, area: ''},
	questions: questions,
	pricing: '',
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

export interface Answers {
	name: string;
	type: string;
	required: boolean;
	value: any;
}

export interface AppReduxStoreProps {
	appData: {
		currentQuestion: string;
		subStep: number;
		maxSubSteps: number;
		step: number;
		rentings: number;
		maxSteps: number;
		strangAmount: number;
		years: number;
		showModal: boolean;
		postalCode: PostalCode;
		acceptContact: boolean;
		acceptMarketing: boolean;
		questions: Question[];
		pricing: string;
	};
}

function getStateRules(state: any): any {
	let newState = {
		...state,
	};
	if (state.step === 1) {
		if (state.questions[0].answers.find((answer: Answers) => answer.name === 'choice')!.value !== "unsure") {
			newState.maxSubSteps = 1;
		} else if (state.questions[0].answers.find((answer: Answers) => answer.name === 'choice')!.value === "unsure") {
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
			if (state.step !== action.payload.step) {
				newState.subStep = 1;
				newState.maxSubSteps = 1;
			}
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
		case INCREASE_RENTINGS_STEP:
			return {
				...state,
				rentings:
					state.rentings < state.strangAmount
						? state.rentings + 1
						: state.strangAmount,
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
				pricing: action.payload.pricing,
			};
		case SET_ANSWER:
			return {
				...state,
				questions: state.questions.map((q, i) => {
					return q.question === action.payload.questionName
						? {
							...q,
							answers: q.answers.map((answer) => {
								if (answer.name === 'choice') {
									answer.value = action.payload.value;
								}
								return answer;
							})
						}
						: {...q};
				}),
			};
		case SET_ROOMS: {
			return {
				...state,
				questions: state.questions.map((q) => {
					return q.question === action.payload.questionName
						? {
							...q,
							answers: q.answers.map((a) => {
								return a.name === action.payload.roomName
									? {
										...a,
										amount: action.payload.amount,
									}
									: {...a};
							}),
						}
						: {...q};
				}),
			};
		}
		case SET_REGION:
			return {
				...state,
				questions: state.questions.map((q) => {
					if (q.question === action.payload.questionName) {
						return {
							...q,
							answers: q.answers.map((a) => {
								if (a.name === 'common') {
									return {
										...a,
										amount:
											state.postalCode.area ===
											'Berlin' ||
											state.postalCode.area ===
											'Brandenburg'
												? 1
												: 0,
										required: action.payload.value,
									};
								} else {
									return {...a};
								}
							}),
						};
					} else {
						return {...q};
					}
				}),
			};
		default:
			return state;
	}
};

export default appData;
