'use strict';
const db = require('./../db/db.js');
const User = db.model('user');
const filter = require('./filter');

const ReentryHandler = {};

ReentryHandler.reentry = (req, res) => {
	if (req.decoded) {
		User.findOne({ where: { id: req.decoded.id } })
		.then((user) => {
			if (!user) {
				res.status(400).send({
					success: false,
					message: 'reentry_failure_no_user'
				});
			} else {
				const filteredUser = filter(user);
				res.status(200).send({
					// In a typical login, fbToken and hToken would exist,
					// but here we don't bother tokenising the response
					success: true,
					message: "reentry_success_with_user.",
					user: filteredUser
				});
			}
		})
	} else {
		res.status(200).send({
			success: false,
			message: "reentry_failure_token_invalid"
		});
	}
};


module.exports = ReentryHandler;
