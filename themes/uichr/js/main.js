
/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {

		function skipLink(el) {
			// bind a click event to the 'skip' link
			$(el).click(function(event){

				// strip the leading hash and declare
				// the content we're skipping to
				var skipTo="#"+this.href.split('#')[1];

				// Setting 'tabindex' to -1 takes an element out of normal
				// tab flow but allows it to be focused via javascript
				$(skipTo).attr('tabindex', -1).on('blur focusout', function () {

				// when focus leaves this element,
				// remove the tabindex attribute
				$(this).removeAttr('tabindex');

				}).focus(); // focus on the content container
			});


		};


		skipLink('.skip-link');

		$(".more-link").click(function(e){
			$(this).closest(".text-container").toggleClass("show-more");
			e.preventDefault();
		});


		// Shifter
		$.shifter({
			maxWidth: "979px"
		});

		// Naver
		$(".subnavigation").navigation({
			maxWidth: "979px"
		});

		// Slick

		$('.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: true,
			asNavFor: '.slider-nav',
			responsive: [
		    {
		      breakpoint: 768,
		      settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: false,
					adaptiveHeight: true
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: false,
					adaptiveHeight: true
		      }
		    }
		   ]
		});
		$('.slider-nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.slider-for',
			dots: false,
			focusOnSelect: true
		});





      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'HomePage': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'StudentMapPage': {
      init: function() {

		function getStudents() {

			var students = 0;
			var internshipLocations = [];

			$('.students').each(function(index, element) {
				var student = this;

				if(student) {
					var name = $(this).data("name");
					var title = $(this).data("title");
					var internship = $(this).data("internship");
					var internshiplink = $(this).data("internshiplink");
					var content = $(this).data("content");
					var address =$(this).data("address");
					var lat = $(this).data("lat");
					var lng = $(this).data("lng");
					var image = $(this).data("image");
					//console.log("here is the internshiplink" + internshiplink + "here it ends");


				}
				internshipLocations[students] = [name, title, internship, internshiplink, content, lat, lng, image];
				console.log(image);
				students++;

			} );
			//console.log(internshipLocations)
			return internshipLocations;
		}
	var source   = $("#info-window-template").html();
	var template = Handlebars.compile(source);

	var mapProp = {
		center:new google.maps.LatLng(19.80805343454635, 10.426024999999987),
		zoom:2,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"),mapProp);
	var locations = getStudents();

	var infowindow = new google.maps.InfoWindow({
		maxWidth: 300
	});

	var markers = new Array();
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker ({
			position: new google.maps.LatLng(locations[i][5], locations[i][6]),
			map: map,
		});
		markers.push(marker);
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				var context = {
					Name: locations[i][0],
					Title: locations[i][1],
					ImageURL: locations[i][7],
					Internship: locations[i][2],
					InternshipLink: locations[i][3],
					Content: locations[i][4]

				};
				var html    = template(context);
				infowindow.setContent(html);
				infowindow.open(map, marker);
              // zooms the map into marker
              map.setZoom(5);
              map.setCenter(marker.getPosition());
          }
      })(marker, i));
	}


	}




    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');



    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.