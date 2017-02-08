'use strict';

app.factory('TranslatorFactory', ($http, $mdDialog, $translate) => {
	var TranslatorFactory = {};

	TranslatorFactory.translate = (type, text) => {
		return $http.post('/translate', {
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


	return TranslatorFactory;
});