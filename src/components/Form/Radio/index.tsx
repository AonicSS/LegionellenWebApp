import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import * as Scroll from 'react-scroll';
import Translate from '../../../utils/translate';
import {useDispatch, useSelector} from 'react-redux';
import {SET_ANSWER, SET_APP_STEP} from '../../../redux/actions/App';
import {ReactComponent as Check} from '../../../icons/check.svg';
import {ReactComponent as Decline} from '../../../icons/times.svg';


import './Radio.css';
import {AppReduxStoreProps} from '../../../redux/reducers/App';

const Radio = ({
				   showTitle = true,
				   questionTextOverride,
				   questionNameOverride,
				   answersOverride = {'yes': 'Ja', 'no': 'Nein'},
				   children,
				   orientation = 'horizontal'
			   }: any) => {
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

	const questionText = questionTextOverride ?? `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const currentChoice = useSelector(
		(state: AppReduxStoreProps) =>
			state.appData.questions.find((x) => x.question === questionText)!.choice
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
	};

	return (
		<>
			{
				(orientation === 'vertical') &&

				<div className="tw-flex">
					{
						showTitle && <label className="rwm-form__headline">{questionText}</label>
					}
					<fieldset
						className={`tw-w-full lg:tw-grid-rows-${Object.keys(answersOverride).length}`}>
						{Object.keys(answersOverride).map((answer: string) => {
							return (<div
								key={answer}
								className="tw-w-full"
								onClick={() => handleChange(answer)}
							>
								<div className="tw-mb-10">
									<input
										onChange={() => handleChange(answer)}
										name={answersOverride[answer]}
										id={answersOverride[answer]}
										type="radio"
										checked={currentChoice === answer}
										className="tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-text-white tw-h-5 tw-w-5"
									/>
									<label htmlFor={answersOverride[answer]} className="tw-ml-10">
										{answersOverride[answer]}
									</label>
								</div>
							</div>);
						})}
					</fieldset>
				</div>
			}
			{
				(orientation === 'horizontal') &&
				<div className="rwm-radio">
					{
						showTitle && <label className="rwm-form__headline">{questionText}</label>
					}
					<fieldset
						className={`rwm-radio__container lg:tw-mt-16 xl:tw-mt-16 lg:tw-grid-cols-${Object.keys(answersOverride).length}`}>
						{Object.keys(answersOverride).map((answer: string) => {
							return (<div
								key={answer}
								className="rwm-radio__container-select tw-container-radio"
								onClick={() => handleChange(answer)}
							>
								<label htmlFor={answersOverride[answer]} className="rwm-radio__label tw-mb-1">
									{answersOverride[answer]}
								</label>
								<div className="rwm-form__container-input">
									<input
										onChange={() => handleChange(answer)}
										name={answersOverride[answer]}
										id={answersOverride[answer]}
										type="radio"
										checked={currentChoice === answer}
										className="tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-text-white tw-h-5 tw-w-5"
									/>
								</div>
							</div>);
						})}
					</fieldset>
				</div>
			}
		</>
	);
};

export default Radio;
