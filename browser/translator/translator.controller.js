'use strict';

app.controller('TranslatorCtrl', function($scope, $state, $http, PhrasebookFactory, ToastFactory){
	// Hide any loading animations
	$scope.notLoading = true;

	// Player disabled by default
	$scope.playerDisabled = true;

	// Directly call HTTP here, no need for service
	$scope.translate = function (type) {
		$scope.playerDisabled = true;
		if ($scope.textToTranslate) {
			$scope.notLoading = false;
			$http.post('/translate', {
				text: $scope.textToTranslate,
				lang: type
			})	
			.then(function (res) { 
				console.log("Response is: " + JSON.stringify(res.data));
				return res.data; 
			})
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
			PhrasebookFactory.addPhrase({ 
				translated: fromLang + ': ' + $scope.textToTranslate,
				translation: toLang + ': ' + $scope.translatedText
			})
			ToastFactory.phraseSaved();
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