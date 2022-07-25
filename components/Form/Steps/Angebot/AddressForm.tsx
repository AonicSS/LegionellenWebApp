import React from 'react';

const AddressForm = ({ currentQuestion, handleChange }) => {
	return (
		<div className="tw-flex tw-flex-col">
			<label className="rwm-form__headline tw-m-auto tw-pb-10">
				<h1 className="text-title rwm-form__headline tw-leading-[37px] tw-font-bold">
					Wo befindet sich die zu prüfende Liegenschaft?
				</h1>
			</label>
			<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-justify-between tw-mt-2 tw-w-full">
				<div className="rwm-form__input-container">
					<label className="tw-flex tw-font-light tw-text-[16px] tw-leading-[149.5%] tw-text-[#605E5C] tw-font">
						Straße*
					</label>
					<input
						type="text"
						name="streetName"
						className="rwm-form__input-custom tw-border-[0.5px]  'focus:tw-ring-transparent"
						value={
							currentQuestion.answers.find(
								(answer) => answer.name === 'streetName'
							)
								? currentQuestion.answers.find(
										(answer) => answer.name === 'streetName'
								  )!.value
								: ''
						}
						onChange={(e) =>
							handleChange(e.target.value, e.target.name)
						}
					/>
				</div>
				<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
					<label className="tw-flex tw-font-light tw-text-[16px] tw-leading-[149.5%] tw-text-[#605E5C] tw-font">
						Hausnummer*
					</label>
					<input
						type="text"
						name="houseNumber"
						className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
						value={
							currentQuestion.answers.find(
								(answer) => answer.name === 'houseNumber'
							)
								? currentQuestion.answers.find(
										(answer) =>
											answer.name === 'houseNumber'
								  )!.value
								: ''
						}
						onChange={(e) =>
							handleChange(e.target.value, e.target.name)
						}
					/>
				</div>
			</div>
			<div className="rwm-form__input-container-large tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-mt-6 tw-w-full">
				<div className="rwm-form__input-container">
					<label className="tw-flex tw-font-light tw-text-[16px] tw-leading-[149.5%] tw-text-[#605E5C] tw-font">
						Postleitzahl*
					</label>
					<input
						type="number"
						name="postalCode"
						className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
						value={
							currentQuestion.answers.find(
								(answer) => answer.name === 'postalCode'
							)
								? currentQuestion.answers.find(
										(answer) => answer.name === 'postalCode'
								  )!.value
								: ''
						}
						onChange={(e) =>
							handleChange(e.target.value, e.target.name)
						}
					/>
				</div>
				<div className="rwm-form__input-container tw-mt-4 md:tw-mt-0 lg:tw-mt-0 xl:tw-mt-0">
					<label className="tw-flex tw-font-light tw-text-[16px] tw-leading-[149.5%] tw-text-[#605E5C] tw-font">
						Wohnort*
					</label>
					<input
						type="text"
						name="city"
						className="rwm-form__input-custom tw-border-2 'focus:tw-ring-transparent"
						value={
							currentQuestion.answers.find(
								(answer) => answer.name === 'city'
							)
								? currentQuestion.answers.find(
										(answer) => answer.name === 'city'
								  )!.value
								: ''
						}
						onChange={(e) =>
							handleChange(e.target.value, e.target.name)
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default AddressForm;
