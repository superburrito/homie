'use strict';

app.config(function($stateProvider){
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: '/public/home/home.template.html',
		controller: 'HomeCtrl'
	})


	$stateProvider.state('tasks', {
		url: '/tasks',
		templateUrl: '/public/tasks/tasks.template.html',
		controller: 'TasksCtrl'
	})

	$stateProvider.state('settings', {
		url: '/settings',
		templateUrl: '/public/settings/settings.template.html',
		controller: 'SettingsCtrl'
	})

	$stateProvider.state('landing', {
		url: '/',
		templateUrl: '/public/landing/landing.template.html',
		controller: 'LandingCtrl',
		hideNavbar: true
	})

	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/public/signup/signup.template.html',
		controller: 'SignupCtrl',
		hideNavbar: true
	})

	$stateProvider.state('translator', {
		url: '/translator',
		templateUrl: '/public/translator/translator.template.html',
		controller: 'TranslatorCtrl'
	})

	$stateProvider.state('phrasebook', {
		url: '/phrasebook',
		templateUrl: '/public/phrasebook/phrasebook.template.html',
		controller: 'PhrasebookCtrl'
	})

	$stateProvider.state('terms', {
		url: '/terms',
		templateUrl: '/public/terms/terms.template.html',
		controller: 'TermsCtrl',
		hideNavbar: true
	})

	$stateProvider.state('map', {
		url: '/map',
		templateUrl: '/public/map/map.template.html',
		controller: 'MapCtrl'
	})
});
