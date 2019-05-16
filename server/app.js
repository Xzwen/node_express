'use strict';

var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan'); //  控制台输出日字
var mongoose = require('mongoose');
var config = require('./config');
// var createError = require('http-errors');   //  捕获statusCode,做对应处理
// var cookieParser = require('cookie-parser'); //  设置cookie
// var debug = require('debug')('myapp:server');
// mongoose.Promise = require('bluebird');  

var app = express();

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// mongoose.set('debug', true);

var server = http.createServer(app);
// server.listen(port);
// server.on('listening', onListening);

// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../public')));

require('./routes').default(app);

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render(path.resolve(__dirname, '../views/error'));
// });

function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

startServer();

module.exports = app;
