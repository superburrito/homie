'use strict';

// Create the interceptor
app.factory('APIInterceptor', function (StoreFactory, $rootScope) {
	var APIInterceptor = {};

	APIInterceptor.request = function (config) {
		
		// If token exists and client calls Homie API
		if (StoreFactory.hasToken() && 
			  config.url.indexOf('localhost:3000/api') !== -1) {
			config.headers['x-access-token'] = StoreFactory.getToken();
		}	
		return config;
	}

	APIInterceptor.response = function (response) {
		return response;
	}

	APIInterceptor.responseError = function (response) {

		// If client receives status 401, broadcast it
		if (response.status === 401) { 
			$rootScope.$broadcast('unauthenticated');
		}
		return response;
	}

	return APIInterceptor;
	
})
