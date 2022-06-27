import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import * as Scroll from 'react-scroll';
import Translate from '../../../../utils/translate';
import {useDispatch, useSelector} from 'react-redux';
import {SET_ANSWER, SET_APP_STEP} from '../../../../redux/actions/App';
import {AppReduxStoreProps} from '../../../../redux/reducers/App';
import Radio from "../../Radio";
import {ReactComponent as StrangschemaIcon} from '../../../../icons/strangschema.svg';
import {ReactComponent as ProbeenthahmeventileIcon} from '../../../../icons/probeentnahmeventile.svg';
import {NumericInput} from "../../Input";

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

	const currentChoice = useSelector(
		(state: AppReduxStoreProps) =>
			state.appData.questions[currentAppStep - 1].choice
	);

	useEffect(() => {
		scroller.scrollTo('myScrollToElement', {
			duration: 1500,
			delay: 100,
			smooth: true,
			offset: -50,
		});
	}, []);


	switch (currentSubStep) {
		default:
		case 0: {
			let currentAnswer = (currentAppData.questions.find((x) => x.question === questionText)!.answers.find((answer) => (answer.name === 'choice')));
			return (<div>
				<Radio>
				</Radio>
				<div className="tw-flex tw-justify-center tw-mt-28">
					<StrangschemaIcon height={300}/>
				</div>
				{(currentAnswer && currentAnswer.value && currentAnswer.value === 'yes') &&
					<>
						<div className="tw-flex tw-justify-center tw-mt-28">Wie viele Stränge sind verbaut?</div>
						<NumericInput/>
					</>
				}
				{(currentAnswer && currentAnswer.value && currentAnswer.value === 'no') &&
					<>
						<Radio questionTextOverride={"Konnten Sie das Strangschema ermitteln?"} showTitle={false}
							   orientation={"vertical"} answersOverride={{
							'yes': 'Mit diesen Informationen konnte ich das Strangschema ermitteln und kennen nun die Anzahl der Stränge.',
							'no': 'Ich kenne das Strangschema nicht und benötige Unterstützung.'
						}}>
						</Radio>
						{
							((currentAppData.questions.find((x) => x.question === "Konnten Sie das Strangschema ermitteln?")!.answers.find((answer) => (answer.name === 'choice')))!.value === 'yes') &&
							<>
								<div className="tw-flex tw-justify-center tw-mt-28">Wie viele Stränge sind verbaut?</div>
								<NumericInput/>
							</>
						}
						{
							((currentAppData.questions.find((x) => x.question === "Konnten Sie das Strangschema ermitteln?")!.answers.find((answer) => (answer.name === 'choice')))!.value === 'no') &&
							<>
								<div className={"tw-p-6 tw-bg-lightest-grey"}>
									Kein Problem. Das Strangschema können wir bei der Begehung der Liegenschaft ermitteln.

								</div>
							</>
						}
					</>
				}
			</div>);
		}
		case 1: {

			let currentAnswer = (currentAppData.questions.find((x) => x.question === "Sind Probeentnahmeventile verbaut?"));
			return (
				<div>
					<Radio questionTextOverride={"Sind Probeentnahmeventile verbaut?"}
						   answersOverride={{'yes': 'Ja', 'no': 'Nein', 'unsure': 'Ich weiß nicht'}}></Radio>

					<div className="tw-flex tw-justify-center tw-mt-28">
						<ProbeenthahmeventileIcon height={300}/>
					</div>
					{((currentAppData.questions.find((x) => x.question === "Sind Probeentnahmeventile verbaut?")!.answers.find((answer) => (answer.name === 'choice')))!.value === 'no') &&
						<div className={"tw-p-6 tw-bg-lightest-grey"}>
							Falls noch nicht vorhanden, müssen die Probeentnahmeventile von einer Fachkraft angebracht werden. Erfahren Sie hier mehr
						</div>
					}
					{((currentAppData.questions.find((x) => x.question === "Sind Probeentnahmeventile verbaut?")!.answers.find((answer) => (answer.name === 'choice')))!.value === 'yes') &&
						<div className={"tw-p-6"}>
							Sie können hier eine Abbildung ihres Strangschemas hochladen, um die Aufnahme Ihrer Liegenschaft zu erleichtern.
						</div>
					}
					{((currentAppData.questions.find((x) => x.question === "Sind Probeentnahmeventile verbaut?")!.answers.find((answer) => (answer.name === 'choice')))!.value === 'unsure') &&
						<>
							<Radio questionTextOverride={"Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?"} showTitle={false}
								   orientation={"vertical"} answersOverride={{
								'yes': 'Diese Information war hilfreich. Ich weiß jetzt, ob Probeentnahmeventile verbaut sind.',
								'no': 'Ich weiß nicht, ob Probeentnahmeventile verbaut sind und benötige Unterstützung.'
							}}>
							</Radio>
							{((currentAppData.questions.find((x) => x.question === "Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?")!.answers.find((answer) => (answer.name === 'choice')))!.value === 'yes') &&
								<div className={"tw-p-6"}>
									Sie können hier eine Abbildung ihres Strangschemas hochladen, um die Aufnahme Ihrer Liegenschaft zu erleichtern.
								</div>
							}
							{((currentAppData.questions.find((x) => x.question === "Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?")!.answers.find((answer) => (answer.name === 'choice')))!.value === 'no') &&
								<div className={"tw-p-6 tw-bg-lightest-grey"}>
									Falls noch nicht vorhanden, müssen die Probeentnahmeventile von einer Fachkraft angebracht werden. Erfahren Sie hier mehr
								</div>
							}
						</>
					}
				</div>
			);
		}
	}


};

export default Trinkwasseranlage;
