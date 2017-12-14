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
	file.on('readable', write);

	function write() {
		var fileContent = file.read();

		if (fileContent && !res.write(fileContent)) {
			file.removeListener('readable', write);

			res.once('drain', function () {
				file.on('readable', write);
				write();
			});
		}
	}
	file.on('end', function () {
		res.end();
	})
}
