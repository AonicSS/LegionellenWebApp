import React, { useCallback } from 'react';
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
		if (!val && currentAppStep === 2) {
			dispatch({ type: SET_MODAL, payload: { showModal: true } });
		}
	};

	return (
		<div className="rwm-radio">
			<label className="rwm-radio__headline">{questionText}</label>
			<fieldset className="rwm-radio__container">
				<div className="rwm-radio__container-select tw-container-radio-first">
					<div className="rwm-radio__container-icon-check">
						<Check fill="#4c4c4c" />
					</div>
					<label htmlFor="yes" className="rwm-radio__label">
						Ja
					</label>
					<div className="rwm-form__container-input">
						<input
							onChange={(e) => handleChange(e.target.value)}
							name="Ja"
							type="radio"
							value="true"
							defaultChecked={currentChoice}
							className="focus:tw-ring-transparent focus:tw-text-btnBgColorActive focus:tw-border-6 focus:tw-border-btnBgColorActive tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3"
						/>
					</div>
				</div>
				<div className="rwm-radio__container-select tw-container-radio">
					<div className="rwm-radio__container-icon-decline">
						<Decline fill="#4c4c4c" />
					</div>
					<label htmlFor="no" className="rwm-radio__label">
						Nein
					</label>
					<div className="rwm-form__container-input">
						<input
							onChange={(e) => handleChange(e.target.value)}
							defaultChecked={currentChoice}
							name="Nein"
							type="radio"
							value="false"
							className="focus:tw-ring-transparent focus:tw-text-btnBgColorActive focus:tw-border-6 focus:tw-border-btnBgColorActive tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3 tw-items"
						/>
					</div>
				</div>
			</fieldset>
		</div>
	);
};

export default Radio;
