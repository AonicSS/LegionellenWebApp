import classNames from 'classnames';
import React from 'react';
import Button from '../Button';
import {useSelector} from 'react-redux';
import './Pricing.css';
import {AppReduxStoreProps} from '../../redux/reducers/App';
import {getRentingPrice, getServicePrice} from '../../utils/helpers';
import {ReactComponent as CheckInIcon} from "../../icons/check-in.svg";
import {ReactComponent as CheckCircledIcon} from "../../icons/check-circled.svg";
import {ReactComponent as CheckQualityIcon} from "../../icons/check-quality.svg";
import {ReactComponent as MagnifyingGlassIcon} from "../../icons/magnifying-glass.svg";
import {ReactComponent as XCircledIcon} from "../../icons/x-circled.svg";
import {ReactComponent as HouseIcon} from "../../icons/house.svg";
import {ReactComponent as EmailIcon} from "../../icons/email.svg";
import {ReactComponent as BellIcon} from "../../icons/bell.svg";
import {ReactComponent as InfoSmallIcon} from "../../icons/info-small.svg";

const pricing = [
	{
		name: 'Legionellenprüfung ohne Quality Check',
		position: 'tw-container-pricing-1',
		serviceFeatures: {
			'Quality Check': {
				icon: <CheckQualityIcon/>,
				active: false,
				subtitle: 'Wird empfohlen',
			},
			'Legionellenprüfung': {
				icon: <MagnifyingGlassIcon/>,
				active: true,
				subtitle: 'Probeentnahme und Laborcheck',
			},
		},
		buttonStyle: 'SECONDARY',
		text: 'Angebot sichern',
		type: 'standard',
		recommended: false,
	},
	{
		name: 'Legionellenprüfung + Quality Check Online',
		position: 'tw-container-pricing-3',
		serviceFeatures: {
			'Quality Check': {
				icon: <CheckInIcon/>,
				active: true,
				subtitle: 'Flexibel und Digital',
			},
			'Legionellenprüfung': {
				icon: <MagnifyingGlassIcon/>,
				active: true,
				subtitle: 'Probeentnahme und Laborcheck',
			},
		},
		buttonStyle: 'PRIMARY',
		text: 'Angebot sichern',
		type: 'plus',
		recommended: true,
	},
	{
		name: 'Legionellenprüfung + Quality Check Klassisch',
		position: 'tw-container-pricing-3',
		serviceFeatures: {
			'Quality Check Klassisch': {
				icon: <HouseIcon/>,
				active: true,
				subtitle: 'Persönlich und vor Ort',
			},
			'Legionellenprüfung': {
				icon: <MagnifyingGlassIcon/>,
				active: true,
				subtitle: 'Probeentnahme und Laborcheck',
			},
		},
		buttonStyle: 'SECONDARY',
		text: 'Angebot sichern',
		type: 'plus',
		recommended: false,
	},
];

export interface PricingProps extends React.HTMLProps<HTMLDivElement> {
	modal?: boolean;
}

const Pricing = ({modal}: PricingProps) => {
	const appData = useSelector((state: AppReduxStoreProps) => state.appData);

	return (
		<div className="tw-pb-12">
			<div
				className="tw-grid tw-align-center tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-3 tw-gap-[52px] xl:tw-gap-[50px]">
				{pricing.map((p) => {
					const rentingPrice = getRentingPrice(appData);
					const servicePrice = getServicePrice(p.type, appData);

					const total = rentingPrice + servicePrice;

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
									Techem Empfehlung
								</div>
							)}
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								{p.name}
							</div>
							{Object.entries(p.serviceFeatures).map(([featureName, feature]) => {
								return (
									<div className="tw-container-pricing-list tw-flex tw-flex-row tw-items-center"
										 key={featureName}>
										<div className="tw-mr-4">
											{(p.serviceFeatures as any)[featureName].icon}
										</div>
										<div
											className="tw-flex-grow">
											<p className={"tw-font-bold"}>{featureName}</p>
											<p>{(p.serviceFeatures as any)[featureName].subtitle}</p>
										</div>
										<div className="">
											{(p.serviceFeatures as any)[featureName].active ? <CheckCircledIcon/> :
												<XCircledIcon/>}
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
							})}

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
									pricing={p.name}
								/>
							</div>
							<div className={"tw-container-pricing-list"}>
								<div className={"tw-flex tw-flex-row tw-items-center"}>
									<div className={"tw-px-2 tw-py-1"}>
										<EmailIcon/>
									</div>
									<div className={"tw-px-2 tw-py-1"}>
										Angebot per E-Mail zusenden
									</div>
									<div className={"tw-px-2 tw-py-1"}>
										<InfoSmallIcon/>
									</div>
								</div>

								<div className={"tw-flex tw-flex-row tw-items-center"}>
									<div className={"tw-px-2 tw-py-1"}>
										<BellIcon/>
									</div>
									<div className={"tw-px-2 tw-py-1"}>
										Erinnerung zusenden
									</div>
									<div className={"tw-px-2 tw-py-1"}>
										<InfoSmallIcon/>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Pricing;
