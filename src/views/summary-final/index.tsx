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
import {ReactComponent as PenIcon} from '../../icons/pen.svg';

const SummaryFinal = () => {

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
									<div className={"tw-font-bold"}>2 Stränge</div>
								</div>
							</div>
							<div className={"tw-w-3"}>

							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Anzahl der Stränge</div>
									<div className={"tw-font-bold"}>2 Stränge</div>
								</div>
							</div>
							<div className={"tw-w-3"}>

							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Ihre Kontaktdaten</div>
									<div className={"tw-font-bold"}>
										Frau<br />
										Sofia Coppola<br />
										+491626277170<br />
										sofia.coppola@email.de
									</div>
								</div>
							</div>
							<div className="tw-w-3">
								<PenIcon />
							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Ihre Anschrift</div>
									<div className={"tw-font-bold"}>
										Europaplatz 12<br />
										64285, Darmstadt
									</div>
								</div>
							</div>
							<div className="tw-w-3">
								<PenIcon />
							</div>
						</div>

						<div className="tw-flex tw-flex-row tw-items-center tw-py-5 tw-border-y tw-border-beige">
							<div className="tw-flex-grow">
								<div className="tw-grid tw-grid-cols-2 tw-gap-6">
									<div>Anschrift der zu prüfenden
										Liegenschaft</div>
									<div className={"tw-font-bold"}>
										Europaplatz 12<br />
										64285, Darmstadt
									</div>
								</div>
							</div>
							<div className="">
								<PenIcon />
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
					<div className={"tw-bg-white tw-p-8"}>
						<div
							className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2">
							<div className="rwm-form__input-container tw-text-red tw-font-bold">
								Mehr Infos
							</div>
							<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
								<div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-mb-12">
									<label htmlFor="toggleB" className="tw-flex tw-items-center tw-cursor-pointer">
										<div className="tw-relative">
											<input type="checkbox" id="toggleB" className="tw-sr-only"/>
											<div className="tw-block tw-bg-red tw-w-14 tw-h-8 tw-rounded-full"></div>
											<div
												className="dot tw-absolute tw-left-1 tw-top-1 tw-bg-white tw-w-6 tw-h-6 tw-rounded-full tw-transition"></div>
										</div>
										<div className="tw-ml-3 tw-text-gray-700 tw-font-medium">
										</div>
									</label>
								</div>
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
			<section>
				<div className="tw-flex tw-justify-center tw-pt-14 tw-pb-1">
					<Button style={"PRIMARY"} text={"Preis sichern, direkt abschließen"}></Button>
				</div>
				<div className="tw-flex tw-justify-center tw-pt-1 tw-pb-28">
					<Button style={"SECONDARY"} text={"Angebot per E-Mail zusenden"}></Button>
				</div>
			</section>
		</Layout>
	);
};

export default SummaryFinal;
