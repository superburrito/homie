'use strict';

app.factory('ToastFactory', function ($mdToast) {
	const ToastFactory = {};

	const toastCreator = function (string, delay) {
		return $mdToast.simple()
		.textContent(string)
		.hideDelay(delay)
		.position('bottom');
	}

	const offlineMsg = toastCreator('You are offline!', 800);
	const uploadSuccessMsg = toastCreator('Upload Complete.', 800);
	const uploadFailureMsg = toastCreator('Upload Failure.', 800);
	const authProblemMsg = toastCreator('Log in again!', 1000);
	const storeMissingMsg = toastCreator('Your browser cache has missing data -- Sign in again.', 1200);
	const phraseSavedMsg = toastCreator('Phrase Saved.', 600);

	const taskCreatedMsg = toastCreator('Task Created and Saved!', 600);


	ToastFactory.storeMissing = () => {
		$mdToast.show(storeMissingMsg) };
	ToastFactory.userOffline = () => { $mdToast.show(offlineMsg) };
	ToastFactory.uploadSuccess = () => { $mdToast.show(uploadSuccessMsg) };
	ToastFactory.uploadFailure = () => { $mdToast.show(uploadFailureMsg) };
	ToastFactory.authProblem = () => { $mdToast.show(authProblemMsg) };
	ToastFactory.phraseSaved = () => { $mdToast.show(phraseSavedMsg) };
	ToastFactory.taskCreated = () => { $mdToast.show(taskCreatedMsg) };
	ToastFactory.taskRunning = (taskName) => {
		$mdToast.show(toastCreator('Timer has started for ' + taskName + '.', 600));
	}

	return ToastFactory;

});
