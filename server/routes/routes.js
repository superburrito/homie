'use strict';

const router = require('express').Router();
const path = require('path');

// Landing page 
router.get('/', (req,res) => { 
	res.sendFile(path.join(__dirname, './../../public/index.html'));
});

router.use('/auth', require('./auth.js'));

router.use(require('./../utils/verification.middleware.js'));

// Past this point, the user has been authenticated and his/her existence 
// on the database is confirmed

router.use('/reentry', require('./reentry.js'))

// API Routes
router.use('/api/user', require('./user.js'));
router.use('/api/map', require('./map.js'));
router.use('/api/messages', require('./messages.js'));
router.use('/api/forum', require('./forum.js'));
router.use('/api/translate', require('./translate.js'));


module.exports = router;
