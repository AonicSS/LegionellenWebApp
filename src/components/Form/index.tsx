import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import Radio from './Radio';
import { RentingsInput, PostalCodeInput, RoomsInput } from './Input';
import Six from './Six';
import { trackStepper } from '../../utils/tracking';
import Pruefpflicht from "./Steps/Pruefpflicht";

const Form = () => {
	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	useEffect(() => {
		trackStepper(currentAppStep);
	}, [currentAppStep]);

	return (
		<>
			{currentAppStep === 1 && < Pruefpflicht />}
			{currentAppStep === 2 && <PostalCodeInput />}
			{currentAppStep === 3 && <RoomsInput />}
			{currentAppStep === 4 && <RentingsInput />}
			{currentAppStep === 5 && <Six />}
			{/* {currentAppStep === 2 && <Radio />}  */}
		</>
	);
};

export default Form;
