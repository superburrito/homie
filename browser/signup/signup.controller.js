'use strict';

app.controller('SignupCtrl', function ($scope, AuthFactory, $state) {
	// Bring $state to scope to disable navbar
	$scope.state = $state;

	var defaultBg = "http://www.homeanddecor.com.sg/sites/default/files/imagecache/large/prof/2013/11/17323-hdb.jpg"
	$scope.bg = defaultBg;

	$scope.signup = function () {
		AuthFactory.signup($scope.name, $scope.email, $scope.password);
	} 

	$scope.goToLanding = function () {
		$state.go('landing');
	}

});

