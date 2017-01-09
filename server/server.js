'use strict';

var express = require('express');
var app = express();
var path = require('path');
var db = require('./db/db.js');

// Standard middleware
app.use(require('./utils/parsing-logging.middleware.js'));
app.use(require('./utils/static.middleware.js'));


// API routes
app.use(require('./routes/routes.js'));

// Landing page route
app.get('/', function (req,res) {
	res.sendFile(path.join(__dirname, './../public/index.html'));
});


// Error handling
app.use(require('./utils/error.middleware.js'));



// ===========================
// ====== Start server =======
// ===========================
var port = 3000;
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

			User.create({
				name: 'Rakesh Pk',
			  email: 'rakesh@hotmail.com',
			  password: 'password',
			  bgUrl: ''
			})

			// =====================


			console.log("Database reset and models synced.");
			
		}, function () {
			console.log("Database sync failed.");
		})
		.then(function () {
			console.log('Homie server is up. Listening on port: ', port);
		})
	}
});



