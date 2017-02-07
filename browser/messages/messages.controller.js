'use strict';

app.controller('MessagesCtrl', ($scope, $state, MessagesFactory, $rootScope, $mdDialog, $translate) => { 

	$scope.view = 'inbox';
	$scope.setView = (str) => {
		$scope.view = str;
	}

	function launchTutorial () {
		if (localStorage.getItem('HOMIE-sMsgsT') !== 'seen') {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('.currentNavItem')))
		        .clickOutsideToClose(true)
		        .title($translate.instant('MESSAGES_POPUP_HEADER'))
		        .textContent($translate.instant('MESSAGES_POPUP_MAIN'))
		        .ariaLabel('Msgs Tutorial Dialog')
		        .ok($translate.instant('MESSAGES_POPUP_OK'))
		    );
		}
	    localStorage.setItem('HOMIE-sMsgsT', 'seen');
	}	
	launchTutorial();

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
