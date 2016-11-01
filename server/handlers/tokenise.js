'use strict';

var jwt = require('jsonwebtoken'); 
var config = require('./../config.js');

module.exports = function (user) {
	var token = jwt.sign(
		// Payload
		{ 
			id: user.id, 
			name: user.name,
			email: user.email 
		}, 
		// Signature + Header	
		config.secret, 
		{ 
			algorithm: 'HS256',
			expiresIn: '10d'
		}
	);
	return token;
}
