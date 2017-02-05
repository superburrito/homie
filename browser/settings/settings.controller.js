'use strict';

app.controller('SettingsCtrl', function ($scope, ToastFactory, $state, SettingsFactory, StoreFactory, $translate) {

  // Hide any loading animations
	$scope.notLoading = true;

	$scope.update = function () {
	    // If cannot get userId from Store, break
   		if (!StoreFactory.getProfile().id) {
      		ToastFactory.displayMsg(
      			$translate.instant('T_SETTINGS_CACHE_ERR'), 700);
      		return; 
    	}
    	// Run animation
    	$scope.notLoading = false;

    	// If description is valid, add it to options
		var updateOptions = {};
		if ($scope.form.description.$valid && 
			$scope.description) {
			updateOptions.description = $scope.description;
		}


		// If image is valid, add it to options
		if ($scope.form.file.$valid && $scope.file) {
			return SettingsFactory.upload($scope.file)
			.then((url) => {
				if (url) {
					updateOptions.src = url;
				}
				return SettingsFactory.serverUpdate(updateOptions)
				.then(() => {
					$scope.notLoading = true;
				});
			})
		} else {
			return SettingsFactory.serverUpdate(updateOptions);
		}
	};
});
