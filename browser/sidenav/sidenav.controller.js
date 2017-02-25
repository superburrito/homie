'use strict';

app.controller('SidenavCtrl', ($scope, $mdSidenav, $state, AuthFactory, StoreFactory) => {

	$scope.stateGoer = (stateStr) => {
		$mdSidenav('left').toggle();
		$state.go(stateStr);
	}
	$scope.logout = () => {
		$mdSidenav('left').toggle();
		AuthFactory.logout();
	}
})