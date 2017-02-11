'use strict'

app.factory('ForumFactory', ($http, ToastFactory) => {
	var ForumFactory = {};

	ForumFactory.getAllQuestions = () => {
		return $http.get('/forum')
		.then((res) => res.data)
		.then((data) => {
			if (data.success) { 
				console.log(JSON.stringify(data.questions));
				return data.questions;
			} else {
				ToastFactory.displayMsg('Failed to load Q&A', 500);
				return [];
			}
		})
	}

	return ForumFactory;
})