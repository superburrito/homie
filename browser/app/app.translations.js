'use strict';

app.config(function($translateProvider) {

	const enTranslations = {
		// Side navbar
		"SIDENAV_HOME": "Home",
		"SIDENAV_TASKS": "My Tasks",
		"SIDENAV_TRANSLATOR": "Translator",
		"SIDENAV_PHRASEBOOK": "Phrasebook",
		"SIDENAV_MAP": "Homies@SG",
		"SIDENAV_MESSAGES": "My Messages",
		"SIDENAV_RIGHTS": "My Rights",
		"SIDENAV_GETHELP": "Get Help",
		"SIDENAV_SETTINGS": "Settings",
		"SIDENAV_LOGOUT": "Logout",

		// Homepage
		"HOME_GREETING": "Greetings",

		// Landing page
		"LANDING_SLOGAN": "The Handy Tool for Domestic Care.",

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
		"PHRASEBOOK_PROMPT": 'Start Translating!',

		// My Tasks
		"TASKS_HEADER": "My Tasks",
		"TASKS_NOTASKS": "You have not added a task yet.",
		"TASKS_ADD_A_TASK_LABEL": "Add a Task",
		"TASKS_INCLUDE_TASK_HERE": "Include your task here (5-30 characters).",
		"TASKS_HIGHLIGHT_TASK": "Set an alarm for the task",
		"TASKS_HIGHLIGHT_TASK_AT": "Hightlight the task at...",
		"TASKS_SET_TIMER": "Set a running timer for the task",
		"TASKS_SET_TIMER_DURATION": "Timer duration (in mins)...",
		"TASKS_CONFIRM": "Confirm Task",
		'TASKS_POPUP_HEADER': "Welcome to your task manager!",
		'TASKS_POPUP_MAIN': "Here, you can create tasks in the right tab and add alarms (as well as timers) to them. When an alarm goes off, the associated task will turn pink and your phone will vibrate.",
		'TASKS_POPUP_OK': "Alright!",

		// Settings
		"SETTINGS_CONFIRM": "Confirm your settings",
		"SETTINGS_SRC": "Set your profile picture",
		"SETTINGS_DESCRIPTION": "Update your profile description here",

		// Translate
		"TRANSLATE_HEADER": "Text to Translate",
		"TRANSLATE_CONVERT_HEADER": "Convert Text Into...",
		"TRANSLATE_TAGALOG": "Tagalog (TL)",
		"TRANSLATE_BAHASA": "Bahasa Indo (ID)",
		"TRANSLATE_ENGLISH": "English (EN)",
		"TRANSLATE_CHINESE": "Chinese (ZH)",

		// HELP
		"HELP_HEADER": "Reach Out",
		"HELP_PARAGRAPH1": "If you are a domestic helper and you need someone to talk to, please do not hesitate to reach out.",
		"HELP_PARAGRAPH2": "Organisations, such as the Humanitarian Organisation for Migration Economics (HOME) and the Centre for Domestic Employees (CDE) can assist you.",
		"HELP_HOME": "Contact HOME",
		"HELP_CDE": "Contact CDE",

		// MAP
		"MAP_SETTINGS1": "You can make add your profile to the map by selecting 'Display My Profile' below. This will display your profile at your current location.",
		"MAP_SETTINGS2": "Don't worry -- you can change or hide your profile at any time.",
		"MAP_DISPLAY_BUTTON": "Display My Profile",
		"MAP_HIDE_BUTTON": "Hide My Profile",
		"MAP_POPUP_HEADER": "Welcome to HOMIES@SG!",
		"MAP_POPUP_MAIN": "See who's around you and feel free to reach out to other housekeepers in the area. Learn more in the '?' tab.",
		"MAP_POPUP_OK": "Okay!",

		// Profile
		"PROFILE_FACEBOOK": "Facebook",
		"PROFILE_SENDMESSAGE": "Send a Message",

		// Message
		"MESSAGE_FROM": "From:",
		"MESSAGE_REPLY": "Reply To Sender",
		"MESSAGE_RETURN": "Return To Messages",

		// Messages
		"MESSAGES_HEADER": "My Messages",
		"MESSAGES_NONE": "You have no messages yet.",
		"MESSAGES_POPUP_HEADER": "Welcome to your inbox!",
		"MESSAGES_POPUP_MAIN": "Click on the profile pictures on the left to view each of your messages.",
		"MESSAGES_POPUP_OK": "Sure!",

		// Messenger
		"MESSENGER_TO": "To:",
		"MESSENGER_TITLE": "Message Title",
		"MESSENGER_CONTENT": "Message Content",
		"MESSENGER_SEND": "Send Your Message",
		"MESSENGER_RETURN": "Return To Messages",

		// Toasts
		"T_PROFILE_ADD_SUCCESS": "Successfully added your profile to the map.",
		"T_PROFILE_ADD_FAIL": "Failed to add your profile to the map.",
		"T_PROFILE_HIDE_SUCCESS": "Your profile has been hidden.",
		"T_PROFILE_HIDE_FAIL": "An error occured.",
		"T_GPS_FAIL": "Unable to use GPS!",

		"T_MESSAGES_LOAD_FAIL": "Failed to load messages.",
		"T_MESSAGES_DELETE_FAIL": "Failed to delete message.",

		"T_MESSENGER_SUCCESS": "Message sent!",
		"T_MESSENGER_FAIL": "Failed to send message.",

		'T_AUTH_ACCT_EXIST': "Account already exists!",
		'T_AUTH_WRONG_CREDS': "Wrong email or password!",
		'T_AUTH_NO_SUCH': "No such account.",
		'T_AUTH_SERVER_ERR': "Server error.",

		'T_TASK_TIMER_START': "Timer has started for ",

		'T_SETTINGS_CACHE_ERR': "Error: Your cache has missing data.",
		'T_SETTINGS_SYNC_SUCC': "Settings synced with server.",
		'T_SETTINGS_SYNC_FAIL': "Syncing with server failed.",

		'T_TASK_CREATED': "Task created and saved.",

		'T_TRANSLATOR_SAVED': "Phrase saved.",
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

});

