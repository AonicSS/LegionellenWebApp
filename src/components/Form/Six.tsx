import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import Translate from '../../utils/translate';
import { useDispatch, useSelector } from 'react-redux';
import { SET_YEARS } from '../../redux/actions/App';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import Pricing from './Pricing';
import Button from '../Button';

const Six = () => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const handleClick = useCallback((e: any) => {
		const years = e.target.value;

		dispatch({
			type: SET_YEARS,
			payload: {
				years: parseInt(years),
			},
		});
	}, []);

	return (
		<div className="tw-flex tw-flex-col">
			<label className="rwm-form__headline">
				<h1>{Translate(intl, `questions.5.question`)}</h1>
			</label>

			<fieldset className="tw-grid tw-grid-cols-3 tw-gap-24 tw-mt-8">
				<div className="">
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
						<input
							onClick={(event) => handleClick(event)}
							type="radio"
							value="5"
							className="focus:tw-ring-transparent focus:tw-text-btnBgColorActive focus:tw-border-6 focus:tw-border-btnBgColorActive tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3"
						/>
						<label htmlFor="yes" className="rwm-radio__label">
							5 Jahre
						</label>
					</div>
				</div>
				<div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
					<input
						onClick={(event) => handleClick(event)}
						type="radio"
						value="8"
						className="focus:tw-ring-transparent focus:tw-text-btnBgColorActive focus:tw-border-6 focus:tw-border-btnBgColorActive tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3"
					/>
					<label htmlFor="yes" className="rwm-radio__label">
						8 Jahre
					</label>
				</div>
				<div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
					<input
						onClick={(event) => handleClick(event)}
						type="radio"
						value="10"
						className="focus:tw-ring-transparent focus:tw-text-btnBgColorActive focus:tw-border-6 focus:tw-border-btnBgColorActive tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3"
					/>
					<label htmlFor="yes" className="rwm-radio__label">
						10 Jahre
					</label>
				</div>
			</fieldset>
			<Pricing />
			<Button text="Alle Leistungen der Service Pakete" style={'LINK'} />
		</div>
	);
};

export default Six;
