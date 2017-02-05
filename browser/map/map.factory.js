'use strict';

app.factory('MapFactory', function ($http, ToastFactory, AuthFactory, $mdDialog, $translate) {
	var MapFactory = {};

	// Fire tutorial
	MapFactory.launchTutorial = () => {
		if (localStorage.getItem('HOMIE-sMapT') !== 'seen') {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('.currentNavItem')))
		        .clickOutsideToClose(true)
		        .title($translate.instant('MAP_POPUP_HEADER'))
		        .textContent($translate.instant('MAP_POPUP_MAIN'))
		        .ariaLabel('Map Tutorial Dialog')
		        .ok($translate.instant('MAP_POPUP_OK'))
		    );
		}
	    localStorage.setItem('HOMIE-sMapT', 'seen');
	}	

	MapFactory.showProfile = () => {
	    $mdDialog.show({
	      controller: 'ProfileCtrl',
	      templateUrl: '/map/profile.template.html',
	      parent: angular.element(document.body),
	      targetEvent: null,
	      clickOutsideToClose:true,
	      fullscreen: false
	    })
	}

	MapFactory.getAllCoords = () => {
		return $http.get('/map')
		.then((res) => AuthFactory.resToDataFilter(res))
		.then((data) => {
			if (data.success) {
				return data.coords;
			} else {
				return [];
			}
		});
	}

	MapFactory.expandCoords = (coords) => {
		const expandedCoords = coords.map((coord) => {
			coord.icon = {
				url: 'http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png',
				scaledSize: [42, 42],
				origin: [0, 0],
				anchor: [0, 0]		
			} 
			return coord;
		})
		return expandedCoords;
	}

	MapFactory.markUserLocation = (currPos) => {
		if (currPos) {
			return $http.post('/map', currPos)
			.then((res) => AuthFactory.resToDataFilter(res))
			.then((data) => {
				if (data.success) {
					ToastFactory.displayMsg($translate.instant('T_PROFILE_ADD_SUCCESS'), 1000);
				} else {
					ToastFactory.displayMsg($translate.instant('T_PROFILE_ADD_FAIL'), 800);
				}
			})
		} else {
			ToastFactory.displayMsg($translate.instant('T_GPS_FAIL'), 800);
		}
	}

	MapFactory.removeUserLocation = function () {
		return $http.delete('/map')
		.then((res) => AuthFactory.resToDataFilter(res))
		.then((data) => {
			if (data.success) {
				ToastFactory.displayMsg($translate.instant('T_PROFILE_HIDE_SUCCESS'), 800);
			} else {
				ToastFactory.displayMsg($translate.instant('T_PROFILE_HIDE_FAIL'), 500);
			}
		})
	}

	return MapFactory;

});
