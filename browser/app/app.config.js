'use strict';

// Url Routing Configurations
app.config(function ($urlRouterProvider) {
    $urlRouterProvider.when('','/');
	  $urlRouterProvider.otherwise('/home');
});


// Cloudinary Configurations
app.config(function (cloudinaryProvider) {
    cloudinaryProvider.config({
      upload_endpoint: 'https://api.cloudinary.com/v1_1/',
      cloud_name: 'superburrito',
      upload_preset: 'eb8qmsw6'
    });
});


// Add an interceptor which transforms requests and responses
app.config(function($httpProvider){
	$httpProvider.interceptors.push('APIInterceptor');
});

// Translate config
app.config(function($translateProvider) {

	const enTranslations = {
		// Side navbar
		"SIDENAV_HOME": "Home",
		"SIDENAV_TASKS": "My Tasks",
		"SIDENAV_TRANSLATOR": "Translator",
		"SIDENAV_PHRASEBOOK": "Phrasebook",
		"SIDENAV_MAP": "Explore SG",
		"SIDENAV_RIGHTS": "My Rights",
		"SIDENAV_GETHELP": "Get Help",
		"SIDENAV_SETTINGS": "Settings",
		"SIDENAV_LOGOUT": "Logout",

		// Homepage
		"HOME_GREETING": "Greetings",

		// Landing page
		"LANDING_SLOGAN": "Your Handy Tool for Domestic Care.",

		"LANDING_EMAIL": "Email",
		"LANDING_PASSWORD": "Password",
		"LANDING_SIGNIN": "Sign In",
		"LANDING_SIGNUP": "Sign Up",

		"LANDING_FACEBOOKLOGIN": "Log In With Facebook",
		"LANDING_CHANGELANG": "Use Another Language",
		"LANDING_DIVERT1": "You are running the app in a browser that is too large.",
		"LANDING_DIVERT2": "This application is meant for smaller platforms.",
		"LANDING_TERMS1": "By using this application, you agree to these ",
		"LANDING_TERMS2": "Terms and Conditions",

		// Register
		"REGISTER_HEADER": "Register",
		"REGISTER_NAME": "Name",
		"REGISTER_EMAIL": "Email",
		"REGISTER_PASSWORD": "Password",
		"REGISTER_CONFIRM": "Confirm details",
		"REGISTER_RETURN": "Return",
		// Phrasebook
		"PHRASEBOOK_HEADER": "My Phrases",
		"PHRASEBOOK_NOSAVED": "You have no saved phrases at the moment.",

		// My Tasks
		"TASKS_HEADER": "My tasks",
		"TASKS_NOTASKS": "You have not added a task yet.",
		"TASKS_ADD_A_TASK_LABEL": "Add a Task",
		"TASKS_INCLUDE_TASK_HERE": "Include your task here (5-30 characters).",
		"TASKS_HIGHLIGHT_TASK": "Hightlight the task at a certain time",
		"TASKS_HIGHLIGHT_TASK_AT": "Hightlight the task at...",
		"TASKS_SET_TIMER": "Set a running timer for the task",
		"TASKS_SET_TIMER_DURATION": "Timer duration (in mins)...",
		"TASKS_CONFIRM": "Confirm Task",

		// Settings
		"SETTINGS_BACKGROUND": "Choose a new background",
		"SETTINGS_CONFIRM": "Confirm your settings",

		// Translate
		"TRANSLATE_HEADER": "Text to Translate",
		"TRANSLATE_CONVERT_HEADER": "Convert Text Into...",
		"TRANSLATE_TAGALOG": "Tagalog (TL)",
		"TRANSLATE_BAHASA": "Bahasa Indo (ID)",
		"TRANSLATE_ENGLISH": "English (EN)",
		"TRANSLATE_CHINESE": "Chinese (ZH)",


	}

	const tlTranslations = {
		"SWITCH_LANG_LABEL": "Now in Tagalog"
	}

	const idTranslations = {
		"SWITCH_LANG_LABEL": "Now in Bahasa Indo"
	}

	$translateProvider
		.translations('en', enTranslations)
		.translations('tl', tlTranslations)
		.translations('id', idTranslations)
		.preferredLanguage('en');

})
