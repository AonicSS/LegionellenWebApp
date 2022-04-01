import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import {
	getAlarmNumber,
	getRentingPrice,
	getServicePrice,
} from '../../utils/helpers';

const ContactForm = () => {
	const [gender, setGender] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [street, setStreet] = useState('');
	const [houseNumber, setHouseNumber] = useState('');
	const [postalCode, setPostaCode] = useState('');
	const [residence, setResidence] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [marketingAgreement, setMarketing] = useState(false);
	const [contactAgreement, setContact] = useState(false);
	const [success, setSucccess] = useState(false);

	const appData = useSelector((state: AppReduxStoreProps) => state.appData);
	const rentingPrice = getRentingPrice(
		appData,
		appData.pricing === 'Standard 360 Adv' ? 'plus' : 'standard'
	);
	const servicePrice = getServicePrice(
		appData.pricing === 'Standard 360 Adv' ? 'plus' : 'standard',
		appData
	);
	const total = rentingPrice + servicePrice;

	const isValidDateValue = () => {
		if (
			gender !== '' &&
			firstName !== '' &&
			lastName !== '' &&
			street !== '' &&
			houseNumber !== '' &&
			postalCode !== '' &&
			residence !== '' &&
			emailAddress !== '' &&
			marketingAgreement === true &&
			contactAgreement === true
		) {
			return true;
		} else {
			return false;
		}
	};

	const submitForm = () => {
		const response = {
			constactData: {
				gender,
				firstName,
				lastName,
				street,
				houseNumber,
				postalCode,
				residence,
				emailAddress,
				marketingAgreement: marketingAgreement ? 'Yes' : 'No',
				contactAgreement: contactAgreement ? 'Yes' : 'No',
			},
			formData: {
				price: total.toFixed(2),
				alarms: getAlarmNumber(appData),
				houses: appData.maxRentings,
				years: appData.years,
				code: appData.postalCode.code,
				servicePricing: appData.pricing,
				heatingCustomer: appData.questions[0].choice ? 'Yes' : 'No',
				// smokeAlarmCustomer: appData.questions[1].choice ? 'Yes' : 'No',
			},
		};
		const apiAddress: string | undefined =
			process.env.REACT_APP_POWER_AUTOMATE_FORM;

		if (!apiAddress) throw 'API address not defined';

		fetch(apiAddress, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(response),
		}).then(() => setSucccess(true));
	};

	return (
		<Layout>
			<Modal />
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1 className="rwm-form__headline">
							Angebot anfordern
						</h1>
					</label>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-16">
						<h4 className="tw-font-size-sub-title">Anrede*</h4>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start">
						<fieldset className="tw-grid tw-grid-cols-3 tw-gap-6 tw-mt-3">
							<div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
								<input
									onClick={() => setGender('Frau')}
									type="radio"
									value="Frau"
									checked={gender === 'Frau'}
									className={` ${
										gender === 'Frau'
											? 'tw-text-white tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-h-5 tw-w-5'
											: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-1 focus:tw-ring-transparent'
									} `}
								/>
								<label
									htmlFor="yes"
									className="rwm-radio__gender-label"
								>
									Frau
								</label>
							</div>
							<div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
								<input
									onClick={() => setGender('Mann')}
									type="radio"
									value="Mann"
									checked={gender === 'Mann'}
									className={` ${
										gender === 'Mann'
											? 'tw-text-white tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-h-5 tw-w-5'
											: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-1 focus:tw-ring-transparent'
									} `}
								/>
								<label
									htmlFor="yes"
									className="rwm-radio__gender-label"
								>
									Mann
								</label>
							</div>
							<div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
								<input
									onClick={() => setGender('Divers')}
									type="radio"
									value="Divers"
									checked={gender === 'Divers'}
									className={` ${
										gender === 'Divers'
											? 'tw-text-white tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-h-5 tw-w-5'
											: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-1 focus:tw-ring-transparent'
									}  `}
								/>
								<label
									htmlFor="yes"
									className="rwm-radio__gender-label"
								>
									Divers
								</label>
							</div>
						</fieldset>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-12">
						<h4 className="tw-font-size-sub-title">Name</h4>
					</div>
					<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-gap-12 tw-mt-3 tw-mt-2">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Vorname*
							</label>
							<input
								type="text"
								name="firstName"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Name*
							</label>
							<input
								type="text"
								name="lastName"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-12">
						<h4 className="tw-font-size-sub-title">Anschrift</h4>
					</div>
					<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-gap-12 tw-mt-3 tw-mt-2">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Straße*
							</label>
							<input
								type="text"
								name="streetName"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={street}
								onChange={(e) => setStreet(e.target.value)}
							/>
						</div>
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Hausnummer*
							</label>
							<input
								type="text"
								name="houseNumber"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={houseNumber}
								onChange={(e) => setHouseNumber(e.target.value)}
							/>
						</div>
					</div>
					<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-gap-12 tw-mt-3 tw-mt-2">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Postleitzahl*
							</label>
							<input
								type="number"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={postalCode}
								onChange={(e) => setPostaCode(e.target.value)}
							/>
						</div>
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Wohnort*
							</label>
							<input
								type="text"
								name="residence"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={residence}
								onChange={(e) => setResidence(e.target.value)}
							/>
						</div>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-12">
						<h4 className="tw-font-size-sub-title">
							E-Mail Adresse*
						</h4>
					</div>
					<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 tw-mt-3 tw-mt-2">
						<div
							className={
								window.innerWidth > 768
									? 'rwm-form__input-container-large'
									: 'rwm-form__input-container'
							}
						>
							<input
								type="email"
								name="emailAddress"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={emailAddress}
								onChange={(e) =>
									setEmailAddress(e.target.value)
								}
							/>
						</div>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
						<div className="round">
							<input
								type="checkbox"
								id="contact"
								defaultChecked={contactAgreement}
								onChange={() => setContact(!contactAgreement)}
							/>
							<label htmlFor="contact"></label>
						</div>
						<div
							className={
								window.innerWidth > 768
									? 'rwm-form__input-container-large'
									: 'rwm-form__input-container'
							}
						>
							<p className="tw-font-size-label-small tw-pl-6">
								Mit dem Absenden dieses Formulars willige ich
								darin ein, dass die Techem Energy Services GmbH,
								sowie eventuell deren Tochtergesellschaften bzw.
								die mit ihr verbundenen Gesellschaften, die von
								mir oben eingetragenen Daten zum Zweck der
								Bearbeitung dieser Anfrage und ggf. für eine
								erforderliche Kontaktaufnahme verarbeitet. Ich
								bestätige weiter, dass ich zur Überlassung
								vorgenannter Kontaktdaten berechtigt bin. Diese
								Einwilligung erfolgt freiwillig und ist mit
								Wirkung für die Zukunft jederzeit widerrufbar.
								Einzelheiten zum Datenschutz bei der Techem
								Energy Services GmbH entnehmen Sie bitte dem{' '}
								<a href="https://www.techem.com/de/de/datenschutzhinweis">
									Datenschutzhinweis.
								</a>
							</p>
						</div>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
						<div className="round">
							<input
								type="checkbox"
								id="marketing"
								defaultChecked={marketingAgreement}
								onChange={() =>
									setMarketing(!marketingAgreement)
								}
							/>
							<label htmlFor="marketing"></label>
						</div>
						<div
							className={
								window.innerWidth > 768
									? 'rwm-form__input-container-large'
									: 'rwm-form__input-container'
							}
						>
							<p className="tw-font-size-label-small tw-pl-6">
								Mit dem Absenden dieses Formulars willige ich
								ein, dass die Techem Energy Services GmbH, sowie
								deren Tochtergesellschaften und die mit ihr
								verbundenen Gesellschaften, die von mir oben
								eingetragenen Daten zum Zweck der Bearbeitung
								dieser Anfrage, der werblichen Ansprache per
								E-Mail und der Auswertung zu Marketingzwecken
								verarbeitet werden. Ich bestätige weiter, dass
								ich zur Überlassung vorgenannter Kontaktdaten
								berechtigt bin. Diese Einwilligung erfolgt
								freiwillig und ist mit Wirkung für die Zukunft
								jederzeit widerrufbar. Einzelheiten zum
								Datenschutz bei der Techem Energy Services GmbH
								entnehmen Sie bitte den{' '}
								<a href="https://www.techem.com/de/de/datenschutzhinweis">
									Datenschutzbestimmungen.
								</a>
							</p>
						</div>
					</div>
					{success && (
						<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-center tw-items-center tw-mt-16">
							<h4 className="tw-font-size-success">
								Form was successfuly submited!
							</h4>
						</div>
					)}

					<div className="tw-flex tw-justify-center tw-items-center tw-mt-10">
						<button
							disabled={!isValidDateValue()}
							onClick={() => submitForm()}
							className={classNames(
								'rwn-btn-continue',
								'rwm-button--primary',
								isValidDateValue() ? '' : 'rwm-button--disabled'
							)}
						>
							Angebot anfordern
						</button>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ContactForm;
