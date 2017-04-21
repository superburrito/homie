'use strict';

app.factory('AuthFactory', function ($http, $q, $rootScope, StoreFactory, $state, ToastFactory, $translate) {

	var AuthFactory = {};

	// Local Auth
	AuthFactory.signup = function (name, email, password) {
		return $http.post('/auth/local/signup', {
			name: name,
			email: email, 
			password: password
		})
		.then(function (res) {
			if (res.data && res.data.msg === 'account_exists') {
				ToastFactory.displayMsg(
					$translate.instant('T_AUTH_ACCT_EXISTS'), 500);
			} else {
				AuthFactory.authDataHandler(res.data);
			}
		})
	};


	AuthFactory.login = function (email, password) {
		return $http.post('/auth/local', {
			email: email, 
			password: password
		})
		.then(function (res) {
			if (res.data && res.data.msg === 'auth_failure_wrong_val') {
				ToastFactory.displayMsg(
					$translate.instant('T_AUTH_WRONG_CREDS'), 500);
			} else if (res.data && res.data.msg === 'auth_failure_not_found') {
				ToastFactory.displayMsg(
					$translate.instant('T_AUTH_NO_SUCH'), 500);
			} else {
				AuthFactory.authDataHandler(res.data);
			}
		})
	};

	// Facebook Auth
	AuthFactory.fbLogin = function () {
		return FB.getLoginStatus((fbGetStatRes) => {
			if (fbGetStatRes.status !== 'connected') {
				// Get short-lived token (slToken) from Facebook
				return FB.login((fbLoginRes) => {
					if (fbLoginRes && fbLoginRes.authResponse) {
						var slToken = fbLoginRes.authResponse.accessToken;
						console.log("slToken from FBLogin (disconnected): " + slToken);
						ToastFactory.displayMsg($translate.instant('T_AUTH_FB_SUCCESS'), 500);
						return $http.post('/auth/facebook', { slToken: slToken })
						.then((homieRes) => {
							if (homieRes.data && homieRes.status === 400) {
								ToastFactory.displayMsg(
									$translate.instant('T_AUTH_SERVER_ERR'), 500);
								console.log("[LOGIN] Failed: " + JSON.stringify(homieRes.data));
							} else {
								AuthFactory.authDataHandler(homieRes.data);
							}
						}) 
					} else {
						ToastFactory.displayMsg($translate.instant('T_AUTH_FB_FAIL'), 500);
						return ;
					}
				})
			} else {
				// Connected, token attached (i.e. Re-entry while connected to FB)
				var slToken = fbGetStatRes.authResponse.accessToken;
				console.log("slToken with connected Status: " + slToken);
				return $http.post('/auth/facebook', { slToken: slToken })
				.then((homieRes) => {
					if (homieRes.data && homieRes.status === 400) {
						ToastFactory.displayMsg(
							$translate.instant('T_AUTH_SERVER_ERR'), 500);
						console.log("[LOGIN] Failed: " + JSON.stringify(homieRes.data));
					} else {
						AuthFactory.authDataHandler(homieRes.data);
					}					
				})
			}
		});
	};

	// Local & FB Reentry
	AuthFactory.reentry = () => {
		return $http.post('/reentry', {})
		.then((res) => { 
			console.log("[RE-ENTRY] HOMIE server reentry res: " + JSON.stringify(res.data));
			return res.data; 
		})
		.then((data) => {
			AuthFactory.authDataHandler(data);
		});
	};

	AuthFactory.resToDataFilter = (res) => res.data;

	// Handles data from local/FB logins AND re-entries
	AuthFactory.authDataHandler = function (data) {
		console.log("[LOGIN] Accessing client is: " + JSON.stringify(data.user));
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
/*	AuthFactory.failedAuthListener = function () {
		$rootScope.$on('unauthenticated', function () {	
			$state.go('landing');			
		})
	};

	AuthFactory.successfulAuthListener = function () {
		$rootScope.$on('authenticated', function () {		
			$state.go('home');			
		})
	};*/


	return AuthFactory;

})




