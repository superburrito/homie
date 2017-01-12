'use strict';

app.controller('TasksCtrl', function($scope, TasksFactory, $interval){
	// Load tasks
	$scope.tasks = TasksFactory.renderTasks();
	console.log($scope.tasks);

	// Set default view
	$scope.view = 'tasklist';

	// Allow view switching
	$scope.setView = function (str) {
		$scope.view = str;
	}

	$scope.checkTask = function (task) {
		// If task is timed, begin timer
		if(task.cdTimerDur && task.cdTimerStartedTime == null){
			TasksFactory.timeTask(task);
		// If task is not timed, simply check it off 
		} else if (!task.cdTimerDur) {
			TasksFactory.checkTask(task);
		}
		$scope.tasks = TasksFactory.renderTasks();
	}


	$scope.deleteTask = function (deletedTask) {
		TasksFactory.deleteTask(deletedTask);
		$scope.tasks = TasksFactory.renderTasks();
	}

	$scope.addTask = function () {
		const alarmExists = $scope.newTaskAlarmBool && $scope.newTaskAlarmTime
		const cdTimerExists = $scope.newTaskDurBool && $scope.newTaskDur
		const newTask = {
			name: $scope.newTaskName,
			// "Active" if task has an alarm && alarmTime >= currTime
			alarmTimeHr: alarmExists ? $scope.newTaskAlarmTime.getHours() : null,
			alarmTimeMin: alarmExists ? $scope.newTaskAlarmTime.getMinutes() : null,
			active: false,

			// cdTimer starts when user checks a timed task
			cdTimerDur: cdTimerExists ? $scope.newTaskDur : null, 
			cdTimerProgress: cdTimerExists ? 0 : null,
			cdTimerStartedTime: null,
			
			// Task is "checked" when user clicks on non-timed task or timed task expires
			checked: false
		}

		TasksFactory.addTask(newTask);
		// Clear inputs
		$scope.tasks = TasksFactory.renderTasks();
		$scope.newTaskName = "";
		$scope.taskForm.$setPristine();
	}

	
	// Continually update the appearence of task items
	updateTaskVisuals();
	$interval(updateTaskVisuals, 8000);

	// Helper: Updates how task items appear
	function updateTaskVisuals() {
		// Check clock, then check alarms
		var currTime = new Date();
		var currHr = currTime.getHours();
		var currMin = currTime.getMinutes();
		$scope.tasks.forEach(function(task){
			if (task.alarmTimeHr && task.alarmTimeMin) {
				if (currHr >= task.alarmTimeHr &&
					currMin >= task.alarmTimeMin) {	
					TasksFactory.activateTask(task);
				}
			}
		});
		// Re-render $scope.tasks every 10 seconds
		$scope.tasks = TasksFactory.renderTasks();
	}


	// Helper: Dynamic classes
	$scope.getClass = function (task) {
		if (task.cdTimerDur) {
			return "tasklist__item--mainWithProg";
		} else {
			return "tasklist__item--mainWith";
		}
	}
})