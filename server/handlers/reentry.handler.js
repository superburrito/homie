'use strict';
const db = require('./../db/db.js');
const User = db.model('user');

const ReentryHandler = {};

ReentryHandler.reentry = (req, res) => {
	if (req.decoded) {
		User.findOne({ where: { fbId: req.decoded.fbId } })
		.then((user) => {
			if (!user) {
				res.status(400).send({
					success: false,
					message: 'Re-entry failed, user does not exist on DB.'
				});
			} else {
				res.status(200).send({
					// In a typical login, fbToken and hToken would exist,
					// but here we don't bother tokenising the response
					success: true,
					message: "Re-entry succeeded, HOMIE token valid.",
					user: user
				});
			}
		})
	} else {
		res.status(200).send({
			success: false,
			message: "Re-entry failed, HOMIE token not found or invalid."
		});
	}
};


module.exports = ReentryHandler;
