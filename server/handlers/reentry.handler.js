'use strict';
const db = require('./../db/db.js');
const User = db.model('user');

const tokenise = require('./tokenise');
const filter = require('./filter');

const ReentryHandler = {};

ReentryHandler.reentry = (req, res) => {
	if (req.decoded) {
		User.findOne({ where: { id: req.decoded.id } })
		.then((user) => {
			if (!user) {
				res.status(400).send({
					success: false,
					message: 'Re-entry failed, user no longer exists on DB.'
				});
			} else {
				var token = tokenise(user);
				var filteredUser = filter(user);
				res.status(200).send({
					success: true,
					message: "Re-entry succeeded, fresh token attached!",
					token: token,
					user: filteredUser
				});
			}
		})
	} else {
		res.status(200).send({
			success: false,
			message: "Re-entry failed, token not found or invalid."
		});
	}
};


module.exports = ReentryHandler;
