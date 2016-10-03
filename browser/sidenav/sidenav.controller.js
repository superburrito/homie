'use strict';

app.controller('SidenavCtrl', function ($scope, $mdSidenav, $state) {

	$scope.goToHome = function () {
		$mdSidenav('left').toggle();
		$state.go('home');
	} 

	$scope.goToRights = function () {
		$mdSidenav('left').toggle();
		$state.go('rights');
	} 

	$scope.goToSettings = function () {
		$mdSidenav('left').toggle();
		$state.go('settings');
	}

})