'use strict';

app.factory('MapFactory', function ($http, $state, ToastFactory, $mdDialog) {
	var MapFactory = {};

	// Fire tutorial
	MapFactory.launchTutorial = () => {
		if (localStorage.getItem('HOMIE-smt') !== 'seen') {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('.currentNavItem')))
		        .clickOutsideToClose(true)
		        .title('Welcome to Homies@SG!')
		        .textContent("Feel free to reach out to other domestic helpers in the area. You can edit your visibility in the '?' tab.")
		        .ariaLabel('Map Tutorial Dialog')
		        .ok('Okay!')
		    );
		}
	    localStorage.setItem('HOMIE-smt', 'seen');
	}	

	MapFactory.showProfile = (event) => {
	    $mdDialog.show({
	      controller: 'ProfileCtrl',
	      templateUrl: '/map/profile.template.html',
	      parent: angular.element(document.body),
	      targetEvent: event,
	      clickOutsideToClose:true,
	      fullscreen: true 
	    })
	}

	MapFactory.getAllCoords = () => {
		return $http.get('/map')
		.then((res) => res.data);
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

	MapFactory.markUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				const latLng = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				}

				return $http.post('/map', latLng)
				.then((res) => res.data)
				.then((data) => {
					console.table(data);
					if (data.success) {
						ToastFactory.displayMsg('Successfully added your profile to the map.', 1000);
						$state.reload();
					} else {
						ToastFactory.displayMsg('Failed to add your profile.', 800);
					}
				})
			})
		} else {
			ToastFactory.displayMsg('Unable to use GPS!', 800);
		}
	}

	MapFactory.removeUserLocation = function () {
		return $http.delete('/map')
		.then((res) => res.data)
		.then((data) => {
			if (data.success) {
				ToastFactory.displayMsg('Your profile has been hidden.', 800);
				$state.reload();
			} else {
				ToastFactory.displayMsg('An error occurred.', 500);
			}
		})
	}

	return MapFactory;

});
