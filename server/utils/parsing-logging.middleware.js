'use strict';

var express = require('express')
var router = express.Router();

var bodyParser = require('body-parser');
var morgan = require('morgan');

// Boilerplate for parsing POST requests
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// Boilerplate for logging client requests on the console
router.use(morgan('dev'));


module.exports = router;
