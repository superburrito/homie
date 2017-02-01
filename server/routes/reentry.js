'use strict';
const router = require('express').Router();
const ReentryHandler = require('../handlers/reentry.handler.js');

router.get('/', ReentryHandler.reentry);

module.exports = router;
