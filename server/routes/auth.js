'use strict';
const router = require('express').Router();
const AuthHandler = require('../handlers/auth.handler.js');

router.post('/local/signup', AuthHandler.localSignUp);
router.post('/local', AuthHandler.localAuth);
router.post('/facebook', AuthHandler.facebookAuth);

module.exports = router;
