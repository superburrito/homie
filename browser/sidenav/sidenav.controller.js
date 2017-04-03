'use strict';

app.controller('SidenavCtrl', ($scope, $mdSidenav, $state, AuthFactory, StoreFactory, $interval, $rootScope) => {

	// Init profile pic and update according to changes
	$scope.profileSrc = StoreFactory.getProfile().src || "/media/defaultProfile.png";
	AuthFactory.sourceUpdateListener = () => {
		$rootScope.$on('sourceUpdate', () => {
			$scope.profileSrc = StoreFactory.getProfile().src || "/media/defaultProfile.png";
		})
	}
	AuthFactory.sourceUpdateListener();

	$scope.firstName = StoreFactory.getProfile().name.split(' ')[0];

	// Init online status and update according to changes
	function checkOnline(){
		if(navigator.onLine == true){
			console.log("isOnline == true");
			$rootScope.isOnline = true;
		} else {
			console.log("isOnline == false");
			$rootScope.isOnline = false;
		}
	}
	$interval(checkOnline, 10000);

	$scope.stateGoer = (stateStr) => {
		$mdSidenav('left').toggle();
		$state.go(stateStr);
	}
	$scope.logout = () => {
		$mdSidenav('left').toggle();
		AuthFactory.logout();
	}
})