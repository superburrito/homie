'use strict';

const db = require('./../db/db.js');
const User = db.model('user');
const Message = db.model('message');

const MessagesHandler = {}

MessagesHandler.getAllMessages = (req, res, next) => {
	return Message.findAll({ 
		where: { receiver_id: req.decoded.id },
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
	return Message.destroy({ where: { receiver_id: req.decoded.id } })
	.then(() => {
		res.status(200).send({ success: true });
	})
	.catch(next);
}


module.exports = MessagesHandler;