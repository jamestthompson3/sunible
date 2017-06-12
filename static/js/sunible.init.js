sunible.init = (function() {
	mapboxgl.accessToken = 'pk.eyJ1Ijoic3VuaWJsZSIsImEiOiJjajNlcHhkb2cwMGw3MndvZWNtc3JiOXdyIn0.gFGcHN9P5Qh6dqPFzFbwog';
	var map = new mapboxgl.Map({
		container: "map",
		style: 'mapbox://styles/mapbox/streets-v9',
		zoom: 5,
		center: [-121.4944, 38.5816]
	});

		$("#zip_search").click(function(){
			var zip = $("#search").val();
			if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip) === true) {
				
				sunible.map.initModule($("#info"),zip,map);

	}
			else {
				alert("Please enter a Valid Zip");
			}
	});
		$("#why_solar").avgrund({
				width: 400,
				height: 300,
				showClose: true,
				showCloseText: 'X',
				template: '<h4 style="padding: 2vw; margin-top: 3vw;">'+"A solar-powered home can lower your electricity bills from day one, which is why over 300,000 homeowners in the U.S. have gone solar! Also, the Sun is the cleanest, most abundant source of energy on earth."+'</h4>'
			});
		$("#why_sunible").avgrund({
				width: 400,
				height: 300,
				showClose: true,
				showCloseText: 'X',
				template: '<h4 style="padding: 2vw; margin-top: 3vw;">'+"There are a lot of solar installers to choose from, but there is no easy way to find, compare and select the right one. We will help you from start to finish, and answer every question you have along the way (and yes, for free!)"+'</h4>'
			});
}());