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

	const appData = useSelector((state: AppReduxStoreProps) => state.appData);

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
				price:
					parseInt(getRentingPrice(appData)) +
					parseInt(
						getServicePrice(
							appData.pricing === 'Standard wählen'
								? 'standard'
								: 'plus',
							appData
						)
					),
				alarms: getAlarmNumber(appData),
				houses: appData.rentings,
				years: appData.years,
				code: appData.postalCode.code,
				servicePricing: appData.pricing,
				heatingCustomer: appData.questions[0].choice ? 'Yes' : 'No',
				smokeAlarmCustomer: appData.questions[1].choice ? 'Yes' : 'No',
			},
		};

		fetch(
			'https://prod-102.westeurope.logic.azure.com:443/workflows/83f5229f56584e679f262805c2577a90/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_6davYF_vAxiUMn9ULtZaJVvcA5E3GrB_QEgbAoaOtk',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(response),
			}
		).then((res) => console.log('Success', res));
		console.log('response :>> ', response);
	};

	return (
		<Layout>
			<Modal />
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1>Angebot anfordern</h1>
						{/* <h2 className="tw-font-size-info tw-text-center tw-mt-5">
							Lorem ipsum dolor sit amet, consetetur sadipscing
							elitr, sed diam nonumy eirmod tempor invidunt ut
							labore et dolore magna aliquyam erat, sed diam
							voluptua.
						</h2> */}
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
											: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3 focus:tw-ring-transparent'
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
											: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3 focus:tw-ring-transparent'
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
											: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3 focus:tw-ring-transparent'
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
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-2">
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
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-2">
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
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start">
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
					<div className="rwm-form__input-container-large tw-flex tw-flex-col tw-justify-center tw-items-start tw-mt-3">
						<input
							type="email"
							name="emailAddress"
							className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
							value={emailAddress}
							onChange={(e) => setEmailAddress(e.target.value)}
						/>
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
						<p className="tw-font-size-label-small tw-pl-6">
							Kontaktaufnahme – Lorem ipsum dolor sit amet,
							consetetur sadipscing elitr, sed diam nonumy eirmod
							tempor invidunt ut labore et dolore magna
						</p>
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
						<p className="tw-font-size-label-small tw-pl-6">
							Einwilligung zur Marketing – Lorem ipsum dolor sit
							amet, consetetur sadipscing elitr, sed diam nonumy
							eirmod tempor invidunt ut labore et dolore magna
						</p>
					</div>
					<div className="tw-flex tw-justify-center tw-items-center tw-mt-10">
						{/* <Button text="Angebot anfordern" style="PRIMARY" /> */}
						<button
							onClick={() => submitForm()}
							className={classNames(
								'rwn-btn-continue',
								'rwm-button--primary'
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
