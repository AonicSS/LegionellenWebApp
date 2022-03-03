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

	const handleClick = useCallback((e: any) => {
		const years = e.target.value;

		dispatch({
			type: SET_YEARS,
			payload: {
				years: parseInt(years),
			},
		});
	}, []);

	const years = useSelector(
		(state: AppReduxStoreProps) => state.appData.years
	);

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
							checked={years === 5}
							className={` ${
								years === 5
									? 'tw-text-white tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-h-5 tw-w-5'
									: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3 focus:tw-ring-transparent'
							} `}
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
						checked={years === 8}
						className={` ${
							years === 8
								? 'tw-text-white tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-h-5 tw-w-5'
								: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3 focus:tw-ring-transparent'
						} `}
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
						checked={years === 10}
						className={` ${
							years === 10
								? 'tw-text-white tw-border-1 tw-border-btnColorDisabled focus:tw-ring-transparent tw-h-5 tw-w-5'
								: 'tw-h-5 tw-w-5 tw-text-white tw-border-btnColorDisabled tw-border-3 focus:tw-ring-transparent'
						}  `}
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
