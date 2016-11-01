'use strict';

app.controller('SidenavCtrl', function ($http, $scope, $mdSidenav, $state, AuthFactory) {

	$scope.goToHome = function () {
		$mdSidenav('left').toggle();
		$state.go('home');
	} 

	$scope.goToTasks = function () {
		$mdSidenav('left').toggle();
		$state.go('tasks');
	} 

	$scope.goToTranslator = function () {
		$mdSidenav('left').toggle();
		$state.go('translator');
	}

	$scope.goToPhrasebook = function () {
		$mdSidenav('left').toggle();
		$state.go('phrasebook');
	}

	$scope.goToSettings = function () {
		$mdSidenav('left').toggle();
		$state.go('settings');
	}


	$scope.logout = function () {
		$mdSidenav('left').toggle();
		AuthFactory.logout();
	}

})