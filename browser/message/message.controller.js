'use strict';

app.controller('MessageCtrl', ($scope, $rootScope, $state, StoreFactory) => {
	$scope.message = $rootScope.currMessage;

	$scope.sentBySelf = false;
	const profile = StoreFactory.getProfile();
	if ($scope.message.sender_id === profile.id) {
		$scope.sentBySelf = true;
	}

	console.log("Current message: " + JSON.stringify($scope.message));
	
	$scope.goToMessages = () => {
		$state.go('messages');
	}

	$scope.reply = () => {
		$rootScope.receiver = $scope.message.sender;
		localStorage.setItem('HOMIE-receiver', JSON.stringify($scope.message.sender));
		$state.go('messenger');
	}

	$scope.limitStr = (str, limit) => {
		if (str.length > limit) {
			return str.slice(0,limit).concat('...');
		} else {
			return str;
		}
	} 

})