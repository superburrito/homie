'use strict';

// Store factory manages cached tokens and cached profile info
app.factory('StoreFactory', function(){
	var StoreFactory = {};

	// Homie token management
	StoreFactory.saveHToken = function (token) {
		localStorage.setItem('HOMIE-hToken', JSON.stringify(token));
	}

	StoreFactory.getHToken = function () {
		if (!localStorage.getItem('HOMIE-hToken')) return null;
		return JSON.parse(localStorage.getItem('HOMIE-hToken'));
	}

	StoreFactory.hasHToken = function () {
		return StoreFactory.getHToken() !== null;
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
			fbId: data.user.fbId,
			id: data.user.id,
			firstName: name.substring(0, name.indexOf(' ')),
			lastName: name.substring(name.indexOf(' ')), 
			src: data.user.src,
			bgUrl: data.user.bgUrl,
		});
		if (data.hToken) {
			StoreFactory.saveHToken(data.hToken);
		}
		if (data.fbToken) {
			StoreFactory.saveFbToken(data.fbToken);
		}
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
		localStorage.removeItem('HOMIE-hToken');
		localStorage.removeItem('HOMIE-fbToken');

		console.log('User info in localStorage cleared (including tokens).');
	}


	return StoreFactory;

});
