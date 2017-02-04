'use strict';

app.controller('MapCtrl', ($scope, $rootScope, NgMap, MapFactory, MapStyleFactory) => {

	// Launch tutorial
	MapFactory.launchTutorial();
	
	/* ----------- MAP FUNCS ------------- */ 
	// View controls
	$scope.view = 'display';
	$scope.setView = (str) => { $scope.view = str; }

	$scope.showProfile = (event) => { MapFactory.showProfile(event); }

	// ApiURL
	const apiKey = "AIzaSyBoEquSh_g4ZxKXRI21Zc801bAYLivD834";
	$scope.gMapsUrl = "https://maps.google.com/maps/api/js?key=" + apiKey;

	// Define options
	$scope.options = {};
	$scope.options.zoom = 18;
	$scope.options.styles = MapStyleFactory.getStyle();
	$scope.options.center = { lat: 1.29, lng: 103.85 }
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((pos) => {
			$scope.options.center = { lat: pos.coords.latitude, lng: pos.coords.longitude }
		})
	} 

	// Save coords + Save map
	const mapProm = NgMap.getMap(); 
	const coordsProm = MapFactory.getAllCoords();
	Promise.all([mapProm, coordsProm])
	.then((values) => {
		$scope.map = values[0];
		const data = values[1];
		if (data.success) {
			$scope.coords = MapFactory.expandCoords(data.coords);
		} else {
			$scope.coords = [];
		}
		console.table($scope.coords);
		$rootScope.currCoord = $scope.coords[0];

		$scope.showDetail = (ev, coord) => {
			console.log("coord was passed:" + JSON.stringify(coord));
			$rootScope.currCoord = coord;
			$scope.map.showInfoWindow('user-iw', 'm' + coord.id);
		}
	})

	/* ----------- SETTINGS FUNCS ------------- */ 
	$scope.markUserLocation = function () {
		MapFactory.markUserLocation();
	}

	$scope.removeUserLocation = function () {
		MapFactory.removeUserLocation();
	}

});
