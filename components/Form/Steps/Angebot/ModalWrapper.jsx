import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import Close from '../../../../public/icons/times.svg';

const ModalWrapper = ({ isOpen, setOpen, title, children }) => {
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
							<Dialog.Panel className="tw-w-full tw-max-w-xl tw-relative tw-p-6 tw-overflow-hidden tw-text-left tw-align-middle tw-transition-all tw-transform tw-bg-white tw-shadow-xl">
								<Dialog.Title
									as="h3"
									className="tw-text-lg tw-font-size-headline"
								>
									{title}
								</Dialog.Title>
								<button
									onClick={() => setOpen(false)}
									className="tw-absolute tw-top-2 tw-right-2"
								>
									<Close className="rwm-btn-close tw-fill-sharepoint-grey" />
								</button>

								{/* <div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										onClick={() => setOpen(false)}
									>
										Got it, thanks!
									</button>
								</div> */}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ModalWrapper;
