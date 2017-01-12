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



	/* Phrasebook is an array of objects, i.e.
		[
			{
				translated: dua ayam,
				translation: two chicken
			} 
		]

	*/

	StoreFactory.addPhrase = function (phrase) {
		var phrases = StoreFactory.getPhrasebook();
		phrases.push(phrase);
		localStorage.setItem('phrasebook', JSON.stringify(phrases));
	}

	StoreFactory.getPhrasebook = function () {
		if (!localStorage.getItem('phrasebook')) {
			localStorage.setItem('phrasebook', JSON.stringify([]));
			StoreFactory.getPhrasebook();
		}
		return JSON.parse(localStorage.getItem('phrasebook'));
	}

	StoreFactory.deletePhrase = function (deletedPhrase) {
		var phrases = StoreFactory.getPhrasebook();
		phrases = phrases.filter(function (phrase) {
			return phrase.translated != deletedPhrase.translated;
		})
		localStorage.setItem('phrasebook', JSON.stringify(phrases));
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

	StoreFactory.updateBgUrl = function (newBgUrl) {
		var profile = StoreFactory.getProfile();
		profile.bgUrl = newBgUrl;
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
