'use strict';

app.controller('LandingCtrl', ($scope, AuthFactory, $state, $translate, StoreFactory, $rootScope) => {
	// Bring $state to scope to disable navbar
	$scope.state = $state;


	// Online, attempt re-entry if tokens are present
	if (window.navigator.onLine && 
		StoreFactory.hasHToken() && 
		StoreFactory.hasFbToken()) {
		AuthFactory.reentry();
	}

	// Offline, auto re-entry if tokens and profile exist
 	if (!window.navigator.onLine &&
 		StoreFactory.hasHToken() && 
 		StoreFactory.hasFbToken() && 
 		StoreFactory.getProfile().id
 		) {
 		console.log("Offline mode activated.");
		$state.go('home');
	}


 	// Labelled for non-commercial reuse: 
 	// https://c1.staticflickr.com/4/3263/3141370564_e2fef8bb14_b.jpg
	const defaultBg = "/media/landingDefault.jpg";
	
	$scope.bg = defaultBg;

	$scope.login = function () {
		AuthFactory.login($scope.email, $scope.password);
	} 

	$scope.fbLogin = function () {
		AuthFactory.fbLogin();
	}

	$scope.goToSignup = function () {
		$state.go('signup');
	}


	$scope.goToTerms = function () {
		$state.go('terms');
	}

	$scope.switchLang = function () {
		if($translate.use() === 'en'){
			$translate.use('tl');
		} else if($translate.use() === 'tl'){
			$translate.use('id');
		} else {
			$translate.use('en');
		}
	}
});
