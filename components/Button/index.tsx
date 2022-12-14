import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import Close from '../../public/icons/times.svg';
import Plus from '../../public/icons/plus.svg';
import Minus from '../../public/icons/minus.svg';

import { useSelector, useDispatch } from 'react-redux';
import {
	INCREASE_APP_STEP,
	DECREASE_APP_STEP,
	SET_MODAL,
	INCREASE_ROOMS,
	DECREASE_ROOMS,
	SET_PRICING, increaseStrangAmount,
} from '../../redux/actions/App';
import Translate from '../../utils/translate';
import classnames from 'classnames';
import appData, {
	Answers,
	AppReduxStoreProps,
	Question,
	Questions,
} from '../../redux/reducers/App';
import { BaseComponentProps } from '../../shared/interfaces/components';

interface ButtonProps extends BaseComponentProps {
	type?: string;
	question?: string;
	style?: string;
	room?: string;
	house?: number;
	text?: string;
	pricing?: any;
	link?: string;
	children?: string;
	alwaysActive?: boolean;
	onClick?: any;
}

const Button = ({
	style,
	question,
	type,
	modifierClass,
	room,
	house,
	text,
	pricing,
	link,
	alwaysActive,
	onClick,
}: ButtonProps) => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const increaseAppStep = () => dispatch({ type: INCREASE_APP_STEP });
	const decreaseAppStep = () => dispatch({ type: DECREASE_APP_STEP });
	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);

	const questions = useSelector(
		(state: AppReduxStoreProps) => state.appData.questions
	);

	const currentQuestion = useSelector(
		(state: AppReduxStoreProps) => state.appData.currentQuestion
	);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const getIsRentingZero = useCallback((questionText: string) => {
		const question = useSelector(
			(state: AppReduxStoreProps) => state.appData.questions[questionText]
		);
		return question?.choice === 0 && question?.choice.length > 0;
	}, []);

	const getCurrentRentings = useCallback((questionText: string) => {
		const question = useSelector(
			(state: AppReduxStoreProps) => state.appData.questions[questionText]
		);
		return question?.choice;
	}, []);

	const getActiveButton = useCallback(
		(questions: Questions, question: string) => {
			return questions[question] ? questions[question].btnActive : false;
		},
		[]
	);

	const currentRentings = getCurrentRentings(questionText);

	const openModal = useCallback(
		() =>
			dispatch({
				type: SET_MODAL,
				payload: { showModal: true },
			}),
		[]
	);

	const closeModalAndContinue = useCallback(() => {
		dispatch({
			type: SET_MODAL,
			payload: { showModal: false },
		});
	}, []);

	const closeModal = useCallback(
		() =>
			dispatch({
				type: SET_MODAL,
				payload: { showModal: false },
			}),
		[]
	);

	const increaseStrangAmount = () => {
		dispatch({
			type: type,
			payload: {
				questionName: question,
				btnActive: true,
			},
		});
	};

	const decreaseStrangAmount = () => {
		dispatch({
			type: type,
			payload: {
				questionName: question,
				btnActive: currentRentings > 1,
			},
		});
	};

	switch (style) {
		case 'NEXT':
			const question = questions[currentQuestion];
			const answers = question ? question.answers : [];
			const allAnswered = !answers.some(
				(answer: Answers) =>
					answer.value === undefined && answer.required
			);
			return (
				<button
					onClick={increaseAppStep}
					className={classnames(
						'rwn-btn-continue',
						'rwm-button--primary',
						'rwm-btn',
						`rwm-button--${
							allAnswered || alwaysActive ? 'active' : 'disabled'
						}`
					)}
				>
					{text ?? Translate(intl, 'button.next')}
				</button>
			);
		case 'PREVIOUS':
			return (
				<div className="rwm-icon">
					<div onClick={decreaseAppStep} className="rwm-arrow"></div>
				</div>
			);
		case 'CONTINUE':
			return (
				<button
					onClick={closeModalAndContinue}
					className={classnames(
						'rwn-btn-continue',
						'rwm-button--active'
					)}
				>
					{' '}
					{Translate(intl, 'button.continue')}
				</button>
			);
		case 'PRIMARY':
			return (
				<button
					onClick={() => {
						if (pricing) {
							currentAppData.selectedPricing = pricing;
						}
						return onClick ? onClick() : increaseAppStep();
					}}
					className={classnames(
						'rwn-btn-continue',
						'rwm-button--primary'
					)}
				>
					{text}
				</button>
			);
		case 'SECONDARY':
			return (
				<button
					onClick={() => {
						if (pricing) {
							currentAppData.selectedPricing = pricing;
						}
						return onClick ? onClick() : increaseAppStep();
					}}
					className={classnames(
						'rwn-btn-continue',
						'rwm-button--secondary'
					)}
				>
					{text}
				</button>
			);
		case 'CLOSE':
			return (
				<button onClick={closeModal} className="rwm-btn__container">
					<Close className="rwm-btn-close" />
				</button>
			);
		case 'INCREASE_STRANG_AMOUNT':
			return (
				<button
					className={classnames(
						'tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center',
						modifierClass
					)}
					onClick={increaseStrangAmount}
				>
					<Plus width={16} height={16} />
				</button>
			);
		case 'DECREASE_STRANG_AMOUNT':
			return (
				<button
					className="tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center"
					onClick={decreaseStrangAmount}
				>
					<Minus width={16} height={16} />
				</button>
			);
		case 'LINK':
			return (
				<button
					onClick={openModal}
					className={classnames('rwm-button--link')}
				>
					{text}
				</button>
			);

		case 'DISACTIVE':
			return (
				<button
					onClick={() => {
						if (pricing) {
							currentAppData.selectedPricing = pricing;
						}
						return onClick ? onClick() : increaseAppStep();
					}}
					className={classnames(
						'rwn-btn-continue',
						'rwm-button--disactive',

					)}
				>
					{text}
				</button>
			);
		default:
			return <div>Nope</div>;
	}
};

export default Button;
