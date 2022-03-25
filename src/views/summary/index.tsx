import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { SET_MODAL } from '../../redux/actions/App';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import {
	getAlarmNumber,
	getRentingPrice,
	getServicePrice,
} from '../../utils/helpers';
import { ReactComponent as Info } from '../../icons/Info.svg';

const Summary = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	return (
		<Layout>
			<Modal />
			<section className="rwm-calculator__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<div className="tw-grid tw-grid-cols-3">
						<div className="rwm-icon tw-justify-start">
							<div
								onClick={() => navigate('/')}
								className="rwm-arrow"
							></div>
						</div>
						<label className="rwm-form__headline tw-justify-start">
							<h1>Zusammenfassung</h1>
						</label>
					</div>

					<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-3 tw-gap-10 xl:tw-gap-14 tw-mt-16">
						<div
							className={classNames(
								'tw-container-summary tw-justify-center tw-items-center tw-pb-6'
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								Ihre Angaben
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{appData.questions[3].choice ? 'Ja' : 'Nein'}
							</div>
							{/* <div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Heizkostenabrechnung bei Techem
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{appData.questions[1].choice ? 'Ja' : 'Nein'}
							</div> */}
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
								{getAlarmNumber(appData)}
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Anzahl Rauchwarnmelder
							</div>
						</div>

						<div
							className={classNames(
								'tw-container-summary tw-justify-center tw-items-center tw-pb-6'
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								Ihre Ausstattung
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{`Gesamtpreis Rauchwarnmelder-Miete &`}
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label tw-flex">
								{appData.pricing}
								<Info
									onClick={() =>
										dispatch({
											type: SET_MODAL,
											payload: {
												showModal: true,
											},
										})
									}
									className="rwm-btn-info"
								/>
							</div>
							<div className="tw-container-pricing-label tw-font-size-price-large">
								{total.toFixed(2)} €
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-price-sublabel">
								pro Jahr / Gerät
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{appData.years} Jahre
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								Laufzeit
							</div>
						</div>
						<div
							className={classNames(
								'tw-container-summary tw-justify-center tw-items-center tw-pb-6'
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								Wie möchten Sie fortfahren?
							</div>
							<div className="tw-flex tw-flex-col tw-content-center tw-items-center tw-align-items-center tw-pt-10">
								<Button
									text="Angebot anfordern"
									style="FORM-LINK-PRIMARY"
									link="contactform"
								/>
								{/* <Button
									text="Erinnerung erhalten"
									style="FORM-LINK"
									link="emailform"
								/> */}
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
