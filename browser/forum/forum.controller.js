'use strict'

app.controller('ForumCtrl', ($scope, $mdMenu, ForumFactory, $state, GeneralFactory) => {

	// Launch tutorial
	if (localStorage.getItem('HOMIE-sForumT') !== 'seen') {
		ForumFactory.launchTutorial();
	}

	function loadAndCheckQuestions() {
		ForumFactory.getAllQuestions()
		.then((questions) => {
			$scope.questions = questions;	
			($scope.questions.length === 0) 
				? $scope.noQuestions = true
				: $scope.noQuestions = false;
		})
	}
	loadAndCheckQuestions();

	$scope.openMenu = ($mdOpenMenu, ev) => {
		$mdOpenMenu(ev);
	}

	$scope.searchText = '';
	$scope.setSearchText = (str) => {
		$scope.searchText = str;
	}

	$scope.limitStr = GeneralFactory.limitStr;
	
});
