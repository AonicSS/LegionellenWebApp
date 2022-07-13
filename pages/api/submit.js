import formidable from "formidable";
import fetch, {FormData, File, fileFrom, Blob} from 'node-fetch'
import {readFile} from 'fs/promises';

const API_URL = "https://prod-174.westeurope.logic.azure.com/workflows/6e30f52072f64fd48e06da4ffc824ba4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6y4UGb_dGJ0UdvccVjC7MO-Gy4d9rFQUQ9Dq4dOirY0";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req, res) => {
	console.log('new request');
	const form = formidable({});

	form.parse(req, async (err, fields, files) => {
		const data = await readFile(files.appData.filepath, "utf8");
		const appData = JSON.parse(data);
		debugger;
		console.log(appData);

		let parsedValue = {
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
			}
		};


		const json = JSON.stringify(parsedValue);
		const blob = new Blob([json], {
			type: 'application/json'
		});

		const formData = new FormData()
		const binary = new Uint8Array([97, 98, 99])
		const abc = new File([binary], 'abc.txt', {type: 'text/plain'})
		formData.set('message', blob)
		formData.set('file-upload', abc, 'new name.txt')
		const response = await fetch(API_URL, {method: 'POST', body: formData});
		console.log(response.status);

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
