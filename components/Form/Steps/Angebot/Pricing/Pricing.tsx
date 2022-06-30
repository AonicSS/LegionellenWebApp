import classNames from 'classnames';
import React from 'react';
import Button from '../../../../Button';
import { useSelector } from 'react-redux';
import { AppData, AppReduxStoreProps } from '../../../../../redux/reducers/App';
import { getBasePrice, getServicePrice } from '../../../../../utils/helpers';
import CheckInIcon from '../../../../../public/icons/check-in.svg';
import CheckCircledIcon from '../../../../../public/icons/check-circled.svg';
import CheckQualityIcon from '../../../../../public/icons/check-quality.svg';
import MagnifyingGlassIcon from '../../../../../public/icons/magnifying-glass.svg';
import XCircledIcon from '../../../../../public/icons/x-circled.svg';
import HouseIcon from '../../../../../public/icons/house.svg';
import EmailIcon from '../../../../../public/icons/email.svg';
import BellIcon from '../../../../../public/icons/bell.svg';
import InfoSmallIcon from '../../../../../public/icons/info-small.svg';
import CheckCircledFull from '../../../../../public/icons/check-circled-full.svg';
import Techem from '../../../../../public/img/techem.png';

const pricingOptions = {
	noSurveyRequired: [
		{
			name: 'Legionellenprüfung ohne Quality Check',
			position: 'tw-container-pricing-1',
			price: (appData: AppData) => {
				return 49.0 + appData.strangAmount * 61.0;
			},
			serviceFeatures: {
				'Quality Check': {
					icon: <CheckQualityIcon />,
					active: false,
					subtitle: 'Wird empfohlen',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				Legionellenprüfung: {
					icon: <MagnifyingGlassIcon />,
					active: true,
					subtitle: 'Probeentnahme und Laborcheck',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			extraServices: {
				Infoservice: {
					selected: true,
					subtitle:
						'Informationen für Ihre Mieter und einen Haus-Aushang als PDF',
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
			name: 'Legionellenprüfung + Quality Check Online',
			position: 'tw-container-pricing-3',
			price: (appData: AppData) => {
				return 99.0 + 49.0 + appData.strangAmount * 61.0;
			},
			serviceFeatures: {
				'Quality Check': {
					icon: <CheckInIcon />,
					active: true,
					subtitle: 'Flexibel und Digital',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				Legionellenprüfung: {
					icon: <MagnifyingGlassIcon />,
					active: true,
					subtitle: 'Probeentnahme und Laborcheck',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			extraServices: {
				Infoservice: {
					selected: true,
					subtitle:
						'Informationen für Ihre Mieter und einen Haus-Aushang als PDF',
					price: (appData: AppData) => {
						return 5.0;
					},
				},
			},
			buttonStyle: 'PRIMARY',
			text: 'Angebot sichern',
			type: 'plus',
			recommended: true,
			importantRemark: undefined,
		},
		{
			name: 'Legionellenprüfung + Quality Check Klassisch',
			position: 'tw-container-pricing-3',
			price: (appData: AppData) => {
				return 199.0 + 49.0 + appData.strangAmount * 61.0;
			},
			serviceFeatures: {
				'Quality Check Klassisch': {
					icon: <HouseIcon />,
					active: true,
					subtitle: 'Persönlich und vor Ort',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
				Legionellenprüfung: {
					icon: <MagnifyingGlassIcon />,
					subtitle: 'Probeentnahme und Laborcheck',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			extraServices: {
				Infoservice: {
					selected: true,
					subtitle:
						'Informationen für Ihre Mieter und einen Haus-Aushang als PDF',
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
			name: 'Klassische Begehung',
			position: 'tw-container-pricing-1',
			price: (appData: AppData) => {
				return 199.0;
			},
			serviceFeatures: {
				'Persönlich und vor Ort': {
					icon: <HouseIcon />,
					active: true,
					subtitle:
						'Wir ermitteln vor Ort alle nötigen Informationen für eine schnelle und effiziente Legionellenprüfung.',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			extraServices: {
				Infoservice: {
					selected: true,
					subtitle:
						'Informationen für Ihre Mieter und einen Haus-Aushang als PDF',
					price: (appData: AppData) => {
						return 5.0;
					},
				},
			},
			buttonStyle: 'SECONDARY',
			text: 'Angebot sichern',
			type: 'standard',
			recommended: false,
			importantRemark: undefined,
		},
		{
			name: 'Online Begehung',
			position: 'tw-container-pricing-3',
			price: (appData: AppData) => {
				return 99.0;
			},
			extraServices: {
				Infoservice: {
					selected: true,
					subtitle:
						'Informationen für Ihre Mieter und einen Haus-Aushang als PDF',
					price: (appData: AppData) => {
						return 5.0;
					},
				},
			},
			serviceFeatures: {
				'Flexibel und Digital': {
					icon: <CheckInIcon />,
					active: true,
					subtitle:
						'In einem Videocall ermitteln wir alle nötigen Informationen für eine schnelle und effiziente Legionellenprüfung. Ganz ohne lange Wartezeiten.',
					price: (appData: AppData) => {
						return 0.0;
					},
				},
			},
			buttonStyle: 'PRIMARY',
			text: 'Angebot sichern',
			type: 'plus',
			recommended: true,
			importantRemark: undefined,
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
				className={
					'lg:tw-grid-cols-1 lg:tw-grid-cols-2 lg:tw-grid-cols-3 md:tw-grid-cols-1 tw-hidden'
				}
			></div>
			<div
				className={`tw-grid tw-align-center tw-grid-cols-1 lg:tw-grid-cols-${pricing.length} xl:tw-grid-cols-${pricing.length} tw-gap-[52px] xl:tw-gap-[50px]`}
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
								'tw-container-pricing tw-justify-center tw-items-center tw-border-2 tw-border-grey tw-pb-6',
								`${p.position}`
							)}
						>
							{p.recommended && (
								<div className="rwm-best-price">
									<img src={Techem.src} />
								</div>
							)}
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								{p.name}
							</div>
							{Object.entries(p.serviceFeatures).map(
								([featureName, feature]) => {
									return (
										<div
											className="tw-container-pricing-list tw-flex tw-flex-row tw-items-center"
											key={featureName}
										>
											<div className="tw-mr-4">
												{
													(p.serviceFeatures as any)[
														featureName
													].icon
												}
											</div>
											<div className="tw-flex-grow">
												<p className={'tw-font-bold'}>
													{featureName}
												</p>
												<p>
													{
														(
															p.serviceFeatures as any
														)[featureName].subtitle
													}
												</p>
											</div>
											<div className="">
												{(p.serviceFeatures as any)[
													featureName
												].active ? (
													<CheckCircledIcon />
												) : (
													<XCircledIcon />
												)}
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

							<div className="tw-flex tw-justify-center tw-mb-12">
								<div className="tw-container-pricing-label tw-font-size-price-large">
									{total
										.toFixed(2)
										.toString()
										.replace('.', ',')}{' '}
									€
								</div>
							</div>
							<div className="tw-flex tw-justify-center tw-mb-6">
								<Button
									text={p.text}
									style={p.buttonStyle}
									pricing={p}
								/>
							</div>
							<div className={'tw-container-pricing-list'}>
								<div
									className={
										'tw-flex tw-flex-row tw-items-center'
									}
								>
									<div className={'tw-px-2 tw-py-1'}>
										<EmailIcon />
									</div>
									<div className={'tw-px-2 tw-py-1'}>
										Angebot per E-Mail zusenden
									</div>
									<div className={'tw-px-2 tw-py-1'}>
										<InfoSmallIcon />
									</div>
								</div>

								<div
									className={
										'tw-flex tw-flex-row tw-items-center tw-pb-8'
									}
								>
									<div className={'tw-px-2 tw-py-1'}>
										<BellIcon />
									</div>
									<div className={'tw-px-2 tw-py-1'}>
										Erinnerung zusenden
									</div>
									<div className={'tw-px-2 tw-py-1'}>
										<InfoSmallIcon />
									</div>
								</div>
							</div>
							{p.importantRemark && (
								<div
									className={
										'tw-container-pricing-list tw-text-water tw-border-t-[1px] tw-border-dashed tw-border-[#C6C6C6]'
									}
								>
									<div className="tw-flex tw-justify-center tw-mb-2 tw-pt-5">
										<h4> Wichtiger Hinweis</h4>
									</div>
									<div className={'tw-text-justify'}>
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
