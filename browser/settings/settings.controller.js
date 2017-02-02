'use strict';

app.controller('SettingsCtrl', function ($scope, cloudinary, StoreFactory, ToastFactory, $state) {

  // Hide any loading animations
	$scope.notLoading = true;


	$scope.update = function () {
    // If cannot get userId from Store, break
    if (!StoreFactory.getProfile().id) {
      ToastFactory.displayMsg('Error: Your cache has missing data.', 800);
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
      if (response && response.status == 200) {
      	$scope.notLoading = true
      	ToastFactory.displayMsg('Upload Successful.', 800);
        console.log('Upload succeeded. Cloudinary Res Status: ' + response.status +
                    ', Data: ' + JSON.stringify(response.data));
        // Record cloudinary's API url
        StoreFactory.updateBgUrl(response.data.secure_url);

        // Update Backend
        return $http.post('/user/updateBgUrl', {
          bgUrl: response.data.secure_url
        })
        .then(function (homieServerRes) {
          if(homieServerRes && homieServerRes.data.success){
            console.log("New bgUrl synced with server.")
          } else {
            console.log("New bgUrl did not sync with server.")
          }
          $state.go('home');
        })
      } else {
      	$scope.notLoading = true
        ToastFactory.displayMsg('Upload failed.', 800);
        console.log('Upload failed. Cloudinary Res Status: ' + response.status);
      }
    });
  };

})