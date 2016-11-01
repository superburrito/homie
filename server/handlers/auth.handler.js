'use strict';

const db = require('./../db/db.js');
const User = db.model('user');

const request = require('request');
const tokenise = require('./tokenise');
const filter = require('./filter');

/* BCRYPT: Password hashing function by Niels Provos and David Mazieres (https://en.wikipedia.org/wiki/Bcrypt) */
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthHandler = {}


AuthHandler.localAuth = (req, res) => {
	return User.findOne({
		where: { email: req.body.email },
	})
	.then((user) => {
		/* compareSync returns a bool.
		   Here, we compare the given password to the hashed one. 
		   We do not have to pass in a salt because BCRYPT has 
			 salts built into its generated hashes 
			 (http://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts)
			 */
		console.log("Found user is:" + user);
		const comparePassword = bcrypt.compareSync(req.body.password, user.password);

		if (!user || !comparePassword) {
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
};


AuthHandler.localSignUp = (req, res) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(req.body.password, salt);

	return User.create({
		name: req.body.name,
		email: req.body.email,
		password: hash,
		bgUrl: ''
	})
	.then((user) => {
		const token = tokenise(user);
		const filteredUser = filter(user);
		res.status(200).send({
			success: true,
			message: "Account created and authenticated. Token attached!",
			token: token,
			user: filteredUser
		})
	}, () => {
		res.status(400).send({
			success: false,
			message: "Unable to create account."
		})
	})
};


AuthHandler.facebookAuth = (req, res) => {

	const receivedFbToken = req.body.fbToken;

	request('https://graph.facebook.com/v2.8/me?fields=name,email&access_token=' + receivedFbToken, 
		(err, fbRes, body) => {
			console.log("Facebook's res.body to server: " + body);
			if (res && res.statusCode == 200) { 	
				console.log("FB verified user is: " + body + ". Checking db...");
				const fbId = JSON.parse(body).id.replace('\u0040','@');
				const name = JSON.parse(body).name;
				const email = JSON.parse(body).email;
				
				// Email as a unique identifier for each account
				return User.findOne({ where: { email: email } })
				.then((user) => {
					// If FB user doesn't exist, create user
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
						.then((updatedUser) => { return updatedUser; })
					} else {
						return user;
					}
				})
				.then((user) => {
					const token = tokenise(user);
					const filteredUser = filter(user);
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
};


module.exports = AuthHandler;




/*


// All routes below require authentication ===================
router.use(require('./../utils/verification.middleware.js'));
// ===========================================================


router.get('/', function (req, res) {
	User.findAll()
	.then(function (users) {
		return res.status(200).send({
			success: true,
			message: "Users sent to client!",
			users: users
		});
	})
})

*/