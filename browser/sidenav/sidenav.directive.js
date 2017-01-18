'use strict';

app.directive('sidenav', function(){
	return {
		restrict: 'E',
		templateUrl: '/sidenav/sidenav.template.html',
		controller: 'SidenavCtrl'
	}
});