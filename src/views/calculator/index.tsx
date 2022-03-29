import React from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import Layout from '../../components/Layout';
import Stepper from '../../components/Stepper';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Button from '../../components/Button';

const Calculator = () => {
	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);
	return (
		<Layout>
			<Modal />
			<section className="rwm-calculator__page-section tw-margin-top">
				<Stepper />
			</section>
			<section className="rwm-calculator__page-section tw-mt-8">
				<Form />
			</section>
			{currentAppStep !== 5 ? (
				<section className="rwm-calculator__page-section tw-mt-14">
					<Button style="NEXT" />
				</section>
			) : null}
		</Layout>
	);
};

export default Calculator;
