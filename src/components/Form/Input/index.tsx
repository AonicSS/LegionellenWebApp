import React, { useCallback, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import Translate from '../../../utils/translate';
import { useDispatch, useSelector } from 'react-redux';
import {
	SET_ANSWER,
	UPDATE_POSTAL_CODE,
	INCREASE_RENTINGS,
	DECREASE_RENTINGS,
	SET_MODAL,
	SET_ROOMS,
	ADD_HOUSE,
	INCREASE_RENTINGS_STEP,
	SET_REGION,
} from '../../../redux/actions/App';
import { validPostalCode, getFederalState } from '../../../utils/helpers';
import { AppReduxStoreProps } from '../../../redux/reducers/App';
import Button from '../../Button';
import { ReactComponent as Info } from '../../../icons/Info.svg';

import './Input.css';

export const RentingsInput = () => {
	const intl = useIntl();

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const currentRentings = useSelector(
		(state: AppReduxStoreProps) => state.appData.maxRentings
	);

	return (
		<div>
			<label className="rwm-form__headline">
				<h1>
					{Translate(
						intl,
						`questions.${currentAppStep - 1}.question`
					)}
				</h1>
				<h2 className="tw-font-size-overlay-body tw-text-center">
					{Translate(intl, `questions.0.sublabel`)}
				</h2>
			</label>
			<fieldset>
				<div className="rwm-form">
					<div className="rwm-form__rentings">
						<div className="tw-flex tw-justify-end tw-items-center">
							<Button
								style={DECREASE_RENTINGS}
								type={DECREASE_RENTINGS}
								question={questionText}
							/>
						</div>
						<div className="tw-flex tw-justify-center">
							<input
								type="number"
								name="rentings"
								className="tw-input tw-font-size-input focus:tw-ring-transparent"
								value={currentRentings}
								autoComplete="off"
							/>
						</div>

						<div className="tw-flex tw-justify-start tw-items-center">
							<Button
								style={INCREASE_RENTINGS}
								type={INCREASE_RENTINGS}
								question={questionText}
							/>
						</div>
					</div>
				</div>
				<div className="tw-flex tw-justify-center tw-items-center">
					<label className="tw-font-size-label tw-mt-4 tw-font">
						{currentRentings > 1 ? `Wohneinheiten` : `Wohneinheit`}
					</label>
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
			state.appData.questions.find((q) => q.question === questionText)
		);
		return question?.choice;
	}, []);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const currentPostalCode = getCurrentPostalCode(questionText);

	const onChange = (value: string) => {
		const valid = validPostalCode(value);
		dispatch({
			type: UPDATE_POSTAL_CODE,
			payload: {
				postalCode: {
					code: value,
					valid: valid,
					area: getFederalState(value)[0]
						? getFederalState(value)[0].bundesland
						: '',
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
	};

	return (
		<div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
			<label className="rwm-form__headline tw-flex tw-flex-col tw-items-center tw-justify-center">
				<h1>{Translate(intl, 'questions.3.question')}</h1>
				<h2 className="tw-font-size-info tw-text-center tw-mt-5">
					Zur exakten Ermittlung der Anzahl der benötigten
					Rauchwarnmeldern ist <br /> die Postleitzahl notwendig, da
					verschiedene gesetzliche Bestimmungen gelten.
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
					<br />
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
	const myRef = useRef(null);

	const postalCodeArea = useSelector(
		(state: AppReduxStoreProps) => state.appData.postalCode.area
	);

	const curentRenting = useSelector(
		(state: AppReduxStoreProps) => state.appData.rentings
	);

	// @ts-ignore
	const executeScroll = () => myRef.current.scrollIntoView();

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const maxRentings = useSelector(
		(state: AppReduxStoreProps) => state.appData.maxRentings
	);

	const currentRentingsStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.rentings
	);

	const questionText = Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	);

	useEffect(() => {
		if (postalCodeArea === 'Berlin' || postalCodeArea === 'Brandenburg')
			dispatch({
				type: SET_REGION,
				payload: {
					questionName: questionText,
				},
			});
	}, []);

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
		executeScroll();
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
		state.appData.questions.find((q) => q.question === questionText)
	);

	return (
		<div className="tw-justify-col tw-w-full tw-mb-18">
			<label
				ref={myRef}
				className="tw-flex tw-flex-col tw-justify-center tw-items-center"
			>
				<h1 className="tw-font-size-headline">{questionText}</h1>
				<br />
			</label>
			<div className="tw-container-room">
				{question?.answers?.map((r, i) => {
					if (r.house <= curentRenting) {
						return (
							<div key={i}>
								{r.house <= curentRenting &&
								r.name === 'bedrooms' ? (
									<label
										ref={myRef}
										className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-6 tw-mt-14"
									>
										<h2 className="tw-font-size-label">
											{r.house}. Wohneinheit
										</h2>
									</label>
								) : null}
								<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-mb-7">
									<div className="tw-flex tw-justify-start tw-items-center tw-mb-4">
										<div className="tw-font-size-rooms-name">
											{Translate(
												intl,
												`questions.${
													currentAppStep - 1
												}.answers.${r.name}`
											)}
										</div>
									</div>
									<fieldset className="tw-justify-row rwm-form__rentings tw-mb-2">
										<div>
											<Button
												room={r.name}
												house={r.house}
												style="DECREASE_ROOMS"
												question={Translate(
													intl,
													`questions.${
														currentAppStep - 1
													}.question`
												)}
											/>
										</div>
										<div>
											<input
												onChange={(e) =>
													handleInput(
														e.target.value,
														r.name!
													)
												}
												disabled
												type="number"
												name="rooms"
												className="tw-input tw-font-size-input focus:tw-ring-transparent"
												value={r.amount?.toString()}
											/>
										</div>
										<div>
											<Button
												room={r.name}
												style="INCREASE_ROOMS"
												house={r.house}
												question={Translate(
													intl,
													`questions.${
														currentAppStep - 1
													}.question`
												)}
											/>
										</div>
									</fieldset>
									<div className="tw-flex tw-justify-center md:tw-justify-center lg:tw-justify-start tw-items-center">
										<div className="tw-font-size-rooms-label tw-text-center md:tw-text-left tw-flex">
											{Translate(
												intl,
												`questions.${
													currentAppStep - 1
												}.${
													r.required
														? 'required'
														: 'recommended'
												}`
											)}
											{!r.required ? (
												<Info
													onClick={() =>
														dispatch({
															type: SET_MODAL,
															payload: {
																showModal: true,
															},
														})
													}
													className="rwm-btn-info"
												/>
											) : null}
										</div>
									</div>
								</div>
							</div>
						);
					} else {
						return null;
					}
				})}
			</div>
			{maxRentings > 1 && currentRentingsStep < maxRentings ? (
				<button onClick={nextRenting}>
					<div className="tw-font-size-rooms-continue-label">
						Weiter zur {currentRentingsStep + 1}. Wohneinheit
					</div>
				</button>
			) : null}
		</div>
	);
};
