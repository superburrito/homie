'use strict';

app.factory('MessagesFactory', ($http, ToastFactory, AuthFactory, $translate) => {
	
	var MessagesFactory = {};

	MessagesFactory.getAllMessages = () => {
		return $http.get('/messages')
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