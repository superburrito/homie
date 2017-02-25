'use strict';

const db = require('./../db/db.js');
const User = db.model('user');
const filter = require('./filter');

const UserHandler = {};


UserHandler.update = (req, res, next) => {
	return User.findOne({ where: {id: req.decoded.id} })
	.then((user) => {
		return user.update(req.body)
	})
	.then((user) => {
		res.status(200).send({ 
			success: true, 
			user: filter(user)
		})
	})
	.catch(next);
};


module.exports = UserHandler;