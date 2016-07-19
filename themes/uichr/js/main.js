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

$(document).ready(function() {
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



});
