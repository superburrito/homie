'use strict';

app.factory('AuthFactory', function ($http, $q, $rootScope, StoreFactory, $state, ToastFactory) {

	var AuthFactory = {};

	// Local Auth
	AuthFactory.signup = function (name, email, password) {
		$http.post('/auth/local/signup', {
			name: name,
			email: email, 
			password: password
		})
		.then(function (res) {
			if (res.data && res.data.message === 'account_exists') {
				ToastFactory.displayMsg('Account already exists!', 600);
			} else {
				AuthFactory.authDataHandler(res.data);
			}
		})
	};


	AuthFactory.login = function (email, password) {
		$http.post('/auth/local', {
			email: email, 
			password: password
		})
		.then(function (res) {
			if (res.data && res.data.message === 'auth_failure_wrong_val') {
				ToastFactory.displayMsg('Wrong email or password!', 600);
			} else if (res.data && res.data.message === 'auth_failure_not_found') {
				ToastFactory.displayMsg('No such user.', 500);
			} else {
				AuthFactory.authDataHandler(res.data);
			}
		})
	};

	// Facebook Auth
	AuthFactory.fbLogin = function () {
		var fbPromise = $q.defer();
		FB.getLoginStatus((res) => {
			if (res.status !== 'connected') {
				// Get short-lived token (slToken) from Facebook
				FB.login((res) => {
					if (res.authResponse) {
						var slToken = res.authResponse.accessToken;
						console.log("[LOGIN] FB login successful. slToken obtained:" + slToken);
						fbPromise.resolve({ success: true, slToken: slToken })
					} else {
						console.log("[LOGIN] FB login failed.");
						fbPromise.resolve({ success: false });
					}
				})
			} else {
				FB.logout(() => {
					console.log("[LOGIN] Already logged into FB. HOMIE has logged you out to prevent errors. Try again.")
					fbPromise.resolve({ success: false });
				});
			}
		});

		// Pass fbUserData to Server to get long-lived token
		fbPromise.promise.then((slTokenObj) => {
			if(!slTokenObj.success) {
				ToastFactory.displayMsg('Facebook has blocked access.', 600);
				$rootScope.$broadcast('unauthenticated');
			} else {
				$http.post('/auth/facebook', slTokenObj)
				.then(function (res) {
					if (res.data && res.data.message === 'fb_auth_failure_no_tokens') {
						ToastFactory.displayMsg('A server error occurred.', 600);
					} else {
						AuthFactory.authDataHandler(res.data);
					}
				})
			}
		})
	};

	// Local & FB Reentry
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

	// Handles data from local/FB logins AND re-entries
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

	// Logging out for Local & FB users
	AuthFactory.logout = function () {
		StoreFactory.clear();
		FB.getLoginStatus((res) => {
			if (res.status === 'connected') {
				FB.logout();
			}
		});
		$state.go('landing');
	};


	// Listeners
	AuthFactory.failedAuthListener = function () {
		$rootScope.$on('unauthenticated', function () {	
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




