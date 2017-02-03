'use strict';

app.controller('MapCtrl', ($scope, NgMap, MapFactory, $compile) => {

	/* ----------- MAP FUNCS ------------- */ 
	// View controls
	$scope.view = 'display';
	$scope.setView = function (str) { $scope.view = str; }

	// ApiURL
	const apiKey = "AIzaSyBoEquSh_g4ZxKXRI21Zc801bAYLivD834";
	$scope.gMapsUrl = "https://maps.google.com/maps/api/js?key=" + apiKey;

	// Helper
	function expandCoords(coords) {
		var expandedCoords = coords.map((coord) => {
			coord.icon = {
				url: 'http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png',
				scaledSize: [42, 42],
				origin: [0, 0],
				anchor: [0, 0]		
			} 
			return coord;
		})
		console.log("Expanded Coords:" + JSON.stringify(expandedCoords));
		return expandedCoords;
	}

	// Define options
	$scope.options = {};
	// Zoom
	$scope.options.zoom = 18;
	// Styles 
	$scope.options.styles = [
	  {
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#242f3e"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#746855"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "color": "#242f3e"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative.locality",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#d59563"
	      }
	    ]
	  },
	  {
	    "featureType": "poi",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#d59563"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#263c3f"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#6b9a76"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#38414e"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      {
	        "color": "#212a37"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#9ca5b3"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#746855"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      {
	        "color": "#1f2835"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#f3d19c"
	      }
	    ]
	  },
	  {
	    "featureType": "transit",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#2f3948"
	      }
	    ]
	  },
	  {
	    "featureType": "transit.station",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#d59563"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#17263c"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#515c6d"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "color": "#17263c"
	      }
	    ]
	  }
	]

	// Center
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
		var map = values[0];
		$scope.map = map;
		const data = values[1];
		if (data.success) {
			$scope.coords = expandCoords(data.coords);
		} else {
			$scope.coords = [];
		}
		console.table($scope.coords);
		$scope.currCoord = $scope.coords[0];

		$scope.showDetail = (ev, coord) => {
			console.log("coord was passed:" + JSON.stringify(coord));
			$scope.currCoord = coord;
			$scope.map.showInfoWindow('user-iw', 'm' + coord.id);
		}
	})

	$scope.fbMessage = function (toFbId) {
		MapFactory.fbMessage(toFbId);
	}


	/* ----------- SETTINGS FUNCS ------------- */ 
	$scope.markUserLocation = function () {
		MapFactory.markUserLocation();
	}

	$scope.removeUserLocation = function () {
		MapFactory.removeUserLocation();
	}

});

