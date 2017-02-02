'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken'); 
const secret = require('./../env/index.js').secret; 

// Verify that hToken sent is valid 
router.use(function (req, res, next) {
	const hToken = req.headers['x-access-token'];
	if (hToken) {
		jwt.verify(hToken, secret, function (err, decoded) {
			if (err) {
				return res.status(403).send({ 
					success: false, 
					message: "Failed to authenticate hToken."
				});
			} else {	
				req.decoded = decoded;
				next();
			}
		})
	} else {
		return res.status(403).send({ 
			success: false, 
			message: "No hToken provided." 
		});
	}
})

module.exports = router;
