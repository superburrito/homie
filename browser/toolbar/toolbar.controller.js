'use strict';

app.controller('ToolbarCtrl', function (
	$scope, $state, TasksFactory, 
	MapFactory, MessagesFactory, TranslatorFactory, ForumFactory
	) {
	$scope.loadHelper = () => {
		const stateName = $state.current.name;
		console.log("State is: " + stateName);
		if (stateName === 'tasks') {
			TasksFactory.launchTutorial();
		} else if (stateName === 'map') {
			MapFactory.launchTutorial();
		} else if (stateName === 'messages') {
			MessagesFactory.launchTutorial();
		} else if (stateName === 'translator') {
			TranslatorFactory.launchTutorial();
		} else if (stateName === 'forum') {
			ForumFactory.launchTutorial();
		}
	}
});
