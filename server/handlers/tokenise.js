'use strict';

var jwt = require('jsonwebtoken'); 
var config = require('./../env/index.js');

module.exports = function (user) {
	var token = jwt.sign(
		// Payload
		{ 
			id: user.id, 
			fbId: user.fbId || null,
			name: user.name,
			email: user.email 
		}, 
		// Signature + Header	
		config.secret, 
		{ 
			algorithm: 'HS256',
			expiresIn: '60d'
		}
	);
	return token;
}
