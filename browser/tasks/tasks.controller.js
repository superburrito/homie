'use strict';

app.controller('TasksCtrl', function($scope, StoreFactory, $state){
	$scope.tasks = StoreFactory.getTasks();
	console.log($scope.tasks);
	$scope.taskType = 'Cleaning';

	$scope.setTaskType = function (str) {
		$scope.taskType = str;
	}

	$scope.addTask = function (taskObj) {
		var typeLowercased = $scope.taskType.toLowerCase(); 
		StoreFactory.addTask(taskObj,typeLowercased);
		$scope.tasks = StoreFactory.getTasks();
		$scope.newTaskName = "";
		$scope.taskForm.$setPristine();
	}

	$scope.deleteTask = function (taskObj) {
		var typeLowercased = $scope.taskType.toLowerCase(); 
		StoreFactory.deleteTask(taskObj, typeLowercased);
		$scope.tasks = StoreFactory.getTasks();
	}

})