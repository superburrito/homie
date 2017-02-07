'use strict';

app.controller('MapCtrl', ($scope, $rootScope, MapFactory, MapStyleFactory, $state) => {

	// Launch tutorial
	MapFactory.launchTutorial();
	
	/* ----------- MAP FUNCS ------------- */ 
	// View controls
	$scope.view = 'display';
	$scope.setView = (str) => { $scope.view = str; }

	$scope.showProfile = (event) => { MapFactory.showProfile(event); }

	// Define gmap options
	const options = {};
	options.center = { lat: 1.29, lng: 103.85 }
	options.zoom = 18;
	options.styles = MapStyleFactory.getStyle();
	// Load map first
	var map = new google.maps.Map(document.getElementById('mapDisplay'), options);
	// If GPS available, pan to current location
	$scope.currPos = null;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((pos) => {
			$scope.currPos = { 
				lat: pos.coords.latitude, 
				lng: pos.coords.longitude 
			}

			map.panTo($scope.currPos);
		})
	} 
	// Load Markers
	var markers = [];
	function loadMarkers () { 
		// Icon src: http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png
		const iconOptions = {
			url: '/media/mapIcon.png',
			scaledSize: new google.maps.Size(42, 42),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(0, 0)	
		}
		return MapFactory.getAllCoords()
		.then((coords) => {
			// Display all retrieved coords in console
			console.table(coords);
			var ctr = 0;	
			coords.forEach((coord) => {
				var marker = new google.maps.Marker({
					position: {lat: coord.lat, lng: coord.lng},
					map: map,
					icon: iconOptions,
					title: coord.user.name,
					zIndex: ctr 
				});
				markers.push(marker);
				marker.setMap(map);
				ctr++;
				marker.addListener('click', function() {
					$rootScope.currCoord = coord;
					MapFactory.showProfile();
				})
			})
		})
	}
	loadMarkers();

	function clearMarkersSync () {
		for (var i=0; i < markers.length; i++) {
			markers[i].setMap(null);
			markers[i] = null;
		}
		markers = [];
	}

	/* ----------- SETTINGS FUNCS ------------- */ 
	$scope.markUserLocation = function () {
		clearMarkersSync();
		Promise.resolve(MapFactory.markUserLocation($scope.currPos))
		.then(() => { 
			loadMarkers(); 
			$scope.view = 'display';
		});
	}

	$scope.removeUserLocation = function () {
		clearMarkersSync();
		Promise.resolve(MapFactory.removeUserLocation())
		.then(() => { 
			loadMarkers(); 
			$scope.view = 'display';
		});
	}
});
