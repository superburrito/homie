'use strict';

app.config(function ($mdThemingProvider) { 

  // Default Theme
  $mdThemingProvider.theme('default')
  	.primaryPalette('teal')
  	.accentPalette('pink', { 'default': '300' });

  // Dark Default
  $mdThemingProvider.theme('dark')
    .primaryPalette('teal')
    .dark();

  // Alternate Theme 0 -- Passive Task 
  $mdThemingProvider.theme('themeTaskP')
    .primaryPalette('teal')
    .accentPalette('teal', { 'default': '500' });

  // Alternate Theme 1 -- Active Task 
  $mdThemingProvider.theme('themeTaskA')
    .primaryPalette('teal')
    .accentPalette('pink', { 'default': '300' });

  // Alternate Theme 2 -- Checked Task
  $mdThemingProvider.theme('themeTaskC')
    .primaryPalette('teal')
    .accentPalette('grey', { 'default': '600' });


  // Alternate Theme 3 -- Phrasebook
  $mdThemingProvider.theme('altTheme3')
    .primaryPalette('teal')
    .accentPalette('blue', { 'default': '500' });


});
