'use strict';

const db = require('./../db/db.js').db;
const User = db.model('user');

const UserHandler = {};


UserHandler.updateProfile = (req, res) => {
	const bgUrl = req.body.bgUrl;
	return User.findOne({ where: {id: req.decoded.id} })
	.then((user) => {
		return user.update({ bgUrl: bgUrl })
	})
	.then(() => {
		res.status(200).send({ success: true })
	})
};


module.exports = UserHandler;