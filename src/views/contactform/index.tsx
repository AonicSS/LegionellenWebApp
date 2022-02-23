import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import Stepper from '../../components/Stepper';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Button from '../../components/Button';

const ContactForm = () => {
	const [emailAddress, setEmailAddress] = useState('');
	const [marketing, setMarketing] = useState(false);
	return (
		<Layout>
			<Modal />
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1>Angebot anfordern</h1>
						<h2 className="tw-font-size-info tw-text-center tw-mt-5">
							Lorem ipsum dolor sit amet, consetetur sadipscing
							elitr, sed diam nonumy eirmod tempor invidunt ut
							labore et dolore magna aliquyam erat, sed diam
							voluptua.
						</h2>
					</label>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-8">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Vorname*
							</label>
							<input
								type="email"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={emailAddress}
								onChange={(e) =>
									setEmailAddress(e.target.value)
								}
							/>
						</div>
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Name*
							</label>
							<input
								type="email"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={emailAddress}
								onChange={(e) =>
									setEmailAddress(e.target.value)
								}
							/>
						</div>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-8">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Straße*
							</label>
							<input
								type="email"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={emailAddress}
								onChange={(e) =>
									setEmailAddress(e.target.value)
								}
							/>
						</div>
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Hausnummer*
							</label>
							<input
								type="email"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={emailAddress}
								onChange={(e) =>
									setEmailAddress(e.target.value)
								}
							/>
						</div>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-8">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Postleitzahl*
							</label>
							<input
								type="email"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={emailAddress}
								onChange={(e) =>
									setEmailAddress(e.target.value)
								}
							/>
						</div>
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
								Wohnort*
							</label>
							<input
								type="email"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
								value={emailAddress}
								onChange={(e) =>
									setEmailAddress(e.target.value)
								}
							/>
						</div>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-col tw-justify-center tw-items-start tw-mt-8">
						<label className="tw-flex tw-font-size-label tw-mb-2 tw-font">
							E-Mail Adresse
						</label>
						<input
							type="email"
							name="postalCode"
							className="rwm-form__input-custom tw-border-2 tw-rounded-md focus:tw-ring-transparent"
							value={emailAddress}
							onChange={(e) => setEmailAddress(e.target.value)}
						/>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
						<div className="round">
							<input
								type="checkbox"
								id="checkbox"
								checked={marketing}
								onChange={() => setMarketing(!marketing)}
							/>
							<label htmlFor="checkbox"></label>
						</div>
						<p className="tw-font-size-label-small tw-pl-6">
							Einwilligung zur Marketing – Lorem ipsum dolor sit
							amet, consetetur sadipscing elitr, sed diam nonumy
							eirmod tempor invidunt ut labore et dolore magna
						</p>
					</div>
					<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-start tw-items-start tw-mt-8">
						<div className="round">
							<input
								type="checkbox"
								id="checkbox"
								checked={marketing}
								onChange={() => setMarketing(!marketing)}
							/>
							<label htmlFor="checkbox"></label>
						</div>
						<p className="tw-font-size-label-small tw-pl-6">
							Einwilligung zur Marketing – Lorem ipsum dolor sit
							amet, consetetur sadipscing elitr, sed diam nonumy
							eirmod tempor invidunt ut labore et dolore magna
						</p>
					</div>
					<div className="tw-flex tw-justify-center tw-items-center tw-mt-10">
						<Button text="Angebot anfordern" style="PRIMARY" />
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ContactForm;
