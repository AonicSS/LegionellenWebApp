import React, {useCallback} from 'react';
import * as Scroll from 'react-scroll';
import {useIntl} from 'react-intl';
import Translate from '../../../utils/translate';
import {useDispatch, useSelector} from 'react-redux';
import {
	SET_ANSWER,
	UPDATE_POSTAL_CODE,
	INCREASE_STRANG_AMOUNT,
	DECREASE_STRANG_AMOUNT,
	SET_MODAL,
	SET_ROOMS,
	ADD_HOUSE,
	INCREASE_RENTINGS_STEP,
	SET_REGION,
} from '../../../redux/actions/App';
import {validPostalCode, getFederalState} from '../../../utils/helpers';
import {AppReduxStoreProps} from '../../../redux/reducers/App';
import Button from '../../Button';
import Info from '../../../public/icons/Info.svg';
import Chevron from '../../../public/icons/chevron-left.svg';
import classNames from 'classnames';

export const NumericInput = () => {
	const intl = useIntl();

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const currentStrangAmount = useSelector(
		(state: AppReduxStoreProps) => state.appData.strangAmount
	);

	return (
		<div>
			<fieldset>
				<div className="rwm-form">
					<div className="rwm-form__rentings">
						<div className="tw-flex tw-justify-end tw-items-center">
							<Button
								style={DECREASE_STRANG_AMOUNT}
								type={DECREASE_STRANG_AMOUNT}
								question={questionText}
							/>
						</div>
						<div className="tw-flex tw-justify-center">
							<input
								type="number"
								name="rentings"
								className="tw-input tw-font-size-input focus:tw-ring-transparent"
								value={currentStrangAmount}
								autoComplete="off"
							/>
						</div>

						<div className="tw-flex tw-justify-start tw-items-center">
							<Button
								style={INCREASE_STRANG_AMOUNT}
								type={INCREASE_STRANG_AMOUNT}
								question={questionText}
							/>
						</div>
					</div>
				</div>
			</fieldset>
		</div>
	);
};

export const PostalCodeInput = () => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const postalCode = useSelector(
		(state: AppReduxStoreProps) => state.appData.postalCode.code
	);
	const postalCodeValid = useSelector(
		(state: AppReduxStoreProps) => state.appData.postalCode.valid
	);

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const getCurrentPostalCode = useCallback((questionText: string) => {
		const question = useSelector((state: AppReduxStoreProps) =>
			state.appData.questions[questionText]
		);
		return question?.choice;
	}, []);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const roomStepText = `${Translate(
		intl,
		`questions.${currentAppStep}.question`
	)}`;

	const currentPostalCode = getCurrentPostalCode(questionText);

	const onChange = (value: string) => {
		const valid = validPostalCode(value);
		const area = getFederalState(value)[0];
		const bundesland = getFederalState(value)[0]?.bundesland;

		dispatch({
			type: UPDATE_POSTAL_CODE,
			payload: {
				postalCode: {
					code: value,
					valid: valid,
					area: area ? bundesland : '',
				},
			},
		});
		dispatch({
			type: SET_ANSWER,
			payload: {
				questionName: `${Translate(intl, 'questions.1.question')}`,
				choice: value,
				btnActive: valid,
			},
		});
		dispatch({
			type: SET_REGION,
			payload: {
				questionName: roomStepText,
				answerName: 'choice',
				value:
					bundesland === 'Berlin' || bundesland === 'Brandenburg'
						? true
						: false,
			},
		});
	};

	return (
		<div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
			<label className="rwm-form__headline tw-flex tw-flex-col tw-items-center tw-justify-center">
				<h1 className="rwm-form__headline">
					{Translate(intl, 'questions.1.question')}
				</h1>
				<h2 className="tw-font-size-info tw-text-center tw-mt-5">
					Die gesetzlichen Bestimmungen zur Ausstattung mit
					Rauchwarnmeldern unterscheiden sich je nach Bundesland.{' '}
					<br/> Um die genaue Anzahl ermitteln zu können, ist daher
					die Angabe der Postleitzahl nötig.
				</h2>
			</label>
			<fieldset className="rwm-form">
				<>
					<div className="rwm-form__postalCode">
						<div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
							<input
								type="number"
								name="postalCode"
								className="tw-input tw-font-size-input focus:tw-ring-transparent"
								placeholder="PLZ"
								value={currentPostalCode}
								onChange={(e) => onChange(e.target.value)}
							/>
						</div>
						<label className="tw-flex tw-justify-center tw-font-size-label tw-mt-2 tw-font">
							Postleitzahl
						</label>
					</div>
				</>
			</fieldset>
			{!postalCodeValid && postalCode.length > 4 && (
				<p className="tw-mt-12 tw-font-size-input-error">
					Leider konnten wir die angegebene Postleitzahl nicht
					zuordnen.
					<br/>
					Bitte beachten Sie, dass eine Postleitzahl aus 5 Ziffern
					bestehen muss.
				</p>
			)}
		</div>
	);
};

export const RoomsInput = () => {
	const dispatch = useDispatch();
	const intl = useIntl();
	const scroll = Scroll.animateScroll;

	const postalCodeArea = useSelector(
		(state: AppReduxStoreProps) => state.appData.postalCode.area
	);

	const curentRenting = useSelector(
		(state: AppReduxStoreProps) => state.appData.rentings
	);

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const strangAmount = useSelector(
		(state: AppReduxStoreProps) => state.appData.strangAmount
	);

	const currentRentingsStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.rentings
	);

	const questionText = Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	);

	const handleInput = (value: string, room: string) => {
		dispatch({
			type: SET_ROOMS,
			payload: {
				questionName: questionText,
				roomName: room,
				amount: value,
			},
		});
	};

	const nextRenting = () => {
		scroll.scrollMore(500);
		dispatch({
			type: INCREASE_RENTINGS_STEP,
		});
		dispatch({
			type: ADD_HOUSE,
			payload: {
				questionName: questionText,
			},
		});
	};

	const question = useSelector((state: AppReduxStoreProps) =>
		state.appData.questions[questionText]
	);

	return (
		<div className="tw-justify-col tw-w-full tw-mb-18">
			<label className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-1">
				<h1 className="tw-font-size-headline">{questionText}</h1>
			</label>
			<div className="tw-container-room">
				{question?.answers?.map((r: any, i: any) => {
					return null;
				})}
			</div>
			{strangAmount > 1 && currentRentingsStep < strangAmount ? (
				<button onClick={nextRenting}>
					<div className="tw-flex tw-font-size-rooms-continue-label">
						Weiter zur {currentRentingsStep + 1}. Wohnung{' '}
						<Chevron className="rwm-btn-next-room"/>
					</div>
				</button>
			) : null}
		</div>
	);
};
