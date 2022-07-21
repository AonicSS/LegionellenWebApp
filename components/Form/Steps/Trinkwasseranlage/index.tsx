import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import * as Scroll from 'react-scroll';
import Translate from '../../../../utils/translate';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../../../redux/reducers/App';
import Radio from '../../Radio';

import StrangschemaIcon from '../../../../public/icons/strangschema.svg';
import ProbeenthahmeventileIcon from '../../../../public/icons/probeentnahmeventile.svg';
import StrangSchemaAnleitung from '../../../../public/img/strangschema_anleitung.png';
import { NumericInput } from '../../Input';
import Uploader from '../../../Uploader';

const Trinkwasseranlage = () => {
	const intl = useIntl();
	const scroller = Scroll.scroller;

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	useEffect(() => {
		scroller.scrollTo('myScrollToElement', {
			duration: 1500,
			delay: 100,
			smooth: true,
			offset: -50,
		});
	}, []);

	console.log(currentAppData);

	switch (currentSubStep) {
		default:
		case 0: {
			let currentAnswer = currentAppData.questions[
				questionText
			]!.answers.find((answer) => answer.name === 'choice');
			return (
				<div>
					<Radio></Radio>
					<div className="tw-flex tw-justify-center tw-mt-24 tw-mb-24">
						<StrangschemaIcon height={300} />
					</div>
					{currentAnswer &&
						currentAnswer.value &&
						currentAnswer.value === 'yes' && (
							<>
								<div className="tw-flex tw-justify-center tw-mt-28">
									Wie viele Stränge sind verbaut?
								</div>
								<NumericInput />
								<div className={'tw-mt-12'}>
									<Uploader uploadId={'strang'} />
								</div>
							</>
						)}
					{currentAnswer &&
						currentAnswer.value &&
						currentAnswer.value === 'no' && (
							<>
								<Radio
									questionTextOverride={
										'Konnten Sie das Strangschema ermitteln?'
									}
									showTitle={false}
									orientation={'vertical'}
									answersOverride={{
										yes: 'Mit diesen Informationen konnte ich das Strangschema ermitteln und kennen nun die Anzahl der Stränge.',
										no: 'Ich kenne das Strangschema nicht und benötige Unterstützung.',
									}}
								></Radio>
								{currentAppData.questions[
									'Konnten Sie das Strangschema ermitteln?'
								]!.answers.find(
									(answer) => answer.name === 'choice'
								)!.value === 'yes' && (
									<>
										<div className="tw-flex tw-justify-center tw-mt-28">
											Wie viele Stränge sind verbaut?
										</div>
										<NumericInput />
										<div className={'tw-mt-12'}>
											<Uploader uploadId={'strang'} />
										</div>
									</>
								)}
								{currentAppData.questions[
									'Konnten Sie das Strangschema ermitteln?'
								]!.answers.find(
									(answer) => answer.name === 'choice'
								)!.value === 'no' && (
									<>
										<div
											className={
												'tw-p-6 tw-bg-lightest-grey'
											}
										>
											Kein Problem. Das Strangschema
											können wir bei der Begehung der
											Liegenschaft ermitteln.
										</div>
									</>
								)}
							</>
						)}
				</div>
			);
		}
		case 1: {
			let currentAnswer =
				currentAppData.questions['Sind Probeentnahmeventile verbaut?'];
			return (
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
					]!.answers.find((answer) => answer.name === 'choice')!
						.value !== 'unsure' && (
						<div className="tw-flex tw-justify-center tw-mt-28">
							<ProbeenthahmeventileIcon height={300} />
						</div>
					)}
					{currentAppData.questions[
						'Sind Probeentnahmeventile verbaut?'
					]!.answers.find((answer) => answer.name === 'choice')!
						.value === 'no' && (
						<div className={'tw-p-6 tw-bg-lightest-grey'}>
							Falls noch nicht vorhanden, müssen die
							Probeentnahmeventile von einer Fachkraft angebracht
							werden.
						</div>
					)}
					{currentAppData.questions[
						'Sind Probeentnahmeventile verbaut?'
					]!.answers.find((answer) => answer.name === 'choice')!
						.value === 'yes' && (
						<>
							<div
								className={'tw-flex tw-justify-center tw-my-6'}
							>
								<div className={'tw-max-w-lg tw-p-6'}>
									Sie können hier eine Abbildung ihres
									Strangschemas hochladen, um die Aufnahme
									Ihrer Liegenschaft zu erleichtern.
								</div>
							</div>
							<Uploader uploadId={'valves'} />
						</>
					)}
					{currentAppData.questions[
						'Sind Probeentnahmeventile verbaut?'
					]!.answers.find((answer) => answer.name === 'choice')!
						.value === 'unsure' && (
						<>
							<div
								className={'tw-flex tw-justify-center tw-my-6'}
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
										Falls noch nicht vorhanden, müssen die
										Probeentnahmeventile von einer Fachkraft
										angebracht werden.
									</div>
								</div>
							)}
						</>
					)}
				</div>
			);
		}
	}
};

export default Trinkwasseranlage;
