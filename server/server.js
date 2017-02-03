'use strict';

var express = require('express');
var app = express();
var path = require('path');
var db = require('./db/db.js');
var Promise = require('bluebird');

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

			var Coord = db.model('coord');

			var userProm = User.create({
		  	  name: 'Rakesh Pk',
		  	  fbId: 549225760,
			  email: 'rakesh@hotmail.com',
			  password: 12345,
			  src: 'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/1503502_10153081589165761_3424469626701072341_n.jpg?oh=cfdfc93f6f287fb8b9699f091f0995f6&oe=5949B1DC',
			  bgUrl: ''
			})

			var coordProm = Coord.create({
				lat: 1.29,
				lng: 103.80
			})

			Promise.all([coordProm, userProm])
			.spread((coord, user) => {
				coord.setUser(user);
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



