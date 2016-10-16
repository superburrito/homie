'use strict';

app.controller('SettingsCtrl', function ($scope, $mdToast, cloudinary, StoreFactory, ToastFactory, $state) {

	$scope.notLoading = true;
	var profile = StoreFactory.getProfile();
	var userId = profile.userId;
	var userIdStr = userId.toString();

	$scope.update = function () {
		// If image is valid, upload it.
		if ($scope.form.file.$valid && $scope.file) {
			$scope.upload($scope.file);
		}
	}

  $scope.upload = function (file) {
  	// Remove extension from name
  	var name = file.name;
  	var nameWithoutExt = name.substring(0, name.indexOf('.'));

  	// Start Animation
  	$scope.notLoading = false;

    cloudinary.upload(file, {
    	public_id: userIdStr + '/' + nameWithoutExt
    })
    .then(function (response) {
    	// Stop Animation, Show Message
    	$scope.notLoading = true
    	ToastFactory.uploadSuccess();

      console.log('Upload succeeded. Cloudinary Res Status: ' + response.status +
                  ', Data: ' + JSON.stringify(response.data));
      
      // Record cloudinary's API url
      StoreFactory.updateBgUrl(response.data.secure_url);
      $state.go('home');

    }, function (response) {
    	// Stop Animation, Show Message
    	$scope.notLoading = true
    	ToastFactory.uploadFailure();

      console.log('Upload failed. Cloudinary Res Status: ' + response.status);
    });
  };
	

})