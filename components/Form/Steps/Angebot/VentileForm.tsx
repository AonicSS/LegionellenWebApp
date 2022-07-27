import React from 'react';
import Radio from '../../Radio';

import StrangSchemaAnleitung from '../../../../public/img/strangschema_anleitung.png';
import ProbeenthahmeventileIcon from '../../../../public/icons/probeentnahmeventile.svg';
import Uploader from '../../../Uploader';

const VentileForm = ({ currentAppData }) => {
	return (
		<div>
			<Radio
				questionTextOverride={'Sind Probeentnahmeventile verbaut?'}
				answersOverride={{
					yes: 'Ja',
					no: 'Nein',
					unsure: 'Ich weiß nicht',
				}}
			></Radio>

			{currentAppData.questions[
				'Sind Probeentnahmeventile verbaut?'
			]!.answers.find((answer) => answer.name === 'choice')!.value !==
				'unsure' && (
				<div className="tw-flex tw-justify-center tw-mt-28">
					<ProbeenthahmeventileIcon height={300} />
				</div>
			)}
			{currentAppData.questions[
				'Sind Probeentnahmeventile verbaut?'
			]!.answers.find((answer) => answer.name === 'choice')!.value ===
				'no' && (
				<div className={'tw-p-6 tw-mt-8 tw-bg-lightest-grey'}>
					Falls noch nicht vorhanden, müssen die Probeentnahmeventile
					von einer Fachkraft angebracht werden.
				</div>
			)}
			{currentAppData.questions[
				'Sind Probeentnahmeventile verbaut?'
			]!.answers.find((answer) => answer.name === 'choice')!.value ===
				'yes' && (
				<>
					<div className={'tw-flex tw-justify-center tw-my-6'}>
						<div className={'tw-max-w-lg tw-p-6'}>
							Sie können hier eine Abbildung ihres Strangschemas
							hochladen, um die Aufnahme Ihrer Liegenschaft zu
							erleichtern.
						</div>
					</div>
					<Uploader uploadId={'valves'} />
				</>
			)}
			{currentAppData.questions[
				'Sind Probeentnahmeventile verbaut?'
			]!.answers.find((answer) => answer.name === 'choice')!.value ===
				'unsure' && (
				<>
					<div className={'tw-flex tw-justify-center tw-my-6'}>
						<img
							src={StrangSchemaAnleitung.src}
							className={
								'tw-w-full tw-h-auto tw-object-contain lg:tw-max-w-lg'
							}
						/>
					</div>
					<Radio
						questionTextOverride={
							'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?'
						}
						showTitle={false}
						orientation={'vertical'}
						answersOverride={{
							yes: 'Diese Information war hilfreich. Ich weiß jetzt, ob Probeentnahmeventile verbaut sind.',
							no: 'Ich weiß nicht, ob Probeentnahmeventile verbaut sind und benötige Unterstützung.',
						}}
					></Radio>
					{currentAppData.questions[
						'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?'
					]!.answers.find((answer) => answer.name === 'choice')!
						.value === 'yes' && (
						<>
							<div
								className={'tw-flex tw-justify-center tw-my-6'}
							>
								<div className={'tw-max-w-lg tw-p-6'}>
									Sie können hier eine Abbildung ihres
									Strangschemas hochladen, um die Aufnahme
									Ihrer Liegenschaft zu erleichtern.
								</div>
							</div>
							<Uploader uploadId={'valves'} />
						</>
					)}
					{currentAppData.questions[
						'Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?'
					]!.answers.find((answer) => answer.name === 'choice')!
						.value === 'no' && (
						<div className={'tw-flex tw-justify-center tw-my-6'}>
							<div
								className={
									'tw-max-w-lg tw-p-6 tw-bg-lightest-grey'
								}
							>
								Falls noch nicht vorhanden, müssen die
								Probeentnahmeventile von einer Fachkraft
								angebracht werden.
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default VentileForm;
