'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken'); 
const secret = require('./../env/index.js').secret; 

// Verifies that token sent is valid, passes it on
router.use(function (req, res, next) {
	var token = req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, secret, function (err, decoded) {
			if (err) {
				return res.status(403).send({ 
					success: false, 
					message: "Failed to authenticate token."
				});
			} else {	
				req.decoded = decoded;
				next();
			}
		})
	} else {
		return res.status(403).send({ 
			success: false, 
			message: "No token provided." 
		});
	}
})


module.exports = router;
