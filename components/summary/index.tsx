import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppData, AppReduxStoreProps } from '../../redux/reducers/App';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import {
	SET_ANSWER,
	SET_CURRENT_QUESTION,
	SET_MODAL,
	SET_PRICING,
} from '../../redux/actions/App';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import {
	getStrangNumber,
	getBasePrice,
	getServicePrice,
	getMeasurementValvesInstalled,
} from '../../utils/helpers';
import * as Scroll from 'react-scroll';
import { trackSummary } from '../../utils/tracking';

import Info from '../../public/icons/Info.svg';
import CheckInIcon from '../../public/icons/check-in.svg';
import CheckCircledIcon from '../../public/icons/check-circled.svg';
import MagnifyingGlassIcon from '../../public/icons/magnifying-glass.svg';
import TechemRecommendationIcon from '../../public/icons/techem-recommendation.svg';

const Summary = () => {
	const appData = useSelector((state: AppReduxStoreProps) => state.appData);
	const [contactAgreement, setContact] = useState(false);
	const dispatch = useDispatch();
	const scroller = Scroll.scroller;
	const Element = Scroll.Element;
	useEffect(() => {
		scroller.scrollTo('myScrollToElement', {
			duration: 1500,
			delay: 100,
			smooth: true,
			offset: -100,
		});

		trackSummary('summary', 'test');
	}, []);

	const total = appData.selectedPricing.price(appData);

	const liegenschaftQuestion = useSelector(
		(state: AppReduxStoreProps) =>
			state.appData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]
	);
	const anredeQuestion = useSelector(
		(state: AppReduxStoreProps) => state.appData.questions['Anrede']
	);
	const anschriftQuestion = useSelector(
		(state: AppReduxStoreProps) => state.appData.questions['Anschrift']
	);

	const handleChange = (
		value: string,
		answerName: string,
		questionText: string
	) => {
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

	const handleExtraServiceChange = (
		value: boolean,
		extraServiceName: string
	) => {
		dispatch({
			type: SET_PRICING,
			payload: {
				selectedPricing: {
					...appData.selectedPricing,
					extraServices: {
						...appData.selectedPricing.extraServices,
						[extraServiceName]: {
							...appData.selectedPricing.extraServices[
								extraServiceName
							],
							selected: value,
						},
					},
				},
			},
		});
	};

	return (
		<Layout>
			<Modal />
			<Element name="myScrollToElement"></Element>
			<section className="rwm-calculator__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<div className="rwm-form__headline-mobile lg:tw-mt-[-30px] xl:tw-mt-[-30px]">
						<label className="rwm-form__headline tw-text-center">
							<h1 className="rwm-form__headline">
								Zusammenfassung zum Angebot
							</h1>
						</label>
					</div>
					<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-1 tw-gap-10 xl:tw-gap-14 tw-mt-16">
						<div
							className={classNames(
								'tw-container-summary tw-justify-center tw-items-center tw-pb-6'
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline tw-max-w-[53.5rem] tw-m-auto">
								{appData.selectedPricing.name}
							</div>
							<div className="tw-flex tw-max-w-4xl tw-items-center tw-m-auto">
								<div className="tw-container-pricing-label tw-font-size-pricing-label">
									<div>
										{`Gesamtpreis für eine Liegenschaft mit ${
											appData.strangAmount > 1
												? `${appData.strangAmount} Strängen`
												: 'einem Strang'
										} und ${
											getMeasurementValvesInstalled(
												appData
											)
												? 'vorhandenen Probeentnahmeventilen'
												: 'nicht vorhandenen Probeentnahmeventilen'
										}.`}
									</div>
								</div>
								<div className="tw-container-pricing-label tw-font-size-price-large tw-whitespace-nowrap">
									{total
										.toFixed(2)
										.toString()
										.replace('.', ',')}{' '}
									€
								</div>
								<div className="tw-w-15%">
									<TechemRecommendationIcon />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className={'tw-bg-grey tw-py-6 tw-px-48'}>
				<section className="rwm-forms__page-section">
					<div className="tw-flex tw-flex-col">
						<label className="rwm-form__headline tw-mb-4">
							<h1 className="rwm-form__headline">
								Im Komplettpreis enthalten:
							</h1>
						</label>

						<div
							className={
								'tw-bg-white tw-rounded-tl-3xl tw-rounded-br-3xl tw-p-8'
							}
						>
							{Object.keys(
								appData.selectedPricing.serviceFeatures
							)
								.filter(
									(x) =>
										appData.selectedPricing.serviceFeatures[
											x
										].active
								)
								.map((serviceFeatureName: string) => {
									let serviceFeature =
										appData.selectedPricing.serviceFeatures[
											serviceFeatureName
										];

									return (
										<div className="tw-flex tw-flex-row tw-items-center tw-mb-4 last:tw-mb-0">
											<div className="tw-mr-4">
												{serviceFeature.icon}
											</div>
											<div className="tw-flex-grow">
												<p className={'tw-font-bold'}>
													{serviceFeatureName}
												</p>
												<p>{serviceFeature.subtitle}</p>
											</div>
											<div className="">
												<CheckCircledIcon />
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</section>
				<section className="rwm-forms__page-section tw-margin-top">
					<div className="tw-flex tw-flex-col">
						<label className="rwm-form__headline tw-mb-4">
							<h1 className="rwm-form__headline">
								Optional Zusatzleistung:
							</h1>
						</label>
						<div
							className={
								'tw-bg-white tw-rounded-tl-3xl tw-rounded-br-3xl tw-p-8'
							}
						>
							{Object.keys(
								appData.selectedPricing.extraServices
							).map((extraServiceName: string) => {
								let extraService =
									appData.selectedPricing.extraServices[
										extraServiceName
									];

								return (
									<>
										<div className="tw-flex tw-flex-row tw-items-center tw-mb-4 last:tw-mb-0">
											<div className="tw-flex-grow">
												<p className={'tw-font-bold'}>
													{extraServiceName}
												</p>
												<p>{extraService.subtitle}</p>
											</div>
											<div className="tw-font-size-price-small tw-text-water tw-text-right tw-whitespace-nowrap">
												{extraService.price(appData)} €
											</div>
										</div>
										<div className="tw-flex tw-flex-row tw-items-center tw-mb-4 last:tw-mb-0">
											<div className="tw-flex-grow tw-text-red tw-font-bold">
												Mehr Infos
											</div>
											<div className="tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
												<div className="tw-flex tw-items-center tw-justify-center tw-w-full">
													<label
														htmlFor="toggleB"
														className="tw-flex tw-items-center tw-cursor-pointer"
													>
														<div className="tw-relative">
															<input
																type="checkbox"
																id="toggleB"
																className="tw-sr-only"
																checked={
																	extraService.selected
																}
																onChange={(e) =>
																	handleExtraServiceChange(
																		e.target
																			.checked,
																		extraServiceName
																	)
																}
															/>
															<div className="tw-block tw-bg-red tw-w-14 tw-h-8 tw-rounded-full"></div>
															<div className="dot tw-absolute tw-left-1 tw-top-1 tw-bg-white tw-w-6 tw-h-6 tw-rounded-full tw-transition"></div>
														</div>
														<div className="tw-ml-3 tw-text-gray-700 tw-font-medium"></div>
													</label>
												</div>
											</div>
										</div>
									</>
								);
							})}

							<div className="tw-mt-2">
								<div className="tw-font-bold">
									Coupon-Code einlösen?
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="rwm-forms__page-section tw-margin-top">
					<div className="tw-flex tw-flex-col">
						<label className="rwm-form__headline tw-mb-4">
							<h1 className="rwm-form__headline">Kontaktdaten</h1>
						</label>
						<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-16">
							<h4 className="tw-font-size-sub-title">Anrede*</h4>
						</div>

						<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start">
							<fieldset className="tw-grid tw-grid-cols-3 tw-gap-6 tw-mt-2">
								<div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
									<div className="round">
										<select
											id="gender"
											name="gender"
											defaultChecked={contactAgreement}
											onChange={() =>
												setContact(!contactAgreement)
											}
										>
											<option value="m">Herr</option>
											<option value="f">Frau</option>
											<option value="d">Divers</option>
										</select>
									</div>
								</div>
							</fieldset>
						</div>

						<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
							<div className="round">
								<input
									type="checkbox"
									id="contact"
									defaultChecked={contactAgreement}
									onChange={() =>
										setContact(!contactAgreement)
									}
								/>
								<label htmlFor="contact"></label>
							</div>
							<div className="rwm-form__input-container-large">
								<p>Ich bin bereits Kunde</p>
							</div>
						</div>

						<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-12">
							<h4 className="tw-font-size-sub-title">Name</h4>
						</div>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									Vorname*
								</label>
								<input
									type="text"
									name="givenName"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anredeQuestion.answers.find(
											(answer) =>
												answer.name === 'givenName'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anrede'
										)
									}
								/>
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<label className="tw-flex tw-font-size-label tw-font">
									Name*
								</label>
								<input
									type="text"
									name="familyName"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anredeQuestion.answers.find(
											(answer) =>
												answer.name === 'familyName'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anrede'
										)
									}
								/>
							</div>
						</div>

						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									E-Mail Adresse*
								</label>
								<input
									type="email"
									name="email"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anredeQuestion.answers.find(
											(answer) => answer.name === 'email'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anrede'
										)
									}
								/>
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<label className="tw-flex tw-font-size-label tw-font">
									Telefonnummer*
								</label>
								<input
									type="phone"
									name="phone"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anredeQuestion.answers.find(
											(answer) => answer.name === 'phone'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anrede'
										)
									}
								/>
							</div>
						</div>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									Kundennummer*
								</label>
								<input
									type="text"
									name="customerNumber"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anredeQuestion.answers.find(
											(answer) =>
												answer.name === 'customerNumber'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anrede'
										)
									}
								/>
							</div>
						</div>
					</div>
				</section>
				<section className="rwm-forms__page-section tw-margin-top">
					<div className="tw-flex tw-flex-col">
						<label className="rwm-form__headline">
							<h1 className="rwm-form__headline">
								Ihre Anschrift
							</h1>
						</label>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									Straße*
								</label>
								<input
									type="text"
									name="streetName"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anschriftQuestion.answers.find(
											(answer) =>
												answer.name === 'streetName'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anschrift'
										)
									}
								/>
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<label className="tw-flex tw-font-size-label tw-font">
									Hausnummer*
								</label>
								<input
									type="text"
									name="houseNumber"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anschriftQuestion.answers.find(
											(answer) =>
												answer.name === 'houseNumber'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anschrift'
										)
									}
								/>
							</div>
						</div>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									Postleitzahl*
								</label>
								<input
									type="number"
									name="postalCode"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anschriftQuestion.answers.find(
											(answer) =>
												answer.name === 'postalCode'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anschrift'
										)
									}
								/>
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<label className="tw-flex tw-font-size-label tw-font">
									Wohnort*
								</label>
								<input
									type="text"
									name="city"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										anschriftQuestion.answers.find(
											(answer) => answer.name === 'city'
										)!.value
									}
									onChange={(e) =>
										handleChange(
											e.target.value,
											e.target.name,
											'Anschrift'
										)
									}
								/>
							</div>
						</div>
					</div>
				</section>
				<section className="rwm-forms__page-section tw-margin-top">
					<div className="tw-flex tw-flex-col">
						<label className="rwm-form__headline">
							<h1 className="rwm-form__headline">
								Liegenschaftsadresse
							</h1>
						</label>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									Straße*
								</label>
								<input
									type="text"
									name="streetName"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										liegenschaftQuestion.answers.find(
											(answer) =>
												answer.name === 'streetName'
										)!.value
									}
									disabled
								/>
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<label className="tw-flex tw-font-size-label tw-font">
									Hausnummer*
								</label>
								<input
									type="text"
									name="houseNumber"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										liegenschaftQuestion.answers.find(
											(answer) =>
												answer.name === 'houseNumber'
										)!.value
									}
									disabled
								/>
							</div>
						</div>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									Postleitzahl*
								</label>
								<input
									type="number"
									name="postalCode"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										liegenschaftQuestion.answers.find(
											(answer) =>
												answer.name === 'postalCode'
										)!.value
									}
									disabled
								/>
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<label className="tw-flex tw-font-size-label tw-font">
									Wohnort*
								</label>
								<input
									type="text"
									name="city"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={
										liegenschaftQuestion.answers.find(
											(answer) => answer.name === 'city'
										)!.value
									}
									disabled
								/>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="tw-flex tw-justify-center tw-pt-14 tw-pb-1">
						<Button
							style={'PRIMARY'}
							text={'Preis sichern, direkt abschließen'}
						></Button>
					</div>
					<div className="tw-flex tw-justify-center tw-pt-1 tw-pb-28">
						<Button
							style={'SECONDARY'}
							text={'Angebot per E-Mail zusenden'}
						></Button>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default Summary;
