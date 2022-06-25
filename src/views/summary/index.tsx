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
	getAlarmNumber,
	getRentingPrice,
	getServicePrice,
} from '../../utils/helpers';
import {ReactComponent as Info} from '../../icons/Info.svg';
import * as Scroll from 'react-scroll';
import {trackSummary} from '../../utils/tracking';

import {ReactComponent as CheckInIcon} from '../../icons/check-in.svg';
import {ReactComponent as CheckCircledIcon} from '../../icons/check-circled.svg';
import {ReactComponent as MagnifyingGlassIcon} from '../../icons/magnifying-glass.svg';
import {ReactComponent as TechemRecommendationIcon} from '../../icons/magnifying-glass.svg';

const Summary = () => {

	const [street, setStreet] = useState('');
	const [houseNumber, setHouseNumber] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [residence, setResidence] = useState('');

	const [gender, setGender] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [customerNumber, setCustomerNumber] = useState('');
	const [marketingAgreement, setMarketing] = useState(false);
	const [contactAgreement, setContact] = useState(false);

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
			<Modal/>
			<Element name="myScrollToElement"></Element>
			<section className="rwm-calculator__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<div className="rwm-form__headline-mobile lg:tw-mt-[-30px] xl:tw-mt-[-30px]">
						<label className="rwm-form__headline tw-text-center">
							<h1 className="rwm-form__headline">
								Zusammenfassung zum Angebot
							</h1>
						</label>
					</div>
					<div
						className="tw-grid tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-1 tw-gap-10 xl:tw-gap-14 tw-mt-16">
						<div
							className={classNames(
								'tw-container-summary tw-justify-center tw-items-center tw-pb-6'
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								{appData.pricing}
							</div>
							<div className="tw-grid tw-grid-cols-2">
								<div className="tw-container-pricing-label tw-font-size-pricing-label">
									{`Gesamtpreis für eine Liegenschaft mit 2 Strängen und 2 Ventilen, einem online Quality Check und einer Legionellenprüfung.`}
								</div>
								<div className="tw-container-pricing-label tw-font-size-price-large">
									{total.toFixed(2).toString().replace('.', ',')}{' '}
									€
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className={"tw-bg-grey"}>
				<section className="rwm-forms__page-section tw-margin-top">
					<div className="tw-flex tw-flex-col">
						<label className="rwm-form__headline">
							<h1 className="rwm-form__headline">
								Im Komplettpreis enthalten:
							</h1>
						</label>

						<div className={"tw-bg-white tw-rounded-tl-3xl tw-rounded-br-3xl tw-p-8"}>
							<div className="tw-flex tw-flex-row tw-items-center">
								<div className="tw-mr-4">
									<CheckInIcon/>
								</div>
								<div
									className="tw-flex-grow">
									<p className={"tw-font-bold"}>Quality Check Online</p>
									<p>Flexibel und Digital</p>
								</div>
								<div className="">
									<CheckCircledIcon/>
								</div>
							</div>
							<div className="tw-flex tw-flex-row tw-mt-4 tw-items-center">
								<div className="tw-mr-4">
									<MagnifyingGlassIcon/>
								</div>
								<div
									className="tw-flex-grow">
									<p className={"tw-font-bold"}>Legionellenprüfung</p>
									<p>Probenentnahme und Laborcheck</p>
								</div>
								<div className="">
									<CheckCircledIcon/>
								</div>
							</div>
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
						<div className={"tw-bg-white tw-rounded-tl-3xl tw-rounded-br-3xl tw-p-8"}>
							<div
								className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2">
								<div className="rwm-form__input-container tw-text-red tw-font-bold">
									Mehr Infos
								</div>
								<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
									Toggle
								</div>
							</div>
							<div
								className="rwm-form__input-container-large tw-mt-2">
								<div className="rwm-form__input-container tw-font-bold">
									Coupon-Code einlösen?
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
						<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-16">
							<h4 className="tw-font-size-sub-title">Anrede*</h4>
						</div>

						<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start">
							<fieldset className="tw-grid tw-grid-cols-3 tw-gap-6 tw-mt-2">
								<div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
									<div className="round">
										<select id="gender" name="gender"
												defaultChecked={contactAgreement}
												onChange={() => setContact(!contactAgreement)}>
											<option value="m">Herr</option>
											<option value="f">Frau</option>
											<option value="d">Divers</option>
										</select>
									</div>
								</div>
							</fieldset>
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
							<div className="rwm-form__input-container-large">
								<p>
									Ich bin bereits Kunde
								</p>
							</div>
						</div>

						<div className="rwm-form__input-container-large tw-flex tw-flex-row tw-justify-between tw-items-start tw-mt-12">
							<h4 className="tw-font-size-sub-title">Name</h4>
						</div>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									Vorname*
								</label>
								<input
									type="text"
									name="firstName"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<label className="tw-flex tw-font-size-label tw-font">
									Name*
								</label>
								<input
									type="text"
									name="lastName"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
						</div>

						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									E-Mail Adresse*
								</label>
								<input
									type="email"
									name="emailAddress"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={emailAddress}
									onChange={(e) =>
										setEmailAddress(e.target.value)
									}
								/>
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<label className="tw-flex tw-font-size-label tw-font">
									Telefonnummer*
								</label>
								<input
									type="phone"
									name="phoneNumber"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={phoneNumber}
									onChange={(e) =>
										setPhoneNumber(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-2">
							<div className="rwm-form__input-container">
								<label className="tw-flex tw-font-size-label tw-font">
									Kundennummer*
								</label>
								<input
									type="text"
									name="customerNumber"
									className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
									value={customerNumber}
									onChange={(e) =>
										setCustomerNumber(e.target.value)
									}
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
				<section>
					<div className="tw-flex tw-justify-center tw-pt-14 tw-pb-1">
						<Button style={"PRIMARY"} text={"Preis sichern, direkt abschließen"}></Button>
					</div>
					<div className="tw-flex tw-justify-center tw-pt-1 tw-pb-28">
						<Button style={"SECONDARY"} text={"Angebot per E-Mail zusenden"}></Button>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default Summary;
