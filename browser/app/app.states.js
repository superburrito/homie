'use strict';

app.config(function($stateProvider){
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: '/home/home.template.html',
		controller: 'HomeCtrl'
	})

	$stateProvider.state('tasks', {
		url: '/tasks',
		templateUrl: '/tasks/tasks.template.html',
		controller: 'TasksCtrl'
	})

	$stateProvider.state('settings', {
		url: '/settings',
		templateUrl: '/settings/settings.template.html',
		controller: 'SettingsCtrl'
	})

	$stateProvider.state('landing', {
		url: '/',
		templateUrl: '/landing/landing.template.html',
		controller: 'LandingCtrl',
		hideNavbar: true
	})

	$stateProvider.state('translator', {
		url: '/translator',
		templateUrl: '/translator/translator.template.html',
		controller: 'TranslatorCtrl'
	})

	$stateProvider.state('phrasebook', {
		url: '/phrasebook',
		templateUrl: '/phrasebook/phrasebook.template.html',
		controller: 'PhrasebookCtrl'
	})

	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/signup/signup.template.html',
		controller: 'SignupCtrl',
		hideNavbar: true
	})


	$stateProvider.state('terms', {
		url: '/terms',
		templateUrl: '/terms/terms.template.html',
		controller: 'TermsCtrl',
		hideNavbar: true
	})

	$stateProvider.state('map', {
		url: '/map',
		templateUrl: '/map/map.template.html',
		controller: 'MapCtrl'
	})

	$stateProvider.state('messenger', {
		url: '/messenger',
		templateUrl: '/messenger/messenger.template.html',
		controller: 'MessengerCtrl'
	})

	$stateProvider.state('messages', {
		url: '/messages',
		templateUrl: '/messages/messages.template.html',
		controller: 'MessagesCtrl'
	})

	$stateProvider.state('message', {
		url: '/message',
		templateUrl: '/message/message.template.html',
		controller: 'MessageCtrl'
	})

	$stateProvider.state('help', {
		url: '/help',
		templateUrl: '/help/help.template.html',
		controller: 'HelpCtrl'
	})
});
