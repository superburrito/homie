'use strict';

const db = require('./../db/db.js');
const User = db.model('user');
const Question = db.model('question');
const Response = db.model('response');
const Promise = require('bluebird');

const ForumHandler = {}

ForumHandler.getAllQuestions = (req, res, next) => {
	return Question.findAll({
		include: [{
			model: User,
			as: 'asker',
			attributes: ['id','fbId','name','email','src','description']
		}]
	})
	/*.then((questions) => {
		return Promise.map(questions, (question) => {
			return question.getResponses()
			.then((responses) => {
				question.responses = responses;
				return question;
			})
		});
	})*/
	.then((questions) => {
		return res.status(200).send({
			success: true,
			questions: questions
		})
	})
	.catch(next);
}


ForumHandler.getQuestion = (req, res, next) => {
	return Question.findOne({
		where: { id: req.params.questionId },
		include: [{
			model: User,
			as: 'asker',
			attributes: ['id','fbId','name','email','src','description']
			},{
			model: Response,
			include: [{
				model: User,
				as: 'responder'
			}]
		}]
	})
	.then((question) => {
		return res.status(200).send({
			success: true,
			question: question
		})
	})
	.catch(next);
}


ForumHandler.postQuestion = (req, res, next) => {
	return Question.create({
		title: req.body.title,
		content: req.body.content,
		category: req.body.category	
	})
	.then((question) => {
		if (question) {
			return res.status(200).send({ success: true })
		} else {
			return res.status(400).send({ success: false })
		}
	})
	.catch(next);
}


ForumHandler.postResponse = (req, res, next) => {
	return Response.create({
		content: req.body.content,
		question_id: req.params.questionId,
		responder_id: req.decoded.id,
		likesCtr: 0
	})
	.then((response) => {
		if (response) {
			return res.status(200).send({ 
				success: true,
				response: response
			})
		} else {
			return res.status(400).send({ success: false })
		}
	})
	.catch(next);
}




module.exports = ForumHandler;