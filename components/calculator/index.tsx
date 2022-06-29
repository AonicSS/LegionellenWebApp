import React from 'react';
import {useSelector} from 'react-redux';
import {AppReduxStoreProps} from '../../redux/reducers/App';
import Layout from '../../components/Layout';
import Stepper from '../../components/Stepper';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Button from '../../components/Button';
import * as Scroll from 'react-scroll';

const Calculator = () => {
	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);
	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);
	const Element = Scroll.Element;
	return (
		<Layout>
			<Modal/>
			<Element name="myScrollToElement"></Element>
			<section className="rwm-calculator__page-section tw-margin-top">
				<Stepper/>
			</section>
			<div className={"tw-mb-12"}>
				<section className="rwm-calculator__page-section tw-mt-8">
					<Form/>
				</section>
				{(currentAppStep !== 3) &&
					<section className="rwm-calculator__page-section tw-mt-12">
						<Button style="NEXT"/>
					</section>
				}
				{(currentAppStep === 3 && currentSubStep === 0) &&
					<section className="rwm-calculator__page-section tw-mt-12">
						<Button style="NEXT" text={"Preis berechnen"}/>
					</section>
				}
			</div>
		</Layout>
	);
};

export default Calculator;
