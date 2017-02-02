'use strict';

app.factory('ToastFactory', function ($mdToast) {
	const ToastFactory = {};

	const toastCreator = function (string, delay) {
		return $mdToast.simple()
		.textContent(string)
		.hideDelay(delay)
		.position('bottom');
	}


	ToastFactory.displayMsg = (message, time) => {
		const toast = toastCreator(message, time)
		$mdToast.show(toast)
	} 

	ToastFactory.taskRunning = (taskName) => {
		$mdToast.show(toastCreator('Timer has started for ' + taskName + '.', 600));
	}

	return ToastFactory;

});
