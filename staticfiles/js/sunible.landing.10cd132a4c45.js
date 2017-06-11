sunible.landing = (function () {
	var
		configMap = {
			main_html: String()
			+'<section class="container landing">'
				+'<div class="col-6">'
					+'<h1>3 steps to Solar Savings with <em>Sunible</em></h1>'
					+'<div class="block see">'
						+'<h2>See</h2>'
						+'<img alt="" class="icon see" src="static/images/icons/big_icon_map.png"/>'
						+"<p>See exactly how many solar homes there are around you. If they're saving with solar, you can too.</p>"
					+'</div>'
					+'<div class="block compare">'
						+'<h2>Compare</h2>'
						+'<img alt="" class="icon compare" src="static/images/icons/big_icon_compare.png"/>'
						+"<p>Compare solar installers. We've analyzed millions of data points so you can make an informed choice.</p>"
					+'</div>'
					+'<div class="block request">'
						+'<h2>Request</h2>'
						+'<img alt="" class="icon see" src="static/images/icons/big_icon_quote.png"/>'
						+"<p>Request quotes. Once you get them, we'll advise you from start to finish. No cost, no commitment.</p>"
					+'</div>'
				+'</div>'
				+'<form class="zip search providers container" id="homepage-search_providers_by_zip-container" action="">'
					+'<span class="field_container"> <input type="text"" style="position: absolute; z-index: 65; margin-top: 1em;" class="field zip" id="homepage-field-zip_code" name="zipcode" placeholder="Zip Code" pattern="\d{5}(?:[-\s]\d{4})?" autofocus /> <span class="validation message"></span>'
					+'</span>'
					+'<button type="button" style="top: 16em; right: 13em; margin-left: 1.5em; z-index: 65;" class="btn search providers zip" id="homepage-search_providers_by_zip-button">Go</button>'
				+'</form>'
			+'</section>',
		settable_map: {}
		},
		stateMap = {$container: null},
		jqueryMap = {},

		setJqueryMap, configModule, initModule, loadMap, getInstallerByZip;
	// DOM Methods
	setJqueryMap = function() {
		var $container = stateMap.$container;
		jqueryMap = {
			$container: $container,
			$submit: $container.find('#homepage-search_providers_by_zip-button'),
			$input: $container.find('#homepage-field-zip_code')
		};
	};
	getInstallerByZip = function(event) {
		var zip_input = jqueryMap.$input.val()
	if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip_input) === true) {
		sunible.map.initModule(jqueryMap.$container,zip_input)
	}
	else {
		alert("Please enter a Valid Zip")
	}
	};
	// Load Map
	// loadMap = (function () {
	// 	mapboxgl.accessToken = 'pk.eyJ1Ijoic3VuaWJsZSIsImEiOiJjajNlcHhkb2cwMGw3MndvZWNtc3JiOXdyIn0.gFGcHN9P5Qh6dqPFzFbwog';
	// 	var map = new mapboxgl.Map({
	// 		container: "map",
	// 		style: 'mapbox://styles/mapbox/streets-v9',
	// 		zoom: 5,
	// 		center: [-121.4944, 38.5816]
	// 	});
	// });
	// Public config methods
	configModule = function (input_map) {
		sunible.util.setConfigMap({
			input_map: input_map,
			settable_map: configMap.settable_map,
			config_map: configMap
		});
		return true;
	};
	initModule = function ($container) {
		$container.html(configMap.main_html);
		stateMap.$container = $container;
		setJqueryMap();
		
		jqueryMap.$submit
			.click(getInstallerByZip);
		return true;
	};
	return {
		configModule: configModule,
		initModule: initModule,
	};
}());




