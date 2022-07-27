import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import Close from '../../public/icons/times.svg';
import Button from '../Button';

const ModalWrapper = ({ isOpen, setOpen, children, btnText = null }) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="tw-relative tw-z-[200]"
				onClose={() => setOpen(false)}
			>
				<Transition.Child
					as={Fragment}
					enter="tw-ease-out tw-duration-300"
					enterFrom="tw-opacity-0"
					enterTo="tw-opacity-100"
					leave="tw-ease-in tw-duration-200"
					leaveFrom="tw-opacity-100"
					leaveTo="tw-opacity-0"
				>
					<div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
				</Transition.Child>

				<div className="tw-fixed tw-inset-0 tw-z-[300] tw-overflow-y-auto">
					<div className="tw-flex tw-items-center tw-justify-center tw-min-h-full tw-p-4 tw-text-center">
						<Transition.Child
							as={Fragment}
							enter="tw-ease-out tw-duration-300"
							enterFrom="tw-opacity-0 tw-scale-95"
							enterTo="tw-opacity-100 tw-scale-100"
							leave="tw-ease-in tw-duration-200"
							leaveFrom="tw-opacity-100 tw-scale-100"
							leaveTo="tw-opacity-0 tw-scale-95"
						>
							<Dialog.Panel className="tw-w-full tw-max-w-4xl tw-relative tw-overflow-hidden tw-shadow-xl">
								<button
									onClick={() => setOpen(false)}
									className="tw-absolute tw-top-2 tw-right-2"
								>
									<Close className="rwm-btn-close tw-fill-sharepoint-grey" />
								</button>
								<div className="tw-p-10 tw-bg-white ">
									{children}
								</div>
								<div className="tw-bg-light-grey tw-px-10 tw-pt-5 tw-pb-6 tw-flex tw-items-center tw-justify-end">
									<Button
										text={btnText ? btnText : 'Speichern'}
										style={'PRIMARY'}
										onClick={() => setOpen(false)}
									/>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ModalWrapper;
