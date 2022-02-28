import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';

const ContactForm = () => {
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
				firstName,
				lastName,
				street,
				houseNumber,
				postalCode,
				residence,
				emailAddress,
				marketingAgreement,
				contactAgreement,
			},
			formData: {
				...appData,
			},
		};

		// fetch(
		// 	'https://prod-94.westeurope.logic.azure.com/workflows/3cb3a737941a4b468ce6fa8b7cd1391d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2P7_0BFVWyeO-9bviXRC1UuCvE6Y37xvLj_oK_qL-eY',
		// 	{
		// 		method: 'POST',
		// 		headers: {
		// 			Accept: 'application/json, text/plain, */*',
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(response),
		// 	}
		// ).then((res) => console.log('Success', res));
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
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-8">
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
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-8">
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
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-8">
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
					<div className="rwm-form__input-container-large tw-flex tw-flex-col tw-justify-center tw-items-start tw-mt-8">
						<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
							E-Mail Adresse
						</label>
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
