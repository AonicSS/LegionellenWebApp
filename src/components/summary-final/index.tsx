import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {AppReduxStoreProps} from '../../redux/reducers/App';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {SET_MODAL} from '../../redux/actions/App';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import {
	getStrangNumber,
	getBasePrice,
	getServicePrice, getMeasurementValvesInstalled,
} from '../../utils/helpers';
import {ReactComponent as Info} from '../../icons/Info.svg';
import * as Scroll from 'react-scroll';
import {trackSummary} from '../../utils/tracking';

import {ReactComponent as CheckInIcon} from '../../icons/check-in.svg';
import {ReactComponent as CheckCircledIcon} from '../../icons/check-circled.svg';
import {ReactComponent as MagnifyingGlassIcon} from '../../icons/magnifying-glass.svg';
import {ReactComponent as PenIcon} from '../../icons/pen.svg';

const SummaryFinal = () => {
	const [consentConsulting, setConsentConsulting] = useState(false);
	const [consentTerms, setConsentTerms] = useState(false);
	const [consentMarketing, setConsentMarketing] = useState(false);

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);
	const liegenschaftQuestion = useSelector((state: AppReduxStoreProps) => state.appData.questions['Wo befindet sich die zu prüfende Liegenschaft?']);
	const anredeQuestion = useSelector((state: AppReduxStoreProps) => state.appData.questions['Anrede']);
	const anschriftQuestion = useSelector((state: AppReduxStoreProps) => state.appData.questions['Anschrift']);

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

	const total = appData.selectedPricing.price(appData);

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
						<h1 className="rwm-form__headline">
							Ihre Angaben
						</h1>
					</label>

					<div className={"tw-bg-white tw-px-8 tw-pt-8"}>
						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Anzahl der Stränge</div>
									<div
										className={"tw-font-bold"}>{currentAppData.strangAmount > 1 ? `${currentAppData.strangAmount} Stränge` : '1 Strang'}</div>
								</div>
							</div>
							<div className={"tw-w-3"}>

							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Ventile</div>
									<div className={"tw-font-bold"}>{getMeasurementValvesInstalled(currentAppData) ? 'vorhanden' : 'nicht vorhandenen'}</div>
								</div>
							</div>
							<div className={"tw-w-3"}>

							</div>
						</div>

						{anredeQuestion.answers.find((answer) => answer.name === 'customerNumber') &&
							<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
								<div className="tw-flex-grow">
									<div className="tw-grid tw-grid-cols-2 tw-gap-6">
										<div>Ihre Kundennummer</div>
										<div className={"tw-font-bold"}>
											{anredeQuestion.answers.find((answer) => answer.name === 'customerNumber')!.value}
										</div>
									</div>
								</div>
								<div className="tw-w-3">
									<PenIcon/>
								</div>
							</div>
						}


						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Ihre Kontaktdaten</div>
									<div className={"tw-font-bold"}>
										Frau<br/>
										{anredeQuestion.answers.find((answer) => answer.name === 'givenName')!.value} {anredeQuestion.answers.find((answer) => answer.name === 'familyName')!.value}<br/>
										{anredeQuestion.answers.find((answer) => answer.name === 'phone')!.value}<br/>
										{anredeQuestion.answers.find((answer) => answer.name === 'email')!.value}
									</div>
								</div>
							</div>
							<div className="tw-w-3">
								<PenIcon/>
							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Ihre Anschrift</div>
									<div className={"tw-font-bold"}>
										{anschriftQuestion.answers.find((answer) => answer.name === 'streetName')!.value} {anschriftQuestion.answers.find((answer) => answer.name === 'houseNumber')!.value}<br/>
										{anschriftQuestion.answers.find((answer) => answer.name === 'postalCode')!.value}, {anschriftQuestion.answers.find((answer) => answer.name === 'city')!.value}
									</div>
								</div>
							</div>
							<div className="tw-w-3">
								<PenIcon/>
							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Anschrift der zu prüfenden
										Liegenschaft
									</div>
									<div className={"tw-font-bold"}>
										{liegenschaftQuestion.answers.find((answer) => answer.name === 'streetName')!.value} {liegenschaftQuestion.answers.find((answer) => answer.name === 'houseNumber')!.value}<br/>
										{liegenschaftQuestion.answers.find((answer) => answer.name === 'postalCode')!.value}, {liegenschaftQuestion.answers.find((answer) => answer.name === 'city')!.value}
									</div>
								</div>
							</div>
							<div className="">
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

					<div className={"tw-bg-white tw-p-8"}>
						{
							Object.keys(appData.selectedPricing.serviceFeatures).filter((x) => appData.selectedPricing.serviceFeatures[x].active).map((serviceFeatureName: string) => {
								let serviceFeature = appData.selectedPricing.serviceFeatures[serviceFeatureName];

								return (<div className="tw-flex tw-flex-row tw-items-center tw-mb-4 last:tw-mb-0">
									<div className="tw-mr-4">
										{serviceFeature.icon}
									</div>
									<div
										className="tw-flex-grow">
										<p className={"tw-font-bold"}>{serviceFeatureName}</p>
										<p>{serviceFeature.subtitle}</p>
									</div>
									<div className="">
										<CheckCircledIcon/>
									</div>
								</div>);
							})
						}
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

					<div className={"tw-bg-white tw-p-8"}>
						<div className="tw-flex tw-flex-row tw-items-center">
							<div
								className="tw-flex-grow">
								<p className={"tw-font-bold"}>Quality Check Online</p>
								<p>Informationen für Ihre Mieter und einen Haus-Aushang als PDF</p>
							</div>
							<div className="tw-container-pricing-label tw-font-size-price-small">
								+ {total.toFixed(2).toString().replace('.', ',')}{' '}
								€
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1 className="rwm-form__headline">
							Einmaliger Komplettpreis:
						</h1>
					</label>

					<div className={"tw-bg-white tw-p-8"}>
						<div className="tw-flex tw-flex-row tw-items-center">
							<div className="tw-flex-grow">
								<p className={"tw-font-bold"}>Gesamtpreis für eine Liegenschaft mit 2 Strängen und 2
									Ventilen, einem online Quality Check und einer Legionellenprüfung.</p>
							</div>
							<div className="tw-container-pricing-label tw-font-size-price-large">
								{total.toFixed(2).toString().replace('.', ',')}{' '}
								€
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className={"tw-bg-light-grey tw-p-10"}>
				<h1>
					Wie geht es weiter?
				</h1>
				<p>Sie erhalten von uns eine Bestätigungsemail mit Terminvorschlägen für den Online Quality Check. Text
					folgt...</p>
			</section>
			<section>
				<div
					className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
					<div className="round">
						<input
							type="checkbox"
							id="consent-consulting"
							checked={consentConsulting}
							onChange={() => setConsentConsulting(!consentConsulting)}
						/>
						<label htmlFor="consent-consulting"></label>
					</div>
					<div className="rwm-form__input-container-large">
						<p className="tw-font-size-label tw-pl-6">
							Consent Sanierungsberatung - wichtig (Text folgt)
						</p>
					</div>
				</div>
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
					<div className="rwm-form__input-container-large">
						<p className="tw-font-size-label tw-pl-6">
							Ich habe die AGB gelesen und akzeptiert*
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
							onChange={() => setConsentMarketing(!consentMarketing)}
						/>
						<label htmlFor="consent-marketing"></label>
					</div>
					<div className="rwm-form__input-container-large">
						<p className="tw-font-size-label tw-pl-6">
							Consent Marketing (text folgt)
						</p>
					</div>
				</div>
			</section>
			<section>
				<div className="tw-flex tw-justify-center tw-pt-14 tw-pb-1">
					<Button style={"PRIMARY"} text={"Jetzt kostenpflichtig bestellen"} onClick={() => {
						alert(JSON.stringify(currentAppData.questions))
					}}></Button>
				</div>
				<div className="tw-flex tw-justify-center tw-pt-1 tw-pb-28">
					<Button style={"SECONDARY"} text={"Angebot per E-Mail zusenden"} onClick={() => {
						alert(JSON.stringify(currentAppData.questions))
					}}></Button>
				</div>
			</section>
		</Layout>
	);
};

export default SummaryFinal;
