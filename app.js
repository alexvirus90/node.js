var express = require('express');
var http = require('http');
// var errorhandler = require('errorhandler');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.use(express.favicon());
if(app.get('env') == 'development'){
	app.use(express.logger('dev'));
} else {
	app.use(express.logger('default'));
}

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(app.router);
app.get('/', function (req, res, next) {
	res.render('index')
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
	/*if(app.get('env') == 'development'){
		app.use(errorhandler());
	} else {
		app.use(function (error, req, res, next) {
			res.end('Error');
		});
	}*/
	// NODE_ENV = 'production'
	if (app.get('env') == 'development') {
		var errorHandler = express.errorHandler();
		errorHandler(err, req, res, next);
	} else {
		res.send(500);
	}
});
/*

var routes = require('./routes');
var user = require('./routes/user');

// all environments

app.get('/', routes.index);
app.get('/users', user.list);
*/

http.createServer(app).listen(config.get('port'), function(){
	log.info('Express server listening on port ' + config.get('port'));
});

