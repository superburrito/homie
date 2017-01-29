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
		"HOME_LABEL": "Home",
		"MY_TASKS_LABEL": "My Tasks",
		"TRANSLATOR_LABEL": "Translator",
		"PHRASEBOOK_LABEL": "Phrasebook",
		"MY_RIGHTS_LABEL": "My Rights",
		"REACH_OUT_LABEL": "Reach Out",
		"SETTINGS_LABEL": "Settings",
		"LOGOUT_LABEL": "Logout",

		// Homepage
		"HOME_GREETING": "Greetings",

		// Landing page
		"SIGN_IN_EMAIL": "Email",
		"SIGN_IN_PASSWORD": "Password",
		"SIGN_IN_BUTTON_LABEL": "Sign In",
		"SIGN_UP_BUTTON_LABEL": "Sign Up",
		"ACCESS_FACEBOOK_LABEL": "Access With Facebook",
		"SWITCH_LANG_LABEL": "Switch Language",

		// Register
		"REGISTER_HEADER": "Register",
		"REGISTER_NAME": "Name",
		"REGISTER_EMAIL": "Email",
		"REGISTER_PASSWORD": "Password",
		"REGISTER_CONFIRM": "Confirm details",
		"REGISTER_RETURN": "Return",

		// Phrasebook
		"PHRASEBOOK_HEADER": "Your Phrases: ",
		"PHRASEBOOK_NOSAVED": "You have no saved phrases at the moment.",

		// My Tasks
		"TASKS_HEADER": "My tasks",
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
