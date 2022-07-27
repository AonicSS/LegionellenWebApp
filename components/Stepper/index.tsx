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
		<section className="tw-pt-5 tw-pb-1 tw-margin-top tw-sticky tw-top-0 tw-bg-white tw-z-[100]">
			<div className="rwm-stepper tw-relative tw-gap-x-5 tw-mx-auto tw-flex tw-items-center tw-justify-center tw-max-w-3xl ">
				<div className="tw-absolute tw-left-0">
					{(currentSubStep !== 0 || currentAppStep !== 1) &&
					!showModal ? (
						<Button style="PREVIOUS" />
					) : (
						<div className="rwm-icon--hidden"></div>
					)}
				</div>
				{Array(maxSteps)
					.fill(0)
					.map((_, key) => (
						<div
							key={key}
							className="tw-flex tw-flex-col tw-items-center"
						>
							<div
								className="tw-w-[90px] lg:tw-w-[180px] tw-rounded-full tw-h-[3px]"
								style={{
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
											width: `${
												(100 * currentSubStep) /
												maxSubSteps
											}%`,
											borderRadius: '9999px',
											backgroundColor: '#e20913',
										}}
									></div>
								)}
							</div>
							<div className="!tw-font-semibold stepper-title tw-pt-[10px] tw-leading-4 tw-text-black tw-text-center">
								{steps[key].title}
							</div>
						</div>
					))}
			</div>
		</section>
	);
};

export default Stepper;
