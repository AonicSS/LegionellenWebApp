import formidable from 'formidable';

const API_URL =
	'https://eur02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fprod-174.westeurope.logic.azure.com%2Fworkflows%2F6e30f52072f64fd48e06da4ffc824ba4%2Ftriggers%2Fmanual%2Fpaths%2Finvoke%3Fapi-version%3D2016-06-01%26sp%3D%252Ftriggers%252Fmanual%252Frun%26sv%3D1.0%26sig%3D6y4UGb_dGJ0UdvccVjC7MO-Gy4d9rFQUQ9Dq4dOirY0&data=05%7C01%7Cmartin.dudde%40aonic.de%7Cdcd540fb887a409c638f08da5811242d%7Cc989b65028e2456fbbdcd6020ef438ea%7C0%7C0%7C637919127919586482%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=MRk6Pmn1ng9iEMcynm1X%2BNkh4djlEnp2yzz6pgJ9cGU%3D&reserved=0';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req, res) => {
	console.log('new request');

	const form = formidable({ multiples: true });

	form.parse(req, async (err, fields, files) => {
		debugger;
		if (err) {
			res.writeHead(err.httpCode || 400, {
				'Content-Type': 'text/plain',
			});
			res.end(String(err));
			return;
		}

		const response = await fetch(API_URL, {
			method: 'POST',
			body: JSON.stringify({ fields, files }),
		});

		res.json({
			message: 'success',
		});
	});
};
