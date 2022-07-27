import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Scroll from 'react-scroll';

import ContactModal from '../shared/ContactModal';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import Layout from '../../components/Layout';
import Stepper from '../../components/Stepper';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Button from '../../components/Button';

const Calculator = () => {
	const [contactModalOpen, setContactModalOpen] = useState(false);

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);
	console.log(currentAppData);
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
			<Stepper />
			<section className="rwm-calculator__page-section tw-mb-12 tw-mt-16 tw-px-2 lg:tw-px-0">
				<Form />
			</section>
			{currentAppStep !== 3 && (
				<section className="rwm-calculator__page-section tw-my-12">
					<Button style="NEXT" />
				</section>
			)}
			{currentAppStep === 3 && currentSubStep === 0 && (
				<section className="rwm-calculator__page-section tw-my-12">
					<Button
						style={
							currentAppData.questions[
								'Wo befindet sich die zu prüfende Liegenschaft?'
							].answers.find(
								(answer) =>
									answer.value === '' ||
									answer.value === undefined
							)
								? `DISACTIVE`
								: `NEXT`
						}
						text={'Preis berechnen'}
					/>
				</section>
			)}
			{(currentAppStep === 1 &&
				currentSubStep === 1 &&
				firstQuestionAnswerValue !== 'unsure') ||
			(currentAppStep === 1 && currentSubStep === 4) ? (
				<div className="tw-text-center tw-flex tw-mt-5 lg:tw-mt-10 tw-items-center tw-gap-x-1 tw-justify-center">
					<p>
						Sie möchten mehr als eine Liegenschaft prüfen lassen?{' '}
						<button
							onClick={() => setContactModalOpen(true)}
							className="tw-text-red"
						>
							Hier entlang
						</button>
					</p>
				</div>
			) : null}

			<ContactModal
				isOpen={contactModalOpen}
				setOpen={setContactModalOpen}
			/>
		</Layout>
	);
};

export default Calculator;
