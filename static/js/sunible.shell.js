sunible.shell = (function () {
	// ---- Module scope variables ----
	var
		configMap = {
			anchor_schema_map : {social_proof: true, installers: true},
			main_html : String()
			+'<header class="page_header homepage dashboard social_proof registration message thank_you thank_you_reg">'
				+'<div class="questions">'
					+'<span class="question why_solar" data-toggle="tooltip" data-placement="bottom" title="A solar-powered home can lower your electricity bills from day one, which is why over 300,000 homeowners in the U.S. have gone solar! Also, the Sun is the cleanest, most abundant source of energy on earth."> Why solar?'
					+'</span>'
					+'<span class="question why_sunible" data-toggle="tooltip" data-placement="bottom" title="There are a lot of solar installers to choose from, but there is no easy way to find, compare and select the right one. We will help you from start to finish, and answer every question you have along the way (and yes, for free!)"> Why Sunible?</span>'
					+'<button type="button" class="btn call_us" disabled> Questions?<br/> 1 (800) 979-2215</button>'
				+'</div>'
				+'<a href="/" class="logo sunible"><img src="static/images/logo_sunible.png"/></a>'
			+'</header>'
			+'<div class ="info"></div>'
			+'<div class="footer-margin"></div>'
			+'<footer class="page_footer homepage social_proof dashboard registration message thank_you thank_you_reg">'
					+'<nav class="bottom navigation">'
						+'<a href="#" class="launcher open faqs">FAQs</a>'
						+'<a href="http://blog.sunible.com" target="_blank">Blog</a>'
						+'<a href="#" class="launcher open contact_us">Contact</a>'
						+'<a href="#" class="launcher open about_us">About Us</a>'
						+'<a href="#" class="launcher open terms_of_service">Terms</a>'
					+'</nav>'
					+'<span class="copyright">&copy; Sunible Inc.  2017</span>'
			+'</footer>'
		+'</div>'
		},
		stateMap = {
			$container: null,
			anchor_map:{}
		},
		jqueryMap = {},

		setJqueryMap, initModule, onHashChange, copyAnchorMap, changeAnchorPart, onClickSwitch;
	// Utility Method for URI Anchor
	changeAnchorPart = function (arg_map) {
		var
			anchor_map_revise = copyAnchorMap(),
			bool_return = true,
			key_name, key_name_dep;
		// Merge changes into anchor map
		KEYVAL:
		for (key_name in arg_map) {
			if (arg_map.hasOwnProperty(key_name)) {
				if (key_name.indexOf('_') === 0) {continue KEYVAL;}
				anchor_map_revise[key_name] = arg_map[key_name];
				key_name_dep = '_' + key_name;
				if (arg_map[key_name_dep]) {
					anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
				}
				else {
					delete anchor_map_revise[key_name_dep];
					delete	anchor_map_revise['_s' + key_name_dep];
				}
			}
		}
	// Attempt to update URI, revert if unsucessful
		try {
			$.uriAnchor.setAnchor(anchor_map_revise);
		}
		catch(error) {
			$.uriAnchor.setAnchor(stateMap.anchor_map,null,true);
			bool_return = false;
		}
		return bool_return;
	};
	onHashchange = function (event) {
		var
			anchor_map_previous = copyAnchorMap(),
			anchor_map_proposed,
			_s_chat_previous, _s_chat_proposed,
			s_chat_proposed;
		 // attem to parse anchor
		 try { anchor_map_proposed = $.uriAnchor.makeAnchorMap();}
		 catch (error) {
		 	$.uriAnchor.setAnchor(anchor_map_previous, null, true);
		 	return false;
		 }
		 stateMap.anchor_map = anchor_map_proposed;
		 // convience vars
		 _s_chat_previous = anchor_map_previous._s_chat;
		 _s_chat_proposed = anchor_map_proposed._s_chat;
		 // Begin adjust chat component if changed
		 if ( ! anchor_map_previous
		 	|| _s_chat_previous !== _s_chat_proposed) {
		 	s_chat_proposed = anchor_map_proposed.chat;
		 // Optional callbacks if URI changes
		 }
		 return false;
	}
	// Set DOM Methods for set jqueryMap
	setJqueryMap = function (){
		var $container = stateMap.$container;
		jqueryMap = {
			$container: $container,
		};
	};
	// Public methods
	initModule = function ($container) {
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();
		sunible.landing.configModule({});
		sunible.landing.initModule($container.find('.info'));
	};
	return { initModule: initModule };
}());