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

			var user1Prom = User.create({
		  	  name: 'Rakesh Pk',
		  	  fbId: 549225760,
			  email: 'rakesh@hotmail.com',
			  password: null,
			  src: 'https://scontent.xx.fbcdn.net/v/t31.0-1/p960x960/11004659_10153081589165761_3424469626701072341_o.jpg?oh=efbc53289568f6a5ac27045d0039d598&oe=5959E630'
			})

			var user2Prom = User.create({
				name: 'Samuel Lum',
				fbId: 609773352,
				email: 'samlum@hotmail.com',
				password: null,
				src: 'https://scontent.xx.fbcdn.net/v/t1.0-1/11140076_10153425855378353_4338146854147431988_n.jpg?oh=a50c1a2e07ffafdb7b0030ddd371e165&oe=59539382'
			})

			var coord1Prom = Coord.create({
				lat: 1.29,
				lng: 103.80
			})

			var coord2Prom = Coord.create({
				lat: 1.30,
				lng: 103.81
			})

			var question1Prom = Question.create({
				title: 'Negotiating Pay',
				content: `How to negotiate pay? My employer is very problematic. She does not understand that I have to support my family back at home. I need some help. Can somebody help me talk to my employer? I will appreciate it...`,
				category: 'Salary',
			})


			var question2Prom = Question.create({
				title: 'Knee Injury',
				content: `I injured my knee yesterday while cleaning the fan. I saw the doctor already, but it is still quite painful. Does anyone have advice on how I can feel better?`,
				category: 'Health',
			})

			var resp1Prom = Response.create({
				content: 'Ask HOME or FAST for help. You can call them with this app.',
				likesCtr: 1
			})

			var resp2Prom = Response.create({
				content: 'Thank you... you are nice.',
				likesCtr: 0
			})


			return Promise.all([
					user1Prom, user2Prom,
					coord1Prom, coord2Prom,
					question1Prom, question2Prom,
					resp1Prom, resp2Prom
			])
			.spread((user1, user2, coord1, coord2, question1, question2, resp1, resp2) => {
				return coord1.setUser(user1)
				.then(() => coord2.setUser(user2))
				.then(() => question1.setAsker(user1))
				.then(() => question2.setAsker(user2))
				.then(() => resp1.setResponder(user2))
				.then(() => resp2.setResponder(user1))
				.then(() => question1.addResponse(resp1))
				.then(() => question1.addResponse(resp2))
				.then(() => console.log("Test data added"));
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



