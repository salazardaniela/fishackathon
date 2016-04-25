var $window = $(window),
positionDefault,
		map,
		marker,
	filipinasData;

$(document).ready(function(){
	data();
	$('#map-philippines').css('height', $window.height())
							.css('width', $window.width());

	$('.btn-menu').on('click', function() {
		if($('.aside-menu').is(':hidden')){
			$('.aside-menu').addClass('show');
		} else{
			$('.aside-menu').removeClass('show');
		}
	});

	$('.btn-help').on('click', function() {
		$('.help').fadeIn();
	});

	$('.close').on('click', function() {
		var a = $(this).parents();
		$(a[0]).fadeOut();
	});

	$('.btn-notification').on('click', function() {
		$('.notifications').fadeIn();
	});
});

$(window).resize(function(){
	$('#map-philippines').css('height', $window.height())
							.css('width', $window.width());
});

function data() {
	$.ajax({
		type: 'GET',
		url: '../../../data/data.json',
		dataType: 'json',
		success: function(data) {
			filipinasData = data;
			draw(filipinasData);
		}
	});
}

function createArea(data) {
	filipinasData = data;
}

function initMap() {
	positionDefault = {
		"lat": 10.6457775,
        "lng": 122.8626886
	};

	map = new google.maps.Map(document.getElementById('map-philippines'), {
		center: positionDefault,
		zoom: 9
		// ,
		// disableDefaultUI: true
	});

	marker = new google.maps.Marker({
		position: positionDefault,
		icon: '../../../Images/FISHTTER-ICONS-05.png',
		map: map
	});

	data();

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

function draw(filipinasData) {
	for (var port in filipinasData.ports) {
		var marker = new google.maps.Marker({
			position: filipinasData.ports[port].center,
			map: map
		});
	}

	for (var area in filipinasData.protectedArea) {
		var cityCircle = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: map,
			center: filipinasData.protectedArea[area].center,
			radius: Math.sqrt(filipinasData.protectedArea[area].population) * 100
		});
	}

	for (var internet in filipinasData.internetAccess) {
		var internetCircle = new google.maps.Circle({
			strokeColor: '#0000FF',
			strokeOpacity: 0,
			strokeWeight: 2,
			fillColor: '#0000FF',
			fillOpacity: 0.35,
			map: map,
			center: filipinasData.internetAccess[internet].center,
			radius: Math.sqrt(filipinasData.internetAccess[internet].population) * 100
		});
	}

	for (var pesca in filipinasData.fishingZone) {
		var fishingCircle = new google.maps.Circle({
			strokeColor: '#00FF00',
			strokeOpacity: 0,
			strokeWeight: 2,
			fillColor: '#00FF00',
			fillOpacity: 0.35,
			map: map,
			center: filipinasData.fishingZone[pesca].center,
			radius: Math.sqrt(filipinasData.fishingZone[pesca].population) * 1000
		});
	}
}

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
// 	infoWindow.setPosition(pos);
// 	infoWindow.setContent(browserHasGeolocation ?
// 	'Error: The Geolocation service failed.' :
// 	'Error: Your browser doesn\'t support geolocation.');
// }