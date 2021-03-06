'use strict'

app.controller('HomeCtrl', ($scope, $interval, StoreFactory) => {

	// Set up profile variables
	var profile = StoreFactory.getProfile();
	$scope.firstName = profile.name.split(' ')[0];
	
 	// Labelled for non-commercial reuse: 
	// https://upload.wikimedia.org/wikipedia/commons/8/8a/Too-cute-doggone-it-video-playlist.jpg
	var defaultBg = "/media/homeDefault.jpg"

	$scope.bg = defaultBg;
	
	// Start the clock, run interval checks
	setTimeAndGreeting();
	$interval(setTimeAndGreeting,1000);

	function setTimeAndGreeting () {
		var currentTime = new Date();
		var currentHour = currentTime.getHours().toString();
		var currentMinutes = currentTime.getMinutes().toString();
		if(parseInt(currentMinutes) < 10) currentMinutes = "0" + currentMinutes;
		if(parseInt(currentHour) < 10) currentHour = "0" + currentHour;
		$scope.time = currentHour+ ":" + currentMinutes;

	}

});

