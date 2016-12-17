'use strict';

app.controller('PhrasebookCtrl', ($scope, StoreFactory, $state) => {
	$scope.phrases = StoreFactory.getPhrasebook();

	if ($scope.phrases.length == 0) {
		$scope.noSavedPhrases = true;
	} else {
		$scope.noSavedPhrases = false;
	}

	$scope.deletePhrase = function (phraseObj) {
		StoreFactory.deletePhrase(phraseObj);
		$scope.phrases = StoreFactory.getPhrasebook();
		if ($scope.phrases.length == 0) $scope.noSavedPhrases = true;
	}


})