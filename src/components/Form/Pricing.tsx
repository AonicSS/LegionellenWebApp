import classNames from 'classnames';
import React from 'react';
import Button from '../Button';
import { useSelector } from 'react-redux';
import './Pricing.css';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import {
	rentingCostNonUser,
	rentingCostUser,
	serviceCostNonUser,
	serviceCostUser,
} from '../../utils/helpers';

const pricing = [
	{
		name: 'Standard',
		position: 'tw-container-pricing-1',
		features: [
			'Lorem text 1 ipsum dolor sit amet, consectetur adipiscing',
			'Lorem text 2 ipsum dolor sit amet, consectetur adipiscing',
			'Lorem text 3 ipsum dolor sit amet, consectetur adipiscing',
			'Lorem text 4 ipsum dolor sit amet, consectetur adipiscing',
			'Lorem text 5 ipsum dolor sit amet, consectetur adipiscing',
		],
		buttonStyle: 'SECONDARY',
		text: 'Standard wählen',
		type: 'standard',
	},
	// {
	// 	name: 'Standard 360',
	// 	position: 'tw-container-pricing-2',
	// 	features: [
	// 		'Lorem text 1 ipsum dolor sit amet, consectetur adipiscing',
	// 		'Lorem text 2 ipsum dolor sit amet, consectetur adipiscing',
	// 		'Lorem text 3 ipsum dolor sit amet, consectetur adipiscing',
	// 		'Lorem text 4 ipsum dolor sit amet, consectetur adipiscing',
	// 		'Lorem text 5 ipsum dolor sit amet, consectetur adipiscing',
	// 	],
	// 	buttonStyle: 'PRIMARY',
	// 	text: 'Standard 360 wählen',
	// },
	{
		name: 'Standard 360 Adv',
		position: 'tw-container-pricing-3',
		features: [
			'Lorem text 1 ipsum dolor sit amet, consectetur adipiscing',
			'Lorem text 2 ipsum dolor sit amet, consectetur adipiscing',
			'Lorem text 3 ipsum dolor sit amet, consectetur adipiscing',
			'Lorem text 4 ipsum dolor sit amet, consectetur adipiscing',
			'Lorem text 5 ipsum dolor sit amet, consectetur adipiscing',
		],
		buttonStyle: 'PRIMARY',
		text: 'Standard 360 wählen',
		type: 'plus',
	},
];

const Pricing = () => {
	const isModalVisible = useSelector(
		(state: AppReduxStoreProps) => state.appData.showModal
	);

	const appData = useSelector((state: AppReduxStoreProps) => state.appData);

	const getAlarmNumber = () => {
		let alarms = 0;

		appData.questions['4'].answers.forEach((element) => {
			alarms = alarms + element.amount;
		});

		return alarms;
	};

	const getRentingPrice = () => {
		if (!appData.questions[0].choice) {
			return rentingCostNonUser(
				getAlarmNumber(),
				appData.years,
				appData.rentings
			);
		} else {
			return rentingCostUser(getAlarmNumber(), appData.years);
		}
	};

	const getServicePrice = (type: string) => {
		if (!appData.questions[0].choice) {
			return serviceCostNonUser(getAlarmNumber(), appData.years, type);
		} else {
			return serviceCostUser(getAlarmNumber(), appData.years, type);
		}
	};

	return (
		<>
			<div className="tw-flex tw-justify-around tw-gap-10 xl:tw-gap-14">
				{pricing.map((p) => {
					return (
						<div
							key={p.name}
							className={classNames(
								'tw-container-pricing tw-justify-center tw-items-center tw-border-2 tw-border-grey tw-pb-6',
								`${p.position}`
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								{p.name}
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								{`Renting ${getRentingPrice()} €`} <br />
								{`Service ${getServicePrice(p.type)} €`}
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								pro Jahr / Gerät
							</div>
							{p.features.map((f, index) => {
								if (isModalVisible || index < 3) {
									return (
										<ul
											key={f}
											className="tw-container-pricing-list tw-list-disc tw-ml-5"
										>
											<li className="tw-font-size-pricing-body">
												<span>{f}</span>
											</li>
										</ul>
									);
								} else {
									return null;
								}
							})}
							<div className="tw-flex tw-justify-center">
								<Button
									text={p.text}
									style={p.buttonStyle}
									pricing={p.name}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Pricing;
