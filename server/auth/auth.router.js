'use strict';

var router = require('express').Router();

router.use('/local', require('./local.router.js'));
router.use('/facebook', require('./facebook.router.js'));


module.exports = router;
