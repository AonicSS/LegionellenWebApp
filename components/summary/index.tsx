import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppData, AppReduxStoreProps } from '../../redux/reducers/App';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import {
	DECREASE_APP_STEP,
	SET_ANSWER,
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
import classnames from 'classnames';
import Info from '../../public/icons/Info.svg';
import CheckInIcon from '../../public/icons/check-in.svg';
import CheckCircledIcon from '../../public/icons/check-circled.svg';
import MagnifyingGlassIcon from '../../public/icons/magnifying-glass.svg';
import TechemRecommendationIcon from '../../public/icons/techem-recommendation.svg';
import PenEditIcon from '../../public/icons/pen-edit.svg';

const demoCoupons = [
	{
		code: '10off',
		discount: 10,
		description:
			'Congratulations! You have been awarded a 10% discount on your first order',
	},
	{
		code: '20off',
		discount: 20,
		description:
			'Congratulations! You have been awarded a 20% discount on your first order',
	},
];



const Summary = ({contactAgreement, setContact}) => {
	const appData = useSelector((state: AppReduxStoreProps) => state.appData);
	// const [contactAgreement, setContact] = useState(false);
	const [isCouponToggled, setCouponToggled] = useState(false);
	const [coupon, setCoupon] = useState('');
	const [couponStatus, setCouponStatus] = useState('');
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

	const checkCoupon = () => {
		const checkedCoupon = demoCoupons.find((code) => code.code === coupon);
		if (checkedCoupon) {
			setCouponStatus(checkedCoupon.description);
		} else setCouponStatus('Dieser Coupon-Code ist leider ungültig');

		setCoupon('');
	};


	return (
		<Layout>
			<Modal />
			<Element name="myScrollToElement"></Element>
			<section className="rwm-calculator__page-section tw-margin-top tw-sticky tw-top-0 tw-bg-white tw-z-[100]">
				<div className="tw-flex tw-flex-col">
					<div className="rwm-form__headline-mobile lg:tw-mt-[30px] xl:tw-mt-[30px]">
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
										<div className="tw-flex tw-flex-row tw-items-center tw-mb-4 last:tw-mb-0" key={serviceFeatureName}>
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
															<div className="lable-check tw-block tw-bg-[#C6C6C6] tw-w-14 tw-h-8 tw-rounded-full"></div>
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
								<button
									onClick={() =>
										setCouponToggled(!isCouponToggled)
									}
									className="tw-font-bold tw-underline"
								>
									Coupon-Code einlösen?
								</button>
								{isCouponToggled && (
									<div className="tw-pt-5 tw-flex tw-items-center tw-justify-between tw-gap-x-20">
										<input
											value={coupon}
											onChange={(e) =>
												setCoupon(e.target.value)
											}
											placeholder="Hier Coupon-Code eingeben"
											type="text"
											name="coupon"
											className="rwm-form__input-custom tw-border-2 focus:tw-ring-transparent focus:tw-bg-transparent"
										/>
										<button
											onClick={() => checkCoupon()}
											className={classnames(
												'rwn-btn-continue',
												'rwm-button--secondary tw-mt-0'
											)}
										>
											Einlösen
										</button>
									</div>
								)}
								<p className="cupon-status tw-mt-2 tw-text-red">
									{couponStatus}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="rwm-forms__page-section tw-margin-top">
					<div className="tw-flex tw-flex-col">
						<label className="rwm-form__headline tw-pb-4 tw-border-solid tw-border-b-[1px] tw-border-b-white">
							<h1 className="rwm-form__headline">Kontaktdaten</h1>
						</label>
						<div className="tw-mt-8">
							<div className=" tw-flex tw-flex-row tw-items-start">
								<h4 className="tw-font-size-label">Anrede*</h4>
							</div>
							<div className="tw-flex tw-items-center">
								<div className="tw-w-3/12 ">
									<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start">
										<fieldset className="tw-grid tw-grid-cols-3 tw-gap-6 tw-mt-2">
											<div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
												<div className="round">
													<select
														id="gender"
														name="gender"
														defaultChecked={
															contactAgreement
														}
														onChange={() =>
															setContact(
																!contactAgreement
															)
														}
													>
														<option value="m">
															Herr
														</option>
														<option value="f">
															Frau
														</option>
														<option value="d">
															Divers
														</option>
													</select>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
								<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-center tw-w-9/12">
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
									<div className="rwm-form__input-container-large tw-pt-[5px]">
										<p>Ich bin bereits Kunde</p>
									</div>
								</div>
							</div>
						</div>

						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2 tw-w-full">
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
									Nachname*
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

						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2 tw-w-full">
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
						<div
							className={
								contactAgreement
									? 'rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2'
									: 'input-kundennum'
							}
						>
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
						<label className="rwm-form__headline tw-pb-4 tw-border-solid tw-border-b-[1px] tw-border-b-white">
							<h1 className="rwm-form__headline">
								Rechnungsadresse
							</h1>
						</label>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-8 tw-w-full">
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
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6 tw-w-full">
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
						<label className="rwm-form__headline tw-pb-4 tw-border-solid tw-border-b-[1px] tw-border-b-white tw-flex tw-justify-between">
							<h1 className="rwm-form__headline">
								Liegenschaftsadresse
							</h1>
							<span
								onClick={() => {
									dispatch({
										type: DECREASE_APP_STEP,
									});
								}}
								className="tw-cursor-pointer"
							>
								<PenEditIcon className={'tw-inline'} />
							</span>
						</label>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-8 tw-w-full">
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
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6 tw-w-full">
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
				<section className='tw-flex tw-justify-around'>
					<div className="tw-flex tw-justify-center tw-pt-14 tw-pb-1">
						<Button
							style={'PRIMARY'}
							text={'Preis sichern, direkt abschließen'}
						></Button>
					</div>
					<div className="tw-flex tw-justify-center tw-pt-14 tw-pb-28">
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
