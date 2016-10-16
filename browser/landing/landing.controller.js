'use strict';

app.controller('LandingCtrl', function ($scope, AuthFactory, StoreFactory, $state) {
	// Bring $state to scope to disable navbar
	$scope.state = $state;

	var defaultBg = "http://www.homeanddecor.com.sg/sites/default/files/imagecache/large/prof/2013/11/17323-hdb.jpg"
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

});
