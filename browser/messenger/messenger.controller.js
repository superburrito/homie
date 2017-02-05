'use strict';

app.controller('MessengerCtrl', ($scope, $rootScope, $state, $http, ToastFactory) => {
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
				ToastFactory.displayMsg('Message sent!', 500);
				// Go to messages state
				$state.go('messages');
			} else {
				ToastFactory.displayMsg('Message failed to send.', 500);
			}
		})		
	}

	$scope.goToMessages = () => {
		$state.go('messages');
	}
});
