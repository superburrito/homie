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

	$stateProvider.state('forum', {
		url: '/forum',
		templateUrl: '/forum/forum.template.html',
		controller: 'ForumCtrl'
	})

	$stateProvider.state('ask', {
		url: '/ask',
		templateUrl: '/ask/ask.template.html',
		controller: 'AskCtrl'
	})

	$stateProvider.state('question', {
		url: '/forum/:questionId',
		templateUrl: '/question/question.template.html',
		controller: 'QuestionCtrl',
	})

	$stateProvider.state('programs', {
		url: '/programs',
		templateUrl: '/programs/programs.template.html',
		controller: 'ProgramsCtrl'
	})

	$stateProvider.state('rights', {
		url: '/rights',
		templateUrl: '/rights/rights.template.html',
		controller: 'RightsCtrl'
	})
});
