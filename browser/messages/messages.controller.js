'use strict';

app.controller('MessagesCtrl', ($scope, $state, MessagesFactory, $rootScope) => { 

	$scope.view = 'inbox';
	$scope.setView = (str) => {
		$scope.view = str;
	}

	if (localStorage.getItem('HOMIE-sMsgsT') !== 'seen') {
		MessagesFactory.launchTutorial();
	}

	// Load inbox
	function getInbox () {
		MessagesFactory.getInbox()
		.then((messages) => {
			console.log("Messages are: " + JSON.stringify(messages));
			$scope.inboxMessages = messages;
			($scope.inboxMessages.length === 0) 
				? $scope.emptyInbox = true
				: $scope.emptyInbox = false;
		})
	}
	getInbox();

	// Load sent
	function getSent () {
		MessagesFactory.getSent()
		.then((messages) => {
			console.log("Messages are: " + JSON.stringify(messages));
			$scope.sentMessages = messages;		
			($scope.sentMessages.length === 0) 
				? $scope.emptySent = true
				: $scope.emptySent = false;
		})
	}
	getSent();


	$scope.viewMessage = (message) => {
		$rootScope.currMessage = message;
		localStorage.setItem('HOMIE-currMessage', JSON.stringify(message));
		$state.go('message');
	}

	$scope.deleteMessage = (message) => {
		MessagesFactory.deleteMessage(message)
		.then(() => {
			getInbox();
			getSent();
		})
	}
})
