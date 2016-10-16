'use strict';

// Url Routing Configurations
app.config(function ($urlRouterProvider) {

    $urlRouterProvider.when('','/');
	  $urlRouterProvider.otherwise('/home');
    
});


// Cloudinary Configurations
app.config(function (cloudinaryProvider) {

    cloudinaryProvider.config({
      upload_endpoint: 'https://api.cloudinary.com/v1_1/',
      cloud_name: 'superburrito',
      upload_preset: 'eb8qmsw6'
    });

});


// Add an interceptor which transforms requests and responses
app.config(function($httpProvider){
	
	$httpProvider.interceptors.push('APIInterceptor');

});


