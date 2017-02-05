'use strict';

app.factory('MessagesFactory', ($http, ToastFactory, AuthFactory) => {
	
	var MessagesFactory = {};

	MessagesFactory.getAllMessages = () => {
		return $http.get('/messages')
		.then((res) => AuthFactory.resToDataFilter(res))
		.then((data) => {
			if (data.success) {
				return data.messages;
			} else {
				ToastFactory.displayMsg('Failed to load messages from server.', 500);
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
				ToastFactory.displayMsg('Delete failed.', 500);
				return;
			}
		})
	}

	return MessagesFactory;
})