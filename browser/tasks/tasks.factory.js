'use strict';

app.factory('TasksFactory', function(ToastFactory, $translate, $mdDialog){
	var TasksFactory = {};

	/* Tutorial (exposed to Toolbar) */

	TasksFactory.launchTutorial = () => {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('.currentNavItem')))
	        .clickOutsideToClose(true)
	        .title($translate.instant('TASKS_POPUP_HEADER'))
	        .textContent($translate.instant('TASKS_POPUP_MAIN'))
	        .ariaLabel('Tasks Tutorial Dialog')
	        .ok($translate.instant('TASKS_POPUP_OK'))
	    );
	    localStorage.setItem('HOMIE-sTasksT', 'seen');
	}	


	/* Tasks is an array of objects, i.e.
		[
			{
				name: Wash puppies,
				checked: false,
				time: 1200
			}
		]
	*/

	TasksFactory.renderTasks = function () {
		var tasks = TasksFactory.getTasks();
		var currTime = new Date()
		tasks = tasks.map(function (task) {
			if (task.cdTimerDur && task.checked) {
				task.cdTimerStartedTime = 100;
			}
			if (task.cdTimerStartedTime) {
				const startedTime = new Date(task.cdTimerStartedTime);
				const millisecs = Math.abs(currTime - startedTime)
				const secsPassed = millisecs / 1000;
				const secsTotal = task.cdTimerDur * 60;
				task.cdTimerProgress = (secsPassed / secsTotal) * 100;
				console.log("Progress is: " + task.cdTimerProgress);
				if (secsPassed >= secsTotal) {
					TasksFactory.checkTask(task);
				} 
			}
			return task;	
		});
		return tasks;
	}

	TasksFactory.getTasks = function () {
		if (!localStorage.getItem('HOMIE-tasks')) {
			localStorage.setItem('HOMIE-tasks', JSON.stringify([]));
			return TasksFactory.getTasks();
		}; 
		return JSON.parse(localStorage.getItem('HOMIE-tasks'));
	}

	TasksFactory.addTask = function (newTask) {
		var tasks = TasksFactory.getTasks();
		tasks.push(newTask);
		localStorage.setItem('HOMIE-tasks', JSON.stringify(tasks));
		ToastFactory.displayMsg(
			$translate.instant('T_TASK_CREATED'), 500);
	}

	TasksFactory.checkTask = function (checkedTask) {
		var tasks = TasksFactory.getTasks();
		tasks = tasks.map(function(task){
			if (task.name === checkedTask.name) {
				task.cdTimerStartedTime = null;
				task.checked = true;
			} 
			return task;
		});
		localStorage.setItem('HOMIE-tasks', JSON.stringify(tasks));
	}

	TasksFactory.deleteTask = function (deletedTask) {
		var tasks = TasksFactory.getTasks();
		tasks = tasks.filter(function(task){
			return task.name !== deletedTask.name;
		});
		localStorage.setItem('HOMIE-tasks', JSON.stringify(tasks));
	}

	TasksFactory.timeTask = function (timedTask) {
		var tasks = TasksFactory.getTasks();
		tasks = tasks.map(function(task){
			if (task.name === timedTask.name) {
				task.cdTimerStartedTime = new Date();
			} 
			return task;
		});
		localStorage.setItem('HOMIE-tasks', JSON.stringify(tasks));
		ToastFactory.taskRunning(timedTask.name);
	}

	TasksFactory.activateTask = function (activatedTask) {
		var tasks = TasksFactory.getTasks();
		// Vibrate device
		navigator.vibrate([200,200,200,200,200,200]);
		tasks = tasks.map(function(task){
			if (task.name === activatedTask.name) {
				task.active = true;
			} 
			return task;
		});
		localStorage.setItem('HOMIE-tasks', JSON.stringify(tasks));
	}

	TasksFactory.storeDate = function (dateToStore) {
		localStorage.setItem('HOMIE-storedDate', JSON.stringify(dateToStore));
	}

	TasksFactory.getStoredDate = function () {
		if(!localStorage.getItem('HOMIE-storedDate')) {
			localStorage.setItem('HOMIE-storedDate', JSON.stringify(new Date()));
			return TasksFactory.getStoredDate();
		}
		return new Date(JSON.parse(localStorage.getItem('HOMIE-storedDate')));
	}

	TasksFactory.resetTasks = function () {
		var tasks = TasksFactory.getTasks();
		tasks = tasks.map(function (task) {
			if(task.cdTimerDur) {
				task.cdTimerProgress = 0;	
			}
			task.active = false;
			task.cdTimerStartedTime = null;
			task.checked = false;
			return task;
		})
		localStorage.setItem('HOMIE-tasks', JSON.stringify(tasks));
	}
	return TasksFactory;

});

