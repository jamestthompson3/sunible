sunible.map = (function () {
	// Module scope varaibles
	var
		configMap = {
			main_html: String()
			+'<div class="page social_proof" id="page-social_proof" data-page="social_proof">'
				+'<h1>Fantastic, your area is very Sunible!</h1>'
				+'<div class="block">'
						+'<p>You have selected<br/><span class="counter selected providers number" id="dashboard-block-number_of_providers_selected">0</span><br/>providers</p>'
						+'<p class="max_length message">30 providers max</p>'
					+'</div>'
			  	+'<table align="center" width="80%" border="0" cellspacing="0" cellpadding="0">'
				  +'<tr>'
				    +'<td width="25%" align="center"><table width="65px" height="65px" border="0" cellspacing="0" cellpadding="0" style="background-image:url(static/images/yellowdot.png);">'
				      +'<tr>'
				        +'<td width="65px" align="center"><span class="socialproofaligncenterbig">23</span></td>'
			          +'</tr>'
				      +'</table>'
			        +'<p class="socialProofAlignCenter">homes have gone solar in your area</p></td>'
				    +'<td width="25%" align="center"><table width="65px" height="65px" border="0" cellspacing="0" cellpadding="0" style="background-image:url(static/images/yellowdot.png);">'
				      +'<tr>'
				        +'<td width="65" align="center"><span class="socialproofaligncenterbig">18</span></td>'
			          +'</tr>'
				      +'</table>'
			        +'<p class="socialProofAlignCenter">of them started saving from day one</p></td>'
				    +'<td width="25%" align="center"><table width="65px" height="65px" border="0" cellspacing="0" cellpadding="0" style="background-image:url(images/yellowdot.png);">'
				      +'<tr>'
				        +'<td width="65" align="center"><span class="socialproofaligncenterbig">14</span></td>'
			          +'</tr>'
				      +'</table>'
			        +'<p class="socialProofAlignCenter">experienced solar providers in your area</p></td>'
				    +'<td width="25%"> <table width="100%" border="0" cellspacing="0" cellpadding="0">'
				      +'<tr>'
				        +'<td>'
                        +'<div id="map" style="width: 250px; height: 250px"></div>'
		},
		stateMap = {
			$container: null,

		},
		jqueryMap ={},
		setJqueryMap, generateMap, getGeoData, initModule;

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
					console.log(data[0].fields)
				}
			});
		};
		generateMap = function (data) {
			mapboxgl.accessToken = 'pk.eyJ1Ijoic3VuaWJsZSIsImEiOiJjajNlcHhkb2cwMGw3MndvZWNtc3JiOXdyIn0.gFGcHN9P5Qh6dqPFzFbwog';
			var map = new mapboxgl.Map({
				container: '#map',
				style: 'mapbox://styles/mapbox/streets-v9',
				zoom: 6,
				center: zipGeo
			})
		}
		// Public Methods
		initModule = function ($container,zip) {
		$container.html(configMap.main_html);
		stateMap.$container = $container;
		setJqueryMap();
		getGeoData(zip);
		return true;
	};
	return {
		initModule: initModule,
	};
}());