'use strict';

const router = require('express').Router();
const path = require('path');

// Landing page route
router.get('/', (req,res) => { 
	res.sendFile(path.join(__dirname, './../../public/index.html'));
});

router.use('/auth', require('./auth.js'));

router.use(require('./../utils/verification.middleware.js'));

router.use('/reentry', require('./reentry.js'))

router.use('/user', require('./user.js'));

router.use('/translate', require('./translate.js'));

router.use('/map', require('./map.js'));

module.exports = router;
