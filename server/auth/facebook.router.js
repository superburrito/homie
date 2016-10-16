'use strict';

var router = require('express').Router();
var db = require('./../db/db.js');
var User = db.model('user');
var request = require('request');
var tokenise = require('./tokenise');
var filter = require('./filter');

router.post('/', function (req, res) {

	var receivedFbToken = req.body.fbToken;

	request('https://graph.facebook.com/v2.8/me?fields=name,email&access_token=' + receivedFbToken, function (err, fbRes, body) {
			console.log("Facebook's res.body to server: " + body);
			if (res && res.statusCode == 200) { 	
				console.log("FB verified user is: " + body + ". Checking db...");
				var fbId = JSON.parse(body).id.replace('\u0040','@');
				var name = JSON.parse(body).name;
				var email = JSON.parse(body).email;
				
				return User.findOne({ where: { email: email } })
				.then(function (user) {
					// If FB user doesn't exist
					if (!user) { 
						return User.create({
							fbId: fbId,
							name: name,
							email: email,
							bgUrl: null
						})
					// If user exists, but not registered as FB user
					} else if (!user.fbId) {
						return User.update({ fbId: fbId })
						.then(function(){ return user; })
					} else {
						return user;
					}
				})
				.then(function (user){
					var token = tokenise(user);
					var filteredUser = filter(user);
					return res.status(200).send({
						success: true,
						message: 'Authentication with FB succeeded, token attached!',
						token: token,
						user: filteredUser
					});
				})
			} else {
				return res.status(400).send({ 
					success: false,
					message: 'Authentication with FB failed.'
				})
			}
	})
});


module.exports = router;

