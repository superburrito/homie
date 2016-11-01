'use strict';
const router = require('express').Router();
const TranslateHandler = require('../handlers/translate.handler.js');

router.post('/', TranslateHandler.translate);

module.exports = router;
