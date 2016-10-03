'use strict';

app.controller('SidenavCtrl', function ($scope, $mdSidenav, $state) {

	$scope.goToHome = function () {
		$mdSidenav('left').toggle();
		$state.go('home');
	} 

	$scope.goToTasks = function () {
		$mdSidenav('left').toggle();
		$state.go('tasks');
	} 

	$scope.goToSettings = function () {
		$mdSidenav('left').toggle();
		$state.go('settings');
	}

})