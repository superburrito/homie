'use strict';

app.controller('ProfileCtrl', ($mdDialog, $scope, $rootScope, $state) => {
	$scope.cancel = () => {
		$mdDialog.cancel();
	}

	$scope.user = $rootScope.currCoord.user;

	if (!$scope.user.description || $scope.user.description === '') {
		$scope.user.description = "Hello! I'm a domestic helper and I'm using HOMIE. Feel free to drop me a message. Hello! I'm a domestic helper and I'm using HOMIE. Feel free to drop me a message. Hello! I'm a domestic helper and I'm using HOMIE. Feel free to drop me a message. Hello! I'm a domestic helper and I'm using HOMIE. Feel free to drop me a message.";
	}

	$scope.goToMessenger = () => {
		$mdDialog.cancel();
		$rootScope.receiver = $scope.user;
		localStorage.setItem('HOMIE-receiver', JSON.stringify($scope.user));
		$state.go('messenger');
	}
})