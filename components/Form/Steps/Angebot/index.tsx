import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import * as Scroll from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import {
	DECREASE_APP_STEP,
	SET_ANSWER,
	SET_APP_STEP,
	SET_CURRENT_QUESTION,
} from '../../../../redux/actions/App';
import { AppReduxStoreProps } from '../../../../redux/reducers/App';
import Pricing from './Pricing/Pricing';
import Summary from '../../../summary';
import SummaryFinal from '../../../summary-final';
import HouseAltIcon from '../../../../public/icons/house-alt.svg';
import PenEditIcon from '../../../../public/icons/pen-edit.svg';
import {
	checkStrangAmount,
	getMeasurementValvesInstalled,
} from '../../../../utils/helpers';
import Translate from '../../../../utils/translate';

const Angebot = () => {
	const dispatch = useDispatch();
	const intl = useIntl();
	const scroller = Scroll.scroller;

	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);

	const questionText = useSelector(
		(state: AppReduxStoreProps) => state.appData.currentQuestion
	);

	const currentQuestion = useSelector(
		(state: AppReduxStoreProps) =>
			state.appData.questions[state.appData.currentQuestion]
	);

	useEffect(() => {
		scroller.scrollTo('myScrollToElement', {
			duration: 1500,
			delay: 100,
			smooth: true,
			offset: -50,
		});

		dispatch({
			type: SET_CURRENT_QUESTION,
			payload: {
				currentQuestion:
					'Wo befindet sich die zu prüfende Liegenschaft?',
			},
		});
	}, []);

	const handleChange = (value: string, answerName: string) => {
		dispatch({
			type: SET_ANSWER,
			payload: {
				questionName: questionText,
				answerName: answerName,
				value: value,
				btnActive: true,
			},
		});
	};

	const [contactAgreement, setContact] = React.useState(false);

	switch (currentSubStep) {
		default:
		case 0: {
			return (
				<>
					<section className="rwm-forms__page-section tw-margin-top">
						<div className="tw-flex tw-flex-col">
							<label className="rwm-form__headline tw-m-auto tw-pb-10">
								<h1 className="text-title rwm-form__headline tw-leading-[37px] tw-font-bold">
									Wo befindet sich die zu prüfende
									Liegenschaft?
								</h1>
							</label>
							<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2 tw-w-full">
								<div className="rwm-form__input-container">
									<label className="tw-flex tw-font-light tw-text-[16px] tw-leading-[149.5%] tw-text-[#605E5C] tw-font">
										Straße*
									</label>
									<input
										type="text"
										name="streetName"
										className="rwm-form__input-custom tw-border-[0.5px]  'focus:tw-ring-transparent"
										value={
											currentQuestion.answers.find(
												(answer) =>
													answer.name === 'streetName'
											)
												? currentQuestion.answers.find(
														(answer) =>
															answer.name ===
															'streetName'
												  )!.value
												: ''
										}
										onChange={(e) =>
											handleChange(
												e.target.value,
												e.target.name
											)
										}
									/>
								</div>
								<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
									<label className="tw-flex tw-font-light tw-text-[16px] tw-leading-[149.5%] tw-text-[#605E5C] tw-font">
										Hausnummer*
									</label>
									<input
										type="text"
										name="houseNumber"
										className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
										value={
											currentQuestion.answers.find(
												(answer) =>
													answer.name ===
													'houseNumber'
											)
												? currentQuestion.answers.find(
														(answer) =>
															answer.name ===
															'houseNumber'
												  )!.value
												: ''
										}
										onChange={(e) =>
											handleChange(
												e.target.value,
												e.target.name
											)
										}
									/>
								</div>
							</div>
							<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6 tw-w-full">
								<div className="rwm-form__input-container">
									<label className="tw-flex tw-font-light tw-text-[16px] tw-leading-[149.5%] tw-text-[#605E5C] tw-font">
										Postleitzahl*
									</label>
									<input
										type="number"
										name="postalCode"
										className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
										value={
											currentQuestion.answers.find(
												(answer) =>
													answer.name === 'postalCode'
											)
												? currentQuestion.answers.find(
														(answer) =>
															answer.name ===
															'postalCode'
												  )!.value
												: ''
										}
										onChange={(e) =>
											handleChange(
												e.target.value,
												e.target.name
											)
										}
									/>
								</div>
								<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
									<label className="tw-flex tw-font-light tw-text-[16px] tw-leading-[149.5%] tw-text-[#605E5C] tw-font">
										Wohnort*
									</label>
									<input
										type="text"
										name="city"
										className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
										value={
											currentQuestion.answers.find(
												(answer) =>
													answer.name === 'city'
											)
												? currentQuestion.answers.find(
														(answer) =>
															answer.name ===
															'city'
												  )!.value
												: ''
										}
										onChange={(e) =>
											handleChange(
												e.target.value,
												e.target.name
											)
										}
									/>
								</div>
							</div>
						</div>
					</section>
				</>
			);
		}
		case 1: {
			let streetName = currentAppData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]!.answers.find((answer) => answer.name === 'streetName')!.value;
			let houseNumber = currentAppData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]!.answers.find((answer) => answer.name === 'houseNumber')!.value;
			let postalCode = currentAppData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]!.answers.find((answer) => answer.name === 'postalCode')!.value;
			let city = currentAppData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]!.answers.find((answer) => answer.name === 'city')!.value;
			let measurementValvesInstalled =
				getMeasurementValvesInstalled(currentAppData);
			let strangAmountKnown = checkStrangAmount(currentAppData);

			return (
				<section className="tw-margin-top">
					<div className="tw-flex tw-justify-center tw-mb-14">
						<h1 className="rwm-form__headline">
							Unser Angebot für Sie
						</h1>
					</div>

					<div className="tw-flex tw-justify-center tw-mt-14 tw-mb-14 tw-mx-auto tw-max-w-xl">
						{strangAmountKnown && measurementValvesInstalled && (
							<div>
								Für die Liegenschaft {' '}
								<span
									onClick={() => {
										dispatch({ type: DECREASE_APP_STEP });
									}}
									className={
										'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
									}
								>
									{streetName} {houseNumber}, {postalCode}{' '}
									{city}
									<PenEditIcon className={'tw-inline'} />
								</span>{' '}
								mit{' '}
								<span
									onClick={() => {
										dispatch({
											type: SET_ANSWER,
											payload: {
												questionName:
													'Kennen Sie das Strangschema Ihrer Trinkwasseranlage?',
												answerName: 'choice',
												value: 'yes',
											},
										});
										dispatch({
											type: SET_APP_STEP,
											payload: { step: 2, subStep: 0 },
										});
									}}
									className={
										'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
									}
								>
									{currentAppData.strangAmount > 1
										? `${currentAppData.strangAmount} Strängen`
										: 'einem Strang'}
									<PenEditIcon className={'tw-inline'} />
								</span>{' '}
								und{' '}
								<span
									onClick={() => {
										dispatch({
											type: SET_APP_STEP,
											payload: { step: 2 },
										});
									}}
									className={
										'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
									}
								>
									{measurementValvesInstalled
										? 'vorhandenen Probeentnahmeventilen'
										: 'nicht vorhandenen Probeentnahmeventilen'}
									<PenEditIcon className={'tw-inline'} />
								</span>{' '}
								haben wir folgendes Angebot für Sie kalkuliert:
							</div>
						)}
						{!(strangAmountKnown && measurementValvesInstalled) && (
							<div>
								Um einen verbindlichen Preis für eine
								Legionellenprüfung in Ihrer Liegenschaft zu
								ermitteln, benötigen wir noch Angaben zu{' '}
								<span
									onClick={() => {
										dispatch({
											type: SET_APP_STEP,
											payload: { step: 2 },
										});
									}}
									className={
										'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
									}
								>
									Strangschema
									<PenEditIcon className={'tw-inline'} />
								</span>{' '}
								und{' '}
								<span
									onClick={() => {
										dispatch({
											type: SET_APP_STEP,
											payload: { step: 2 },
										});
									}}
									className={
										'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
									}
								>
									Probeentnahmeventilen
									<PenEditIcon className={'tw-inline'} />
								</span>
								. Diese ermitteln wir bei der Begehung, die Sie
								nun direkt online beauftragen können.
							</div>
						)}
					</div>
					<Pricing surveyRequired={!strangAmountKnown} />
					<section
						className={'tw-bg-light-grey tw-p-10 tw-mb-12 tw-mt-12'}
					>
						<h1>Wie geht es nach der Begehung weiter?</h1>
						<p>Erklärtext folgt.. Wir ermittelt gemeinsam...</p>
						<div
							className={
								'tw-flex tw-justify-center tw-text-sharepoint-grey tw-mt-12'
							}
						>
							<div
								className={
									'tw-border-b tw-border-sharepoint-grey tw-pb-4 tw-mb-4'
								}
							>
								<h4>
									So sieht eine mögliche Preisindikation der
									Legionellenprüfung aus
								</h4>
							</div>
						</div>
						<div
							className={
								'tw-flex tw-justify-center tw-text-sharepoint-grey'
							}
						>
							<div
								className={
									'tw-flex tw-flex-row tw-items-center'
								}
							>
								<div className={'tw-px-2'}>
									<HouseAltIcon />
								</div>
								<div className={'tw-px-2'}>
									Mehrfamilienhaus mit{' '}
									{currentAppData.strangAmount > 1
										? `${currentAppData.strangAmount} Strängen`
										: 'einem Strang'}
								</div>
								<div className={'tw-px-2'}>+</div>
								<div className={'tw-px-2'}>
									2 eingebaute Probeentnahmeventile
								</div>
								<div className={'tw-px-2'}>=</div>
								<div
									className={
										'tw-px-2 tw-font-bold tw-font-size tw-font-size-price-small'
									}
								>
									100 €
								</div>
							</div>
						</div>
					</section>
				</section>
			);
		}
		case 2: {
			return <Summary contactAgreement={contactAgreement} setContact={setContact} />;
		}
		case 3: {
			return <SummaryFinal contactAgreement={contactAgreement} />;
		}
	}
};

export default Angebot;
