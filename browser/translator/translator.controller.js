'use strict';

app.controller('TranslatorCtrl', function($scope, $state, $http, TranslatorFactory, ToastFactory, $translate){
	
	// Setview
	$scope.view = 'translator';
	$scope.setView = (str) => { $scope.view = str; }

	// Launch tutorial
	if (localStorage.getItem('HOMIE-sTransT') !== 'seen') {
		TranslatorFactory.launchTutorial();
	}

	/* ----- PHRASEBOOK ----- */

	function loadAndCheckPhrases() {
		$scope.phrases = TranslatorFactory.getPhrasebook();
		($scope.phrases.length === 0) 
			? $scope.noSavedPhrases = true
			: $scope.noSavedPhrases = false;
	}
	loadAndCheckPhrases();

	$scope.deletePhrase = function (phraseObj) {
		TranslatorFactory.deletePhrase(phraseObj);
		$scope.phrases = TranslatorFactory.getPhrasebook();
		if ($scope.phrases.length === 0) $scope.noSavedPhrases = true;
	}

	$scope.goToTranslator = function () {
		$state.go('translator');
	}

	$scope.phraseCanBePlayed = function (phrase) {
		return ['Eng','Ind','Chi'].indexOf(phrase.translation.split(':')[0]) !== -1;
	}

	$scope.playSavedPhrase = function (phrase) {
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



	/* ------ TRANSLATOR ------ */ 
	// Hide any loading animations
	$scope.notLoading = true;

	// Player disabled by default
	$scope.playerDisabled = true;

	// Directly call HTTP here, no need for service
	$scope.translate = function (type) {
		$scope.playerDisabled = true;
		if ($scope.textToTranslate) {
			$scope.notLoading = false;

			return TranslatorFactory.translate(type, $scope.textToTranslate)
			.then(function (data) {
				$scope.notLoading = true;
				$scope.translatedText = data.translatedText; 
				$scope.direction = data.direction;

				updatePlayer($scope.direction);
			})
		}
	};

	$scope.playPhrase = function () {
		responsiveVoice.speak($scope.translatedText, convertYandexToRV($scope.direction.split('-')[1]));
	}

	$scope.savePhrase = function () {
		if ($scope.direction && $scope.translatedText) {
			var fromLang = convertYandexToWord($scope.direction.split('-')[0]);
			var toLang = convertYandexToWord($scope.direction.split('-')[1]);
			TranslatorFactory.addPhrase({ 
				translated: fromLang + ': ' + $scope.textToTranslate,
				translation: toLang + ': ' + $scope.translatedText
			})
			ToastFactory.displayMsg(
				$translate.instant('T_TRANSLATOR_SAVED'), 500);
			loadAndCheckPhrases();
		}
	};


	function updatePlayer(direction) {
		if (['id', 'en', 'zh'].indexOf(direction.split('-')[1]) !== -1) {
			$scope.playerDisabled = false;
		}
	}

	function convertYandexToWord(yandexCode) {
		if (yandexCode == 'id') {
			return 'Ind';
		} else if (yandexCode == 'en') {
			return 'Eng';
		} else if (yandexCode == 'tl') {
			return 'Tag';
		} else if (yandexCode == 'zh') {
			return 'Chi';
		}
	}

	// Yandex -> ResponsiveVoice.JS 
	function convertYandexToRV(yandexCode) {
		if (yandexCode == 'id') {
			return 'Indonesian Female';
		} else if (yandexCode == 'en') {
			return 'US English Female';
		} else if (yandexCode == 'zh') {
			return 'Chinese Female';
		}
	}


})