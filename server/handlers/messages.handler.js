'use strict';

const db = require('./../db/db.js').db;
const User = db.model('user');
const Sender = require('./../db/db.js').Sender;
const Message = db.model('message');
const Promise = require('bluebird');
const filter = require('./filter');
const MessagesHandler = {}

MessagesHandler.getAllMessages = (req, res, next) => {
	return Message.findAll({ 
		where: { receiver_id: req.decoded.id },
		include: [Sender]
	})
	.then((messages) => {
		return Promise.map(messages, (message) => {
			message.sender = filter(message.sender);
			return message;
		})
	})
	.then((messagesWithSender) => {
		res.status(200).send({
			success: true,
			msg: 'message_get_success',
			messages: messagesWithSender
		})
	})
	.catch(next);
}

MessagesHandler.sendMessage = (req, res, next) => {
	console.log("Received receiver_id: " + req.body.receiver_id);
	return Message.create({
		title: req.body.title,
		content: req.body.content,
		sender_id: req.decoded.id,
		receiver_id: req.body.receiver_id
	})
	.then((createdMessage) => {
		res.status(200).send({
			success: true,
			msg: 'message_get_success',
			messages: createdMessage
		})
	})
	.catch(next);
}
	

MessagesHandler.removeMessage = (req, res, next) => {
	return Message.destroy({
		where: { id: req.params.messageId }
	})
	.then(() => {
		res.status(200).send({ success: true });
	})
	.catch(next);
}


MessagesHandler.removeAllMessages = (req, res, next) => {
	return Message.destroy({ where: { receiverId: req.decoded.id } })
	.then(() => {
		res.status(200).send({ success: true });
	})
	.catch(next);
}


module.exports = MessagesHandler;