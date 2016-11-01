'use strict';

app.controller('SettingsCtrl', function ($scope, cloudinary, StoreFactory, ToastFactory, $state) {

  // Hide any loading animations
	$scope.notLoading = true;


	$scope.update = function () {
    // If cannot get userId from Store, break
    if (!StoreFactory.getProfile().id) {
      ToastFactory.storeMissing();
      return; 
    }
		// If image is valid, upload it.
		if ($scope.form.file.$valid && $scope.file) {
			return upload($scope.file);
		}
	}


  var upload = function (file) {
    // Get id from storage
    var idStr = StoreFactory.getProfile().id.toString();
  	// Remove extension from name
  	var name = file.name;
  	var nameWithoutExt = name.substring(0, name.indexOf('.'));

  	// Start Animation
  	$scope.notLoading = false;
    // Start Upload
    cloudinary.upload(file, {
    	public_id: idStr + '/' + nameWithoutExt
    })
    // Upload succeeds, stop Animation
    .then(function (response) {
    	$scope.notLoading = true
    	ToastFactory.uploadSuccess();
      console.log('Upload succeeded. Cloudinary Res Status: ' + response.status +
                  ', Data: ' + JSON.stringify(response.data));
      // Record cloudinary's API url
      StoreFactory.updateBgUrl(response.data.secure_url);
      $state.go('home');

    // Upload fails, show error message
    }, function (response) {
    	$scope.notLoading = true
    	ToastFactory.uploadFailure();

      console.log('Upload failed. Cloudinary Res Status: ' + response.status);
    });
  };
	

})