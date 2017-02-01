'use strict';

app.factory('StoreFactory', function(){
	var StoreFactory = {};

	// Homie token management
	StoreFactory.saveToken = function (token) {
		localStorage.setItem('HOMIE-token', JSON.stringify(token));
	}

	StoreFactory.getToken = function () {
		if (!localStorage.getItem('HOMIE-token')) return null;
		return JSON.parse(localStorage.getItem('HOMIE-token'));
	}

	StoreFactory.hasToken = function () {
		return StoreFactory.getToken() !== null;
	}


	// FB Token management
	StoreFactory.saveFbToken = function (token) {
		localStorage.setItem('HOMIE-fbToken', JSON.stringify(token));
	} 

	StoreFactory.getFbToken = function () {
		if (!localStorage.getItem('HOMIE-fbToken')) return null;
		return JSON.parse(localStorage.getItem('HOMIE-fbToken'));

	}

	StoreFactory.hasFbToken = function () {
		return StoreFactory.getFbToken() !== null;
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
		localStorage.setItem('HOMIE-profile', JSON.stringify(profile));
	}

	StoreFactory.getProfile = function () {
		if (!localStorage.getItem('HOMIE-profile')) return null;
		return JSON.parse(localStorage.getItem('HOMIE-profile'));
	}

	StoreFactory.updateBgUrl = function (newBgUrl) {
		var profile = StoreFactory.getProfile();
		profile.bgUrl = newBgUrl;
		StoreFactory.saveProfile(profile);
	}


	// Clearing store when logging out
	StoreFactory.clear = function () {
		localStorage.removeItem('HOMIE-profile');
		
		// Don't remove tokens for now
		/*		
		localStorage.removeItem('HOMIE-token');
		if(StoreFactory.hasFbToken){
			localStorage.removeItem('HOMIE-fbToken');
		}
		*/
		console.log('User info in localStorage cleared (except tokens).');
	}


	return StoreFactory;

});
