import formidable from "formidable";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req, res) => {
	console.log('new request');
	const form = formidable({multiples: true});
	form.parse(req, async (err, fields, files) => {
		debugger;
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
