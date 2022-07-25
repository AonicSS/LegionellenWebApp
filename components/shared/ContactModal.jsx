import React from 'react';
import ModalWrapper from './ModalWrapper';

import HouseIcon from '../../public/icons/house.svg';
import PhoneIcon from '../../public/icons/phone.svg';

const ContactModal = ({ isOpen, setOpen }) => {
	return (
		<ModalWrapper isOpen={isOpen} setOpen={setOpen}>
			<div className="tw-flex tw-gap-x-5">
				<HouseIcon className="tw-text-red tw-object-contain tw-w-10 tw-pt-5" />
				<div className="tw-text-left tw-flex tw-gap-y-3 tw-flex-col">
					<p>
						Unser Online-Rechner ermöglicht Ihnen eine einfache
						Beauftragung einer Begehung oder Legionellenprüfung für
						eine einzelne Liegenschaft.
					</p>
					<p>Möchten Sie mehrere Liegenschaften prüfen lassen?</p>
				</div>
			</div>
			<div className="tw-flex tw-items-center tw-justify-center tw-py-10 tw-gap-x-5">
				<PhoneIcon />
				<div>
					<p>Rufen Sie uns einfach an:</p>
					<a href="tel:0800 2 77 66 24">0800 2 77 66 24</a>
				</div>
			</div>
			<div>
				<p>
					Servicezeiten Mo–Do 08:00–17:00 Uhr <br /> und Fr
					08:00–15:00 Uhr
				</p>
			</div>
		</ModalWrapper>
	);
};

export default ContactModal;
