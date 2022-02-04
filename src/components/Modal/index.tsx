import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';

import { useDispatch, useSelector } from 'react-redux';
import { SET_MODAL } from '../../redux/actions/App';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import Translate from '../../utils/translate';

import Button from '../Button';

import './Modal.css';

const Modal = () => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const showModal = useSelector(
		(state: AppReduxStoreProps) => state.appData.showModal
	);

	return (
		<div className="tw-container">
			{showModal ? (
				<div className="rwm-overlay">
					<div
						className={classNames(
							'rwm-overlay__container',
							{ 'tw-overlay-size-1': currentAppStep === 2 },
							{ 'tw-overlay-size-2': currentAppStep === 3 }
						)}
					>
						<div className="rwm-overlay__btn-container-close">
							<Button style="CLOSE" />
						</div>
						<div className="rwm-overlay__headline-container">
							<h1 className="rwm-overlay__headline">
								{Translate(
									intl,
									`overlay.${currentAppStep}.headline`
								)}
							</h1>
						</div>
						<div className="rwm-overlay__body-container">
							<p className="rwm-overlay__body">
								{Translate(
									intl,
									`overlay.${currentAppStep}.body.0`
								)}
							</p>
						</div>
						<div className="rwm-overlay__contact-container">
							<p className="rwm-overlay__contact-headline">
								{Translate(
									intl,
									`overlay.${currentAppStep}.contact-headline`
								)}
							</p>
							<p className="rwm-overlay__contact-body">
								{Translate(
									intl,
									`overlay.${currentAppStep}.contact-body`
								)}
							</p>
						</div>
						{currentAppStep === 2 && (
							<div className="rwm-overlay__body-container">
								<p className="rwm-overlay__body">
									{Translate(
										intl,
										`overlay.${currentAppStep}.body.1`
									)}
								</p>
							</div>
						)}
						{currentAppStep === 2 && (
							<div className="rwm-overlay__btn-container-continue">
								<Button style="CONTINUE" />
							</div>
						)}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Modal;
