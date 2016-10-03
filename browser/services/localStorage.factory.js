'use strict';

app.factory('LocalStorageFactory', function(){
	var LocalStorageFactory = {}

	/* Tasks is an obj containing three arrays of (objects), i.e
		{
			cooking: [{...},{...}],
			cleaning: [{...},{...},{...}],
			caring: [{...},{...}],
		}

	*/

	// Tasks Services
	LocalStorageFactory.saveTasks = function (tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	LocalStorageFactory.getTasks = function () {
		if(!localStorage.getItem('tasks')){
			LocalStorageFactory.saveTasks({
				cooking: [],
				cleaning: [],
				caring: []
			});
			return LocalStorageFactory.getTasks();
		}
		return JSON.parse(localStorage.getItem('tasks'));
	}

	LocalStorageFactory.addTask = function (newTask, type) {
		var tasks = LocalStorageFactory.getTasks();
		tasks[type].push(newTask);
		LocalStorageFactory.saveTasks(tasks);
	}

	LocalStorageFactory.deleteTask = function (deletedTask, type) {
		var tasks = LocalStorageFactory.getTasks();
		tasks[type] = tasks[type].filter(function(task){
			return task.name != deletedTask.name;
		});
		LocalStorageFactory.saveTasks(tasks);
	}


	// Profile Services
	LocalStorageFactory.saveProfile = function (profileObj) {
		localStorage.setItem('profile', JSON.stringify(profileObj));
	}

	LocalStorageFactory.getProfile = function () {
		return JSON.parse(localStorage.getItem('profile'));
	}


	// Diary Services
	LocalStorageFactory.saveDiary = function (array) {
		localStorage.setItem('diary', JSON.stringify(array));
	}

	LocalStorageFactory.getDiary= function () {
		return JSON.parse(localStorage.getItem('diary'));
	}


	return LocalStorageFactory;

})