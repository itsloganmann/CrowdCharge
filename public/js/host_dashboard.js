console.log("js file loaded successfullly");
//fetch to get all chargers' id that belong to the host
const jwt = JSON.parse(localStorage.getItem('jwt'));
const chargers;
const listingReq = {
	user_id: ""
}
const listingURL = "/host/chargers?" + $.param(listingReq);
fetch(listingURL, {
	method: 'GET',
	headter: {
		'content-type': 'application/json',
		'Authorization': 'Bearer ' + jwt
	}
})
	.then((res) => {
		return res.json();
	})
	.then((db) => {
		chargers = JSON.parse(JSON.stringify(db));
		///////////////////TEMP DATA
		chargers = [
			{
				id: "A000",
				name: "MINE",
				address: "1234 myplace st.",
				city: "Vancouver",
				province: "BC",
				country: "Canada",
				type: "LEVEL2",
				hourly_rate: "5.00",
				details: "no detail"
			}, {
				id: "A001",
				name: "YOURS",
				address: "1234 yourplace st.",
				city: "Vancouver",
				province: "BC",
				country: "Canada",
				type: "LEVEL1",
				hourly_rate: "4.00",
				details: "no detail"
			}
		];
		///////////////////TO BE REMOVE
	});

function fetchCharger(chargerID) {
	let data = {};
	let req = { charger: chargerID };
	let chargerURL = "/charger?" + $.param(req);
	fetch(chargerURL)
		.then((res) => {
			return res.json()
		})
		.then((db) => {
			data = JSON.parse(JSON.stringify(db));
		});
	///////////////////TEMP DATA
	data = {
		id: "A000",
		name: "MINE",
		address: "1234 myplace st.",
		city: "Vancouver",
		province: "BC",
		country: "Canada",
		type: "LEVEL2",
		hourly_rate: "5.00",
		details: "no detail"
	}
	///////////////////TO BE REMOVE
	return data;
}
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
	var yourCharger = $("<button class='chargerButton'>Your Charger</button>");

	$('#content').append(header);
	$('#content').append(chargerContainer);
	$('#chargerContainer').append(newCharger);
	$('#chargerContainer').append(yourCharger);
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