'use strict';

app.controller('SidenavCtrl', function ($http, $scope, $mdSidenav, $state, AuthFactory) {

	$scope.goToHome = function () {
		$mdSidenav('left').toggle();
		$state.go('home');
	} 

	$scope.goToTasks = function () {
		$mdSidenav('left').toggle();
		$state.go('tasks');
	} 

	$scope.goToSettings = function () {
		$mdSidenav('left').toggle();
		$state.go('settings');
	}

	$scope.logout = function () {
		$mdSidenav('left').toggle();
		AuthFactory.logout();
	}

	/* Just for testing */
	$scope.test = function () {
		$mdSidenav('left').toggle();
		$http.get('/api/user')
		.then(function(response){
			return response.data;
		})
		.then(function(data){
			if(data.users.length > 0){
				console.log("Test passes!");
			}else{
				console.log("Test fails!");
			}
		})
	}

})