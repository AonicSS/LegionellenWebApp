import classNames from 'classnames';
import React from 'react';
import Button from '../../../../Button';
import { useSelector } from 'react-redux';
import { AppData, AppReduxStoreProps } from '../../../../../redux/reducers/App';
import { getBasePrice, getServicePrice } from '../../../../../utils/helpers';
import CheckInIcon from '../../../../../public/icons/check-in.svg';
import CheckCircledIcon from '../../../../../public/icons/check-circled.svg';
import CheckIcon from '../../../../../public/icons/check.svg';
import CheckQualityIcon from '../../../../../public/icons/check-quality.svg';
import MagnifyingGlassIcon from '../../../../../public/icons/magnifying-glass.svg';
import XCircledIcon from '../../../../../public/icons/x-circled.svg';
import HouseIcon from '../../../../../public/icons/house.svg';
import EmailIcon from '../../../../../public/icons/email.svg';
import BellIcon from '../../../../../public/icons/bell.svg';
import InfoSmallIcon from '../../../../../public/icons/info-small.svg';
import PhoneIcon from '../../../../../public/icons/phone.svg';
// import CheckCircledFull from '../../../../../public/icons/check-circled-full.svg';
import Techem from '../../../../../public/icons/Techem.svg';

const pricingOptions = {
	noSurveyRequired: [
		{
			name: 'Legionellenprüfung\nohne Quality Check',
			position: 'tw-container-pricing-1',
			price: (appData: AppData) => {
				return 49.0 + (appData.strangAmount + 2) * 61.0;
			},
			serviceFeatures: {
				'Kostenloses Erstgespräch ': {
					icon: <PhoneIcon />,
					active: true,
					subtitle:
						'In unserem „Welcome Call“ nehmen wir alle weiteren Daten auf, die für die Auftragsausführung nötig sind, klären offene Fragen und erklären das weitere Vorgehen. Auf Wunsch mit Video. ',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				'Prüfung Ihrer Angaben': {
					icon: <CheckQualityIcon />,
					active: false,
					subtitle: 'Ohne Quality Check (siehe Hinweis unten) ',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				Legionellenprüfung: {
					icon: <MagnifyingGlassIcon />,
					active: true,
					subtitle:
						'Probennahme und Laboranalytik durch ein akkreditiertes Labor sowie Übermittlung des Ergebnisses',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			extraServices: {
				Infoservice: {
					selected: true,
					subtitle:
						'Wir stellen Ihnen ein Informationsschreiben für Ihre Mieterinnen und Mieter sowie einen Hausaushang zur Verfügung, die über das Untersuchungsergebnis informieren.',
					price: (appData: AppData) => {
						return 5.0;
					},
				},
			},
			buttonStyle: 'SECONDARY',
			text: 'Angebot sichern',
			type: 'standard',
			recommended: false,
			importantRemark:
				'Da Sie alle geforderten Angaben zur Trinkwasseranlage ausgefüllt haben, ist eine Begehung in Ihrer Liegenschaft nicht zwingend notwendig. Wir empfehlen dennoch, einen Quality Check mit uns durchzuführen, um Fehler bei der Eingabe und daraus entstehende Mehrkosten bestmöglich zu vermeiden.',
		},
		{
			name: 'Legionellenprüfung\n+ Quality Check Online',
			position: 'tw-container-pricing-3',
			price: (appData: AppData) => {
				return 49.0 + 49.0 + (appData.strangAmount + 2) * 61.0;
			},
			serviceFeatures: {
				'Kostenloses Erstgespräch ': {
					icon: <PhoneIcon />,
					active: true,
					subtitle:
						'In unserem „Welcome Call“ nehmen wir alle weiteren Daten auf, die für die Auftragsausführung nötig sind, klären offene Fragen und erklären das weitere Vorgehen. Auf Wunsch mit Video. ',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				'Prüfung Ihrer Angaben': {
					icon: <CheckIcon />,
					active: true,
					subtitle:
						'In unserem „Quality Check“ gehen wir gemeinsam mit Ihnen Ihre Angaben im Detail durch und prüfen sie auf Plausibilität. Bei Abweichungen beraten wir Sie zum weiteren Vorgehen. Ihr Vorteil: Flexible Terminvereinbarung, digitale Abwicklung',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				Legionellenprüfung: {
					icon: <MagnifyingGlassIcon />,
					active: true,
					subtitle:
						'Probennahme und Laboranalytik durch ein akkreditiertes Labor sowie Übermittlung des Ergebnisses',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			extraServices: {
				Infoservice: {
					selected: true,
					subtitle:
						'Wir stellen Ihnen ein Informationsschreiben für Ihre Mieterinnen und Mieter sowie einen Hausaushang zur Verfügung, die über das Untersuchungsergebnis informieren.',
					price: (appData: AppData) => {
						return 5.0;
					},
				},
			},
			buttonStyle: 'PRIMARY',
			text: 'Angebot sichern',
			type: 'plus',
			recommended: true,
			importantRemark: "Für die Durchführung des Online Quality Checks benötigen Sie ein mobiles Gerät mit einer Internetverbindung sowie, wenn Sie die Video-Option nutzen möchten, zusätzlich eine Kamera",
		},
		{
			name: 'Legionellenprüfung\n + Quality Check vor Ort',
			position: 'tw-container-pricing-3',
			price: (appData: AppData) => {
				return 249.0 + 49.0 + (appData.strangAmount + 2) * 61.0;
			},
			serviceFeatures: {
				'Kostenloses Erstgespräch ': {
					icon: <PhoneIcon />,
					active: true,
					subtitle:
						'In unserem „Welcome Call“ nehmen wir alle weiteren Daten auf, die für die Auftragsausführung nötig sind, klären offene Fragen und erklären das weitere Vorgehen. Auf Wunsch mit Video. ',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				'Quality Check vor Ort in Ihrer Liegenschaft (249€)': {
					icon: <CheckCircledIcon />,
					active: true,
					subtitle:
						'Zur Bestätigung des Probenahme-Umfangs nehmen wir einmalig beim ersten Auftrag die Situation vor Ort auf und legen die relevanten Probenahme-Stellen fest.  ',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				Legionellenprüfung: {
					icon: <MagnifyingGlassIcon />,
					active: true,
					subtitle:
						'Probennahme und Laboranalytik durch ein akkreditiertes Labor sowie Übermittlung des Ergebnisses',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			extraServices: {
				Infoservice: {
					selected: true,
					subtitle:
						'Wir stellen Ihnen ein Informationsschreiben für Ihre Mieterinnen und Mieter sowie einen Hausaushang zur Verfügung, die über das Untersuchungsergebnis informieren.',
					price: (appData: AppData) => {
						return 5.0;
					},
				},
			},
			buttonStyle: 'SECONDARY',
			text: 'Angebot sichern',
			type: 'plus',
			recommended: false,
			importantRemark: undefined,
		},
	],
	surveyRequired: [
		{
			name: 'Vor-Ort-Aufnahme \n' + 'in Ihrer Liegenschaft',
			position: 'tw-container-pricing-1',
			price: (appData: AppData) => {
				return 249.0;
			},
			serviceFeatures: {
				'Kostenloses Erstgespräch ': {
					icon: <PhoneIcon />,
					active: true,
					subtitle:
						'In unserem „Welcome Call“ nehmen wir alle weiteren Daten auf, die für die Auftragsausführung nötig sind, klären offene Fragen und erklären das weitere Vorgehen. Auf Wunsch mit Video. ',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				'Ermittlung des Probennahme-Umfangs ': {
					icon: <HouseIcon />,
					active: true,
					subtitle:
						'Wir nehmen einmalig beim ersten Auftrag die Situation vor Ort auf und legen die relevanten Probenahme-Stellen fest.',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				Legionellenprüfung: {
					icon: <XCircledIcon />,
					active: false,
					subtitle:
						'Nach der Begehung buchbar. Auf Basis des Ergebnisses der Vor-Ort-Aufnahme ermitteln wir den Preis für Ihre Legionellenprüfung und senden Ihnen im Anschluss ein Angebot zu.',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			extraServices: {},
			buttonStyle: 'SECONDARY',
			text: 'Angebot sichern',
			type: 'standard',
			recommended: false,
			importantRemark: undefined,
		},
		{
			name: 'Digitale Aufnahme \n' + 'per Videotelefonat',
			position: 'tw-container-pricing-3',
			price: (appData: AppData) => {
				return 99.0;
			},
			extraServices: {},
			serviceFeatures: {
				'Kostenloses Erstgespräch ': {
					icon: <PhoneIcon />,
					active: true,
					subtitle:
						'In unserem „Welcome Call“ nehmen wir alle weiteren Daten auf, die für die Auftragsausführung nötig sind, klären offene Fragen und erklären das weitere Vorgehen. Auf Wunsch mit Video. ',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				'Ermittlung des Probennahme-Umfangs im Videotelefonat ': {
					icon: <CheckInIcon />,
					active: true,
					subtitle:
						'Wir leiten Sie durch Ihre Liegenschaft und legen die relevanten Probenahme-Stellen fest. (siehe Hinweis unten)',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				Legionellenprüfung: {
					icon: <XCircledIcon />,
					active: false,
					subtitle:
						'Nach der Begehung buchbar. Auf Basis des Ergebnisses der erfolgreichen digitalen Aufnahme Ihrer Liegenschaft ermitteln wir den Preis für Ihre Legionellenprüfung und senden Ihnen im Anschluss ein Angebot zu.',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			importantRemark:
				'Sollten wir im Gespräch feststellen, dass für die korrekte Ermittlung des Probennahme-Umfangs eine Vor-Ort-Aufnahme notwendig ist, können Sie diese gegen einen Aufpreis zubuchen.',
			buttonStyle: 'PRIMARY',
			text: 'Angebot sichern',
			type: 'plus',
			recommended: true,
		},
	],
};

export interface PricingProps extends React.HTMLProps<HTMLDivElement> {
	modal?: boolean;
	surveyRequired?: boolean;
}

const Pricing = ({ modal, surveyRequired }: PricingProps) => {
	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);
	const pricing = surveyRequired
		? pricingOptions['surveyRequired']
		: pricingOptions['noSurveyRequired'];

	return (
		<div className="tw-pb-12">
			<div
				className={`tw-flex tw-flex-col lg:tw-flex-row tw-justify-center tw-gap-10`}
			>
				{pricing.map((p) => {
					//const rentingPrice = getBasePrice(appData);
					//const servicePrice = getServicePrice(p.type, appData);
					//const total = rentingPrice + servicePrice;
					const total = p.price(currentAppData);

					return (
						<div
							key={p.name}
							className={classNames(
								'tw-p-5 tw-container-pricing tw-grid tw-grid-rows-[auto_1fr_auto_auto_minmax(100px,_250px)] tw-border-2 tw-border-grey tw-pb-6 hover:tw-border-[#009BB4] tw-cursor-pointer !tw-rounded-tl-[40px] !tw-rounded-br-[40px]',
								`${p.position}`
							)}
						>
							{p.recommended && (
								<div className="rwm-best-price">
									<Techem />
								</div>
							)}
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline tw-whitespace-pre-line">
								{p.name}
							</div>
							<div>
								{Object.entries(p.serviceFeatures).map(
									([featureName, feature]) => {
										return (
											<div
												className="tw-container-pricing-list tw-mt-5 tw-grid tw-grid-cols-[50px,1fr]"
												key={featureName}
											>
												<div className="tw-self-start">
													{(p.serviceFeatures as any)[
														featureName
													].active ? (
														(
															p.serviceFeatures as any
														)[featureName].icon
													) : (
														<XCircledIcon />
													)}
												</div>
												<div className="tw-flex-grow">
													<p
														className={
															'tw-font-bold'
														}
													>
														{featureName}
													</p>
													<p>
														{
															(
																p.serviceFeatures as any
															)[featureName]
																.subtitle
														}
													</p>
												</div>
											</div>
										);
										// if (isModalVisible || index < 3) {
										return (
											<ul
												key={featureName}
												className="tw-container-pricing-list tw-list-disc tw-ml-5"
											>
												<li className="tw-font-size-pricing-body">
													<span>{featureName}</span>
												</li>
											</ul>
										);
										// } else {
										// 	return null;
										// }
									}
								)}
							</div>

							<div className="tw-flex tw-justify-center tw-mb-12">
								<div className="tw-container-pricing-label tw-font-size-price-large">
									{total
										.toFixed(2)
										.toString()
										.replace('.', ',')}{' '}
									€
									<span
										className={
											'tw-font-size-price-small tw-ml-3'
										}
									>
										exkl.Mwst
									</span>
								</div>
							</div>
							<div className="tw-flex tw-justify-center tw-mb-6">
								<Button
									text={p.text}
									style={p.buttonStyle}
									pricing={p}
								/>
							</div>
							{/*
								<div className={'tw-container-pricing-list'}>
									<div
										className={
											'tw-flex tw-flex-row tw-items-center'
										}
									>
										<div className={'tw-px-2 tw-py-1'}>
											<EmailIcon/>
										</div>
										<div className={'tw-px-2 tw-py-1'}>
											Angebot per E-Mail zusenden
										</div>
										<div className={'tw-px-2 tw-py-1'}>
											<InfoSmallIcon/>
										</div>
									</div>

									<div
										className={
											'tw-flex tw-flex-row tw-items-center tw-pb-8'
										}
									>
										<div className={'tw-px-2 tw-py-1'}>
											<BellIcon/>
										</div>
										<div className={'tw-px-2 tw-py-1'}>
											Erinnerung zusenden
										</div>
										<div className={'tw-px-2 tw-py-1'}>
											<InfoSmallIcon/>
										</div>
									</div>
								</div>
								 */}
							{p.importantRemark && (
								<div
									className={
										'tw-container-pricing-list tw-text-water tw-border-t-[1px] tw-border-dashed tw-border-dark-grey'
									}
								>
									<div className="tw-flex tw-justify-center tw-mb-2 tw-pt-5">
										<h4> Wichtiger Hinweis</h4>
									</div>
									<div
										className={
											'tw-font-normal tw-text-[13px] tw-leading-6 tw-text-left tw-text-headline'
										}
									>
										{p.importantRemark}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Pricing;
