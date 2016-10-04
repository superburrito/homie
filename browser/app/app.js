'use strict';

var app = angular.module('homieApp', ['ui.router','ngMaterial','ngFileUpload','angular-cloudinary'])

app.config(function ($urlRouterProvider, $mdThemingProvider, cloudinaryProvider) {
    $urlRouterProvider.when('','/');

    // Returns to index page if user types an undefined url
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

    cloudinaryProvider.config({
      upload_endpoint: 'https://api.cloudinary.com/v1_1/',
      cloud_name: 'superburrito',
      upload_preset: 'eb8qmsw6'
    });

});





app.controller('MainCtrl', function ($scope,$mdSidenav) {
	
    // Menu button toggles sidenav
    $scope.openSidenav = function () {
		$mdSidenav('left').toggle();
	}
    
})