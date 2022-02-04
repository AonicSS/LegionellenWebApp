import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as Close } from '../../icons/times.svg';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import { ReactComponent as Minus } from '../../icons/minus.svg';

import { useSelector, useDispatch } from 'react-redux';
import {
	INCREASE_APP_STEP,
	DECREASE_APP_STEP,
	SET_MODAL,
	INCREASE_ROOMS,
	DECREASE_ROOMS,
} from '../../redux/actions/App';
import Translate from '../../utils/translate';
import classnames from 'classnames';

import './Button.css';
import { AppReduxStoreProps, Question } from '../../redux/reducers/App';
import { BaseComponentProps } from '../../shared/interfaces/components';

interface ButtonProps extends BaseComponentProps {
	type?: string;
	question?: string;
	style?: string;
	room?: string;
}

const Button = ({
	style,
	question,
	type,
	modifierClass,
	room,
}: ButtonProps) => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const increaseAppStep = () => dispatch({ type: INCREASE_APP_STEP });
	const decreaseAppStep = () => dispatch({ type: DECREASE_APP_STEP });
	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const questions = useSelector(
		(state: AppReduxStoreProps) => state.appData.questions
	);

	const currentRentingsStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.rentings
	);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const getIsRentingZero = useCallback((questionText: string) => {
		const question = useSelector((state: AppReduxStoreProps) =>
			state.appData.questions.find((q) => q.question === questionText)
		);
		return question?.choice === 0 && question?.choice.length > 0;
	}, []);

	const getCurrentRentings = useCallback((questionText: string) => {
		const question = useSelector((state: AppReduxStoreProps) =>
			state.appData.questions.find((q) => q.question === questionText)
		);
		return question?.choice;
	}, []);

	const getActiveButton = useCallback((questions: Question[]) => {
		const index = useSelector(
			(state: AppReduxStoreProps) => state.appData.step - 1
		);
		for (const [k, v] of Object.entries(questions)) {
			if (parseInt(k) === index) return v.btnActive;
		}
	}, []);

	const currentRentings = getCurrentRentings(questionText);

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

	const increaseRentings = () => {
		dispatch({
			type: type,
			payload: {
				questionName: question,
				btnActive: true,
			},
		});

		if (currentRentings > 4 && currentAppStep === 3) {
			dispatch({ type: SET_MODAL, payload: { showModal: true } });
		}
	};

	const decreaseRentings = () => {
		dispatch({
			type: type,
			payload: {
				questionName: question,
				btnActive: currentRentings > 1,
			},
		});
	};

	const increaseRooms = () => {
		dispatch({
			type: INCREASE_ROOMS,
			payload: {
				questionName: question,
				roomName: room,
				index: currentRentingsStep,
			},
		});
	};

	const decreaseRooms = () => {
		dispatch({
			type: DECREASE_ROOMS,
			payload: {
				questionName: question,
				roomName: room,
			},
		});
	};

	switch (style) {
		case 'NEXT':
			const isRentingZero = getIsRentingZero(questionText);
			console;
			const active = getActiveButton(questions);
			return (
				<button
					onClick={increaseAppStep}
					className={classnames(
						'rwm-btn',
						`rwm-button--${
							(!isRentingZero &&
								active &&
								currentAppStep === 3) ||
							active
								? 'active'
								: 'disabled'
						}`
					)}
				>
					{Translate(intl, 'button.next')}
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
		case 'CLOSE':
			return (
				<button onClick={closeModal} className="rwm-btn__container">
					<Close className="rwm-btn-close" />
				</button>
			);
		case 'INCREASE_RENTINGS':
			return (
				<button
					className={classnames(
						'tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center',
						modifierClass
					)}
					onClick={increaseRentings}
				>
					<Plus width={16} height={16} />
				</button>
			);
		case 'DECREASE_RENTINGS':
			return (
				<button
					className="tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center"
					onClick={decreaseRentings}
				>
					<Minus width={16} height={16} />
				</button>
			);
		case 'DECREASE_ROOMS':
			return (
				<button
					className="tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center"
					onClick={decreaseRooms}
				>
					<Minus width={16} height={16} />
				</button>
			);
		case 'INCREASE_ROOMS':
			return (
				<button
					className={classnames(
						'tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center',
						modifierClass
					)}
					onClick={increaseRooms}
				>
					<Plus width={16} height={16} />
				</button>
			);
		default:
			return <div>Nope</div>;
	}
};

export default Button;
