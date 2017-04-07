'use strict';

app.controller('SidenavCtrl', ($scope, $mdSidenav, $state, AuthFactory, StoreFactory, $interval, $rootScope) => {

	// Init profile pic and name; update according to changes
	const profile = StoreFactory.getProfile();
	if (profile) {
		if (profile.src) { $scope.profileSrc = profile.src; }
		if (profile.name) { $scope.firstName = profile.name.split(' ')[0]; }
	} else {
		$scope.profileSrc = "/media/defaultProfile.png";
		$scope.firstName = "My Profile";
	}
	AuthFactory.profileUpdateListener = () => {
		$rootScope.$on('profileUpdate', () => {
			const profile = StoreFactory.getProfile();
			if (profile) {
				$scope.profileSrc = profile.src;
				$scope.firstName = profile.name.split(' ')[0];
			}
		})
	}
	AuthFactory.profileUpdateListener();

	// Check online status and update according to changes
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