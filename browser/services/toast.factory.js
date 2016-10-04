'use strict';

app.factory('toastFactory', function ($mdToast) {
	var toastFactory = {};

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

	toastFactory.userOffline = function () { $mdToast.show(offlineMsg) };
	toastFactory.uploadSuccess = function () { $mdToast.show(uploadSuccessMsg) };
	toastFactory.uploadFailure = function () { $mdToast.show(uploadFailureMsg) };

	return toastFactory;

});
