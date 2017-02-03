'use strict';

app.factory('MapFactory', function ($http, $state, ToastFactory) {
	var MapFactory = {};

	MapFactory.getAllCoords = function () {
		return $http.get('/map')
		.then((res) => res.data);
	}

	MapFactory.markUserLocation = function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				const latLng = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				}

				return $http.post('/map', latLng)
				.then((res) => res.data)
				.then((data) => {
					if (data.success) {
						ToastFactory.displayMsg('Successfully marked your location.', 800);
						$state.reload();
					} else {
						ToastFactory.displayMsg('Failed to mark your location.', 800);
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
				ToastFactory.displayMsg('Your marker has been removed.', 800);
				$state.reload();
			} else {
				ToastFactory.displayMsg('An error occurred.', 500);
			}
		})
	}

	return MapFactory;

});
