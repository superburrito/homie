'use strict';

app.factory('TranslatorFactory', ($http, $mdDialog, $translate) => {
	var TranslatorFactory = {};

	TranslatorFactory.translate = (type, text) => {
		return $http.post('/api/translate', {
			text: text,
			lang: type
		})	
		.then(function (res) { 
			console.log("[Translate] Res: " + JSON.stringify(res.data));
			return res.data; 
		})
	}

	TranslatorFactory.launchTutorial = () => {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('.currentNavItem')))
	        .clickOutsideToClose(true)
	        .title($translate.instant('TRANSLATE_POPUP_HEADER'))
	        .textContent($translate.instant('TRANSLATE_POPUP_MAIN'))
	        .ariaLabel('Translator Tutorial Dialog')
	        .ok($translate.instant('TRANSLATE_POPUP_OK'))
	    );
	    localStorage.setItem('HOMIE-sTransT', 'seen');
	}	


	TranslatorFactory.addPhrase = function (phrase) {
		var phrases = TranslatorFactory.getPhrasebook();
		phrases.push(phrase);
		localStorage.setItem('HOMIE-phrasebook', JSON.stringify(phrases));
	}

	/* Phrasebook is an array of objects, i.e.
		[
			{
				translated: dua ayam,
				translation: two chicken
			} 
		]

	*/
	TranslatorFactory.getPhrasebook = function () {
		if (!localStorage.getItem('HOMIE-phrasebook')) {
			localStorage.setItem('HOMIE-phrasebook', JSON.stringify([]));
			TranslatorFactory.getPhrasebook();
		}
		return JSON.parse(localStorage.getItem('HOMIE-phrasebook'));
	}

	TranslatorFactory.deletePhrase = function (deletedPhrase) {
		var phrases = TranslatorFactory.getPhrasebook();
		phrases = phrases.filter(function (phrase) {
			return phrase.translated !== deletedPhrase.translated;
		})
		localStorage.setItem('HOMIE-phrasebook', JSON.stringify(phrases));
	}	




	return TranslatorFactory;
});