'use strict'

app.controller('HomeCtrl', function ($scope, $interval, StoreFactory) {

	// Set up profile variables
	var profile = StoreFactory.getProfile();
	$scope.firstName = profile.firstName;
	var bgUrl = profile.bgUrl;

	// Set up background	
	var defaultBg = "http://www.morethancalendars.co.uk/uploads/images/Gallery/Animals-Portrait/Animals_25.jpg"
	$scope.bg = bgUrl || defaultBg;
	
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

		if(currentHour <= 4){
			$scope.greeting = "Sweet dreams";
		} else if (currentHour < 11){
			$scope.greeting = "Rise and shine";
		} else if (currentHour < 14){
			$scope.greeting = "It's lunchtime";
		} else if (currentHour < 18){
			$scope.greeting = "Good afternoon";
		} else {
			$scope.greeting = "Good evening";
		} 
	}


});

