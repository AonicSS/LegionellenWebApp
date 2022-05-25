import React, { useEffect } from 'react';
import Layout from '../../components/Layout';

declare global {
	interface Window {
		MktoForms2: any;
		siteDataLayer: any;
	}
}

const ReminderForm = () => {
	useEffect(() => {
		const MktoForms = window.MktoForms2;
		// TODO get env URL and ids from AEM config
		MktoForms.loadForm('//app-nld102.marketo.com', '784-BQV-997', 1207);
	}, []);

	return (
		<Layout>
			<section className="rwm-marketo__page-section tw-margin-top">
				<h1 className="rwm-radio__headline">Erinnerung erhalten</h1>
				<form id="mktoForm_1207"></form>
			</section>
		</Layout>
	);
};

export default ReminderForm;
