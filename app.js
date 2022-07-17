const express = require('express');
const app = express();
let cors = require('cors');
require('dotenv').config();

function sumOfDigits(n) {
	let a = 0;
	while (n > 0) {
		a = a + n % 10;
		n = parseInt(n / 10, 10);
	}
	return a;
}

function isValidIMEI(n) {
	let s = n.toString();
	let len = s.length;
	if (len != 15) return false;
	let sum = 0;
	for (let i = len; i >= 1; i--) {
		let d = n % 10;
		if (i % 2 == 0) d = 2 * d;
		sum += sumOfDigits(d);
		n = parseInt(n / 10, 10);
	}
	return sum % 10 == 0;
}

app.use(
	cors({
		origin: '*'
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ hello: 'this is an api' });
});

app.get('/:id', (req, res) => {
	// res.json({ valid: isValidIMEI(req.params.id) ? 'valid' : 'notValid' });
	res.send((isValidIMEI(parseInt(req.params.id)) ? 'Valid' : 'InValid') + ' IMEI Code');
});

let port = process.env.PORT || 9000;

app.listen(port, () => {
	console.log(`Server running at ${port}`);
});
