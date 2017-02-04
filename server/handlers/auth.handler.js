'use strict';

const config = require('./../env/index.js');

const db = require('./../db/db.js');
const User = db.model('user');

const rp = require('request-promise');

const tokenise = require('./tokenise');
const filter = require('./filter');

// BCRYPT: Password hashing function by Niels Provos and David Mazieres (https://en.wikipedia.org/wiki/Bcrypt) 
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthHandler = {}

AuthHandler.localAuth = (req, res, next) => {
	return User.findOne({
		where: { email: req.body.email }
	})
	.then((user) => {
		if (!user) {
			res.status(400).send({ 
				success: false, 
				msg: 'auth_failure_not_found'
			});
		} else {
			console.log("Found user is:" + user);
			/* compareSync returns a bool.
		   	Here, we compare the given password to the hashed one. 
		   	We do not have to pass in a salt because BCRYPT has 
			salts built into its generated hashes 
			(http://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts) */
			const comparePassword = bcrypt.compareSync(req.body.password, user.password);
			if (!comparePassword) {
				res.status(400).send({ 
					success: false, 
					msg: 'auth_failure_wrong_val'
				});
			} else {
				const hToken = tokenise(user);
				const filteredUser = filter(user);
				res.status(200).send({ 
					success: true, 
					msg: 'auth_success_with_tokens', 
					hToken: hToken,
					user: filteredUser
				});
			}
		}
	})
	.catch(next);
};


AuthHandler.localSignUp = (req, res, next) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(req.body.password, salt);

	return User.findOne({
		where: { email: req.body.email }
	})
	.then((user) => {
		if (user) {
			res.status(400).send({
				success: false,
				msg: "account_exists",
			})
		} else {
			return User.create({
				name: req.body.name,
				email: req.body.email,
				password: hash,
				bgUrl: null
			})
		}
	})
	.then((createdUser) => {
		const hToken = tokenise(createdUser);
		const filteredUser = filter(createdUser);
		res.status(200).send({
			success: true,
			msg: "account_created_with_token",
			hToken: hToken,
			user: filteredUser
		})
	}, () => {
		res.status(400).send({
			success: false,
			msg: "account_creation_failed"
		})
	})
	.catch(next);
};

AuthHandler.facebookAuth = (req, res) => {
	const APP_ID = config.fbAppId;
	const APP_SECRET = config.fbAppSecret;
	const SHORT_LIVED_TOKEN = req.body.slToken;

	console.log("Firing request for long lived token...");
	rp('https://graph.facebook.com/oauth/access_token?' +
			'client_id=' + APP_ID + 
			'&client_secret=' + APP_SECRET + 
			'&grant_type=fb_exchange_token' + 
			'&fb_exchange_token=' + SHORT_LIVED_TOKEN)
	.then((llTokenStr) => {
		console.log("fbResBody: " + llTokenStr);
		const llToken = llTokenStr.slice(13,-16);
		return llToken;
	})
	.then((llToken) => {
		return rp('https://graph.facebook.com/v2.8/me?fields=name,email,picture.type(large)&access_token=' + llToken)
		.then((resBody) => {
			console.log("resBody: " + resBody);
			const parsedBody = JSON.parse(resBody);
			const fbId = parsedBody.id.replace('\u0040','@');
			const name = parsedBody.name;
			const email = parsedBody.email.replace('\u0040','@');
			const src = parsedBody.picture.data.url || null;
			return User.findOne({ where: { fbId: fbId} })		
			.then((user) => {
				if (!user) {
					return User.create({
						fbId: fbId,
						name: name,
						email: email,
						src: src,
						bgUrl: null
					})
				} else {
					return user.update({
						name: name,
						email: email,
						src: src
					})
				}
			})
			.then((user) => {
				const filteredUser = filter(user);
				const hToken = tokenise(user);
				return res.status(200).send({
					success: true,
					msg: 'fb_auth_success_with_tokens',
					hToken: hToken,
					fbToken: llToken,
					user: filteredUser
				});
			});
		})
	})
	.catch((err) => {
		console.log("Token Exchange with FB failed: " + err);
		return res.status(400).send({ 
			success: false,
			msg: 'fb_auth_failure_no_tokens'
		})
	})
}


module.exports = AuthHandler;