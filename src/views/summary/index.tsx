import React, {useEffect, useState} from 'react';
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
import * as Scroll from 'react-scroll';
import { trackSummary } from '../../utils/tracking';

const Summary = () => {

	const [street, setStreet] = useState('');
	const [houseNumber, setHouseNumber] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [residence, setResidence] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

		const pricing =
			appData.pricing === 'Standard 360 Adv' ? 'plus' : 'standard';
		trackSummary('summary', pricing);
	}, []);

	const rentingPrice = getRentingPrice(appData);
	const servicePrice = getServicePrice(
		appData.pricing === 'Standard 360 Adv' ? 'plus' : 'standard',
		appData
	);
	const total = rentingPrice + servicePrice;

	return (
		<Layout>
			<Modal />
			<Element name="myScrollToElement"></Element>
			<section className="rwm-calculator__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<div className="rwm-icon tw-justify-start">
						<div
							onClick={() => navigate('/')}
							className="rwm-arrow tw-ml-5 tw-mt-2"
						></div>
					</div>
					<div className="rwm-form__headline-mobile lg:tw-mt-[-30px] xl:tw-mt-[-30px]">
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
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								{appData.pricing}
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{`Gesamtpreis für eine Liegenschaft mit 2 Strängen und 2 Ventilen, einem online Quality Check und einer Legionellenprüfung.`}
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label tw-flex">
								{appData.pricing === 'Standard 360 Adv'
									? 'Plus'
									: ''}
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
								{total.toFixed(2).toString().replace('.', ',')}{' '}
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
							Kontaktdaten
						</h1>
					</label>
					<div
						className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-font">
								Straße*
							</label>
							<input
								type="text"
								name="streetName"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={street}
								onChange={(e) => setStreet(e.target.value)}
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
								value={houseNumber}
								onChange={(e) => setHouseNumber(e.target.value)}
							/>
						</div>
					</div>
					<div
						className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-font">
								Postleitzahl*
							</label>
							<input
								type="number"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
							/>
						</div>
						<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
							<label className="tw-flex tw-font-size-label tw-font">
								Wohnort*
							</label>
							<input
								type="text"
								name="residence"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={residence}
								onChange={(e) => setResidence(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1 className="rwm-form__headline">
							Ihre Anschrift
						</h1>
					</label>
					<div
						className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-font">
								Straße*
							</label>
							<input
								type="text"
								name="streetName"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={street}
								onChange={(e) => setStreet(e.target.value)}
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
								value={houseNumber}
								onChange={(e) => setHouseNumber(e.target.value)}
							/>
						</div>
					</div>
					<div
						className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-font">
								Postleitzahl*
							</label>
							<input
								type="number"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
							/>
						</div>
						<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
							<label className="tw-flex tw-font-size-label tw-font">
								Wohnort*
							</label>
							<input
								type="text"
								name="residence"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={residence}
								onChange={(e) => setResidence(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="rwm-forms__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1 className="rwm-form__headline">
							Liegenschaftsadresse
						</h1>
					</label>
					<div
						className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-font">
								Straße*
							</label>
							<input
								type="text"
								name="streetName"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={street}
								onChange={(e) => setStreet(e.target.value)}
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
								value={houseNumber}
								onChange={(e) => setHouseNumber(e.target.value)}
							/>
						</div>
					</div>
					<div
						className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6">
						<div className="rwm-form__input-container">
							<label className="tw-flex tw-font-size-label tw-font">
								Postleitzahl*
							</label>
							<input
								type="number"
								name="postalCode"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
							/>
						</div>
						<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
							<label className="tw-flex tw-font-size-label tw-font">
								Wohnort*
							</label>
							<input
								type="text"
								name="residence"
								className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
								value={residence}
								onChange={(e) => setResidence(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Summary;
