'use strict';

app.controller('MessengerCtrl', ($scope, $rootScope, $state, $http, ToastFactory, $translate) => {
	$scope.receiver = $rootScope.receiver;

	$scope.sendMessage = () => {
		$http.post('/messages', {
			title: $scope.title,
			content: $scope.content,
			receiver_id: $scope.receiver.id,
		})
		.then((res) => res.data)
		.then((data) => {
			if (data.success) {
				$scope.title = null;
				$scope.content = null;
				$scope.messengerForm.$setPristine();
				$scope.messengerForm.$setUntouched();
				ToastFactory.displayMsg($translate.instant('T_MESSENGER_SUCCESS'), 500);
				// Go to messages state
				$state.go('messages');
			} else {
				ToastFactory.displayMsg($translate.instant('T_MESSENGER_FAIL'), 500);
			}
		})		
	}

	$scope.goToMessages = () => {
		$state.go('messages');
	}
});
