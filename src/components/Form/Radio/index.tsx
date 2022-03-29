import React from 'react';
import { useIntl } from 'react-intl';
import Translate from '../../../utils/translate';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ANSWER, SET_MODAL } from '../../../redux/actions/App';
import { ReactComponent as Check } from '../../../icons/check.svg';
import { ReactComponent as Decline } from '../../../icons/times.svg';

import './Radio.css';
import { AppReduxStoreProps } from '../../../redux/reducers/App';

const Radio = () => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const questionText = `${Translate(
		intl,
		`questions.${currentAppStep - 1}.question`
	)}`;

	const currentChoice = useSelector(
		(state: AppReduxStoreProps) =>
			state.appData.questions[currentAppStep - 1].choice
	);

	const handleChange = (value: string) => {
		const val = value === 'true' ? true : false;
		dispatch({
			type: SET_ANSWER,
			payload: {
				questionName: questionText,
				choice: val,
				btnActive: true,
			},
		});
		if (val && currentAppStep === 2) {
			dispatch({ type: SET_MODAL, payload: { showModal: true } });
		}
	};

	return (
		<div className="rwm-radio">
			<label className="rwm-form__headline">{questionText}</label>
			<fieldset className="rwm-radio__container lg:tw-mt-16 xl:tw-mt-16">
				<div
					className="rwm-radio__container-select tw-container-radio-first"
					onClick={() => handleChange('true')}
				>
					<div className="rwm-radio__container-icon-check">
						<Check fill="#4c4c4c" />
					</div>
					<label htmlFor="Ja" className="rwm-radio__label tw-mb-1">
						Ja
					</label>
					<div className="rwm-form__container-input">
						<input
							onChange={(e) => handleChange(e.target.value)}
							name="Ja"
							id="Ja"
							type="radio"
							value="true"
							checked={currentChoice === true}
							className={` ${
								currentChoice
									? 'tw-text-white tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-h-5 tw-w-5'
									: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-1 focus:tw-ring-transparent'
							} `}
						/>
					</div>
				</div>
				<div
					className="rwm-radio__container-select tw-container-radio"
					onClick={() => handleChange('false')}
				>
					<div className="rwm-radio__container-icon-decline">
						<Decline fill="#4c4c4c" />
					</div>
					<label htmlFor="Nein" className="rwm-radio__label tw-mb-1">
						Nein
					</label>
					<div className="rwm-form__container-input">
						<input
							onChange={(e) => handleChange(e.target.value)}
							name="Nein"
							id="Nein"
							type="radio"
							value="false"
							checked={currentChoice === false}
							className={` ${
								currentChoice === false
									? 'tw-text-white tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-h-5 tw-w-5'
									: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-1 focus:tw-ring-transparent'
							} `}
						/>
					</div>
				</div>
			</fieldset>
		</div>
	);
};

export default Radio;
