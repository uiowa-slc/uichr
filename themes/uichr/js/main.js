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



});


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
			console.log("here is the internshiplink" + internshiplink + "here it ends");


		}
		internshipLocations[students] = [name, title, internship, internshiplink, content, lat, lng, image];

		students++;

	} );
	console.log(internshipLocations)
	return internshipLocations;
}



function init() {


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
				infowindow.setContent(
					"<div class='info-window'>" + 
					"<img src=" + locations[i][7] + ">"  + 
					"<strong>" + locations[i][0] + "</strong><br>" + 
					locations[i][1] + "<br>" + 
					locations[i][2] + "<br>" + 
					"<a href='" + locations[i][3] + "'>Website</a><br>" + 
					locations[i][4] + "</div>"
					
					);
				infowindow.open(map, marker);
              // zooms the map into marker 
              map.setZoom(5);
              map.setCenter(marker.getPosition());
          }
      })(marker, i));
	}


}

google.maps.event.addDomListener(window, 'load', init);
















