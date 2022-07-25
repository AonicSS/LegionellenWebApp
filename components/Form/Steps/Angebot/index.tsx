import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import * as Scroll from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';

import {
	DECREASE_APP_STEP,
	SET_ANSWER,
	SET_APP_STEP,
	SET_CURRENT_QUESTION,
} from '../../../../redux/actions/App';
import { AppReduxStoreProps } from '../../../../redux/reducers/App';
import Pricing from './Pricing/Pricing';
import Summary from '../../../summary';
import SummaryFinal from '../../../summary-final';
import {
	checkStrangAmount,
	getMeasurementValvesInstalled,
} from '../../../../utils/helpers';
import Translate from '../../../../utils/translate';
import Button from '../../../Button';
import ModalWrapper from '../../../shared/ModalWrapper';
import { NumericInput } from '../../Input';
import Uploader from '../../../Uploader';
import Radio from '../../Radio';

import HouseAltIcon from '../../../../public/icons/house-alt.svg';
import PenEditIcon from '../../../../public/icons/pen-edit.svg';
import StrangSchemaAnleitung from '../../../../public/img/strangschema_anleitung.png';
import ProbeenthahmeventileIcon from '../../../../public/icons/probeentnahmeventile.svg';
import AddressForm from './AddressForm';

const Angebot = () => {
	const dispatch = useDispatch();
	const intl = useIntl();
	const scroller = Scroll.scroller;

	const [strangschemaModalOpen, setStrangschemaModalOpen] = useState(false);
	const [probeentnahmeventilenOpen, setProbeentnahmeventilenModalOpen] =
		useState(false);
	const [addressModalOpen, setAddressModalOpen] = useState(false);

	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);

	const questionText = useSelector(
		(state: AppReduxStoreProps) => state.appData.currentQuestion
	);

	const currentQuestion = useSelector(
		(state: AppReduxStoreProps) =>
			state.appData.questions[state.appData.currentQuestion]
	);

	useEffect(() => {
		scroller.scrollTo('myScrollToElement', {
			duration: 1500,
			delay: 100,
			smooth: true,
			offset: -50,
		});

		dispatch({
			type: SET_CURRENT_QUESTION,
			payload: {
				currentQuestion:
					'Wo befindet sich die zu prüfende Liegenschaft?',
			},
		});
	}, []);

	const handleChange = (value: string, answerName: string) => {
		dispatch({
			type: SET_ANSWER,
			payload: {
				questionName: questionText,
				answerName: answerName,
				value: value,
				btnActive: true,
			},
		});
	};

	const [contactAgreement, setContact] = React.useState(false);

	switch (currentSubStep) {
		default:
		case 0: {
			return (
				<>
					<section className="rwm-forms__page-section tw-margin-top">
						<AddressForm
							currentQuestion={currentQuestion}
							handleChange={handleChange}
						/>
					</section>
				</>
			);
		}
		case 1: {
			let streetName = currentAppData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]!.answers.find((answer) => answer.name === 'streetName')!.value;
			let houseNumber = currentAppData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]!.answers.find((answer) => answer.name === 'houseNumber')!.value;
			let postalCode = currentAppData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]!.answers.find((answer) => answer.name === 'postalCode')!.value;
			let city = currentAppData.questions[
				'Wo befindet sich die zu prüfende Liegenschaft?'
			]!.answers.find((answer) => answer.name === 'city')!.value;
			let measurementValvesInstalled =
				getMeasurementValvesInstalled(currentAppData);
			let strangAmountKnown = !!checkStrangAmount(currentAppData);

			return (
				<>
					<section className="tw-margin-top">
						<div className="tw-flex tw-justify-center tw-mb-14">
							<h1 className="rwm-form__headline">
								Unser Angebot für Sie
							</h1>
						</div>

						<div className="tw-flex tw-justify-center tw-mt-14 tw-mb-14 tw-mx-auto tw-max-w-xl">
							{strangAmountKnown && measurementValvesInstalled && (
								<div>
									Für die Liegenschaft{' '}
									<span
										onClick={() => {
											setAddressModalOpen(true);
										}}
										className={
											'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
										}
									>
										{streetName} {houseNumber}, {postalCode}{' '}
										{city}
										<PenEditIcon className={'tw-inline'} />
									</span>{' '}
									mit{' '}
									<span
										onClick={() => {
											setStrangschemaModalOpen(true);
										}}
										className={
											'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
										}
									>
										{currentAppData.strangAmount > 1
											? `${currentAppData.strangAmount} Strängen`
											: 'einem Strang'}
										<PenEditIcon className={'tw-inline'} />
									</span>{' '}
									und{' '}
									<span
										onClick={() => {
											setProbeentnahmeventilenModalOpen(
												true
											);
										}}
										className={
											'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
										}
									>
										{measurementValvesInstalled
											? 'vorhandenen Probeentnahmeventilen'
											: 'nicht vorhandenen Probeentnahmeventilen'}
										<PenEditIcon className={'tw-inline'} />
									</span>{' '}
									haben wir folgendes Angebot für Sie
									kalkuliert:
								</div>
							)}
							{!(
								strangAmountKnown && measurementValvesInstalled
							) && (
								<div>
									Um einen verbindlichen Preis für eine
									Legionellenprüfung in Ihrer Liegenschaft zu
									ermitteln, benötigen wir noch Angaben zu{' '}
									<button
										onClick={() => {
											setStrangschemaModalOpen(true);
										}}
										className={
											'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
										}
									>
										Strangschema
										<PenEditIcon className={'tw-inline'} />
									</button>{' '}
									und{' '}
									<span
										onClick={() => {
											setProbeentnahmeventilenModalOpen(
												true
											);
										}}
										className={
											'tw-text-ting-red tw-cursor-pointer hover:tw-underline'
										}
									>
										Probeentnahmeventilen
										<PenEditIcon className={'tw-inline'} />
									</span>
									. Diese ermitteln wir bei der Begehung, die
									Sie nun direkt online beauftragen können.
								</div>
							)}
						</div>
						<Pricing
							surveyRequired={
								!(
									strangAmountKnown &&
									measurementValvesInstalled
								)
							}
						/>
						{!(strangAmountKnown && measurementValvesInstalled) && (
							<section
								className={
									'tw-bg-light-grey tw-p-10 tw-mb-12 tw-mt-12 tw-w-2/3 tw-mx-auto'
								}
							>
								<h1>Wie geht es nach der Begehung weiter?</h1>
								<p>
									Nach der Ermittlung des Probennahme-Umfangs
									erstellen wir Ihr persönliches Angebot für
									eine Legionellenprüfung, die Sie im nächsten
									Schritt beauftragen können.{' '}
								</p>
							</section>
						)}
					</section>

					<ModalWrapper
						isOpen={strangschemaModalOpen}
						setOpen={setStrangschemaModalOpen}
					>
						<>
							<p className="text-title rwm-form__headline tw-leading-[37px] tw-font-bold">
								Wie viele Stränge sind verbaut?
							</p>
							<NumericInput />
							<div className={'tw-mt-12'}>
								<Uploader uploadId={'strang'} />
							</div>
						</>
					</ModalWrapper>

					<ModalWrapper
						isOpen={addressModalOpen}
						setOpen={setAddressModalOpen}
					>
						<AddressForm
							currentQuestion={currentQuestion}
							handleChange={handleChange}
						/>
					</ModalWrapper>

					<ModalWrapper
						isOpen={probeentnahmeventilenOpen}
						setOpen={setProbeentnahmeventilenModalOpen}
					>
						<div>
							<Radio
								questionTextOverride={
									'Sind Probeentnahmeventile verbaut?'
								}
								answersOverride={{
									yes: 'Ja',
									no: 'Nein',
									unsure: 'Ich weiß nicht',
								}}
							></Radio>

							{currentAppData.questions[
								'Sind Probeentnahmeventile verbaut?'
							]!.answers.find(
								(answer) => answer.name === 'choice'
							)!.value !== 'unsure' && (
								<div className="tw-flex tw-justify-center tw-mt-28">
									<ProbeenthahmeventileIcon height={300} />
								</div>
							)}
							{currentAppData.questions[
								'Sind Probeentnahmeventile verbaut?'
							]!.answers.find(
								(answer) => answer.name === 'choice'
							)!.value === 'no' && (
								<div className={'tw-p-6 tw-bg-lightest-grey'}>
									Falls noch nicht vorhanden, müssen die
									Probeentnahmeventile von einer Fachkraft
									angebracht werden.
								</div>
							)}
							{currentAppData.questions[
								'Sind Probeentnahmeventile verbaut?'
							]!.answers.find(
								(answer) => answer.name === 'choice'
							)!.value === 'yes' && (
								<>
									<div
										className={
											'tw-flex tw-justify-center tw-my-6'
										}
									>
										<div className={'tw-max-w-lg tw-p-6'}>
											Sie können hier eine Abbildung ihres
											Strangschemas hochladen, um die
											Aufnahme Ihrer Liegenschaft zu
											erleichtern.
										</div>
									</div>
									<Uploader uploadId={'valves'} />
								</>
							)}
							{currentAppData.questions[
								'Sind Probeentnahmeventile verbaut?'
							]!.answers.find(
								(answer) => answer.name === 'choice'
							)!.value === 'unsure' && (
								<>
									<div
										className={
											'tw-flex tw-justify-center tw-my-6'
										}
									>
										<img
											src={StrangSchemaAnleitung.src}
											className={
												'tw-w-full tw-h-auto tw-object-contain lg:tw-max-w-lg'
											}
										/>
									</div>
									<Radio
										questionTextOverride={
											'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?'
										}
										showTitle={false}
										orientation={'vertical'}
										answersOverride={{
											yes: 'Diese Information war hilfreich. Ich weiß jetzt, ob Probeentnahmeventile verbaut sind.',
											no: 'Ich weiß nicht, ob Probeentnahmeventile verbaut sind und benötige Unterstützung.',
										}}
									></Radio>
									{currentAppData.questions[
										'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?'
									]!.answers.find(
										(answer) => answer.name === 'choice'
									)!.value === 'yes' && (
										<>
											<div
												className={
													'tw-flex tw-justify-center tw-my-6'
												}
											>
												<div
													className={
														'tw-max-w-lg tw-p-6'
													}
												>
													Sie können hier eine
													Abbildung ihres
													Strangschemas hochladen, um
													die Aufnahme Ihrer
													Liegenschaft zu erleichtern.
												</div>
											</div>
											<Uploader uploadId={'valves'} />
										</>
									)}
									{currentAppData.questions[
										'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?'
									]!.answers.find(
										(answer) => answer.name === 'choice'
									)!.value === 'no' && (
										<div
											className={
												'tw-flex tw-justify-center tw-my-6'
											}
										>
											<div
												className={
													'tw-max-w-lg tw-p-6 tw-bg-lightest-grey'
												}
											>
												Falls noch nicht vorhanden,
												müssen die Probeentnahmeventile
												von einer Fachkraft angebracht
												werden.
											</div>
										</div>
									)}
								</>
							)}
						</div>
					</ModalWrapper>
				</>
			);
		}
		case 2: {
			return (
				<Summary
					contactAgreement={contactAgreement}
					setContact={setContact}
				/>
			);
		}
		case 3: {
			return (
				<SummaryFinal
					contactAgreement={contactAgreement}
					setContact={setContact}
				/>
			);
		}
	}
};

export default Angebot;
