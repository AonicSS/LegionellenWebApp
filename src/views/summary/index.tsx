import React from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import Stepper from '../../components/Stepper';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Button from '../../components/Button';

const Summary = () => {
	const appData = useSelector((state: AppReduxStoreProps) => state.appData);

	return (
		<Layout>
			<Modal />
			<section className="rwm-calculator__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1>Überblick</h1>
					</label>
					<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-1 xl:tw-grid-cols-3 tw-gap-10 xl:tw-gap-14 tw-mt-16">
						<div
							className={classNames(
								'tw-container-pricing tw-justify-center tw-items-center tw-border-2 tw-border-grey tw-pb-6 tw-container-pricing-1'
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								Ihre Angaben
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								Nein
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Heizkostenabrechnung bei Techem
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								Nein
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Bereits RWM Service bei Techem
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{appData.rentings}
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Wohneinheiten
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{appData.postalCode.code}
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Postleitzahl
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								16
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Anzahl Rauchwarnmelder
							</div>
						</div>

						<div
							className={classNames(
								'tw-container-pricing tw-justify-center tw-items-center tw-border-2 tw-border-grey tw-pb-6 tw-container-pricing-2'
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								Ihre Wahl
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{appData.pricing}
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Details ansehen
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								10 Jahre
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Laufzeit
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								Nur 00,00 €
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Gesamtpreis pro Jahr
							</div>
						</div>
						<div
							className={classNames(
								'tw-container-pricing tw-justify-center tw-items-center tw-border-2 tw-border-grey tw-pb-6 tw-container-pricing-3'
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								Wie möchten Sie fortfahren?
							</div>
							<div className="tw-flex tw-flex-col tw-content-center tw-items-center tw-align-items-center">
								<Button
									text="Angebot anfordern"
									style="FORM-LINK"
									link="contactform"
								/>
								<Button
									text="Preisindikation erhalten"
									style="FORM-LINK"
									link="emailform"
								/>

								<Button
									text="Erinnerung erhalten"
									style="FORM-LINK"
									link="reminder"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Summary;
