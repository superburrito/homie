'use strict';

app.controller('TasksCtrl', function($scope,LocalStorageFactory, $state){
	$scope.tasks = LocalStorageFactory.getTasks();
	console.log($scope.tasks);
	$scope.taskType = 'Cleaning';

	$scope.setTaskType = function (str) {
		$scope.taskType = str;
	}

	$scope.addTask = function (taskObj) {
		var typeLowercased = $scope.taskType.toLowerCase(); 
		LocalStorageFactory.addTask(taskObj,typeLowercased);
		$scope.tasks = LocalStorageFactory.getTasks();
		$scope.newTaskName = "";
		$scope.taskForm.$setPristine();
	}

	$scope.deleteTask = function (taskObj) {
		var typeLowercased = $scope.taskType.toLowerCase(); 
		LocalStorageFactory.deleteTask(taskObj, typeLowercased);
		$scope.tasks = LocalStorageFactory.getTasks();
	}

})