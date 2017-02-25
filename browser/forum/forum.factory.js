'use strict'

app.factory('ForumFactory', ($http, ToastFactory, $mdDialog, $translate) => {
	var ForumFactory = {};

	// Fire tutorial
	ForumFactory.launchTutorial = () => {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('.currentNavItem')))
	        .clickOutsideToClose(true)
	        .title($translate.instant('FORUM_POPUP_HEADER'))
	        .textContent($translate.instant('FORUM_POPUP_MAIN'))
	        .ariaLabel('Forum Tutorial Dialog')
	        .ok($translate.instant('FORUM_POPUP_OK'))
	    );
	    localStorage.setItem('HOMIE-sForumT', 'seen');
	}	

	ForumFactory.getAllQuestions = () => {
		return $http.get('/api/forum')
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