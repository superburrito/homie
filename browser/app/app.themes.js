'use strict';

app.config(function ($mdThemingProvider) { 

  // Default Theme
  $mdThemingProvider.theme('default')
  	.primaryPalette('teal')
  	.accentPalette('pink', { 'default': '300' });

  // Dark Default
  $mdThemingProvider.theme('dark')
    .primaryPalette('grey')
    .dark();


  // Alternate Theme 0
  $mdThemingProvider.theme('altTheme0')
    .primaryPalette('teal')
    .accentPalette('teal', { 'default': '400' });

  // Alternate Theme 1
  $mdThemingProvider.theme('altTheme1')
    .primaryPalette('teal')
    .accentPalette('orange', { 'default': '400' });

  // Alternate Theme 2
  $mdThemingProvider.theme('altTheme2')
    .primaryPalette('teal')
    .accentPalette('deep-purple', { 'default': '400' });


  // Alternate Theme 3
  $mdThemingProvider.theme('altTheme3')
    .primaryPalette('teal')
    .accentPalette('blue', { 'default': '500' });

});
