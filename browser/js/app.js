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
