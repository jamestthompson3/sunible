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
							'<th class="name">' +
								'<span class="text">Solar Providers</span>' +
								'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="These providers have installed solar in at least one home every month in your County recently.">?</span>' + 
							'</th>' +
							'<th class="cost">' +
								'<span class="text">Price Category</span>' +
								'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="Based on the average cost of systems installed in your County, Value = Bottom 33%, Standard = Middle 33% Premium = Top 33%. Please read FAQ #3 for a more detailed explanation.">?</span>' + 
							'</th>' +
							'<th class="avg_cost">' +
								'<span class="text">$/watt</span>' +
								'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="Average Cost">?</span>' + 
							'</th>' +
							'<th class="number_of_homes_installed">' +
								'<span class="text">Homes Installed</span>' +
								'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="Homes in your County that have gone solar with each provider since 2006.">?</span>' +
							'</th>' +
							'<th class="rating">' +
								'<img src="static/images/yelp_logo_100x50.png" alt="" style="height:30px; width:30px;"/>' +
								'<span class="text">Rating</span>' +
							'</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody class="installername"></tbody>' +
				'</table>'
		},
		stateMap = {
			$container: null,

		},
		jqueryMap ={},
		setJqueryMap, generateMap, getGeoData, populateInstallers, initModule;

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
					});
				}
			});
			populateInstallers(zip)
		};
		// Populate the table with installers in the database
		populateInstallers = function (zip) {
			var zip = zip
			$.ajax({
				url:"populateinstallerlist",
				datatype:'json',
				data: {'zip_code': zip},
				success: function (data) {
					if (data[0] !== undefined) {
						console.log(data[0].fields)
						var area = "Great News! "+data[0].fields.service_county+" County"+" is very "
						jqueryMap.$container.find(".area").append(area+'<em>Sunible!</em>')
						for (var i = 0; i < data.length; i++)
						{
							var installer = '<tr><td width="50px" height="50px" align="left" style="padding-top: 12px;">'+data[i].fields.installer+'</td></tr>'
							jqueryMap.$container.find(".installername").append(installer);
						}
					}
					else {
						jqueryMap.$container.find(".inyourarea").text("We don't seem to find any installers in your area.")
					}
				}
			});
		}
		// Public Methods
		initModule = function ($container,zip) {
		$container.html(configMap.main_html);
		stateMap.$container = $container;
		setJqueryMap();
		$(document)
			.ready(getGeoData(zip));
		return true;
	};
	return {
		initModule: initModule,
	};
}());