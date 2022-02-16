import React from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import Stepper from '../../components/Stepper';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Button from '../../components/Button';

const ContactForm = () => {
	return (
		<Layout>
			<Modal />
			<section className="rwm-calculator__page-section tw-margin-top">
				<div className="tw-flex tw-flex-col">
					<label className="rwm-form__headline">
						<h1>Angebot anfordern</h1>
					</label>
				</div>
			</section>
		</Layout>
	);
};

export default ContactForm;
