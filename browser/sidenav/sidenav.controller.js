'use strict';

app.controller('SidenavCtrl', function ($scope, $mdSidenav, $state, AuthFactory) {

	$scope.stateGoer = (stateStr) => {
		$mdSidenav('left').toggle();
		$state.go(stateStr);
	}
	$scope.logout = function () {
		$mdSidenav('left').toggle();
		AuthFactory.logout();
	}

})