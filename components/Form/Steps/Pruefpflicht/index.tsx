import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import * as Scroll from 'react-scroll';
import Translate from '../../../../utils/translate';
import { useSelector} from 'react-redux';
import {AppReduxStoreProps} from '../../../../redux/reducers/App';
import Radio from "../../Radio";

const Pruefpflicht = () => {
	const scroller = Scroll.scroller;
	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	const currentAppData = useSelector(
		(state: AppReduxStoreProps) => state.appData
	);

	useEffect(() => {
		scroller.scrollTo('myScrollToElement', {
			duration: 1500,
			delay: 100,
			smooth: true,
			offset: -50,
		});
	}, [currentSubStep]);

	switch (currentSubStep) {
		default:
		case 0: {
			return <Radio answersOverride={{'yes': 'Ja', 'no': 'Nein', 'unsure': 'Ich weiß nicht'}}></Radio>;
		}
		case 1: {
			if (currentAppData.questions['Besteht für Ihre Liegenschaft eine Prüfpflicht?'].answers.find((answer) => answer.name === 'choice')!.value === 'yes') {
				currentAppData.currentQuestion = "NO_QUESTION"
				return (
					<div className="tw-w-full tw-flex tw-justify-center">
						<section className="rwm-calculator__page-section tw-mt-8 tw-mx-6 tw-max-w-xl">
							<h1>Für Ihre Liegenschaft besteht basierend auf Ihren Angaben eine Prüfpflicht. Im nächsten
								Schritt
								erfassen wir die wichtigsten Informationen für die Beauftragung.
							</h1>
						</section>
					</div>
				);
			}
			if (currentAppData.questions['Besteht für Ihre Liegenschaft eine Prüfpflicht?'].answers.find((answer) => answer.name === 'choice')!.value === 'no') {
				currentAppData.currentQuestion = "NO_QUESTION"
				return (
					<div className="tw-w-full tw-flex tw-justify-center">
						<section className="rwm-calculator__page-section tw-mt-8 tw-mx-6 tw-max-w-xl">
							<h1>Für Ihre Liegenschaft besteht basierend auf Ihren Angaben keine Prüfpflicht. Sie können
								trotzdem
								jederzeit freiwillig eine Legionellenprüfung durchführen lassen. So tragen Sie zum
								Gesundheitsschutz für
								Ihre Mieter*innen bei.
							</h1>
						</section>
					</div>
				);
			}
			return (
				<Radio questionTextOverride={"Hat die Liegenschaft eine zentrale Warmwasser-Erwärmung?"}
					   answersOverride={{'yes': 'Ja', 'no': 'Nein', 'unsure': 'Ich weiß nicht'}}></Radio>
			);
		}
		case 2: {
			return (
				<Radio
					questionTextOverride={"Sind an die zentrale Warmwasser-Erwärmung drei oder mehr Wohnungen angeschlossen, von denen mindestens eine vermietet ist?"}
					answersOverride={{'yes': 'Ja', 'no': 'Nein', 'unsure': 'Ich weiß nicht'}}></Radio>
			);
		}
		case 3: {
			return (
				<Radio
					questionTextOverride={"Ist die Trinkwasseranlage mit einem Wasserspeicher mit mehr als 400 Litern verbunden oder hat mehr als 3 Liter im Leitungssystem?"}
					answersOverride={{'yes': 'Ja', 'no': 'Nein', 'unsure': 'Ich weiß nicht'}}></Radio>
			);
		}

		case 4: {
			currentAppData.currentQuestion = "NO_QUESTION"
			return (
				<div>Für Ihre Liegenschaft besteht basierend auf Ihren Angaben eine Prüfpflicht. Im nächsten Schritt
					erfassen wir die wichtigsten Informationen für die Beauftragung.</div>
			);
		}
	}


};

export default Pruefpflicht;