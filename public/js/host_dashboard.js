console.log("js file loaded successfullly");
//fetch to get all chargers' id that belong to the host
const jwt = JSON.parse(localStorage.getItem('jwt'));
let chargers = [];


//fetch to get all charger info from a host
fetch("/chargers", {
	method: 'GET',
	headers: {
		'content-type': 'application/json',
		'Authorization': 'Bearer ' + jwt
	}
})
	.then((res) => {
		return res.json()
	})
	.then((db) => {
		console.log(db);
		//chargers = JSON.parse(JSON.stringify(db));

	});

///////////////////TEMP DATA
chargers = [
	{
		id: "A000",
		name: "MINE",
		address: "1234 myplace st.",
		city: "Vancouver",
		province: "BC",
		country: "Canada",
		level: "2",
		type: "Tesla HPWC",
		hourly_rate: "10.00",
		details: "no detail"
	}, {
		id: "A001",
		name: "YOURS",
		address: "1234 yourplace st.",
		city: "Vancouver",
		province: "BC",
		country: "Canada",
		type: "Tesla HPWC",
		hourly_rate: "4.00",
		details: "no detail"
	}
];
///////////////////TO BE REMOVE

window.onload = function () {
	//highlight active tab
	$('#chargers').css({ 'color': '#f05a29' });
	$('#bookings').css({ 'color': 'black' });
	$('#reviews').css({ 'color': 'black' });
	$('#earnings').css({ 'color': 'black' });

	//clear old content
	$('#content').html('');

	//create new content
	var header = $("<p class='boxHeader'>Here are your chargers! Select them to edit details and availability.</p>");
	var chargerContainer = $("<div id='chargerContainer'></div>")
	var newCharger = $("<button id='newCharger' class='chargerButton'>+</button>");

	//populating all chargers owned from database
	var yourCharger = [];
	for (i = 0; i < chargers.length; i++) {
		var chargerString = "<button onclick='chargerInfo(" + i + ")' class='chargerButton' id='charger" +
			i + "'>" + chargers[i].name + "</br>"
			+ chargers[i].id + "</br>" + chargers[i].address + "</br>" + "</button>";
		yourCharger[i] = $(chargerString);
	}

	$('#content').append(header);
	$('#content').append(chargerContainer);
	$('#chargerContainer').append(newCharger);
	for (i = 0; i < chargers.length; i++) {
		$('#chargerContainer').append(yourCharger[i]);
	}
	$("#newCharger").attr("onclick", "window.location.href='./add_new_charger'");

};

$('#chargers').click(function (event) {
	$('#chargers').css({ 'color': '#f05a29' });
	$('#bookings').css({ 'color': 'black' });
	$('#reviews').css({ 'color': 'black' });
	$('#earnings').css({ 'color': 'black' });

	$('#content').html('');

	var header = $("<p class='boxHeader'>Here are your chargers! Select them to edit details and availability.</p>");
	var chargerContainer = $("<div id='chargerContainer'></div>")
	var newCharger = $("<button id='newCharger' class='chargerButton'>+</button>");
	var yourCharger = $("<button class='chargerButton'>Your Charger</button>");

	$('#content').append(header);
	$('#content').append(chargerContainer);
	$('#chargerContainer').append(newCharger);
	$('#chargerContainer').append(yourCharger);
	$("#newCharger").attr("onclick", "window.location.href='./add_new_charger'");

});

$('#bookings').click(function (event) {
	$('#chargers').css({ 'color': 'black' });
	$('#bookings').css({ 'color': '#f05a29' });
	$('#reviews').css({ 'color': 'black' });
	$('#earnings').css({ 'color': 'black' });

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

$('#reviews').click(function (event) {
	$('#chargers').css({ 'color': 'black' });
	$('#bookings').css({ 'color': 'black' });
	$('#reviews').css({ 'color': '#f05a29' });
	$('#earnings').css({ 'color': 'black' });

	$('#content').html('');

	var header = $("<p class='boxHeader'>Here are all your reviews.</p>");
	var reviewsContainer = $("<div id='reviewsContainer'></div>");

	$('#content').append(header);
	$('#content').append(reviewsContainer);
})

$('#earnings').click(function (event) {
	$('#chargers').css({ 'color': 'black' });
	$('#bookings').css({ 'color': 'black' });
	$('#reviews').css({ 'color': 'black' });
	$('#earnings').css({ 'color': '#f05a29' });

	$('#content').html('');

	var header = $("<p class='boxHeader'>Here is your earnings history.</p>");
	var earningsContainer = $("<div id='earningsContainer'></div>");

	$('#content').append(header);
	$('#content').append(earningsContainer);
})

function chargerInfo(chargerNumber) {
	console.log("clicked!");
	$('#content').html('');
	createInput("content", "text", true, "name", "charger-name", "chargerInput", chargers[chargerNumber].name);
	createInput("content", "text", true,"address", "charger-address", "chargerInput", chargers[chargerNumber].address);
	createInput("content", "text", true,"city", "charger-city", "chargerInput", chargers[chargerNumber].city);
	createInput("content", "text", true,"province", "charger-province", "chargerInput", chargers[chargerNumber].province);
	createInput("content", "text", true,"type", "charger-type", "chargerInput", chargers[chargerNumber].type);
	createInput("content", "text", true,"level", "charger-type", "chargerInput", chargers[chargerNumber].type);

	//var nameString = "<h1>"+chargers[chargerNumber].name+"</h1></br>";
	//var locationString = "<h3>" + chargers[chargerNumber].address + ", "
	//	+ chargers[chargerNumber].city + " " + chargers[chargerNumber].province + "</h3></br>";
	var typeString = "<span>charger type: " + chargers[chargerNumber].type + "</span></br>";
	var levelString = "<span>charger level: " + chargers[chargerNumber].level + "</span></br>";
	var priceString = "<span>price: $" + chargers[chargerNumber].hourly_rate + "/hour</span></br>";
	var detailString = "<span>additional detail: " + chargers[chargerNumber].details + "</span></br>";
	var chargerName = $(nameString);
	var chargerLocation = $(locationString);
	var chargerType = $(typeString);
	var chargerLevel = $(levelString);
	var chargerPrice = $(priceString);
	var chargerDetail = $(detailString);
	var chargerInfoContainer = $("<div></div>");

	chargerInfoContainer.append(chargerName);
	chargerInfoContainer.append(chargerLocation);
	chargerInfoContainer.append(chargerType);
	chargerInfoContainer.append(chargerLevel);
	chargerInfoContainer.append(chargerPrice);
	chargerInfoContainer.append(chargerDetail);
	$('#content').append(chargerInfoContainer);
}
