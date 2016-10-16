'use strict';

var router = require('express').Router();
var db = require('./../db/db.js');
var User = db.model('user');
var tokenise = require('./tokenise.js');
var filter = require('./filter');

router.post('/', function (req, res) {
	return User.findOne({
		where: { 
			email: req.body.email, 
			password: req.body.password 
		},
		attributes: ['id', 'name', 'email', 'bgUrl']
	})
	.then(function (user) {
		if (!user) {
			res.status(400).send({ success: false, message: 'Authentication Failed.'});
		} else if (user) {
			var token = tokenise(user);
			var filteredUser = filter(user);

			res.status(200).send({ 
				success: true, 
				message: 'Authentication Succeeded, token attached!', 
				token: token,
				user: filteredUser
			});
		}
	})
});


router.post('/signup', function (req, res) {
	return User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	.then(function (user) {
		var token = tokenise(user);
		var filteredUser = filter(user);
		res.status(200).send({
			success: true,
			message: "Account created and authenticated. Token attached!",
			token: token,
			user: filteredUser
		})
	}, function () {
		res.status(400).send({
			success: false,
			message: "Unable to create account."
		})
	})
});


module.exports = router;
