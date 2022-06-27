import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import * as Scroll from 'react-scroll';
import Translate from '../../../../utils/translate';
import {useDispatch, useSelector} from 'react-redux';
import {SET_ANSWER, SET_APP_STEP, SET_CURRENT_QUESTION} from '../../../../redux/actions/App';
import {AppReduxStoreProps} from '../../../../redux/reducers/App';
import Pricing from "../../Pricing";
import Summary from "../../../../views/summary";
import SummaryFinal from "../../../../views/summary-final";

const Angebot = () => {
	const dispatch = useDispatch();
	const [street, setStreet] = useState('');
	const [houseNumber, setHouseNumber] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [residence, setResidence] = useState('');

	const intl = useIntl();
	const scroller = Scroll.scroller;

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	const currentQuestion = useSelector(
		(state: AppReduxStoreProps) => state.appData.currentQuestion
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

		dispatch({
			type: SET_CURRENT_QUESTION,
			payload: {
				currentQuestion: 'Wo befindet sich die zu prüfende Liegenschaft?',
			},
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
			return (
				<>
					<section className="rwm-forms__page-section tw-margin-top">
						<div className="tw-flex tw-flex-col">
							<label className="rwm-form__headline">
								<h1 className="rwm-form__headline">
									Wo befindet sich die zu prüfende Liegenschaft?
								</h1>
							</label>
							<div
								className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2">
								<div className="rwm-form__input-container">
									<label className="tw-flex tw-font-size-label tw-font">
										Straße*
									</label>
									<input
										type="text"
										name="streetName"
										className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
										value={street}
										onChange={(e) => setStreet(e.target.value)}
									/>
								</div>
								<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
									<label className="tw-flex tw-font-size-label tw-font">
										Hausnummer*
									</label>
									<input
										type="text"
										name="houseNumber"
										className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
										value={houseNumber}
										onChange={(e) => setHouseNumber(e.target.value)}
									/>
								</div>
							</div>
							<div
								className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2  tw-mt-6">
								<div className="rwm-form__input-container">
									<label className="tw-flex tw-font-size-label tw-font">
										Postleitzahl*
									</label>
									<input
										type="number"
										name="postalCode"
										className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
										value={postalCode}
										onChange={(e) => setPostalCode(e.target.value)}
									/>
								</div>
								<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
									<label className="tw-flex tw-font-size-label tw-font">
										Wohnort*
									</label>
									<input
										type="text"
										name="residence"
										className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
										value={residence}
										onChange={(e) => setResidence(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</section>
				</>
			);
		}
		case 1: {
			return (
				<section className="tw-margin-top">
					<div className="tw-flex tw-justify-center tw-mt-14 tw-mb-14">
						<h1>Unser Angebot für Sie</h1>
					</div>
					<div className="tw-flex tw-justify-center tw-mt-14 tw-mb-14">
						<h1>Unser Angebot für Sie</h1>
					</div>
					Für die Liegenschaft Europaplatz 4, 64285 Darmstadt       mit 2 Strängen       und vorhandenen Probeentnahmeventilen       haben wir folgendes Angebot für Sie kalkuliert:
					<Pricing/>
				</section>
			);
		}
		case 2: {
			return (
				<Summary/>
			);
		}
		case 3: {
			return (
				<SummaryFinal/>
			);
		}
	}


};

export default Angebot;
