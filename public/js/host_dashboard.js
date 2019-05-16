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
		chargers = JSON.parse(JSON.stringify(db));

	});

window.onload = function () {
	//highlight active tab
	$('#chargers').css({ 'color': '#f05a29' });
	$('#bookings').css({ 'color': 'black' });
	$('#reviews').css({ 'color': 'black' });
	$('#earnings').css({ 'color': 'black' });

	//clear old content
	$('#content').children().remove();
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
	//highlight active tab
	$('#chargers').css({ 'color': '#f05a29' });
	$('#bookings').css({ 'color': 'black' });
	$('#reviews').css({ 'color': 'black' });
	$('#earnings').css({ 'color': 'black' });

	//clear old content
	$('#content').children().remove();
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

});


//to be move to other js file
function getTime(timeObject){
	return timeObject.split("T")[1].split("Z")[0];
}

//to be move to mother js file if needed
$('#bookings').click(function (event) {
	$('#chargers').css({ 'color': 'black' });
	$('#bookings').css({ 'color': '#f05a29' });
	$('#reviews').css({ 'color': 'black' });
	$('#earnings').css({ 'color': 'black' });

	$('#content').children().remove();

	createContent("content", "div", "request-container", "card-panel col-md-5");
	createContent("content", "div", "request-container", "card-panel col-md-5");

	createContent("content", "div", "unpaid-container", "card-panel col-md-5");
	createContent("content", "div", "paid-container", "card-panel col-md-5");
	createButton("content", "history-btn", "BOOKING HISTORY", "orange-button");

	let pendingData = fetchGET('/host/pendingBookings', jwt);
	let count = 0;
	pendingData.forEach((booking) => {
			//pending booking information for the host
			createContent("request-container", "div", "pending-card" + count, "card-panel col-md-5");
			createContent("pending-card" + i, "span", "pending-charger-name" + count, "card-text-lg");
			$("#pending-charger-name" + count).text(booking.cName);
			createContent("pending-card" + i, "span", "pending-date" + count, "card-text-md");
			$("#pending-date" + count).text(booking.startTime.split("T")[0]);
			createContent("pending-card" + i, "span", "pending-client" + count, "card-text-sm");
			$("#pending-client" + count).text(booking.client + count);
			createContent("pending-card" + i, "span", "pending-hourly-cost" + count, "card-text-sm");
			$("#pending-price" + count).text(booking.client + count);
			createContent("pending-card" + i, "span", "pending-period" + count, "card-text-md");
			$("#pending-period" + count).text(getTime(booking.startTime) + "-" + getTime(booking.endTime));
			createContent("pending-card" + i, "span", "pending-address" + count, "card-text-md");
			$("#pending-address" + count).text(booking.address);			
			createContent("pending-card" + i, "span", "pending-area" + count, "card-text-md");
			$("#pending-area" + count).text(booking.city + ", " + booking.province);

			//accept or reject 
			createContent("request-container", "div", "acc-rej-container" + count, "right");
			createContent("acc-rej-container", "i", "accept" + count, "fas fa-check-circle accept-icon");
			createContent("acc-rej-container", "i", "reject" + count, "fas fa-times-circle reject-icon");
		count++;

	}
	);

})

$('#reviews').click(function (event) {
	$('#chargers').css({ 'color': 'black' });
	$('#bookings').css({ 'color': 'black' });
	$('#reviews').css({ 'color': '#f05a29' });
	$('#earnings').css({ 'color': 'black' });

	$('#content').children().remove();

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

	$('#content').children().remove();

	var header = $("<p class='boxHeader'>Here is your earnings history.</p>");
	var earningsContainer = $("<div id='earningsContainer'></div>");

	$('#content').append(header);
	$('#content').append(earningsContainer);
})

function chargerInfo(chargerNumber) {
	//rebuild content div
	$('#content').children().remove();
	createLabel("content", "charger-name", "Name", "lb-charger-name", "form-label readonly-label");
	//name we only want 20 characters
	createInput("content", "text", true, "name", "charger-name", "form-input readonly-input", chargers[chargerNumber].name);
	createLabel("content", "charger-address", "Address", "lb-charger-address", "form-label readonly-label");
	createInput("content", "text", true, "address", "charger-address", "form-input readonly-input", chargers[chargerNumber].address);
	createLabel("content", "charger-city", "City", "lb-charger-city", "form-label readonly-label");
	createInput("content", "text", true, "city", "charger-city", "form-input readonly-input", chargers[chargerNumber].city);
	createLabel("content", "charger-province", "Province", "lb-charger-province", "form-label readonly-label");
	createInput("content", "text", true, "province", "charger-province", "form-input readonly-input", chargers[chargerNumber].province);
	createLabel("content", "charger-type", "Type", "lb-charger-type", "form-label readonly-label");
	createInput("content", "text", true, "type", "charger-type", "form-input readonly-input", chargers[chargerNumber].type);
	createLabel("content", "charger-level", "Level", "lb-charger-level", "form-label readonly-label");
	createInput("content", "text", true, "level", "charger-level", "form-input readonly-input", chargers[chargerNumber].level);
	createLabel("content", "charger-rate", "Hourly rate", "lb-charger-rate", "form-label readonly-label");
	createInput("content", "text", true, "rate", "charger-rate", "form-input readonly-input", chargers[chargerNumber].rate);
	createLabel("content", "charger-details", "Additional details", "lb-charger-details", "form-label readonly-label");
	createInput("content", "text", true, "details", "charger-details", "form-input readonly-input", chargers[chargerNumber].details);
	createButton("content", "edit-btn", "Edit", "white-button");
	createButton("content", "save-btn", "Save", "orange-button");
	$("#save-btn").css({ "display": "none" });

	//event listener
	$('#edit-btn').click(function (event) {
		console.log("clicked");
		$('#edit-btn').css({ "display": "none" });
		$('#save-btn').css({ "display": "block" });;
		$('.readonly-input').removeAttr("readonly");
		$('.readonly-input').removeClass("readonly-input");
	});

	$('#save-btn').click(function (event) {
		$('#save-btn').css({ "display": "none" });
		$('#edit-btn').css({ "display": "block" });;
		$('.form-input').attr("readonly", true);
		$('.form-input').addClass("readonly-input");
		var cname = $("#charger-name").val();
		var caddress = $("#charger-address").val();
		var ccity = $("#charger-city").val();
		var cprovince = $("#charger-province").val();
		var ctype = $("#charger-type").val();
		var clevel = $("#charger-level").val();
		var crate = $("#charger-rate").val();
		var cdetails = $("#charger-details").val();
		let dataToSent = {
			name: cname,
			address: caddress,
			city: ccity,
			type: ctype,
			rate: crate,
			details: cdetails
		}
		const paramForServer = {
			cuid: chargers[chargerNumber].id
		}
		chargerUpdateURL = "/chargers?" + $.param(paramForServer);
		fetch(chargerUpdateURL, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + jwt
			},
			body: JSON.stringify(dataToSent)
		})
			.then(res => console.log(res))
			.then((response) => {
				console.log('Success:', (response))
			})
			.catch(error => console.error('Error:', error));;
	});
}

