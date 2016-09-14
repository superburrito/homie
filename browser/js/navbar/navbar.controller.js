'use strict';

app.controller('NavbarCtrl', function($scope, $state, $mdSidenav){
	$scope.goToFeed = function () {
		$mdSidenav('left').toggle();
		$state.go('feed');
	}


});
