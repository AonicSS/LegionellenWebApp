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
import {RentingsInput} from "../../Input";

const Trinkwasseranlage = () => {
	const dispatch = useDispatch();

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

	const handleChange = (value: string) => {
		dispatch({
			type: SET_ANSWER,
			payload: {
				questionName: questionText,
				choice: value,
				btnActive: true,
			},
		});
		// if (val && currentAppStep === 2) {
		// 	dispatch({ type: SET_MODAL, payload: { showModal: true } });
		// }
	};


	switch (currentSubStep) {
		default:
		case 0: {
			let currentAnswer = (currentAppData.questions.find((x) => x.question === questionText));
			return (<div>
				<Radio>
				</Radio>
				<div className="tw-flex tw-justify-center tw-mt-28">
					<StrangschemaIcon height={300}/>
				</div>
				{(currentAnswer && currentAnswer.choice && currentAnswer.choice === 'yes') &&
					<>
						<div className="tw-flex tw-justify-center tw-mt-28">Wie viele Stränge sind verbaut?</div>
						<RentingsInput/>
					</>
				}
				{(currentAnswer && currentAnswer.choice && currentAnswer.choice === 'no') &&
					<>Test</>
				}
			</div>);
		}
		case 1: {
			return (
				<div>
					<Radio questionTextOverride={"Sind Probeentnahmeventile verbaut?"}
						   answersOverride={{'yes': 'Ja', 'no': 'Nein', 'unsure': 'Ich weiß nicht'}}></Radio>

					<div className="tw-flex tw-justify-center tw-mt-28">
						<StrangschemaIcon height={300}/>
					</div>
				</div>
			);
		}
		case 2: {
			return (
				<Radio
					questionTextOverride={"Sind an die zentrale Warmwasser-Erwärmung drei oder mehr Wohnungen angeschlossen, von denen mindestens eine vermietet ist?"}></Radio>
			);
		}
		case 3: {
			return (
				<Radio
					questionTextOverride={"Ist die Trinkwasseranlage mit einem Wasserspeicher mit mehr als 400 Litern verbunden oder hat mehr als 3 Liter im Leitungssystem?"}></Radio>
			);
		}

		case 4: {
			return (
				<div>Für Ihre Liegenschaft besteht basierend auf Ihren Angaben eine Prüfpflicht. Im nächsten Schritt
					erfassen wir die wichtigsten Informationen für die Beauftragung.</div>
			);
		}
	}


};

export default Trinkwasseranlage;
