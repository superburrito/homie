'use strict';

const config = require('./../env/index.js');

const db = require('./../db/db.js');
const User = db.model('user');

const rp = require('request-promise');

const tokenise = require('./tokenise');

/* BCRYPT: Password hashing function by Niels Provos and David Mazieres (https://en.wikipedia.org/wiki/Bcrypt) */
/*const bcrypt = require('bcrypt');
const saltRounds = 10;*/

const AuthHandler = {}


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
				const hToken = tokenise(user);
				return res.status(200).send({
					success: true,
					message: 'Authentication with FB succeeded, tokens attached!',
					hToken: hToken,
					fbToken: llToken,
					user: user
				});
			});
		})
	})
	.catch((err) => {
		console.log("Token Exchange with FB failed: " + err);
		return res.status(400).send({ 
			success: false,
			message: 'Token Exchange with FB failed.'
		})
	})
}


module.exports = AuthHandler;