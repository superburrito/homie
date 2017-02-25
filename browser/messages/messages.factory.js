'use strict';

app.factory('MessagesFactory', ($http, ToastFactory, AuthFactory, $translate, $mdDialog) => {
	
	var MessagesFactory = {};

	MessagesFactory.launchTutorial = () => {
		$mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('.currentNavItem')))
	        .clickOutsideToClose(true)
	        .title($translate.instant('MESSAGES_POPUP_HEADER'))
	        .textContent($translate.instant('MESSAGES_POPUP_MAIN'))
	        .ariaLabel('Msgs Tutorial Dialog')
	        .ok($translate.instant('MESSAGES_POPUP_OK'))
	    );
	    localStorage.setItem('HOMIE-sMsgsT', 'seen');
	}

	MessagesFactory.getInbox = () => {
		return $http.get('/messages/inbox')
		.then((res) => AuthFactory.resToDataFilter(res))
		.then((data) => {
			if (data.success) {
				return data.messages;
			} else {
				ToastFactory.displayMsg($translate.instant('T_MESSAGES_LOAD_FAIL'), 500);
				return [];
			}
		})
	}

	MessagesFactory.getSent = () => {
		return $http.get('/messages/sent')
		.then((res) => AuthFactory.resToDataFilter(res))
		.then((data) => {
			if (data.success) {
				return data.messages;
			} else {
				ToastFactory.displayMsg($translate.instant('T_MESSAGES_LOAD_FAIL'), 500);
				return [];
			}
		})
	}

	MessagesFactory.deleteMessage = (message) => {
		return $http.delete('/messages/' + message.id)
		.then((res) => AuthFactory.resToDataFilter(res))
		.then((data) => {
			if (data.success) {
				console.log("Deleted");
				return;
			} else {
				ToastFactory.displayMsg($translate.instant('T_MESSAGES_DELETE_FAIL'), 500);
				return;
			}
		})
	}

	return MessagesFactory;
})