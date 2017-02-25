'use strict';

app.controller('LandingCtrl', ($scope, AuthFactory, $state, $translate, StoreFactory) => {
	// Bring $state to scope to disable navbar
	$scope.state = $state;


	// Attempt re-entry into Home state if tokens are present
	if (StoreFactory.hasHToken() && StoreFactory.hasFbToken()) {
		AuthFactory.reentry();
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
