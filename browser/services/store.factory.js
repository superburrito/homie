'use strict';

app.factory('StoreFactory', function(){
	var StoreFactory = {};

	// Homie token management
	StoreFactory.saveToken = function (token) {
		localStorage.setItem('token', JSON.stringify(token));
	}

	StoreFactory.getToken = function () {
		if (!localStorage.getItem('token')) return null;
		return JSON.parse(localStorage.getItem('token'));
	}

	StoreFactory.hasToken = function () {
		return StoreFactory.getToken() !== null;
	}


	// FB Token management
	StoreFactory.saveFbToken = function (token) {
		localStorage.setItem('fbToken', JSON.stringify(token));
	} 

	StoreFactory.getFbToken = function () {
		if (!localStorage.getItem('fbToken')) return null;
		return JSON.parse(localStorage.getItem('fbToken'));

	}

	StoreFactory.hasFbToken = function () {
		return StoreFactory.getFbToken() !== null;
	}





	/* Tasks is an obj containing three arrays of (objects), i.e
		{
			cooking: [{...},{...}],
			cleaning: [{...},{...},{...}],
			caring: [{...},{...}],
		}

	*/

	StoreFactory.saveTasks = function (tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	StoreFactory.getTasks = function () {
		if (!localStorage.getItem('tasks')) {
			StoreFactory.saveTasks({
				cooking: [],
				cleaning: [],
				caring: []
			})
			StoreFactory.getTasks();
		}; 
		return JSON.parse(localStorage.getItem('tasks'));
	}

	StoreFactory.addTask = function (newTask, type) {
		var tasks = StoreFactory.getTasks();
		tasks[type].push(newTask);
		StoreFactory.saveTasks(tasks);
	}

	StoreFactory.deleteTask = function (deletedTask, type) {
		var tasks = StoreFactory.getTasks();
		tasks[type] = tasks[type].filter(function(task){
			return task.name != deletedTask.name;
		});
		StoreFactory.saveTasks(tasks);
	}





	/* Profile is an object containing:
		{
			id: ...,
			firstName: ...,
			lastName: ...,
			bgUrl: ...,
		}
	*/

	StoreFactory.saveAuthData = function (data) {
		var name = data.user.name;
		StoreFactory.saveProfile({
			id: data.user.id,
			firstName: name.substring(0, name.indexOf(' ')),
			lastName: name.substring(name.indexOf(' ')),
			bgUrl: data.user.bgUrl,
		});
		StoreFactory.saveToken(data.token);
	}

	StoreFactory.saveProfile = function (profile) {
		localStorage.setItem('profile', JSON.stringify(profile));
	}

	StoreFactory.getProfile = function () {
		if (!localStorage.getItem('profile')) return null;
		return JSON.parse(localStorage.getItem('profile'));
	}

	StoreFactory.updateBgUrl = function (secureUrl) {
		var profile = StoreFactory.getProfile();
		profile.bgUrl = secureUrl;
		StoreFactory.saveProfile(profile);
	}


	// Clearing store when logging out
	StoreFactory.clear = function () {
		localStorage.removeItem('profile');
		localStorage.removeItem('token');
		if(StoreFactory.hasFbToken){
			localStorage.removeItem('fbToken');
		}
		console.log('User info in localStorage cleared.');
	}


	return StoreFactory;

});
