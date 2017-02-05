'use strict';

app.controller('MessagesCtrl', ($scope, $state, MessagesFactory, $rootScope, $mdDialog, $translate) => { 

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

	function loadMessages () {
		MessagesFactory.getAllMessages()
		.then((messages) => {
			console.table(messages);
			$scope.messages = messages;
		
			($scope.messages.length === 0) 
				? $scope.noMessages = true
				: $scope.noMessages = false;
		})
	}
	loadMessages();

	$scope.viewMessage = (message) => {
		$rootScope.currMessage = message;
		localStorage.setItem('HOMIE-currMessage', JSON.stringify(message));
		$state.go('message');
	}

	$scope.deleteMessage = (message) => {
		MessagesFactory.deleteMessage(message)
		.then(() => {
			loadMessages();
		})
	}
})
