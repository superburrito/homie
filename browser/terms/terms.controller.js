'use strict';

app.controller('TermsCtrl', ($scope, $state) => {
	// Empty controller
	// Bring $state to scope to disable navbar
	$scope.state = $state;

	$scope.goToLanding = function () {
		$state.go('landing');
	}
});


