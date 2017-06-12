sunible.map = (function () {
	// Module scope varaibles
	var
		configMap = {
			main_html: String()
			// +'<div id="loading">'
			// 	+'<img id="loading-image" src="static/images/loading2.gif" alt="loading..." />'
			// +'</div>'
			+'<div class="page social_proof" id="page-social_proof" data-page="social_proof">'
				+'<h1 class="area"></h1>'
				+'<div class="counters">'
							+'<h4 data-toggle="tooltip" data-placement="bottom" title="Homes in your County that have gone solar since 2002. This number is growing everyday!"><span class="counter total_install_number by_zip"></span> solar homes <br/>in <span class="area_name"></span>'
							+'</h4>'
							+'</h4>'
						+'</div>'
						+'<div class="counters" style="left: 60vw;">'
							+'<h4 data-toggle="tooltip" data-placement="bottom" title="These providers have installed solar in at least one home every month in your County recently."><span class="counter total_installers by_zip"></span> active solar providers<br/> in <span class="area_name"></span>'
							+'</h4>'
						+'</div>'
				// +'<div class="block map">'
				// 		+'<p>You have selected<br/><span class="counter selected providers number" id="dashboard-block-number_of_providers_selected">0</span><br/>providers</p>'
				// 		+'<p class="max_length message">30 providers max</p>'
				// 	+'</div>'
				+'</div>'
				+'<div class="installer container" style="margin-top: -10em; margin-left: 13vw;">'
				      +'<table class="providers list grid" id="dashboard-grid-providers-list">' +
					'<thead>' +
						'<tr>' +
							// '<th class="checkboxes">' +
							// 	'<span class="text">Request Quote</span>' +
							// '</th>' +
							'<th class="name" align="left" role="columnheader" aria-sort="ascending">' +
								'<span class="text" style="padding-left: 12px;">Solar Providers </span>' +
								'<span class="question_mark light" data-toggle="tooltip" id="solar_providers" data-placement="bottom" title="These providers have installed solar in at least one home every month in your County recently.">?</span>' + 
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
								'<span class="question_mark light" data-placement="bottom" title="Homes in your county that have gone solar with each provider since 2002.">?</span>' +
							'</th>' +
							'<th class="number_of_homes_installed">' +
								'<span class="text">Recent Installations </span>' +
								'<span class="question_mark light" data-toggle="tooltip" data-placement="bottom" title="Homes in your county that have gone solar with each provider in the past 3 months.">?</span>' +
							'</th>' +
							// '<th class="rating">' +
							// 	'<img src="static/images/yelp_logo_100x50.png" alt="" style="height:30px; width:30px;"/>' +
							// 	'<span class="text">Rating</span>' +
							// '</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody class="install"></tbody>' +
				'</table>'
				+'</div>'
				+'<footer class="page_footer homepage social_proof dashboard registration message thank_you thank_you_reg" style="top: 0; left: 11vw; position: relative;">'
					+'<nav class="bottom navigation">'
						+'<a href="http://blog.sunible.com/solar-faq" class="launcher open faqs">FAQ</a>'
						+'<a href="http://blog.sunible.com" target="_blank">Blog</a>'
						+'<a href="#" class="launcher open contact_us">Contact</a>'
						+'<a href="#" class="launcher open about_us">About Us</a>'
						+'<a href="/privacy">Privacy</a>'
					+'</nav>'
					+'<span class="copyright">&copy; Sunible Inc.  2017</span>'
			+'</footer>'
				+'</div>'
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
		getGeoData = function (zip, map) {
			var zip = zip
			$.ajax({
				url:"geozipresponse",
				datatype: 'json',
				data: {'zip_code': zip},
				success: function (data) {
					var data_point = data[0].fields
					var el = document.createElement('div');
						el.className = 'marker';
						el.style.backgroundImage = 'url("../static/images/marker.png")';
						new mapboxgl.Marker(el)
								.setLngLat([data_point.lon,data_point.lat])
								.addTo(map);
						map.setCenter([data_point.lon, data_point.lat]);
						map.zoomTo(13, {'duration':4000, 'animate': true});
						$(document).find(".marker").delay(4000).fadeIn(300);
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
						jqueryMap.$container.find(".counter.total_install_number").text(data.Total_Installs.total_installs)
						jqueryMap.$container.find(".area_name").text(data.County+" county")
						jqueryMap.$container.find(".counter.total_installers").text(data.Total_Installers)
						jqueryMap.$container.find("#loading").css("display","none")
						for (var i = 0; i < data.Installer.length; i++) {
							var installer = '<tr><td align="left" style="padding-top: 8px; padding-left: 12px; padding-bottom: 8px;">'+data.Installer[i][0]+'</td><td align="center">'+data.Installer[i][1]+'</td><td align="center">'+data.Installer[i][1]+'</td></tr>'
							jqueryMap.$container.find("tbody").append(installer);
							
						}
					}
			});
		}
		// Allow tables to be sorted
		// Public Methods
		initModule = function ($container,zip,map) {
		$container.html(configMap.main_html);
		stateMap.$container = $container;
		setJqueryMap();
		$(document)
			.ready(populateInstallers(zip),getGeoData(zip,map));
		return true;
	};
	return {
		initModule: initModule,
	};
}());