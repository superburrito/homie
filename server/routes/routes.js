'use strict';

const router = require('express').Router();
const path = require('path');

// Landing page route
router.get('/', (req,res) => { 
	res.sendFile(path.join(__dirname, './../../public/index.html'));
});

router.use('/auth', require('./auth.js'));

router.use(require('./../utils/verification.middleware.js'));

// Past this point, the user has been authenticated and his/her existence 
// on the database is confirmed

router.use('/reentry', require('./reentry.js'))

router.use('/user', require('./user.js'));

router.use('/translate', require('./translate.js'));

router.use('/map', require('./map.js'));

router.use('/messages', require('./messages.js'));

module.exports = router;
