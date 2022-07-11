import formidable from "formidable";
import fetch, {FormData, File, fileFrom} from 'node-fetch'

const API_URL = "https://prod-174.westeurope.logic.azure.com/workflows/6e30f52072f64fd48e06da4ffc824ba4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6y4UGb_dGJ0UdvccVjC7MO-Gy4d9rFQUQ9Dq4dOirY0";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req, res) => {
	console.log('new request');
	const form = formidable({multiples: true});
	form.parse(req, async (err, fields, files) => {
		console.log(fields);
		console.log(files);
		debugger;


		const formData = new FormData()
		const binary = new Uint8Array([97, 98, 99])
		const abc = new File([binary], 'abc.txt', {type: 'text/plain'})
		formData.set('message', fields.appData)
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
