'use strict';

app.directive('sidenav', function(){
	return {
		restrict: 'E',
		templateUrl: '/public/sidenav/sidenav.template.html',
		controller: 'SidenavCtrl'
	}
});