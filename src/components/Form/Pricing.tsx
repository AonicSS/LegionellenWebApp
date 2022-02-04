import classNames from 'classnames';
import React from 'react';

import './Pricing.css';

const pricing = [
	{
		name: 'Standard',
		features: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor',
		],
	},
	{
		name: 'Standard 360',
		features: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor',
		],
	},
	{
		name: 'Standard 360 Adv',
		features: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor',
		],
	},
];

const Pricing = () => {
	return (
		<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-1 xl:tw-grid-cols-3 tw-gap-10 xl:tw-gap-14">
			{pricing.map((p, index) => {
				return (
					<div key={p.name}>
						<div
							className={classNames(
								'tw-container-pricing tw-justify-center tw-items-center tw-border-2 tw-border-grey tw-container-pricing-mobile xl:tw-container-pricing-1',
								`xl:tw-container-pricing-${index + 1}`
							)}
						>
							<div className="tw-container-pricing-headline tw-font-size-pricing-headline">
								{p.name}
							</div>
							<div className="tw-container-pricing-label tw-font-size-pricing-label">
								Nur 00,00 €
							</div>
							<div className="tw-container-pricing-sublabel tw-font-size-pricing-sublabel">
								pro Jahr / Gerät
							</div>
							{p.features.map((f) => {
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
							})}
						</div>
					</div>
				);
			})}
			{/* <div className="tw-container-pricing tw-border-2 tw-border-grey tw-container-pricing-mobile xl:tw-container-pricing-2"></div>
			<div className="tw-container-pricing tw-border-2 tw-border-grey tw-container-pricing-mobile xl:tw-container-pricing-3"></div> */}
		</div>
	);
};

export default Pricing;
