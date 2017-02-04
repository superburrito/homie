'use strict';

const db = require('./../db/db.js');
const User = db.model('user');
const Message = db.model('message');
const Promise = require('bluebird');
const filter = require('./filter');
const MessagesHandler = {}

MessagesHandler.getAllMessages = (req, res, next) => {
	return Message.findAll({ 
		where: { receiverId: req.decoded.id },
	})
	.then((messages) => {
		return Promise.map(messages, (message) => {
			return User.findOne({ where: { id: message.senderId } })
			.then((user) => {
				message.user = filter(user);
				return message;
			})
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
	return Message.findOne({
		where: { id: req.body.messageId }
	})
	.then((message) => {
		message.destroy()
		.success(() => {
			res.status(200).send({ success: true });
		})
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