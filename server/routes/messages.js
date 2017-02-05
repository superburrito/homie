'use strict';
const router = require('express').Router();
const MessagesHandler = require('../handlers/messages.handler.js');

router.get('/', MessagesHandler.getAllMessages);
router.post('/', MessagesHandler.sendMessage);
router.delete('/:messageId', MessagesHandler.removeMessage);
router.delete('/all', MessagesHandler.removeAllMessages);

module.exports = router;
