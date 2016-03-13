/*
Add Hotel to Day itinerary
Add Restaurant to Day itinerary
Add Activity to Day itinerary

Zoom on map each time item is added
Add appropriate pins when item is added to itinerary

Remove any the above

Switch to day when button is selected

*/
var map;
var days = [];
function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    console.log(map_canvas_obj);
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    // Add the marker to the map by calling setMap()
    marker.setMap(map);
}


function setMarker(myLatLng, index, category) {
   myLatLng = {lat: myLatLng[0], lng:  myLatLng[1]};


  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    zoom: 14,
  	center: myLatLng,
    title: 'Hello World!'
  });

  days[0].markers[category + index] = marker;
  marker.setMap(map);
  map.setCenter(myLatLng);
}



$(document).ready(function() {
	initialize_gmaps();

	var keys = {'Hotels': hotels, 'Restaurants': restaurants, 'Activities': activities}

	var Itinerary = function() {
		this.Hotels = {};
		this.Restaurants = {};
		this.Activities = {};
		this.markers = {};
	}

	days.push(new Itinerary());

	$('.btn-primary').on('click', function() {
		var category = $(this).data("category");
		var objectChosen = $('#'+category+'Chooser');
		var index = objectChosen.val();
		var currObj = keys[category][index];

		days[0][category][index] = currObj;
		console.log(days);

		var currList = '#' + category + '_list';
		var newListItem = '<li id=' + category + index + '>' + currObj.name + '<button class="btn btn-sm btn-danger" data-index=' + index +' data-category='+ category +'>x</button></li>';

		$(currList).append(newListItem);

		var myLatLng = currObj.place.location;

		setMarker(myLatLng, index, category);//adds a marker for the location
		
	})

	$('#day_panels').on('click', '.btn-danger', function() {
		var index = $(this).data("index");
		var category = $(this).data("category");
		console.log(index, category);
		delete days[0][category][index];
		delete days[0].markers[category + index];
		$('#'+category+index).remove();
		console.log(days);

	})
	

})