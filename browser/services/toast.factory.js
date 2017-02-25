'use strict';

app.factory('ToastFactory', function ($mdToast, $translate) {
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
		$mdToast.show(
			toastCreator(
				$translate.instant('T_TASK_TIMER_START') + 
				taskName + '.', 600)
		);
	}

	return ToastFactory;

});
