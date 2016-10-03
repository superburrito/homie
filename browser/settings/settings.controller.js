'use strict';

app.controller('SettingsCtrl', function ($scope, $mdToast) {

	var toastMsg = $mdToast.simple()
		.textContent('Settings page!')
		.hideDelay(500)
		.position('bottom')

	$mdToast.show(toastMsg);



})