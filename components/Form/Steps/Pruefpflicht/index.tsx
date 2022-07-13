import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import * as Scroll from 'react-scroll';
import Translate from '../../../../utils/translate';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../../../redux/reducers/App';
import Radio from '../../Radio';
import Check from '../../../../public/icons/check-red.svg';
import CheckGray from '../../../../public/img/Vector_gray.png';

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
			return (
				<Radio
					answersOverride={{
						yes: 'Ja',
						no: 'Nein',
						unsure: 'Ich weiß nicht',
					}}
				></Radio>
			);
		}
		case 1: {
			if (
				currentAppData.questions[
					'Besteht für Ihre Liegenschaft eine Prüfpflicht?'
				].answers.find((answer) => answer.name === 'choice')!.value ===
				'yes'
			) {
				currentAppData.currentQuestion = 'NO_QUESTION';
				return (
					<div className="tw-w-full tw-flex tw-justify-center tw-items-center">
						<div className="tw-w-[38px] tw-h-[38px] tw-mr-[27px]">
							<Check width={38} height={38} />
						</div>
						<section className="rwm-calculator__page-section tw-mt-8 tw-mx-6 tw-max-w-lg">
							<h1 className="tw-text-2xl tw-font-bold tw-text-[#0F172A]">
								Für Ihre Liegenschaft besteht basierend auf
								Ihren Angaben eine
								<span className="tw-text-[#E20613]">
									&nbsp;Prüfpflicht
								</span>
								. Im nächsten Schritt erfassen wir die
								wichtigsten Informationen für die Beauftragung.
							</h1>
						</section>
					</div>
				);
			}
			if (
				currentAppData.questions[
					'Besteht für Ihre Liegenschaft eine Prüfpflicht?'
				].answers.find((answer) => answer.name === 'choice')!.value ===
				'no'
			) {
				currentAppData.currentQuestion = 'NO_QUESTION';
				return (
					<div className="tw-w-full tw-flex tw-justify-center tw-items-center">
						<div className="tw-w-[38px] tw-h-[38px] tw-mr-[27px]">
							<img
								src={CheckGray.src}
								className="tw-w-[38px] tw-h-[38px]"
							/>
						</div>
						<section className="rwm-calculator__page-section tw-mt-8 tw-mx-6 tw-max-w-[34rem]">
							<h1>
								Für Ihre Liegenschaft besteht basierend auf
								Ihren Angaben
								<span className="tw-text-[#E20613]">
									&nbsp;keine Prüfpflicht
								</span>
								. Sie können trotzdem jederzeit freiwillig eine
								Legionellenprüfung durchführen lassen. So tragen
								Sie zum Gesundheitsschutz für Ihre Mieter*innen
								bei.
							</h1>
						</section>
					</div>
				);
			}
			return (
				<Radio
					questionTextOverride={
						'Hat die Liegenschaft eine zentrale Warmwasser-Erwärmung?'
					}
					answersOverride={{
						yes: 'Ja',
						no: 'Nein',
						unsure: 'Ich weiß nicht',
					}}
				></Radio>
			);
		}
		case 2: {
			return (
				<Radio
					questionTextOverride={
						'Sind an die zentrale Warmwasser-Erwärmung drei oder mehr Wohnungen angeschlossen, von denen mindestens eine vermietet ist?'
					}
					answersOverride={{
						yes: 'Ja',
						no: 'Nein',
						unsure: 'Ich weiß nicht',
					}}
				></Radio>
			);
		}
		case 3: {
			return (
				<Radio
					questionTextOverride={
						'Ist die Trinkwasseranlage mit einem Wasserspeicher mit mehr als 400 Litern verbunden oder hat mehr als 3 Liter im Leitungssystem?'
					}
					answersOverride={{
						yes: 'Ja',
						no: 'Nein',
						unsure: 'Ich weiß nicht',
					}}
				></Radio>
			);
		}

		case 4: {
			currentAppData.currentQuestion = 'NO_QUESTION';
			return (
				<div className="tw-w-full tw-flex tw-justify-center tw-items-center">
					<div className="tw-w-[38px] tw-h-[38px] tw-mr-[27px]">
						<Check width={38} height={38} />
					</div>
					<section className="rwm-calculator__page-section tw-mt-8 tw-mx-6 tw-max-w-[34rem]">
						<h1>
							Für Ihre Liegenschaft besteht basierend auf Ihren
							Angaben eine{' '}
							<span className="tw-text-[#E20613]">
								&nbsp;Prüfpflicht
							</span>
							. Im nächsten Schritt erfassen wir die wichtigsten
							Informationen für die Beauftragung.
						</h1>
					</section>
				</div>
			);
		}
	}
};

export default Pruefpflicht;
