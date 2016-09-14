'use strict';

var app = angular.module('homieApp', ['ui.router','ngMaterial'])

app.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');
    // Returns to landing page if user types an undefined url
		$urlRouterProvider.otherwise('/');
    $mdThemingProvider
    	.theme('default')
    	.primaryPalette('blue')
})

app.controller('ToolbarCtrl', function($scope, $mdSidenav, $state) {
	$scope.toggleSideNav = function () {
		$mdSidenav('left').toggle();
	};

})

'use strict';

app.config(function($stateProvider){

});

'use strict';

app.controller('NavbarCtrl', function($scope, $state, $mdSidenav){
	$scope.goToFeed = function () {
		$mdSidenav('left').toggle();
		$state.go('feed');
	}


});

'use strict';

app.directive('navbar', function () {
	return {
		restrict: 'E',
		templateUrl: '/html/navbar/navbar.template.html',
		controller: 'NavbarCtrl'
	}
})