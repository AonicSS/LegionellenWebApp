import React from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import Layout from '../../components/Layout';
import Stepper from '../../components/Stepper';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Button from '../../components/Button';
import * as Scroll from 'react-scroll';

const Calculator = () => {
	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);
	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);
	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	const firstQuestionAnswerValue = currentAppData.questions[
		'Besteht für Ihre Liegenschaft eine Prüfpflicht?'
	].answers.find((answer) => answer.name === 'choice')!.value;

	const Element = Scroll.Element;
	return (
		<Layout>
			<Modal />
			<Element name="myScrollToElement"></Element>
			<section className="rwm-calculator__page-section tw-margin-top tw-sticky tw-top-0 tw-bg-white tw-z-[100]">
				<Stepper/>
			</section>
			<div className={'tw-mb-12'}>
				<section className="rwm-calculator__page-section tw-mt-16">
					<Form />
				</section>
				{currentAppStep !== 3 && (
					<section className="rwm-calculator__page-section tw-mt-12">
						<Button style="NEXT" />
					</section>
				)}
				{currentAppStep === 3 && currentSubStep === 0 && (
					<section className="rwm-calculator__page-section tw-mt-12">
						<Button style="NEXT" text={'Preis berechnen'} />
					</section>
				)}
			</div>
			{(currentAppStep === 1 &&
				currentSubStep === 1 &&
				firstQuestionAnswerValue !== 'unsure') ||
			(currentAppStep === 1 && currentSubStep === 4) ? (
				<div className="tw-text-center tw-flex tw-items-center tw-gap-x-1 tw-justify-center">
					<p>Sie möchten mehr als eine Liegenschaft prüfen lassen?</p>
					<a className="tw-text-red" href="#">
						Hier entlang
					</a>
				</div>
			) : null}
		</Layout>
	);
};

export default Calculator;
