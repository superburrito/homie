'use strict';

app.factory('AuthFactory', function ($http, $q, $rootScope, StoreFactory, $state, ToastFactory) {
	var AuthFactory = {};

	AuthFactory.fbLogin = function () {
		var fbPromise = $q.defer();
		// Get short-lived token (slToken) from Facebook
		FB.login((res) => {
			if (res.authResponse) {
				var slToken = res.authResponse.accessToken;
				console.log("[LOGIN] Facebook login successful. slToken obtained:" + slToken);
				fbPromise.resolve({ success: true, slToken: slToken })
			} else {
				console.log("[LOGIN] Facebook login failed.");
				fbPromise.resolve({ success: false });
			}
		})
	
		// Pass fbUserData to Server to get long-lived token
		fbPromise.promise.then((slTokenObj) => {
			if(!slTokenObj.success) {
				$rootScope.$broadcast('unauthenticated');
			} else {
				$http.post('/auth/facebook', slTokenObj)
				.then(function (res) {
					AuthFactory.authDataHandler(res.data);
					return res.data;
				})
			}
		})
	};

	AuthFactory.reentry = function () {
		$http.get('/reentry')
		.then((res) => { 
			console.log("[RE-ENTRY] HOMIE server reentry res: " + JSON.stringify(res.data));
			return res.data; 
		})
		.then((data) => {
			AuthFactory.authDataHandler(data);
		});
	};

	// Handles logins AND re-entries
	AuthFactory.authDataHandler = function (data) {
		if (data && data.success) {
			if (data.fbToken) {
				console.log("[LOGIN] Homie-FB Token Exchange successful. (ll) fbToken obtained: " + data.fbToken);
			}
			if (data.hToken) {
				console.log("[LOGIN] Homie Token obtained: " + data.hToken);
			}
			StoreFactory.saveAuthData(data);
			$rootScope.$broadcast('authenticated');
		} else {
			$rootScope.$broadcast('unauthenticated');
		} 
	};

	AuthFactory.logout = function () {
		$state.go('landing');
		FB.logout(() => {
			StoreFactory.clear();
		});
	};


	// Listeners
	AuthFactory.failedAuthListener = function () {
		$rootScope.$on('unauthenticated', function () {	
			ToastFactory.displayMsg('Authentication failed. You have been redirected.', 900);	
			$state.go('landing');			
		})
	};

	AuthFactory.successfulAuthListener = function () {
		$rootScope.$on('authenticated', function () {		
			$state.go('home');			
		})
	};


	return AuthFactory;

})




