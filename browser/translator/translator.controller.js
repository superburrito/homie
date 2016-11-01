'use strict';

app.controller('TranslatorCtrl', function($scope, $state, $http, StoreFactory, ToastFactory){
	// Hide any loading animations
	$scope.notLoading = true;

	// Directly call HTTP here, no need for service
	$scope.translate = function (type) {
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
			})
		}
	};

	$scope.savePhrase = function () {
		if ($scope.direction && $scope.translatedText) {
			var translatedLang = $scope.direction.split('-')[0].toUpperCase();
			var translationLang = $scope.direction.split('-')[1].toUpperCase();
			StoreFactory.addPhrase({ 
				translated: translatedLang + ': ' + $scope.textToTranslate,
				translation: translationLang + ': ' + $scope.translatedText
			})
			ToastFactory.phraseSaved();
		}
	};


})