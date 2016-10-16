'use strict';

app.factory('ToastFactory', function ($mdToast) {
	var ToastFactory = {};

	var offlineMsg = $mdToast.simple()
		.textContent('You are offline!')
		.hideDelay(800)
		.position('bottom');

	var uploadSuccessMsg = $mdToast.simple()
		.textContent('Upload Complete.')
		.hideDelay(800)
		.position('bottom');

	var uploadFailureMsg = $mdToast.simple()
		.textContent('Upload Failed!')
		.hideDelay(800)
		.position('bottom');

	var authProblemMsg = $mdToast.simple()
		.textContent('Oops -- log in again!')
		.hideDelay(1000)
		.position('bottom');
	


	ToastFactory.userOffline = function () { $mdToast.show(offlineMsg) };
	ToastFactory.uploadSuccess = function () { $mdToast.show(uploadSuccessMsg) };
	ToastFactory.uploadFailure = function () { $mdToast.show(uploadFailureMsg) };
	ToastFactory.authProblem = function () { $mdToast.show(authProblemMsg) };


	return ToastFactory;

});
