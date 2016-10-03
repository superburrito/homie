'use strict';

// Dependencies
var express = require('express');
var app = express();
var path = require('path');

// Parsing, logging, static-serving middleware
app.use(require('./parsing-logging.middleware.js'));
app.use(require('./static.middleware.js'));


// Serve landing page
app.get('/', function(req,res, next){
	res.sendFile(path.join(__dirname, './../public/index.html'));
});


// Error handling
app.use(require('./error.middleware.js'));


// Start server
var port = 3000;
app.listen(port, function(err) {
	if(err){
		throw err;
	}else{
		console.log('Homie server is up. Listening on port: ', port);
	}
});

