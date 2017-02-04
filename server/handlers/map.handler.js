'use strict';

const db = require('./../db/db.js');
const User = db.model('user');
const Coord = db.model('coord');
const filter = require('./filter');
const Promise = require('bluebird');

const MapHandler = {}

MapHandler.getAllCoords = (req, res, next) => {
	return Coord.findAll({
		include: [User]
	})
	.then((coords) => {
		return Promise.map(coords, (coord) => {
			coord.user = filter(coord.user);
			return coord;
		})
	})
	.then((filteredCoords) => {
		res.status(200).send({
			success: true,
			coords: filteredCoords
		})
	})
	.catch(next);
};


MapHandler.updateUserCoord = (req, res, next) => { 
	return Coord.findOne({
		where: {
			user_id: req.decoded.id
		}
	})
	.then((coord) => {
		if (coord) {
			return coord.update({
				lat: req.body.lat,
				lng: req.body.lng
			})
		} else {
			return Coord.create({
				lat: req.body.lat,
				lng: req.body.lng,
				user_id: req.decoded.id
			})
		}
	})
	.then((freshCoord) => {
		res.status(200).send({
			success: true,
			coord: freshCoord
		});
	})
	.catch(next);
};

MapHandler.removeUserCoord = (req, res, next) => {
	return Coord.destroy({
		where: { user_id: req.decoded.id }
	})
	.then((affectedRows) => {
		if (affectedRows >= 1) { 
			res.status(200).send({ success: true });
		} else {
			res.status(400).send({ success: false });
		}
	})
	.catch(next);
};


module.exports = MapHandler;
