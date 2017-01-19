'use strict';

app.run(function ($window, AuthFactory) {

  // Initialise FB JS SDK
  $window.fbAsyncInit = function() {
    FB.init({
      appId: '925425917589411',
      status: true, 
      xfbml: true,
      version: 'v2.7'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  // Registers listeners for Authenticated/Unauthenticated events
  AuthFactory.failedAuthListener();
  AuthFactory.successfulAuthListener();
  
  
  
});
