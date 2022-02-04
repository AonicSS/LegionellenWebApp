import React, { useCallback, useRef } from 'react';
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
	INCREASE_RENTINGS_STEP,
} from '../../../redux/actions/App';
import { validPostalCode } from '../../../utils/helpers';
import { AppReduxStoreProps, Question } from '../../../redux/reducers/App';
import Button from '../../Button';

import './Input.css';
import { questions } from '../Questions';

function FilterInput(event: any) {
	const keyCode = 'which' in event ? event.which : event.keyCode;

	const isNotWanted = keyCode == 69 || keyCode == 101;
	return !isNotWanted;
}

export const RentingsInput = () => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const getCurrentRentings = useCallback((questionText: string) => {
		const question = useSelector((state: AppReduxStoreProps) =>
			state.appData.questions.find((q) => q.question === questionText)
		);
		return question?.choice;
	}, []);

	const currentRentings = getCurrentRentings(questionText);

	const handleInput = (value: string) => {
		console.log(value);
		dispatch({
			type: SET_ANSWER,
			payload: {
				questionName: questionText,
				choice: value,
				btnActive: !(value.length < 1),
			},
		});
		if (parseInt(value) > 5 && currentAppStep === 3) {
			dispatch({ type: SET_MODAL, payload: { showModal: true } });
		}
	};

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
					{Translate(intl, `questions.2.sublabel`)}
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
								onChange={(e) =>
									handleInput(
										e.target.value.replace(/[^0-9]/g, '')
									)
								}
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
				postalCode: { code: value, valid: valid },
			},
		});
		dispatch({
			type: SET_ANSWER,
			payload: {
				questionName: `${Translate(intl, 'questions.3.question')}`,
				choice: value,
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
						{/* <div className="tw-flex tw-justify-center tw-items-center">
							<div className="tw-font-size-label tw-flex tw-justify-center tw-items-center">
								<Button
									style={INCREASE_RENTINGS}
									modifierClass="tw-mr-3"
									type={''}
									question={''}
								/>
								Weitere PLZ hinzufügen
							</div>
						</div> */}
						<label className="tw-flex tw-justify-center tw-font-size-label tw-mt-2 tw-font">
							Postleitzahl
						</label>
					</div>
				</>
			</fieldset>
			{!postalCodeValid && postalCode.length > 4 && (
				<p className="tw-mt-12 tw-font-size-input-error">
					Leider konnten wir die angegeben Postleitzahl nicht
					zuordnen.
					<br /> Bitte beachten Sie, dass eine Postleitzahl aus 5
					Nummern besteht.
				</p>
			)}
		</div>
	);
};

export const RoomsInput = () => {
	const dispatch = useDispatch();
	const intl = useIntl();
	const myRef = useRef(null);

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
	};

	const question = useSelector((state: AppReduxStoreProps) =>
		state.appData.questions.find((q) => q.question === questionText)
	);

	console.log(question?.answers);

	return (
		<div className="tw-justify-col tw-w-full tw-mb-16">
			<label
				ref={myRef}
				className="tw-flex tw-flex-col tw-justify-center tw-items-center"
			>
				<h1 className="tw-font-size-headline">{questionText}</h1>
				<h2 className="tw-font-size-label">
					{currentRentingsStep}. Wohneinheit
				</h2>
			</label>
			<div className="tw-margin-top">
				{question?.answers?.map((r, i) => {
					return (
						<div
							key={r.name}
							className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-mb-14"
						>
							<div className="tw-flex tw-justify-center md:tw-justify-start tw-items-center">
								<div className="tw-font-size-rooms-name">
									{Translate(
										intl,
										`questions.${
											currentAppStep - 1
										}.answers.${i}.label`
									)}
								</div>
							</div>
							<fieldset className="tw-justify-row">
								<div className="">
									<Button
										room={r.name}
										style="DECREASE_ROOMS"
										type={'DECREASE_' + r.type}
										question={Translate(
											intl,
											`questions.${
												currentAppStep - 1
											}.question`
										)}
									/>
								</div>
								<div className="">
									<input
										onChange={(e) =>
											handleInput(e.target.value, r.name!)
										}
										type="number"
										name="rooms"
										className="tw-input tw-font-size-input focus:tw-ring-transparent"
										value={r.amount?.toString()}
									/>
								</div>
								<div className="">
									<Button
										room={r.name}
										style="INCREASE_ROOMS"
										question={Translate(
											intl,
											`questions.${
												currentAppStep - 1
											}.question`
										)}
									/>
								</div>
							</fieldset>
							<div className="tw-flex tw-justify-center md:tw-justify-start tw-items-center">
								<div className="tw-font-size-rooms-label tw-text-center md:tw-text-left">
									{Translate(
										intl,
										`questions.${
											currentAppStep - 1
										}.answers.${i}.info`
									)}
								</div>
							</div>
						</div>
					);
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
