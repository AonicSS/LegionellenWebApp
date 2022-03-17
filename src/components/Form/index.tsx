import React from 'react';
import { useSelector } from 'react-redux';
import { AppReduxStoreProps } from '../../redux/reducers/App';
import Radio from './Radio';
import { RentingsInput, PostalCodeInput, RoomsInput } from './Input';
import Six from './Six';

const Form = () => {
	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	return (
		<>
			{currentAppStep === 1 && <RentingsInput />}
			{currentAppStep === 2 && <PostalCodeInput />}
			{currentAppStep === 3 && <RoomsInput />}
			{currentAppStep === 4 && <Radio />}
			{currentAppStep === 5 && <Six />}
			{/* {currentAppStep === 2 && <Radio />}  */}
		</>
	);
};

export default Form;
