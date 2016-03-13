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
var currDay = 0;


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
    //console.log(map_canvas_obj);
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

  days[currDay].markers[category + index] = marker;
  marker.setMap(map);
  map.setCenter(myLatLng);
}

function setDayTabs() {
	$('#day_picker li').remove();
	for (var i = 0; i < days.length;i++) {
		var day = i+1;
		var newDay = $('<li id="day_' + day + '" data-day="'+ i +'"><a>Day ' + day +'</a></li>');
		console.log(newDay);
		$('#day_picker').append(newDay);
	}
}

function populatePlans(category, index, keys) {
	var currList = '#' + category + '_list';
	var currObj = keys[category][index];
	var newListItem = '<li id=' + category + index + '>' + currObj.name + '<button class="btn btn-sm btn-danger" data-index=' + index +' data-category='+ category +'>x</button></li>';
	$(currList).append(newListItem);
	var myLatLng = currObj.place.location;
	setMarker(myLatLng, index, category);//adds a marker for the location
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
	setDayTabs();

	$('.panel-body .btn-primary').on('click', function() {
		var category = $(this).data("category");
		var objectChosen = $('#'+category+'Chooser');
		var index = objectChosen.val();
		var currObj = keys[category][index];
		//add object to day array
		days[currDay][category][index] = currObj;
		console.log(days);

		// var currList = '#' + category + '_list';
		// var newListItem = '<li id=' + category + index + '>' + currObj.name + '<button class="btn btn-sm btn-danger" data-index=' + index +' data-category='+ category +'>x</button></li>';

		// $(currList).append(newListItem);

		// var myLatLng = currObj.place.location;

		// setMarker(myLatLng, index, category);//adds a marker for the location

		populatePlans(category, index, keys);
		
	})

	$('#day_panels').on('click', '.btn-danger', function() {
		var index = $(this).data("index");
		var category = $(this).data("category");
		console.log(index, category);
		delete days[currDay][category][index];
		days[currDay].markers[category + index].setMap(null);
		delete days[currDay].markers[category + index];
		$('#'+category+index).remove();
		console.log(days);

	})

	$('#day_picker').on('click', 'li', function() {
		console.log('day picked');
		$('#day_panels li').remove();
		initialize_gmaps();
		currDay = $(this).data("day");
		currDay = +currDay;
		console.log(days[currDay]);

		for (var category in keys) {
			// console.log ('category:',category);
			// console.log(days[currDay].category);
			for( var index in days[currDay][category] ) {
				// console.log('currDay:', days[currDay].category);
				populatePlans(category, index, keys)
			}
		}

	})

	$('#add_day').on('click', function() {
		days.push(new Itinerary());
		setDayTabs();
	})
	

})