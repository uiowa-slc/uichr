$(document).ready(function() {

	// add js class to body if javascript enabled
	$('html').removeClass('no-js');

	// MAIN NAVIGATION SETTINGS
	$("#dawgdrops").accessibleMegaMenu({
		/* prefix for generated unique id attributes, which are required
			to indicate aria-owns, aria-controls and aria-labelledby */
		uuidPrefix: "accessible-megamenu",

		/* css class used to define the megamenu styling */
		menuClass: "nav-menu",

		/* css class for a top-level navigation item in the megamenu */
		topNavItemClass: "nav-item",

		/* css class for a megamenu panel */
		panelClass: "sub-nav",

		/* css class for a group of items within a megamenu panel */
		panelGroupClass: "sub-nav-group",

		/* css class for the hover state */
		hoverClass: "hover",

		/* css class for the focus state */
		focusClass: "focus",

		/* css class for the open state */
		openClass: "open"
	});

	/* Photo Gallery */
	$('.photo-gallery').flickity({
		wrapAround: true,
		imagesLoaded: true,
		lazyLoad: true,
		lazyLoad: 2,
		initialIndex: 1,
		selectedAttraction: 0.01,
		friction: 0.15,
		pageDots: false,
		arrowShape: {
			x0: 30,
			x1: 60, y1: 30,
			x2: 65, y2: 30,
			x3: 50
		}
	});

	/* Events List */
	$('.interior-events').flickity({
		selectedAttraction: 0.01,
		friction: 0.15,
		pageDots: false,
		contain: true,
		arrowShape: {
			x0: 30,
			x1: 65, y1: 25,
			x2: 65, y2: 25,
			x3: 65
		}
	});


	//open/close primary navigation
	$('.cd-primary-nav-trigger').on('click', function(){
		$('.cd-menu-icon').toggleClass('is-clicked');
		$('.cd-header').toggleClass('menu-is-open');

		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( $('.cd-primary-nav').hasClass('is-visible') ) {
			$('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').addClass('overflow-hidden');
			});
		}
	});



});
