'use strict';

app.factory('SettingsFactory', (cloudinary, StoreFactory, ToastFactory, $http, AuthFactory, $state) => {
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
	     		ToastFactory.displayMsg('Upload successful.', 400);
	      		return res.data.secure_url;
	      	} else {
	      		ToastFactory.displayMsg('Upload failed.', 400);
	      		return null;
	      	}
	    })
	}

	SettingsFactory.serverUpdate = (updateOptions) => {
		console.log("updateOptions received as: " + JSON.stringify(updateOptions));
        return $http.post('/user/update', updateOptions)
        .then((res) => AuthFactory.resToDataFilter(res))
        .then((data) => {
        	if (data.success) {
        		console.log("Server sync res: " + JSON.stringify(data));
        		ToastFactory.displayMsg('Update synced with server.', 500);
        		StoreFactory.saveProfile(data.user);
        		$state.go('home');
        	} else {
        		ToastFactory.displayMsg('Update did not sync with server.', 600);
        	}
        })
	}
	return SettingsFactory;
});
