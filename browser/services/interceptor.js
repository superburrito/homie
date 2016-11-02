'use strict';

// Create the interceptor
app.factory('APIInterceptor', function (StoreFactory, $rootScope) {

	var APIInterceptor = {};

	APIInterceptor.request = function (config) {
		// If token exists and client calls Homie API
		if (config.url.includes('api.cloudinary.com')) {
			return config;
		} else if (StoreFactory.hasToken()) {
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
