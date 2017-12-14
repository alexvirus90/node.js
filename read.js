var fs = require('fs');
var http = require('http');

new http.Server(function (req, res) {
	if (req.url == '/big.html'){

		var file = new fs.ReadStream('big.html');
		sendFile(file, res);

		// fs.readFile('big.html', function (err, content) {
		// 	if (err){
		// 		res.statusCode = 500;
		// 		res.end('Server error');
		// 	} else {
		// 		res.setHeader('Content-type', 'text/html; charset=utf-8');
		// 		res.end(content);
		// 	}
		// });
	}
}).listen(3000);

function sendFile(file, res) {
	file.pipe(res);
	
	file.on('error', function (err) {
		res.statusCode = 500;
		res.end('Server Error');
		console.error(err);
	});

	file
		.on('open', function () {
			console.log('open');
		})
		.on('close', function () {
			console.log('close');
		});
	res.on('close', function () {
		file.destroy();
	});
}
