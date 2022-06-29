import formidable from "formidable";


export default (req, res) => {
	console.log('new request');
	const form = formidable({multiples: true});
	form.parse(req, (err, fields, files) => {
		if (err) {
			res.writeHead(err.httpCode || 400, {'Content-Type': 'text/plain'});
			res.end(String(err));
			return;
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({fields, files}, null, 2));
	});
}
