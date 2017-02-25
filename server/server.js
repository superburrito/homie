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
const port = 8080;
app.listen(port, function (err) {
	if (err) {
		throw err;
	} else {
		db.sync({ force: true })
		.then(function () {

			// =====================
			// ====== Testing ======
			// =====================

			const User = db.model('user');
			const Coord = db.model('coord');
			const Question = db.model('question');
			const Response = db.model('response');

			var userProm = User.create({
		  	  name: 'Rakesh Pk',
		  	  fbId: 549225760,
			  email: 'rakesh@hotmail.com',
			  password: 12345,
			  src: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/1503502_10153081589165761_3424469626701072341_n.jpg?oh=4a6174cb65a9e5ecfbd7cd2000b617cf&oe=590C225B'
			})

			var coordProm = Coord.create({
				lat: 1.29,
				lng: 103.80
			})

			var questionProm = Question.create({
				title: 'Negotiating Pay',
				content: `How to negotiate pay? My employer is very problematic. She does not understand that I have to support my family back at home. I need some help. Can somebody help me talk to my employer? I will appreciate it...`,
				category: 'Salary',
			})

			var respProm = Response.create({
				title: 'This is how you do it',
				content: 'You talk to her.',
				likesCtr: 0
			})


			return Promise.all([coordProm, userProm, questionProm, respProm])
			.spread((coord, user, question, response) => {
				return coord.setUser(user)
				.then(() => {
					return question.setAsker(user);
				})
				.then(() => {
					return response.setResponder(user);
				})
				.then(() => {
					return question.addResponse(response);
				});
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



