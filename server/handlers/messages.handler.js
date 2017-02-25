'use strict';

const db = require('./../db/db.js');
const User = db.model('user');
const Message = db.model('message');

const MessagesHandler = {}

MessagesHandler.getInbox = (req, res, next) => {
	return Message.findAll({ 
		where: { 
			receiver_id: req.decoded.id,
			receiverdeleted: false
		},
		include: [{
			model: User,
			as: 'sender',
			attributes: ['id','fbId','name','email','src','description']
		}]
	})
	.then((messages) => {
		return res.status(200).send({
			success: true,
			messages: messages
		})
	})
	.catch(next);
}


MessagesHandler.getSent = (req, res, next) => {
	return Message.findAll({ 
		where: { 
			sender_id: req.decoded.id, 
			senderdeleted: false
		},
		include: [{
			model: User,
			as: 'receiver',
			attributes: ['id','fbId','name','email','src','description']
		}]
	})
	.then((messages) => {
		return res.status(200).send({
			success: true,
			messages: messages
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
		receiver_id: req.body.receiver_id,
		senderdeleted: false,
		receiverdeleted: false
	})
	.then((createdMessage) => {
		res.status(200).send({
			success: true,
			msg: 'message_get_success',
			createdMessage: createdMessage
		})
	})
	.catch(next);
}
	

MessagesHandler.removeMessage = (req, res, next) => {
	return Message.findOne({
		where: { id: req.params.messageId }
	})
	.then((message) => {
		if (message.sender_id === req.decoded.id) {
			return message.update({
				senderdeleted: true
			})
		} else if (message.receiver_id === req.decoded.id) {
			return message.update({
				receiverdeleted: true
			})
		} else {
			return Promise.reject();
		}
	})
	.then((message) => {
		if (message.senderdeleted === true &&
			message.receiverdeleted === true) {
			return message.destroy();
		}
	})
	.then(() => {
		return res.status(200).send({ success: true })
	})
	.catch(next);
}


MessagesHandler.removeAllMessages = (req, res, next) => {
	return Message.destroy({ where: { receiver_id: req.decoded.id } })
	.then(() => {
		res.status(200).send({ success: true });
	})
	.catch(next);
}

module.exports = MessagesHandler;