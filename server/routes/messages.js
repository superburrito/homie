'use strict';
const router = require('express').Router();
const MessagesHandler = require('../handlers/messages.handler.js');

router.get('/inbox', MessagesHandler.getInbox);
router.get('/sent', MessagesHandler.getSent)
router.post('/', MessagesHandler.sendMessage);
router.delete('/:messageId', MessagesHandler.removeMessage);

module.exports = router;
