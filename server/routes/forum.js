'use strict';
const router = require('express').Router();
const ForumHandler = require('../handlers/forum.handler.js');

router.get('/', ForumHandler.getAllQuestions);

router.get('/:questionId', ForumHandler.getQuestion);

router.post('/', ForumHandler.postQuestion);

router.post('/:questionId', ForumHandler.postResponse);

module.exports = router;
