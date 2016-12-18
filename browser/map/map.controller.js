'use strict';

app.controller('MapCtrl', ($scope, NgMap) => {

	NgMap.getMap().then((map) => {
		map.setOptions({
			center: {lat: 1.29, lng: 103.85}
		})
			
	})

});

