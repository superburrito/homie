'use strict';

var express = require('express');
var app = express();
var path = require('path');
var db = require('./db/db.js');

// Parse and log server requests
app.use(require('./utils/parsing-logging.middleware.js'));
// Serve dependency files + serve files in /public "as root"
app.use(require('./utils/static.middleware.js'));
// Respond to API data requests
app.use(require('./routes/routes.js'));
// Serve landing page 
app.get('/', function (req,res) {
	res.sendFile(path.join(__dirname, './../public/index.html'));
});
// Error handling
app.use(require('./utils/error.middleware.js'));


// ===========================
// ====== Start server =======
// ===========================
var port = 8080;
app.listen(port, function (err) {
	if (err) {
		throw err;
	} else {
		db.sync({ force: true })
		.then(function () {

			// =====================
			// ====== Testing ======
			// =====================

			var User = db.model('user');

			return User.create({
		  	  name: 'Rakesh Pk',
			  email: 'rakesh@hotmail.com',
			  password: 'password',
			  bgUrl: ''
			})

			// =====================


			console.log("Database reset and models synced.");
			
		}, function (err) {
			console.log(err);
			console.log("Database sync failed.");
		})
		.then(function () {
			console.log('Homie server is up. Listening on port: ', port);
		})
	}
});



