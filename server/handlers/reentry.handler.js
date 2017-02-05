'use strict';
const db = require('./../db/db.js').db;
const User = db.model('user');
const filter = require('./filter');

const ReentryHandler = {};

ReentryHandler.reentry = (req, res) => {
	return User.findOne({ where: { id: req.decoded.id } })
	.then((user) => {
		const filteredUser = filter(user);
		res.status(200).send({
			// In a typical login, fbToken and hToken would exist,
			// but this is a re-entry, so we don't bother tokenising 
			// the response
			success: true,
			msg: "reentry_success_with_user",
			user: filteredUser
		});
	});
};


module.exports = ReentryHandler;
