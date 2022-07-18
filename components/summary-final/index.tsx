import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {AppReduxStoreProps} from '../../redux/reducers/App';
import {DECREASE_APP_STEP, SET_MODAL} from '../../redux/actions/App';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import {
	getMeasurementValvesInstalled, checkStrangAmount,
} from '../../utils/helpers';
import * as Scroll from 'react-scroll';
import {trackSummary} from '../../utils/tracking';
import CheckCircledIcon from '../../public/icons/check-circled.svg';
import PenIcon from '../../public/icons/pen.svg';


const SummaryFinal = ({contactAgreement}) => {
	const dispatch = useDispatch();
	const [consentConsulting, setConsentConsulting] = useState(false);
	const [consentTerms, setConsentTerms] = useState(false);
	const [consentMarketing, setConsentMarketing] = useState(false);

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);
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

	const appData = useSelector((state: AppReduxStoreProps) => state.appData);
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

	const totalExtras = Object.keys(appData.selectedPricing.extraServices)
		.filter((x) => appData.selectedPricing.extraServices[x].selected)
		.map((extraServiceName: string) => {
			let extraService =
				appData.selectedPricing.extraServices[extraServiceName];
			return extraService.price(appData);
		})
		.reduce((x, y) => x + y, 0.0);
	const total = appData.selectedPricing.price(appData) + totalExtras;

	return (
		<Layout>
			<Modal/>
			<Element name="myScrollToElement"></Element>
			<section>
				<h1 className="rwm-form__headline tw-text-center">
					Zusammenfassung zum Angebot
				</h1>
			</section>
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1 className="rwm-form__headline">Ihre Angaben</h1>
					</label>

					<div className={'tw-bg-white tw-pt-8'}>
						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Anzahl der Stränge</div>
									<div className={'tw-font-bold'}>
										{(checkStrangAmount(currentAppData) !== undefined) ? currentAppData.strangAmount > 1
											? `${currentAppData.strangAmount} Stränge`
											: '1 Strang' : 'unbekannt'}
									</div>
								</div>
							</div>
							<div className={'tw-w-3'}></div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Ventile</div>
									<div className={'tw-font-bold'}>
										{getMeasurementValvesInstalled(
											currentAppData
										)
											? 'vorhanden'
											: 'nicht vorhandenen'}
									</div>
								</div>
							</div>
							<div className={'tw-w-3'}></div>
						</div>

						{anredeQuestion.answers.find(
							(answer) => answer.name === 'customerNumber'
						) && (
							<div
								className={contactAgreement ? "tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige tw-cursor-pointer" : 'input-kundennum'}>
								<div className="tw-flex-grow">
									<div className="tw-grid tw-grid-cols-2 tw-gap-6">
										<div>Ihre Kundennummer</div>
										<div className={'tw-font-bold'}>
											{
												anredeQuestion.answers.find(
													(answer) =>
														answer.name ===
														'customerNumber'
												)!.value
											}
										</div>
									</div>
								</div>
								<div
									onClick={() => {
										dispatch({type: DECREASE_APP_STEP});
									}}
									className="tw-w-3 tw-cursor-pointer"
								>
									<PenIcon/>
								</div>
							</div>
						)}

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Ihre Kontaktdaten</div>
									<div className={'tw-font-bold'}>
										Frau
										<br/>
										{
											anredeQuestion.answers.find(
												(answer) =>
													answer.name === 'givenName'
											)!.value
										}{' '}
										{
											anredeQuestion.answers.find(
												(answer) =>
													answer.name === 'familyName'
											)!.value
										}
										<br/>
										{
											anredeQuestion.answers.find(
												(answer) =>
													answer.name === 'phone'
											)!.value
										}
										<br/>
										{
											anredeQuestion.answers.find(
												(answer) =>
													answer.name === 'email'
											)!.value
										}
									</div>
								</div>
							</div>
							<div
								onClick={() => {
									dispatch({type: DECREASE_APP_STEP});
								}}
								className="tw-w-3 tw-cursor-pointer"
							>
								<PenIcon/>
							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Rechnungsadresse</div>
									<div className={'tw-font-bold'}>
										{
											anschriftQuestion.answers.find(
												(answer) =>
													answer.name === 'streetName'
											)!.value
										}{' '}
										{
											anschriftQuestion.answers.find(
												(answer) =>
													answer.name ===
													'houseNumber'
											)!.value
										}
										<br/>
										{
											anschriftQuestion.answers.find(
												(answer) =>
													answer.name === 'postalCode'
											)!.value
										}
										,{' '}
										{
											anschriftQuestion.answers.find(
												(answer) =>
													answer.name === 'city'
											)!.value
										}
									</div>
								</div>
							</div>
							<div
								onClick={() => {
									dispatch({type: DECREASE_APP_STEP});
								}}
								className="tw-w-3 tw-cursor-pointer"
							>
								<PenIcon/>
							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>
										Anschrift der zu prüfenden Liegenschaft
									</div>
									<div className={'tw-font-bold'}>
										{
											liegenschaftQuestion.answers.find(
												(answer) =>
													answer.name === 'streetName'
											)!.value
										}{' '}
										{
											liegenschaftQuestion.answers.find(
												(answer) =>
													answer.name ===
													'houseNumber'
											)!.value
										}
										<br/>
										{
											liegenschaftQuestion.answers.find(
												(answer) =>
													answer.name === 'postalCode'
											)!.value
										}
										,{' '}
										{
											liegenschaftQuestion.answers.find(
												(answer) =>
													answer.name === 'city'
											)!.value
										}
									</div>
								</div>
							</div>
							<div
								onClick={() => {
									dispatch({type: DECREASE_APP_STEP});
								}}
								className="tw-cursor-pointer"
							>
								<PenIcon/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1 className="rwm-form__headline">
							Im Komplettpreis enthalten:
						</h1>
					</label>

					<div className={'tw-bg-white tw-pt-8'}>
						{Object.keys(appData.selectedPricing.serviceFeatures)
							.filter(
								(x) =>
									appData.selectedPricing.serviceFeatures[x]
										.active
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
											<CheckCircledIcon/>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</section>
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1 className="rwm-form__headline">
							Optional Zusatzleistung:
						</h1>
					</label>

					{Object.keys(appData.selectedPricing.extraServices)
						.filter(
							(x) =>
								appData.selectedPricing.extraServices[x]
									.selected
						)
						.map((extraServiceName: string) => {
							let extraService =
								appData.selectedPricing.extraServices[
									extraServiceName
									];

							return (
								<div className={'tw-bg-white tw-pt-8'} key={extraServiceName}>
									<div className="tw-flex tw-flex-row tw-items-center">
										<div className="tw-flex-grow">
											<p className={'tw-font-bold'}>
												{extraServiceName}
											</p>
											<p>{extraService.subtitle}</p>
										</div>
										<div
											className="tw-container-pricing-label tw-font-size-price-small tw-text-water">
											+{' '}
											{extraService
												.price(appData)
												.toFixed(2)
												.toString()
												.replace('.', ',')}{' '}
											€
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</section>
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1 className="rwm-form__headline">
							Einmaliger Komplettpreis:
						</h1>
					</label>

					<div className={'tw-bg-white tw-pt-8'}>
						<div className="tw-flex tw-flex-row tw-items-center">
							<div className="tw-flex-grow tw-basis-[78%]">
								<p className={'tw-font-bold'}>
									Gesamtpreis für eine Liegenschaft mit 2
									Strängen und 2 Ventilen, einem online
									Quality Check und einer Legionellenprüfung.
								</p>
							</div>
							<div className="tw-container-pricing-label tw-font-size-price-large tw-basis-[22%]">
								{total.toFixed(2).toString().replace('.', ',')}{' '}
								€
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				className={
					'tw-bg-light-grey  rwm-forms__page-section tw-margin-top'
				}
			>
				<div className="tw-p-10">
					<h1>Wie geht es weiter?</h1>
					<p>
						Sie erhalten von uns eine Bestätigungsemail mit
						Terminvorschlägen für den Online Quality Check. Text
						folgt...
					</p>
				</div>
			</section>
			<section>
				<div
					className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
					<div className="round">
						<input
							type="checkbox"
							id="consent-terms"
							checked={consentTerms}
							onChange={() => setConsentTerms(!consentTerms)}
						/>
						<label htmlFor="consent-terms"></label>
					</div>
					<div className="rwm-form__input-container-large tw-cursor-pointer tw-select-none" onClick={() => setConsentTerms(!consentTerms)}>
						<p className="tw-font-size-label tw-pl-6">
							Ich habe die Allgemeinen Geschäftsbedingungen [Link zu PDF] sowie die Besonderen Geschäftsbedingungen [Link zu PDF] gelesen und akzeptiere diese.*
							* Pflichtfeld
						</p>
					</div>
				</div>
				<div
					className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
					<div className="round">
						<input
							type="checkbox"
							id="consent-consulting"
							checked={consentConsulting}
							onChange={() =>
								setConsentConsulting(!consentConsulting)
							}
						/>
						<label htmlFor="consent-consulting"></label>
					</div>
					<div className="rwm-form__input-container-large tw-cursor-pointer tw-select-none" onClick={() =>
						setConsentConsulting(!consentConsulting)
					}>
						<p className="tw-font-size-label tw-pl-6">
							Mit dem Absenden dieses Formulars willige ich darin ein, dass die Techem Energy Services GmbH, sowie eventuell deren Tochtergesellschaften bzw. die mit ihr verbundenen Gesellschaften, die von mir oben eingetragenen Daten zum Zweck der Bearbeitung dieser Anfrage und ggf. für eine erforderliche Kontaktaufnahme verarbeitet. Ich bestätige weiter, dass ich zur Überlassung vorgenannter Kontaktdaten berechtigt bin. Diese Einwilligung erfolgt freiwillig und ist mit Wirkung für die Zukunft jederzeit widerrufbar. Einzelheiten zum Datenschutz bei der Techem Energy Services GmbH entnehmen Sie bitte dem Datenschutzhinweis.
						</p>
					</div>
				</div>
				<div
					className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
					<div className="round">
						<input
							type="checkbox"
							id="consent-marketing"
							checked={consentMarketing}
							onChange={() =>
								setConsentMarketing(!consentMarketing)
							}
						/>
						<label htmlFor="consent-marketing"></label>
					</div>
					<div className="rwm-form__input-container-large tw-cursor-pointer tw-select-none" onClick={() =>
						setConsentMarketing(!consentMarketing)
					}>
						<p className="tw-font-size-label tw-pl-6">
							Mit dem Absenden dieses Formulars willige ich ein, dass die Techem Energy Services GmbH, sowie deren Tochtergesellschaften und die mit ihr verbundenen Gesellschaften, die von mir oben eingetragenen Daten zum Zweck der Bearbeitung dieser Anfrage, der werblichen Ansprache per E-Mail und der Auswertung zu Marketingzwecken verarbeitet werden. Ich bestätige weiter, dass ich zur Überlassung vorgenannter Kontaktdaten berechtigt bin. Diese Einwilligung erfolgt freiwillig und ist mit Wirkung für die Zukunft jederzeit widerrufbar. Einzelheiten zum Datenschutz bei der Techem Energy Services GmbH entnehmen Sie bitte den Datenschutzbestimmungen.
						</p>
					</div>
				</div>
			</section>
			<section className='tw-flex tw-justify-around'>
				<div className="tw-flex tw-justify-center tw-pt-14 tw-pb-1">
					<Button
						style={consentConsulting && consentTerms ? 'PRIMARY' : 'DISACTIVE'}
						text={'Jetzt kostenpflichtig bestellen'}
						onClick={async () => {
							const body = new FormData();
							const {
								acceptContact,
								acceptMarketing,
								maxSteps,
								maxSubSteps,
								step,
								subStep,
								showModal,
								currentQuestion,
								uploads,
								...partialAppData
							} = currentAppData;

							const formattedAppData = {
								...partialAppData,
								strangAmount: checkStrangAmount(appData),
								selectedPricing: {
									...currentAppData.selectedPricing,
									price: appData.selectedPricing.price(appData),
									totalExtras: Object.keys(appData.selectedPricing.extraServices)
										.filter((x) => appData.selectedPricing.extraServices[x].selected)
										.map((extraServiceName: string) => {
											let extraService =
												appData.selectedPricing.extraServices[extraServiceName];
											return extraService.price(appData);
										})
										.reduce((x, y) => x + y, 0.0),
									total: appData.selectedPricing.price(appData) + totalExtras,
								}
							};

							const json = JSON.stringify(formattedAppData);
							const blob = new Blob([json], {
								type: 'application/json'
							});

							body.append(
								'appData',
								blob
							);

							for (const key of Object.keys(currentAppData.uploads)) {
								for (let [index, upload] of currentAppData.uploads[key].entries()) {
									let uploadResponse = await fetch(upload['data_url']);
									body.append(`${key}_${index}_${upload['file'].name}`, await uploadResponse.blob());
								}
							}

							const response = await fetch('/api/submit', {
								method: 'POST',
								body,
							});
							const result = await response.json();
							alert(JSON.stringify(result));
						}}
					></Button>
				</div>
				<div className="tw-flex tw-justify-center tw-pt-14 tw-pb-28">
					<Button
						style={consentConsulting && consentTerms ? 'SECONDARY' : 'DISACTIVE'}
						text={'Angebot per E-Mail zusenden'}
						onClick={async () => {
							const res = await fetch('/api/submit', {
								body: JSON.stringify(currentAppData),
								headers: {
									'Content-Type': 'application/json',
								},
								method: 'POST',
							});

							const result = await res.json();
							alert(JSON.stringify(result));
						}}
					></Button>
				</div>
			</section>
		</Layout>
	);
};

export default SummaryFinal;
