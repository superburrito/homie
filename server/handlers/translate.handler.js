'use strict';

const yandexKey = require('./../env/index.js').yandexKey; 

const request = require('request');

const TranslateHandler = {}


TranslateHandler.translate = (req, res) => {

	// Default langauge settings: Tagalog -> English
	const lang = req.body.lang;
	const text = req.body.text;
	request('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + yandexKey +
		'&text=' + text +
		'&lang=' + lang, 
		(err, yandexRes, body) => {
			if (yandexRes && yandexRes.statusCode == 200) { 	
				console.log("Yandex Response is: " + body);
				res.status(200).send({
					success: true,
					translatedText: JSON.parse(body).text[0],
					direction: JSON.parse(body).lang
				});
			} else {
				console.log("Translation with Yandex failed: " + err);
				res.status(400).send({
					success: false
				})
			}
		}
	)
};


module.exports = TranslateHandler;
