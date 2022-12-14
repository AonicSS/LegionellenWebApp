import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppReduxStoreProps} from '../../redux/reducers/App';
import {trackStepper} from '../../utils/tracking';
import Pruefpflicht from "./Steps/Pruefpflicht";
import Trinkwasseranlage from "./Steps/Trinkwasseranlage";
import Angebot from "./Steps/Angebot";


const Form = () => {
	const currentAppStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.step
	);

	const currentSubStep = useSelector(
		(state: AppReduxStoreProps) => state.appData.subStep
	);

	useEffect(() => {
		trackStepper(currentAppStep, currentSubStep);
	}, [currentAppStep, currentSubStep]);


	return (
		<>
			{currentAppStep === 1 && <Pruefpflicht/>}
			{currentAppStep === 2 && <Trinkwasseranlage/>}
			{currentAppStep === 3 && <Angebot/>}

		</>
	);
};

export default Form;
