'use strict';

app.factory('AuthFactory', function ($http, $q, $rootScope, StoreFactory, $state, ToastFactory) {
	var AuthFactory = {};

	AuthFactory.authDataHandler = function (data) {
		if (data && data.success) {
			StoreFactory.saveAuthData(data);
			$rootScope.$broadcast('authenticated');
		} else {
			$rootScope.$broadcast('unauthenticated');
		} 
	};

	AuthFactory.signup = function (name, email, password) {
		$http.post('/auth/local/signup', {
			name: name,
			email: email, 
			password: password
		})
		.then(function (res) {
			AuthFactory.authDataHandler(res.data);
			return res.data;
		})
	};


	AuthFactory.login = function (email, password) {
		$http.post('/auth/local', {
			email: email, 
			password: password
		})
		.then(function (res) {
			AuthFactory.authDataHandler(res.data);
			return res.data;
		})
	};


	AuthFactory.logout = function () {
		StoreFactory.clear();
		$state.go('landing');
	};


	// Listeners
	AuthFactory.failedAuthListener = function () {
		$rootScope.$on('unauthenticated', function () {		
			// Clear store, return to landing
			ToastFactory.authProblem();
			$state.go('landing');			
		})
	};

	AuthFactory.successfulAuthListener = function () {
		$rootScope.$on('authenticated', function () {		
			$state.go('home');			
		})
	};


	AuthFactory.fbLogin = function () {
		var fbPromise = $q.defer();
		FB.login(function (res) {
			if (res.authResponse) {
				
				console.log("FB client logged in. Fetching data...");
				var fbToken = res.authResponse.accessToken;
				StoreFactory.saveFbToken(fbToken);

				FB.api('/me?fields=id,name,email', function (res) {
					if (!res && res.error) {
						console.log("FB denied user access.");
						fbPromise.resolve({ success: false });
					} else {
						console.log('FB granted user access. FB Token is: ' + fbToken);
						fbPromise.resolve({
							success: true,
							fbId: res.id,
							name: res.name,
							email: res.email,
							fbToken: fbToken
						});
					}
				})
			} else {
				console.log("Facebook login failed.");
				fbPromise.resolve({ success: false });
			}
		},{ scope: 'email' })
	
		fbPromise.promise.then(function(fbUserData){
			if(!fbUserData.success) {
				$rootScope.$broadcast('unauthenticated');
			} else {
				$http.post('/auth/facebook', fbUserData)
				.then(function (res) {
					AuthFactory.authDataHandler(res.data);
					return res.data;
				})
			}
		})
	};

	return AuthFactory;

})




