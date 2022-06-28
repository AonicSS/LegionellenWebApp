import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useIntl} from 'react-intl';
import {ReactComponent as Close} from '../../icons/times.svg';
import {ReactComponent as Plus} from '../../icons/plus.svg';
import {ReactComponent as Minus} from '../../icons/minus.svg';

import {useSelector, useDispatch} from 'react-redux';
import {
	INCREASE_APP_STEP,
	DECREASE_APP_STEP,
	SET_MODAL,
	INCREASE_ROOMS,
	DECREASE_ROOMS,
	SET_PRICING,
} from '../../redux/actions/App';
import Translate from '../../utils/translate';
import classnames from 'classnames';

import './Button.css';
import {Answers, AppReduxStoreProps, Question, Questions} from '../../redux/reducers/App';
import {BaseComponentProps} from '../../shared/interfaces/components';

interface ButtonProps extends BaseComponentProps {
	type?: string;
	question?: string;
	style?: string;
	room?: string;
	house?: number;
	text?: string;
	pricing?: string;
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
					onClick
				}: ButtonProps) => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const increaseAppStep = () => dispatch({type: INCREASE_APP_STEP});
	const decreaseAppStep = () => dispatch({type: DECREASE_APP_STEP});
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
		const question = useSelector((state: AppReduxStoreProps) =>
			state.appData.questions[questionText]
		);
		return question?.choice === 0 && question?.choice.length > 0;
	}, []);

	const getCurrentRentings = useCallback((questionText: string) => {
		const question = useSelector((state: AppReduxStoreProps) =>
			state.appData.questions[questionText]
		);
		return question?.choice;
	}, []);

	const getActiveButton = useCallback((questions: Questions, question: string) => {
		return questions[question] ? questions[question].btnActive : false;
	}, []);

	const currentRentings = getCurrentRentings(questionText);

	const openModal = useCallback(
		() =>
			dispatch({
				type: SET_MODAL,
				payload: {showModal: true},
			}),
		[]
	);

	const closeModalAndContinue = useCallback(() => {
		dispatch({
			type: SET_MODAL,
			payload: {showModal: false},
		});
	}, []);

	const closeModal = useCallback(
		() =>
			dispatch({
				type: SET_MODAL,
				payload: {showModal: false},
			}),
		[]
	);

	const increaseRentings = () => {
		if (currentRentings > 4 && currentAppStep === 1) {
			dispatch({type: SET_MODAL, payload: {showModal: true}});
		} else {
			dispatch({
				type: type,
				payload: {
					questionName: question,
					btnActive: true,
				},
			});
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
				index: house,
			},
		});
	};

	const decreaseRooms = () => {
		dispatch({
			type: DECREASE_ROOMS,
			payload: {
				questionName: question,
				roomName: room,
				index: house,
			},
		});
	};

	const navigate = useNavigate();

	const setPricing = (value: any) => {
		dispatch({
			type: SET_PRICING,
			payload: {pricing: value},
		});
		closeModal();
		navigate('/summary');
	};

	switch (style) {
		case 'NEXT':
			const question = questions[currentQuestion];
			const answers = question ? question.answers : [];
			const allAnswered = !(answers.some((answer: Answers) => ((answer.value === undefined) && answer.required)));
			return (
				<button
					onClick={increaseAppStep}
					className={classnames(
						'rwn-btn-continue',
						'rwm-button--primary',
						'rwm-btn',
						`rwm-button--${
							((allAnswered) || alwaysActive)
								? 'active'
								: 'disabled'
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
					onClick={onClick ?? increaseAppStep}
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
					onClick={onClick ?? increaseAppStep}
					className={classnames(
						'rwn-btn-continue',
						'rwm-button--secondary'
					)}
				>
					{text}
				</button>
			);
		case 'FORM-LINK':
			return (
				<button
					onClick={() => navigate('/' + link)}
					className={classnames('rwm-button--link')}
				>
					{text}
				</button>
			);
		case 'FORM-LINK-PRIMARY':
			return (
				<button
					onClick={() => navigate('/' + link)}
					className={classnames(
						'rwn-btn-continue',
						'rwm-button--form-link-primary'
					)}
				>
					{text}
				</button>
			);
		case 'CLOSE':
			return (
				<button onClick={closeModal} className="rwm-btn__container">
					<Close className="rwm-btn-close"/>
				</button>
			);
		case 'INCREASE_STRANG_AMOUNT':
			return (
				<button
					className={classnames(
						'tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center',
						modifierClass
					)}
					onClick={increaseRentings}
				>
					<Plus width={16} height={16}/>
				</button>
			);
		case 'DECREASE_STRANG_AMOUNT':
			return (
				<button
					className="tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center"
					onClick={decreaseRentings}
				>
					<Minus width={16} height={16}/>
				</button>
			);
		case 'DECREASE_ROOMS':
			return (
				<button
					className="tw-border-2 tw-rounded-full tw-h-9 tw-w-9 tw-border-btnColorDisabled tw-flex tw-justify-center tw-items-center"
					onClick={decreaseRooms}
				>
					<Minus width={16} height={16}/>
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
					<Plus width={16} height={16}/>
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
		default:
			return <div>Nope</div>;
	}
};

export default Button;
