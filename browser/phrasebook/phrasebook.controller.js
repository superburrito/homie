'use strict';

app.controller('PhrasebookCtrl', function($scope, StoreFactory, $state){
	$scope.phrases = StoreFactory.getPhrasebook();

	$scope.deletePhrase = function (phraseObj) {
		StoreFactory.deletePhrase(phraseObj);
	}
})