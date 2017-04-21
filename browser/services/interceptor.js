'use strict';

// Create the interceptor
app.factory('APIInterceptor', function (StoreFactory, $rootScope) {

	var APIInterceptor = {};

	APIInterceptor.request = function (config) {
		if (config.url.includes('api.cloudinary.com')) {
			return config;
		} 

		if (StoreFactory.hasHToken()) {
			config.headers['x-access-token'] = StoreFactory.getHToken();
		}
		return config;
	}

	APIInterceptor.response = function (response) {
		// If client receives status 401 || 403, broadcast it
		if (response.status === 401 || response.status === 403) { 
			$rootScope.$broadcast('unauthenticated');
		}
		return response;	
	}

	APIInterceptor.responseError = function (response) {
		// If client receives status 401 || 403, broadcast it
		if (response.status === 401 || response.status === 403) { 
			$rootScope.$broadcast('unauthenticated');
		}
		return response;
	}
	
	return APIInterceptor;
})
