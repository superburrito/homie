'use strict';


app.directive('toolbar', function(){
	return {
		restrict: 'E',
		templateUrl: '/public/toolbar/toolbar.template.html',
	}
});

app.directive('sidenav', function(){
	return {
		restrict: 'E',
		templateUrl: '/public/sidenav/sidenav.template.html',
		controller: 'SidenavCtrl'
	}
});

app.directive('tasktab', function () {
	return {
		restrict: 'E',
		templateUrl: '/public/tasktab/tasktab.template.html',
		controller: 'TasktabCtrl'
	}
});



