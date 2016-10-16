'use strict';

var app = angular.module('homieApp', ['ui.router','ngMaterial','ngFileUpload','angular-cloudinary']);

app.controller('MainCtrl', function ($scope, $mdSidenav, $state) {
	
  // Menu button toggles sidenav
  $scope.openSidenav = function () {
		$mdSidenav('left').toggle();
	}
  
	$scope.state = $state;

});
