'use strict';

app.factory('PhrasebookFactory', function () {
	var PhrasebookFactory = {};

	/* Phrasebook is an array of objects, i.e.
		[
			{
				translated: dua ayam,
				translation: two chicken
			} 
		]

	*/

	PhrasebookFactory.addPhrase = function (phrase) {
		var phrases = PhrasebookFactory.getPhrasebook();
		phrases.push(phrase);
		localStorage.setItem('HOMIE-phrasebook', JSON.stringify(phrases));
	}

	PhrasebookFactory.getPhrasebook = function () {
		if (!localStorage.getItem('HOMIE-phrasebook')) {
			localStorage.setItem('HOMIE-phrasebook', JSON.stringify([]));
			PhrasebookFactory.getPhrasebook();
		}
		return JSON.parse(localStorage.getItem('HOMIE-phrasebook'));
	}

	PhrasebookFactory.deletePhrase = function (deletedPhrase) {
		var phrases = PhrasebookFactory.getPhrasebook();
		phrases = phrases.filter(function (phrase) {
			return phrase.translated !== deletedPhrase.translated;
		})
		localStorage.setItem('HOMIE-phrasebook', JSON.stringify(phrases));
	}	

	return PhrasebookFactory;
});

