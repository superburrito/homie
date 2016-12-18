'use strict';

app.controller('SidenavCtrl', function ($http, $scope, $mdSidenav, $state, AuthFactory, StoreFactory) {

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

	$scope.goToMap = function () {
		$mdSidenav('left').toggle();
		$state.go('map');
	}


	$scope.goToSettings = function () {
		$mdSidenav('left').toggle();
		$state.go('settings');
	}


	$scope.logout = function () {
		// When logging out, update profile data
		var profile = StoreFactory.getProfile()
		return $http.post('/user/update', {
			bgUrl: profile.bgUrl,
		})
		.then(function (response) {
			if(response && response.data.success){
				console.log("Profile data synced with server.")
			} else {
				console.log("Profile data did not sync.")
			}
		})
		.then(function () {
			$mdSidenav('left').toggle();
			// Clear store, return to landing page
			AuthFactory.logout();
		})
	}

})