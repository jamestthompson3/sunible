sunible.shell = (function () {
	// ---- Module scope variables ----
	var
		configMap = {
			anchor_schema_map : {},
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

			+'<div class="footer-margin"></div>'
			+'<footer class="page_footer homepage social_proof dashboard registration message thank_you thank_you_reg">' <!-- footer has those classes to be toggled with those pages.  With that approach, no need to duplicate the footer on each page we have it-->
					+'<nav class="bottom navigation">'
						+'<a href="#" class="launcher open faqs">FAQs</a>'
						+'<a href="http://blog.sunible.com" target="_blank">Blog</a>'
						+'<a href="#" class="launcher open contact_us">Contact</a>'
						+'<a href="#" class="launcher open about_us">About Us</a>'
						+'<a href="#" class="launcher open terms_of_service">Terms</a>'
						+'<a href="http://www.facebook.com/sunible" target="_blank" class="launcher social facebook"><img class="icon" src="static/images/icons/icon_facebook.png}" alt=""/></a>'
						+'<a href="http://www.twitter.com/sunible" target="_blank" class="launcher social twitter"><img class="icon" src="static/images/icons/icon_twitter.png" alt=""/></a>'
						+'<a href="http://www.linkedin.com/company/sunible" target="_blank" class="launcher social linkedin"><img class="icon" src="static/images/icons/icon_linkedin.png" alt=""/></a>'
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

		setJqueryMap, initModule;

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
	};
	return { initModule: initModule };
}());