'use strict';

app.factory('LocalStorageFactory', function(){
	var LocalStorageFactory = {};

	/* Tasks is an obj containing three arrays of (objects), i.e
		{
			cooking: [{...},{...}],
			cleaning: [{...},{...},{...}],
			caring: [{...},{...}],
		}

	*/

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





	/* Profile is an object containing:
		{
			userId: ...,
			firstName: ...,
			lastName: ...,
			bgId: ...,
			bgVersion: ...
		}
	*/

	// Profile Services
	LocalStorageFactory.saveProfile = function (profileObj) {
		localStorage.setItem('profile', JSON.stringify(profileObj));
	}

	LocalStorageFactory.getProfile = function () {
		if(!localStorage.getItem('profile')){
			LocalStorageFactory.saveProfile({
				userId: 1,
				firstName: 'Edita',
				lastName: 'Medel',
				bgUrl: ''
			});
			return LocalStorageFactory.getProfile();
		}
		return JSON.parse(localStorage.getItem('profile'));
	}

	LocalStorageFactory.updateBgUrl = function (secureUrl) {
		var profile = LocalStorageFactory.getProfile();
		profile.bgUrl = secureUrl;
		LocalStorageFactory.saveProfile(profile);
	}

	return LocalStorageFactory;

});
