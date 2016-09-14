'use strict';

var bodyParser = require('body-parser');
var morgan = require('morgan');
var express = require('express')
var router = express.Router();


// Boilerplate for parsing requests as JSON
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// Boilerplate for logging requests
router.use(morgan('dev'));


module.exports = router;
