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
		"HOME_LABEL": "Home",
		"MY_TASKS_LABEL": "My Tasks",
		"TRANSLATOR_LABEL": "Translator",
		"PHRASEBOOK_LABEL": "Phrasebook",
		"MY_RIGHTS_LABEL": "My Rights",
		"REACH_OUT_LABEL": "Reach Out",
		"SETTINGS_LABEL": "Settings",
		"LOGOUT_LABEL": "Logout",
		// Greetings
		"HOME_GREETING": "Greetings",

		// Landing
		"SIGN_IN_EMAIL": "Email",
		"SIGN_IN_PASSWORD": "Password",
		"SIGN_IN_BUTTON_LABEL": "Sign In",
		"SIGN_UP_BUTTON_LABEL": "Sign Up",
		"ACCESS_FACEBOOK_LABEL": "Access With Facebook",
		"SWITCH_LANG_LABEL": "Switch Language"

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
