'use strict';

var app = angular.module('homieApp', ['ui.router','ngMaterial','ngFileUpload','angular-cloudinary', 'ngMap','pascalprecht.translate']);

app.controller('MainCtrl', function ($scope, $mdSidenav, $state) {
	
 	// Menu button toggles sidenav
 	$scope.openSidenav = function () {
		$mdSidenav('left').toggle();
	}
  
	$scope.state = $state;

	// If service worker exists,
	if ('serviceWorker' in navigator) {
		// Register it
		navigator.serviceWorker
		.register('/service-worker.js')
		.then(function () {
		  console.log('[SW] Registered Service Worker.');
		})
		.catch(function (err) {
		  console.log(err);
		  console.log('[SW] Unable to register Service Worker.');
		});
	}

});
