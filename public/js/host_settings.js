console.log("js file loaded successfullly");

window.onload = function(){
	//highlight active tab
	$('#chargers').css({'color':'#f05a29'});
	$('#bookings').css({'color':'black'});
	$('#reviews').css({'color':'black'});
	$('#earnings').css({'color':'black'});

	//clear old content
	$('#content').html('');

	//create new content
	var header = $("<p class='boxHeader'>Here are your chargers! Select them to edit details and availability.</p>");
	var chargerContainer = $("<div id='chargerContainer'></div>")
	var newCharger = $("<button id='newCharger' class='chargerButton'>+</button>");
	var yourCharger =$("<button class='chargerButton'>Your Charger</button>");

	$('#content').append(header);
	$('#content').append(chargerContainer);
	$('#chargerContainer').append(newCharger);
	$('#chargerContainer').append(yourCharger);
};

$('#chargers').click(function(event) {
	$('#chargers').css({'color':'#f05a29'});
	$('#bookings').css({'color':'black'});
	$('#reviews').css({'color':'black'});
	$('#earnings').css({'color':'black'});

	$('#content').html('');

	var header = $("<p class='boxHeader'>Here are your chargers! Select them to edit details and availability.</p>");
	var chargerContainer = $("<div id='chargerContainer'></div>")
	var newCharger = $("<button id='newCharger'>+</button>");
	var yourCharger =$("<button class='charger'>Your Charger</button>");

	$('#content').append(header);
	$('#content').append(chargerContainer);
	$('#chargerContainer').append(newCharger);
	$('#chargerContainer').append(yourCharger);
});

$('#bookings').click(function(event){
	$('#chargers').css({'color':'black'});
	$('#bookings').css({'color':'#f05a29'});
	$('#reviews').css({'color':'black'});
	$('#earnings').css({'color':'black'});

	$('#content').html('');

	var header = $("<p class='boxHeader'>Here are all your bookings.</p>");
	var pendingContainer = $("<div id='pendingContainer'></div>");
	var pendingHeader = $("<h3>Pending</h3>");
	var historyContainer = $("<div id='historyContainer'></div>");
	var historyHeader = $("<h3>History</h3>");

	$('#content').append(header);
	$('#content').append(pendingContainer);
	$(pendingContainer).append(pendingHeader);
	$('#content').append(historyContainer);
	$(historyContainer).append(historyHeader);
})

$('#reviews').click(function(event){
	$('#chargers').css({'color':'black'});
	$('#bookings').css({'color':'black'});
	$('#reviews').css({'color':'#f05a29'});
	$('#earnings').css({'color':'black'});

	$('#content').html('');

	var header = $("<p class='boxHeader'>Here are all your reviews.</p>");
	var reviewsContainer = $("<div id='reviewsContainer'></div>");

	$('#content').append(header);
	$('#content').append(reviewsContainer);
})

$('#earnings').click(function(event){
	$('#chargers').css({'color':'black'});
	$('#bookings').css({'color':'black'});
	$('#reviews').css({'color':'black'});
	$('#earnings').css({'color':'#f05a29'});

	$('#content').html('');

	var header = $("<p class='boxHeader'>Here is your earnings history.</p>");
	var earningsContainer = $("<div id='earningsContainer'></div>");

	$('#content').append(header);
	$('#content').append(earningsContainer);
})