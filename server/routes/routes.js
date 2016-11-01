'use strict';

const router = require('express').Router();
const path = require('path');

// Landing page route
router.get('/', (req,res) => { 
	res.sendFile(path.join(__dirname, './../../public/index.html'));
});

router.use('/auth', require('./auth.js'));

module.exports = router;
