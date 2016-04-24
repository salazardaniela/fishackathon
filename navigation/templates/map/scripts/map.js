$(document).ready(function(){
	var $window = $(window),
		filipinasData;

	$('#map-philippines').css('height', $window.height())
							.css('width', $window.width());

	$.getJSON('../../../data/data.json', createArea);
});

function createArea(data) {
	filipinasData = data;
}

function initMap() {
	var positionDefault,
		map,
		marker;

	positionDefault = {
		lat: 9.41981,
		lng: 125.933439
	};

	map = new google.maps.Map(document.getElementById('map-philippines'), {
		center: positionDefault,
		zoom: 11
		// disableDefaultUI: true
	});

	marker = new google.maps.Marker({
		position: positionDefault,
		map: map
	});

	for (var area in filipinasData.protectedArea) {
		var cityCircle = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: map,
			center: filipinasData.protectedArea[area].center,
			radius: Math.sqrt(filipinasData.protectedArea[area].population) * 100
		});
	}

	for (var pesca in filipinasData.fishingZone) {
		var fishingCircle = new google.maps.Circle({
			strokeColor: '#00FF00',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#00FF00',
			fillOpacity: 0.35,
			map: map,
			center: filipinasData.fishingZone[pesca].center,
			radius: Math.sqrt(filipinasData.fishingZone[pesca].population) * 100
		});
	}

	// var infoWindow = new google.maps.InfoWindow({map: map});

	// // Try HTML5 geolocation.
	// if (navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(function(position) {
	// 		var pos = {
	// 		lat: position.coords.latitude,
	// 		lng: position.coords.longitude
	// 	};

	// 	infoWindow.setPosition(pos);
	// 	infoWindow.setContent('Location found.');
	// 	map.setCenter(pos);
	// 	}, function() {
	// 		handleLocationError(true, infoWindow, map.getCenter());
	// 	});
	// } else {
	// 	// Browser doesn't support Geolocation
	// 	handleLocationError(false, infoWindow, map.getCenter());
	// }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
	'Error: The Geolocation service failed.' :
	'Error: Your browser doesn\'t support geolocation.');
}