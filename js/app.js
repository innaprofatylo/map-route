; (function () {
	'use strict';

	// Initialize and add the map
	function initBaMap() {
		let directionsService = new google.maps.DirectionsService();
		let directionsRenderer = new google.maps.DirectionsRenderer();
		
		let mapCenter = {
			lat: 49.5888574,
			lng: 34.557561
		}

		let mapEl = document.getElementById('map');

		let mapOptions = {
			zoom: 7,
			center: mapCenter
		};

		let baMap = new google.maps.Map(mapEl, mapOptions); 

		directionsRenderer.setMap(baMap);

		let onChangeHandler = function () {
			calculateAndDisplayRoute(directionsService, directionsRenderer);
		};

		document.getElementById('controls').addEventListener('submit', function (e) {
			e.preventDefault();
		});
		document.getElementById('controls').addEventListener('submit', onChangeHandler); 

		function calculateAndDisplayRoute(directionsService, directionsRenderer) {  
			directionsService.route({
				origin: document.getElementById('start').value,
				destination: document.getElementById('end').value,
				travelMode: 'DRIVING'
			},
			function (response, status) {
				if (status === 'OK') {
					 directionsRenderer.setDirections(response);
				} else {
					 window.alert('На жаль, маршрут не знайдено ' + status);
				}
		  });
		}
	}
	window.addEventListener('load', initBaMap);

})();