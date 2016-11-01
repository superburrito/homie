'use strict';

app.factory('ToastFactory', function ($mdToast) {
	var ToastFactory = {};

	var toastCreator = function (string, delay) {
		return $mdToast.simple()
		.textContent(string)
		.hideDelay(delay)
		.position('bottom');
	}

	var offlineMsg = toastCreator('You are offline!', 800);
	var uploadSuccessMsg = toastCreator('Upload Complete.', 800);
	var uploadFailureMsg = toastCreator('Upload Failure.', 800);
	var authProblemMsg = toastCreator('Log in again!', 1000);
	var storeMissingMsg = toastCreator('Your browser cache has missing data -- Sign in again.', 1200);
	var phraseSavedMsg = toastCreator('Phrase Saved.', 600);


	ToastFactory.storeMissing = function () {
		$mdToast.show(storeMissingMsg) };
	ToastFactory.userOffline = function () { $mdToast.show(offlineMsg) };
	ToastFactory.uploadSuccess = function () { $mdToast.show(uploadSuccessMsg) };
	ToastFactory.uploadFailure = function () { $mdToast.show(uploadFailureMsg) };
	ToastFactory.authProblem = function () { $mdToast.show(authProblemMsg) };
	ToastFactory.phraseSaved = function () { $mdToast.show(phraseSavedMsg) };

	return ToastFactory;

});
