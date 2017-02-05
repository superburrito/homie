'use strict';

app.controller('TasksCtrl', function($scope, TasksFactory, $interval, $mdDialog, $translate){
	// Launch tutorial
	function launchTutorial () {
		if (localStorage.getItem('HOMIE-sTasksT') !== 'seen' &&
			TasksFactory.getTasks().length === 0) {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('.currentNavItem')))
		        .clickOutsideToClose(true)
		        .title($translate.instant('TASKS_POPUP_HEADER'))
		        .textContent($translate.instant('TASKS_POPUP_MAIN'))
		        .ariaLabel('Tasks Tutorial Dialog')
		        .ok($translate.instant('TASKS_POPUP_OK'))
		    );
		}
	    localStorage.setItem('HOMIE-sTasksT', 'seen');
	}	
	launchTutorial();


	// Check if date has changed
	const currDate = new Date();
	const currMth = currDate.getMonth();
	const currMthDay = currDate.getDate();
	const storedDate = TasksFactory.getStoredDate();
	console.log(currDate);
	console.log(storedDate);
	const storedMth = storedDate.getMonth();
	const storedMthDay = storedDate.getDate();
	if (currMth >= storedMth && currMthDay > storedMthDay) {
		TasksFactory.storeDate(currDate);
		console.log("currDate was updated to: " + TasksFactory.getStoredDate());
		TasksFactory.resetTasks();
		console.log("Tasks have been reset.");
	}

	// Load tasks
	console.log(TasksFactory.getTasks());
	$scope.tasks = TasksFactory.renderTasks();	

	// Set default view
	$scope.view = 'tasklist';
	// View-switching
	$scope.setView = function (str) { $scope.view = str; }


	// Task-specific functions
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
		$scope.newTaskName = null;
		$scope.newTaskAlarmBool = null;
		$scope.newTaskAlarmTime = null;
		$scope.newTaskDurBool = null;
		$scope.newTaskDur = null;
		$scope.taskForm.$setPristine();
		$scope.taskForm.$setUntouched();
	}
	
	// Update the appearence of task items at every interval
	updateTaskVisuals();
	$interval(updateTaskVisuals, 8000);

	// Helper: Updates how task items appear
	function updateTaskVisuals() {
		console.log("Updating...")
		// Check clock, then check alarms
		var currTime = new Date();
		var currHr = currTime.getHours();
		var currMin = currTime.getMinutes();
		$scope.tasks.forEach(function (task) {
			console.log(task);
			if ((task.alarmTimeHr !== null) 
				&& (task.alarmTimeMin !== null)
				&& (task.active !== true)) {
				if (currHr >= task.alarmTimeHr &&
					currMin >= task.alarmTimeMin) {	
					TasksFactory.activateTask(task);
				}
			}
		});
		// Re-render $scope.tasks every 10 seconds
		$scope.tasks = TasksFactory.renderTasks();
	}

	// 	Dynamic classes for task styling
	$scope.getClass = function (task) {
		if (task.cdTimerDur) {
			return "tasklist__item--mainWithProg";
		} else {
			return "tasklist__item--mainWith";
		}
	}
})