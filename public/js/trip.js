/*
Add Hotel to Day itinerary
Add Restaurant to Day itinerary
Add Activity to Day itinerary

Zoom on map each time item is added
Add appropriate pins when item is added to itinerary

Remove any the above

Switch to day when button is selected

*/

$(document).ready(function() {
	console.log('this works');

	$day1_hotel = $('<li>Hotel 1</li>');
	$day2_hotel = $('<li>Hotel 2</li>');

	var keys = {'Hotels': hotels, 'Restaurants': restaurants, 'Activities': activities}

	$('button').on('click', function() {
		var category = $(this).data("category");
		var objectChosen = $('#'+category+'Chooser');
		var index = objectChosen.val();
		var currObj = keys[category][index];
		console.log(currObj);

		var currList = '#' + category + '_list';
		var newListItem = '<li>' + currObj.name + '</li>';

		$(currList).append(newListItem);
		
	})

	//console.log(hotels);

	// $('#day_1').on('click', function(){
	// 	$('#hotel_list li').remove();
	// 	$('#hotel_list').append($day1_hotel);
	// })
	
	// $('#day_2').on('click', function(){
	// 	$('#hotel_list li').remove();
	// 	$('#hotel_list').append($day2_hotel);
	// })
	

})