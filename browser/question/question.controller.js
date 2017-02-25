'use strict'

app.controller('QuestionCtrl', ($scope, $rootScope, $http, $stateParams, ToastFactory, $translate) => {

	function loadQuestion() {
		$http.get('/api/forum/' + $stateParams.questionId)
		.then((res) => res.data)
		.then((data) => {
			if (data.success) {
				console.log(JSON.stringify(data.question));
				$scope.question = data.question;
			} else {
				ToastFactory.displayMsg($translate.instant('T_QN_FAIL'), 500);
			}
		})	
	}
	loadQuestion();

	$scope.writingResponse = false;

	$scope.writeResponse = () => {
		$scope.writingResponse = true;
	}

	$scope.cancelResponse = () => {
		$scope.writingResponse = false;
	}

	$scope.postResponse = () => {
		$http.post('/api/forum/' + $stateParams.questionId, {
			content: $scope.respContent
		})
		.then((res) => res.data)
		.then((data) => {
			if (data.success) {
				loadQuestion();
				$scope.writingResponse = false;
			} else {
				ToastFactory.displayMsg($translate.instant('T_RESP_FAIL'), 500);
			}
		})	
	}
})