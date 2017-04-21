'use strict';

app.run(($window, AuthFactory, $rootScope, $location, $state) => {
    // Initialise FB JS SDK
    $window.fbAsyncInit = () => {
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


    // Initialise Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    // Register listener for $stateChange events (for GA)
    $window.ga('create', 'UA-83429327-3', 'auto');
    $rootScope.$on('$stateChangeSuccess', (ev) => {
        $window.ga('send', 'pageview', $location.path());
    })
    // Register listeners for Authenticated/Unauthenticated events
    $rootScope.$on('unauthenticated', (ev) => { 
      $state.go('landing');     
    })
    $rootScope.$on('authenticated', (ev) => {   
      $state.go('home');      
    })
    // Check and set rootScope vals
    function checkRootScopeVals (key) {
        if (localStorage.getItem(key) !== null &&
            localStorage.getItem(key).length > 10) {
          $rootScope[key] = JSON.parse(localStorage.getItem(key));
        }
    }
    checkRootScopeVals('HOMIE-receiver');
    checkRootScopeVals('HOMIE-currMessage');
    checkRootScopeVals('HOMIE-currQuestionId');   
    $rootScope.isOnline = true;
});
