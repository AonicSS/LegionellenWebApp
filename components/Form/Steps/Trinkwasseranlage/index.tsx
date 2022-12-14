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
import VentileForm from '../Angebot/VentileForm';

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

	console.log(currentAppData);

	switch (currentSubStep) {
		default:
		case 0: {
			let currentAnswer = currentAppData.questions[
				questionText
			]!.answers.find((answer) => answer.name === 'choice');
			console.log(currentAnswer);
			return (
				<div>
					<Radio></Radio>
					<div className="tw-flex tw-justify-center tw-mt-24 tw-mb-24">
						{currentAnswer?.value === 'yes' ? (
							<StrangschemaIcon height={300} />
						) : (
							<iframe
								width="560"
								height="315"
								src="https://www.youtube-nocookie.com/embed/Mn5CkUgLzMU?controls=0"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						)}
					</div>
					{currentAnswer &&
						currentAnswer.value &&
						currentAnswer.value === 'yes' && (
							<>
								<div className="tw-flex tw-justify-center tw-mt-28">
									Wie viele Str??nge sind verbaut?
								</div>
								<NumericInput />
								<div className={'tw-mt-12'}>
									Sie k??nnen hier eine Abbildung ihres
									Strangschemas hochladen, um die Aufnahme
									Ihrer Liegenschaft zu erleichtern.
								</div>
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
										yes: 'Mit diesen Informationen konnte ich das Strangschema ermitteln und kennen nun die Anzahl der Str??nge.',
										no: 'Ich kenne das Strangschema nicht und ben??tige Unterst??tzung.',
									}}
								></Radio>
								{currentAppData.questions[
									'Konnten Sie das Strangschema ermitteln?'
								]!.answers.find(
									(answer) => answer.name === 'choice'
								)!.value === 'yes' && (
									<>
										<div className="tw-flex tw-justify-center tw-mt-12">
											Wie viele Str??nge sind verbaut?
										</div>
										<NumericInput />
										<div className={'tw-mt-12'}>
											Sie k??nnen hier eine Abbildung ihres
											Strangschemas hochladen, um die
											Aufnahme Ihrer Liegenschaft zu
											erleichtern.
										</div>
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
											k??nnen wir bei der Begehung der
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
			return <VentileForm currentAppData={currentAppData} />;
		}
	}
};

export default Trinkwasseranlage;
