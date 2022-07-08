import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_APP_STEP } from '../../redux/actions/App';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import classnames from 'classnames';
import Button from '../../components/Button';
import { steps } from '../../components/Form/Steps';

const Stepper = () => {
	const dispatch = useDispatch();

	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const maxSteps = useSelector(
		(state: AppReduxStoreProps) => state.appData.maxSteps
	);

	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	const maxSubSteps = useSelector(
		(state: AppReduxStoreProps) => state.appData.maxSubSteps
	);

	const showModal = useSelector(
		(state: AppReduxStoreProps) => state.appData.showModal
	);

	const setAppStep = (step: number) => {
		step < currentAppStep
			? dispatch({ type: SET_APP_STEP, payload: { step: step } })
			: currentAppStep;
	};

	return (
		<div className="rwm-stepper">
			{(currentSubStep !== 0 || currentAppStep !== 1) && !showModal ? (
				<Button style="PREVIOUS" />
			) : (
				<div className="rwm-icon--hidden"></div>
			)}
			{Array(maxSteps)
				.fill(0)
				.map((_, key) => (
					<div key={key}>
						<div
							style={{
								width: '180px',
								height: '3px',
								borderRadius: '9999px',
								backgroundColor:
									currentAppStep === key + 1
										? '#E3E3E3'
										: currentAppStep >= key + 1
										? '#e20613'
										: '#E3E3E3',
							}}
							key={key}
							onClick={() => setAppStep(key + 1)}
						>
							{currentAppStep === key + 1 && (
								<div
									style={{
										height: '3px',
										width: '180px',
										borderRadius: '9999px',
										backgroundColor: '#e20913',
									}}
								></div>
							)}
						</div>
						<div
							className="stepper-title"
							style={{ textAlign: 'center' }}
						>
							{steps[key].title}
						</div>
					</div>
				))}
		</div>
	);
};

export default Stepper;
