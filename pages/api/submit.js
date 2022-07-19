import formidable from "formidable";
import fetch, {FormData, File, fileFrom, Blob, blobFromSync, fileFromSync} from 'node-fetch'
import {readFile} from 'fs/promises';

const API_URL = "https://prod-174.westeurope.logic.azure.com/workflows/6e30f52072f64fd48e06da4ffc824ba4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6y4UGb_dGJ0UdvccVjC7MO-Gy4d9rFQUQ9Dq4dOirY0";

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	host: "smtp.office365.com",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env['SMTP_USER'],
		pass: process.env['SMTP_PASSWORD'],
	},
});

export const config = {
	api: {
		bodyParser: false,
	},
};

function checkProbeEntnahmeVentile(appData) {
	switch (appData['questions']['Sind Probeentnahmeventile verbaut?'].answers.find((x) => x.name === 'choice').value) {
		case 'yes':
			return true;
		case 'no':
			return false;
		case 'unsure':
			switch (appData['questions']['Wissen Sie nach der Erklärung ob Probeentnahmeventile verbaut sind?'].answers.find((x) => x.name === 'choice').value) {
				case 'yes':
					return true;
				case 'no':
					return false;
				default:
					return false;
			}
		default:
			return false;
	}
}

function checkStrangAmount(appData) {
	switch (appData['questions']['Kennen Sie das Strangschema Ihrer Trinkwasseranlage?'].answers.find((x) => x.name === 'choice').value) {
		case 'yes':
			return appData.strangAmount;
		case 'no':
			return undefined;
		case 'unsure':
			switch (appData['questions']['Konnten Sie das Strangschema ermitteln?'].answers.find((x) => x.name === 'choice').value) {
				case 'yes':
					return appData.strangAmount;
				case 'no':
					return undefined;
				default:
					return undefined;
			}
		default:
			return undefined;
	}
}

export default async (req, res) => {
	console.log('new request');
	const form = formidable({});

	form.parse(req, async (err, fields, files) => {
		const data = await readFile(files.appData.filepath, "utf8");
		const appData = JSON.parse(data);


		let parsedValue = {
			strangAmount: appData.strangAmount,
			probeEntnahmeVentileVorhanden: checkProbeEntnahmeVentile(appData),
			liegenschaftAdresse: {
				streetName: appData['questions']['Wo befindet sich die zu prüfende Liegenschaft?'].answers.find((x) => x.name === 'streetName').value,
				houseNumber: appData['questions']['Wo befindet sich die zu prüfende Liegenschaft?'].answers.find((x) => x.name === 'houseNumber').value,
				postalCode: appData['questions']['Wo befindet sich die zu prüfende Liegenschaft?'].answers.find((x) => x.name === 'postalCode').value,
				city: appData['questions']['Wo befindet sich die zu prüfende Liegenschaft?'].answers.find((x) => x.name === 'city').value,
			},
			rechnungsAdresse: {
				streetName: appData['questions']['Anschrift'].answers.find((x) => x.name === 'streetName').value,
				houseNumber: appData['questions']['Anschrift'].answers.find((x) => x.name === 'houseNumber').value,
				postalCode: appData['questions']['Anschrift'].answers.find((x) => x.name === 'postalCode').value,
				city: appData['questions']['Anschrift'].answers.find((x) => x.name === 'city').value,
			},
			kunde: {
				honorificPrefix: appData['questions']['Anrede'].answers.find((x) => x.name === 'honorificPrefix').value,
				givenName: appData['questions']['Anrede'].answers.find((x) => x.name === 'givenName').value,
				familyName: appData['questions']['Anrede'].answers.find((x) => x.name === 'familyName').value,
				email: appData['questions']['Anrede'].answers.find((x) => x.name === 'email').value,
				phone: appData['questions']['Anrede'].answers.find((x) => x.name === 'phone').value,
				customerNumber: appData['questions']['Anrede'].answers.find((x) => x.name === 'customerNumber').value,
			},
			selectedProduct: {
				name: appData.selectedPricing.name,
				basePrice: appData.selectedPricing.price,
				extraServices: Object.keys(appData.selectedPricing.extraServices).filter((extraServiceName) => {
					return appData.selectedPricing.extraServices[extraServiceName].selected;
				}),
				totalExtras: appData.selectedPricing.totalExtras,
				total: appData.selectedPricing.total,
			}
		};

		const json = JSON.stringify(parsedValue);
		const blob = new Blob([json], {
			type: 'application/json'
		});


		const formData = new FormData();
		formData.set('message', blob);

		for (let fileName of Object.keys(files)) {
			if (fileName === 'appData') {
				continue;
			}
			const file = files[fileName];
			const blob = fileFromSync(file['filepath'], file['mimetype'])
			formData.append(fileName, blob);
		}

		const response = await fetch(API_URL, {method: 'POST', body: formData});
		console.log(response.status);

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: `"Ihre Anfrage" <${process.env['SMTP_USER']}>`, // sender address
			to: "qiong.wu@gfnork.de", // list of receivers
			subject: "Wir haben Ihren Auftrag erhalten", // Subject line
			text: "Sehr geehrter Herr Mustermann/Sehr geehrte Frau Mustermann,\n" +
				"vielen Dank für Ihr Vertrauen. Hiermit bestätigen wir den Eingang Ihres Auftrags.\n" +
				"Unser Legionellen-Team wird sich in Kürze mit Ihnen in Verbindung setzen, um alle weiteren Details zu\n" +
				"klären.\n" +
				"\n" +
				"Freundliche Grüße\n" +
				"Techem Energy Services GmbH",
			attachments: Object.keys(files).filter((fileName) => fileName !== 'appData').map((fileName) => {
				const file = files[fileName];
				return {   // filename and content type is derived from path
					filename: fileName,
					path: file['filepath']
				};
			}),
		});

		console.log("Message sent: %s", info.messageId);

		if (err) {
			res.writeHead(err.httpCode || 400, {'Content-Type': 'text/plain'});
			res.end(String(err));
			return;
		}
		res.json({
			message: 'success'
		});
	});
}
