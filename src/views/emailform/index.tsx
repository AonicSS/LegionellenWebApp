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

const EmailForm = () => {
	const [emailAddress, setEmailAddress] = useState('');
	const [marketing, setMarketing] = useState(false);

	const appData = useSelector((state: AppReduxStoreProps) => state.appData);

	const submitForm = () => {
		const response = {
			constactData: {
				emailAddress,
				marketingAgreement: marketing ? 'Yes' : 'No',
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
			'https://prod-74.westeurope.logic.azure.com:443/workflows/391e47bfbd1748deba2267c8332ae3f4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JrCrPjMmkmIgB0A_tZij7CZqgfqVB7YiKEuy9NMAG_U',
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
						<h1>Preisindikation erhalten</h1>
						<h2 className="tw-font-size-info tw-text-center tw-mt-5">
							Lorem ipsum dolor sit amet, consetetur sadipscing
							elitr, sed diam nonumy eirmod tempor invidunt ut
							labore et dolore magna aliquyam erat, sed diam
							voluptua.
						</h2>
					</label>

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
								defaultChecked={marketing}
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
						<button
							onClick={() => submitForm()}
							className={classNames(
								'rwn-btn-continue',
								'rwm-button--primary'
							)}
						>
							Preisindikation erhalten
						</button>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default EmailForm;
