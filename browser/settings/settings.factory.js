'use strict';

app.factory('SettingsFactory', (cloudinary, StoreFactory, ToastFactory, $http, AuthFactory, $state, $translate, $rootScope) => {
	var SettingsFactory = {};

	SettingsFactory.upload = (file) => {
	    // Get id from storage, checks done in Ctrl
	    var idStr = StoreFactory.getProfile().id.toString();
	  	// Remove extension from name
	  	var name = file.name;
	  	var nameWithoutExt = name.substring(0, name.indexOf('.'));
	    // Start Upload
	    return cloudinary.upload(file, {
	    	public_id: idStr + '/' + nameWithoutExt
	    })
	    .then((res) => {
	      	console.log('Cloudinary Res Data: ' + JSON.stringify(res.data));
	     	// Upload succeeds
	     	if (res && res.status === 200) {
	      		return res.data.secure_url;
	      	} else {
	      		return null;
	      	}
	    })
	}

	SettingsFactory.serverUpdate = (updateOptions) => {
		console.log("updateOptions received as: " + JSON.stringify(updateOptions));
        return $http.post('/api/user/update', updateOptions)
        .then((res) => AuthFactory.resToDataFilter(res))
        .then((data) => {
        	if (data.success) {
        		console.log("Server sync res: " + JSON.stringify(data));
        		ToastFactory.displayMsg(
        			$translate.instant('T_SETTINGS_SYNC_SUCC'), 500);
        		StoreFactory.saveProfile(data.user);
        		$rootScope.broadcast("sourceUpdate");
        		$state.go('home');
        	} else {
        		ToastFactory.displayMsg(
        			$translate.instant('T_SETTINGS_SYNC_FAIL'), 600);
        	}
        })
	}
	return SettingsFactory;
});
