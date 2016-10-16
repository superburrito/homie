'use strict';

var router = require('express').Router();

// Users API route 
router.use('/user', require('./user.router.js'));

module.exports = router;
