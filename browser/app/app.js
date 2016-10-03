'use strict';

var app = angular.module('homieApp', ['ui.router','ngMaterial'])

app.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');

    // Returns to landing page if user types an undefined url
	$urlRouterProvider.otherwise('/');
    
    // Default Theme
    $mdThemingProvider.theme('default')
    	.primaryPalette('teal')
    	.accentPalette('pink', {
    		'default': '300'
    	});

    // Alternate Theme 0
    $mdThemingProvider.theme('altTheme0')
        .primaryPalette('teal')
        .accentPalette('teal', {
            'default': '400'
        });


    // Alternate Theme 1
    $mdThemingProvider.theme('altTheme1')
        .primaryPalette('teal')
        .accentPalette('orange', {
            'default': '400'
        });

    // Alternate Theme 1
    $mdThemingProvider.theme('altTheme2')
        .primaryPalette('teal')
        .accentPalette('deep-purple', {
            'default': '400'
        });


})


app.controller('MainCtrl', function($scope,$mdSidenav){
	
    // Menu button toggles sidenav
    $scope.openSidenav = function(){
		$mdSidenav('left').toggle();
	}
    
})