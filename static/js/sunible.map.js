sunible.map = (function () {
	// Module scope varaibles
	var
		configMap = {
			main_html: String()
			+'<div class="page social_proof" id="page-social_proof" data-page="social_proof">'
				+'<h1 class="area"></h1>'
				+'<div id="map" style="width: 90vw; height: 15vw; margin-top: 1em;"></div>'
				// +'<div class="block map">'
				// 		+'<p>You have selected<br/><span class="counter selected providers number" id="dashboard-block-number_of_providers_selected">0</span><br/>providers</p>'
				// 		+'<p class="max_length message">30 providers max</p>'
				// 	+'</div>'
				      +'<table class="providers list grid" id="dashboard-grid-providers-list">' +
					'<thead>' +
						'<tr>' +
							// '<th class="checkboxes">' +
							// 	'<span class="text">Request Quote</span>' +
							// '</th>' +
							'<th class="name" align="left" role="columnheader" aria-sort="ascending">' +
								'<span class="text">Solar Providers </span>' +
								'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="These providers have installed solar in at least one home every month in your County recently.">?</span>' + 
							'</th>' +
							// '<th class="cost">' +
							// 	'<span class="text">Price Category</span>' +
							// 	'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="Based on the average cost of systems installed in your County, Value = Bottom 33%, Standard = Middle 33% Premium = Top 33%. Please read FAQ #3 for a more detailed explanation.">?</span>' + 
							// // '</th>' +
							// '<th class="avg_cost">' +
							// 	'<span class="text">$/watt</span>' +
							// 	'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="Average Cost">?</span>' + 
							// '</th>' +
							'<th class="number_of_homes_installed">' +
								'<span class="text">Total Installed </span>' +
								'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="Homes in your County that have gone solar with each provider since 2002.">?</span>' +
							'</th>' +
							'<th class="number_of_homes_installed">' +
								'<span class="text">Recent Installations </span>' +
								'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="Homes in your County that have gone solar with each provider in the past 3 months.">?</span>' +
							'</th>' +
							'<th class="rating">' +
								'<img src="static/images/yelp_logo_100x50.png" alt="" style="height:30px; width:30px;"/>' +
								'<span class="text">Rating</span>' +
							'</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody><tr class="installername"></tr></tbody>' +
				'</table>'
		},
		stateMap = {
			$container: null,

		},
		jqueryMap ={},
		setJqueryMap, generateMap, getGeoData, populateInstallers, installerAvgCost, sortTables, initModule;

		// Utility Methods
		setJqueryMap = function () {
			var $container = stateMap.$container;
			jqueryMap = {
				$container: $container,
				$map: $container.find("#map")
			};
		};
		
		// DOM METHODS
		// Create a method to get the geodata from the backend
		getGeoData = function (zip) {
			var zip = zip
			$.ajax({
				url:"geozipresponse",
				datatype: 'json',
				data: {'zip_code': zip},
				success: function (data) {
					var data_point = data[0].fields
					mapboxgl.accessToken = 'pk.eyJ1Ijoic3VuaWJsZSIsImEiOiJjajNlcHhkb2cwMGw3MndvZWNtc3JiOXdyIn0.gFGcHN9P5Qh6dqPFzFbwog';
					var map = new mapboxgl.Map({
						container: "map",
						style: 'mapbox://styles/mapbox/streets-v9',
						zoom: 6,
						center: [data_point.lon,data_point.lat]
					});
					map.on('load', function () {
						map.zoomTo(13, {'duration':4000, 'animate': true});
						var el = document.createElement('div');
						el.className = 'marker';
						el.style.backgroundImage= 'static/images/marker.png'
						new mapboxgl.Marker(el)
								.setLngLat([data_point.lon,data_point.lat])
								.addTo(map);
					});
				}
			});
		};
		// Populate the table with installers in the database
		populateInstallers = function (zip) {
			var zip = zip
			$.ajax({
				url:"populateinstallerlist",
				datatype:'json',
				data: {'zip_code': zip},
				success: function (data) {
					var data = data
						var area = "Great News! "+data.County+" County"+" is very "
						jqueryMap.$container.find(".area").append(area+'<em>Sunible!</em>')
						for (var i = 0; i < data.Installer.length; i++) {
							var installer = '<tr id="install"><td width="50px" height="50px" align="left" style="padding-top: 12px;">'+data.Installer[i][0]+'</td><td align="center">'+data.Installer[i][2].total_installs+'</td><td align="center">'+data.Installer[i][1]+'</td></tr>'
							jqueryMap.$container.find("tbody").append(installer);
							
						}
					}
			});
		}
		// Allow tables to be sorted
		sortTables = function ()
		// Public Methods
		initModule = function ($container,zip) {
		$container.html(configMap.main_html);
		stateMap.$container = $container;
		setJqueryMap();
		$(document)
			.ready(getGeoData(zip),populateInstallers(zip));
		return true;
	};
	return {
		initModule: initModule,
	};
}());