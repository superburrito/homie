'use strict';

app.controller('PhrasebookCtrl', ($scope, PhrasebookFactory, $state) => {
	$scope.phrases = PhrasebookFactory.getPhrasebook();

	if ($scope.phrases.length == 0) {
		$scope.noSavedPhrases = true;
	} else {
		$scope.noSavedPhrases = false;
	}

	$scope.deletePhrase = function (phraseObj) {
		PhrasebookFactory.deletePhrase(phraseObj);
		$scope.phrases = PhrasebookFactory.getPhrasebook();
		if ($scope.phrases.length == 0) $scope.noSavedPhrases = true;
	}


	$scope.phraseCanBePlayed = function (phrase) {
		return ['Eng','Ind','Chi'].indexOf(phrase.translation.split(':')[0]) !== -1;
	}

	$scope.playPhrase = function (phrase) {
		// Yandex -> ResponsiveVoice.JS 
		var translationWord = phrase.translation.split(':')[0];
		var translationText = phrase.translation.split(':').slice(1).join()
		if (translationWord == 'Ind') {
			responsiveVoice.speak(translationText, 'Indonesian Female');
		} else if (translationWord == 'Eng') {
			responsiveVoice.speak(translationText, 'US English Female');
		} else if (translationWord == 'Chi') {
			responsiveVoice.speak(translationText, 'Chinese Female');
		}
	}


});
