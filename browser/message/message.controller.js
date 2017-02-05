'use strict';

app.controller('MessageCtrl', ($scope, $rootScope, $state) => {
	$scope.message = $rootScope.currMessage;
	console.log("Current message: " + JSON.stringify($scope.message));
	
	$scope.goToMessages = () => {
		$state.go('messages');
	}

	$scope.reply = () => {
		$rootScope.receiver = $scope.message.sender;
		localStorage.setItem('HOMIE-receiver', JSON.stringify($scope.message.sender));
		$state.go('messenger');
	}

})