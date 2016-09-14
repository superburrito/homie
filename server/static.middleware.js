'use strict';

var express = require('express');
var router = express.Router();

// Serve static dependencies 
router.use('/node_modules', express.static(__dirname + '/../node_modules'));

router.use('/bower_components', express.static(__dirname + '/../bower_components'));

// Serve browser pages
router.use('/browser', express.static(__dirname + '/../browser'));


module.exports = router;
