
//fetch to get all chargers' id that belong to the host
const jwt = localStorage.getItem('jwt');
let chargers = [];
fetch('/chargers', {
	method: 'GET',
	headers: {
		'content-type': 'application/json',
		'Authorization': 'Bearer ' + jwt
	}
}).then((res) => {
	return res.json()
}).then((db) => {
	chargers = db;
}).catch(error => console.log(error));

// Changes tab colours and clears tab contents
// Clearing done when switching tabs to allow for new data population
$('.tab-button').on('click', (e) => {
	$(".tab-button:not(#" + event.target.id + ")").css({ "color": "black" });
	$("#" + event.target.id).css({ "color": "#F05A29" });
	$("#tab-content").children().remove();
});


//request tab click event handler
$('#requests-tab').click(function (event) {
	createHeader("tab-content", "h3", "Requests", "col-11 inner-header");
	createSubheader("tab-content", "h6", "These are user requests to use your charger. "
		+ "Please reject or accept them by the date of the booking.", "col-11 inner-subheader");
	createContent("tab-content", "div", "request-container", "col-11 tab-section-data row");
	//pending booking data render!
	let pendingData = fetchGET('/host/pendingBookings', jwt);
	let countPending = 0;
	pendingData.forEach((booking) => {
		//pending booking information for the host
		createContent("request-container", "div", "pending-card" + countPending, "card-panel col-md-5");
		createContent("pending-card" + countPending, "p", "pending-charger-name" + countPending, "card-text-lg");
		$("#pending-charger-name" + countPending).text(booking.chargername);
		createContent("pending-card" + countPending, "p", "pending-date" + countPending, "card-text-md");
		$("#pending-date" + countPending).text(booking.startTime.split("T")[0]);
		//accept or reject 
		createContent("pending-card" + countPending, "div", "acc-rej-container" + countPending, "price-card-text-wrapper");
		createContent("acc-rej-container" + countPending, "span", "accept" + countPending, "fas fa-check-circle accept-icon");
		createContent("acc-rej-container" + countPending, "span", "reject" + countPending, "fas fa-times-circle reject-icon");
		addEventListenerOnAccept($("#accept" + countPending), booking, jwt);
		addEventListenerOnReject($("#reject" + countPending), booking, jwt);

		createContent("pending-card" + countPending, "p", "pending-client" + countPending, "card-text-sm");
		$("#pending-client" + countPending).text(booking.client + countPending);
		createContent("pending-card" + countPending, "p", "pending-hourly-cost" + countPending, "card-text-sm");
		$("#pending-price" + countPending).text(booking.client + countPending);
		createContent("pending-card" + countPending, "p", "pending-period" + countPending, "card-text-md");
		$("#pending-period" + countPending).text(getTime(booking.startTime) + "-" + getTime(booking.endTime));
		createContent("pending-card" + countPending, "p", "pending-address" + countPending, "card-text-md");
		$("#pending-address" + countPending).text(booking.address);
		createContent("pending-card" + countPending, "p", "pending-area" + countPending, "card-text-md");
		$("#pending-area" + countPending).text(booking.city + ", " + booking.province);
		countPending++;
	}
	);
});

//charger tab click event handler
$('#chargers-tab').click(function (event) {
	//create new content
	var header = $('<h3 class="col-11 inner-header">Chargers</h3>');
	var subheader = $('<h6 class="col-11 inner-subheader">Here are your chargers! Select them to edit details and availability.</h6>');
	var newCharger = $("<button id='new-charger' class='charger-button white-button'><span class='fas fa-plus'></span></button>");
	var content = $('<div class="col-11 tab-section-data row" id="charger-container"></div>');
	//populating all chargers owned from database
	var yourCharger = [];
	for (i = 0; i < chargers.length; i++) {
		var chargerString = "<button onclick='chargerInfo(" + i + ")' class='charger-button orange-button' id='charger" +
			i + "'>" + chargers[i].chargername + "</br>" + chargers[i].address + "</br>" + "</button>";
		yourCharger[i] = $(chargerString);
	}
	$('#tab-content').append(header);
	$('#tab-content').append(subheader);
	$('#tab-content').append(content);
	console.log(yourCharger);
	for (i = 0; i < chargers.length; i++) {
		$('#charger-container').append(yourCharger[i]);
	}
	$('#charger-container').append(newCharger);
	$("#new-charger").on('click', (e) => {
		appendAddChargerPage();
	});
});

const appendAddChargerPage = () => {
	var prevPage = $("#tab-content").children().detach();
	$("#tab-content").append('<h3 class="inner-header col-11">New Charger</h3><p class="inner-subheader col-11">Add a new charger!</p><div class="col-11 tab-section-data row"><form id="new-charger-form"><div class="full-center-wrapper"><label id="charger-name-label" class="form-label-full" for="charger-name-input">Name</label><input type="text" name="name" maxlength="15" id="charger-name-input" class="form-input-full" required></div><div class="full-center-wrapper"><label id="charger-address-label" class="form-label-full" for="charger-address-input">Address</label><input type="text" name="address" id="charger-address-input" class="form-input-full" required></div><div class="full-center-wrapper"><label id="charger-city-label" class="form-label-full" for="charger-city-input">City</label><input type="text" name="city" id="charger-city-input" class="form-input-full" required></div><div class="full-center-wrapper row"><div class="col-8"><label id="charger-type-label" class="form-label-full" for="charger-type-input">Charger Type</label><select id="charger-type-input" class="form-input-full" name="type" form="new-charger-form" required><option value="type1">Wall Outlet</option><option value="type2">Port J1772</option><option value="type3">Nema 1450</option><option value="type4">CHAdeMO</option><option value="type4">SAE Combo CCS</option><option value="type5">Tesla HPWC</option><option value="type4">Telsa supercharger</option></select></div><div class="col-4"><label id="charger-type-label" class="form-label-full" for="charger-level-input">Charger Level</label><select id="charger-level-input" class="form-input-full" name="level" form="new-charger-form" required><option value="level-1">1</option><option value="level-2">2</option></select></div></div><div class="full-center-wrapper"><label id="charger-rate-label" class="form-label-full" for="charger-cost-input">Hourly Rate</label><input type="text" name="rate" id="charger-cost-input" class="form-input-full" required></div><div class="full-center-wrapper"><label id="charger-rate-label" class="form-label-full" for="charger-details-input">Additional Details(optional)</label><textarea name="details" id="charger-details-input" class="form-input-full" rows="6" cols="60"placeholder="Max 80 characters"></textarea></div><input class="orange-button disabled-button" id="submit-charger" type="button" value="Add Charger" disabled><input class="white-button" id="cancel-charger" type="button" value="Cancel"></form></div>');
	$("#cancel-charger").on('click', (e) => {
		$("#tab-content").children().remove();
		$("#tab-content").append(prevPage);
	});
}


//to be move to mother js file if needed
$('#bookings-tab').click(function (event) {

	createHeader("tab-content", "h3", "Unpaid bookings", "col-11 inner-header");
	createSubheader("tab-content", "h6", "You accepted these requests. "
		+ "We are just waiting for the client to make a payment.", "col-11 inner-subheader");
	createContent("tab-content", "div", "unpaid-container", "col-11 tab-section-data row");

	createHeader("tab-content", "h3", "Paid bookings", "col-11 inner-header");
	createSubheader("tab-content", "h6", "These booking are successfully added to your schedule. "
		+ "Please make sure the client can now use your charger.", "col-11 inner-subheader");
	createContent("tab-content", "div", "paid-container", "col-11 tab-section-data row");

	//unpaid booking data render!
	let unpaidData = fetchGET('/host/unpaidBookings', jwt);
	let countUnpaid = 0;
	unpaidData.forEach((booking) => {
		//unpaid booking information for the host


		createContent("unpaid-container", "div", "unpaid-card" + countUnpaid, "card-panel col-md-5");
		createContent("unpaid-card" + countUnpaid, "p", "unpaid-charger-name" + countUnpaid, "card-text-lg");
		$("#unpaid-charger-name" + countUnpaid).text(booking.chargername);
		createContent("unpaid-card" + countUnpaid, "p", "unpaid-date" + countUnpaid, "card-text-md");
		$("#unpaid-date" + countUnpaid).text(booking.startTime.split("T")[0]);
		createContent("unpaid-card" + countUnpaid, "p", "unpaid-client" + countUnpaid, "card-text-sm");
		$("#unpaid-client" + countUnpaid).text(booking.client + countUnpaid);
		createContent("unpaid-card" + countUnpaid, "p", "unpaid-hourly-cost" + countUnpaid, "card-text-sm");
		$("#unpaid-price" + countUnpaid).text(booking.client + countUnpaid);
		createContent("unpaid-card" + countUnpaid, "p", "unpaid-period" + countUnpaid, "card-text-md");
		$("#unpaid-period" + countUnpaid).text(getTime(booking.startTime) + "-" + getTime(booking.endTime));
		createContent("unpaid-card" + countUnpaid, "p", "unpaid-address" + countUnpaid, "card-text-md");
		$("#unpaid-address" + countUnpaid).text(booking.address);
		createContent("unpaid-card" + countUnpaid, "p", "unpaid-area" + countUnpaid, "card-text-md");
		$("#unpaid-area" + countUnpaid).text(booking.city + ", " + booking.province);
		countUnpaid++;
	}
	);
	//paid booking data render!
	let paidData = fetchGET('/host/paidBookings', jwt);
	let countPaid = 0;
	paidData.forEach((booking) => {
		//paid booking information for the host
		createContent("paid-container", "div", "paid-card" + countPaid, "card-panel col-md-5");
		createContent("paid-card" + countPaid, "p", "paid-charger-name" + countPaid, "card-text-lg");
		$("#paid-charger-name" + countPaid).text(booking.chargername);
		createContent("paid-card" + countPaid, "p", "paid-date" + countPaid, "card-text-md");
		$("#paid-date" + countPaid).text(booking.startTime.split("T")[0]);
		createContent("paid-card" + countPaid, "p", "paid-client" + countPaid, "card-text-sm");
		$("#paid-client" + countPaid).text(booking.client + countPaid);
		createContent("paid-card" + countPaid, "p", "paid-hourly-cost" + countPaid, "card-text-sm");
		$("#paid-price" + countPaid).text(booking.client + countPaid);
		createContent("paid-card" + countPaid, "p", "paid-period" + countPaid, "card-text-md");
		$("#paid-period" + countPaid).text(getTime(booking.startTime) + "-" + getTime(booking.endTime));
		createContent("paid-card" + countPaid, "p", "paid-address" + countPaid, "card-text-md");
		$("#paid-address" + countPaid).text(booking.address);
		createContent("paid-card" + countPaid, "p", "paid-area" + countPaid, "card-text-md");
		$("#paid-area" + countPaid).text(booking.city + ", " + booking.province);
		countPaid++;
	}
	);
})

$('#reviews-tab').click(function (event) {
	//container box and its headers
	createHeader("tab-content", "h3", "Reviews for You", "col-11 inner-header");
	createSubheader("tab-content", "h6", "These are the comments of hosts that you’ve charged with.", "col-11 inner-subheader");
	createContent("tab-content", "div", "review-container", "col-11 tab-section-data row");

	let reviewData = fetchGET("host/reviews", jwt);
	reviewData = [{
		reviewer: "Jane Doe",
		comment: "This is great!",
		rating: "5.00"
	}, {
		reviewer: "William Smith",
		comment: "This is bad!",
		rating: "1.00"
	}, {
		reviewer: "Kevin Woo",
		comment: "Great location!",
		rating: "4.00"
	}];
	let countReview = 0;
	reviewData.forEach(review => {
		createContent("review-container", "div", "review-card" + countReview, "card-panel col-md-11");
		createContent("review-card" + countReview, "p", "reviewer" + countReview, "card-text-lg");
		$("#reviewer" + countReview).text(review.reviewer);
		createContent("review-card" + countReview, "p", "comment" + countReview, "card-text-md");
		$("#comment" + countReview).text(review.comment);
		createContent("review-card" + countReview, "p", "rating" + countReview, "card-text-lg");
		$("#rating" + countReview).text(review.rating);

		countReview++;
	});
})

$('#earnings-tab').click(function (event) {
	var header = $("<p class='boxHeader'>Here is your earnings history.</p>");
	var earningsContainer = $("<div id='earningsContainer'></div>");
	$('#content').css({ 'height': '500px' });

	$('#content').append(header);
	$('#content').append(earningsContainer);
})

//click event listener on each charger
function chargerInfo(chargerNumber) {
	//rebuild content div with charger information that a user clicked
	$('#tab-content').children().remove();

	createLabel("tab-content", "charger-name", "Name", "lb-charger-name", "form-label readonly-label");
	//name we only want 20 characters
	createInput("tab-content", "text", true, "name", "charger-name", "form-input readonly-input", chargers[chargerNumber].chargername);
	createLabel("tab-content", "charger-address", "Address", "lb-charger-address", "form-label readonly-label");
	createInput("tab-content", "text", true, "address", "charger-address", "form-input readonly-input", chargers[chargerNumber].address);
	createLabel("tab-content", "charger-city", "City", "lb-charger-city", "form-label readonly-label");
	createInput("tab-content", "text", true, "city", "charger-city", "form-input readonly-input", chargers[chargerNumber].city);
	createLabel("tab-content", "charger-province", "Province", "lb-charger-province", "form-label readonly-label");
	createInput("tab-content", "text", true, "province", "charger-province", "form-input readonly-input", chargers[chargerNumber].province);
	createLabel("tab-content", "charger-type", "Type", "lb-charger-type", "form-label readonly-label");
	createInput("tab-content", "text", true, "type", "charger-type", "form-input readonly-input", chargers[chargerNumber].type);
	createLabel("tab-content", "charger-level", "Level", "lb-charger-level", "form-label readonly-label");
	createInput("tab-content", "text", true, "level", "charger-level", "form-input readonly-input", chargers[chargerNumber].level);
	createLabel("tab-content", "charger-rate", "Hourly rate", "lb-charger-rate", "form-label readonly-label");
	createInput("tab-content", "text", true, "rate", "charger-rate", "form-input readonly-input", chargers[chargerNumber].rate);
	createLabel("tab-content", "charger-details", "Additional details", "lb-charger-details", "form-label readonly-label");
	createInput("tab-content", "text", true, "details", "charger-details", "form-input readonly-input", chargers[chargerNumber].details);
	//switch between two buttons for clicked
	//edit -> save; save->edit
	createButton("tab-content", "edit-btn", "Edit", "white-button");
	createButton("tab-content", "save-btn", "Save", "orange-button");
	$("#save-btn").css({ "display": "none" });

	//event listener for save/edit button clicked
	$('#edit-btn').click(function (event) {
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
			chargername: cname,
			address: caddress,
			city: ccity,
			type: ctype,
			level: clevel,
			rate: crate,
			details: cdetails
		}
		console.log("current charger id:" + chargers[chargerNumber]._id);

		const paramForServer = {
			cUID: chargers[chargerNumber]._id
		}
		//update calls to the database
		fetch('/charger?' + $.param(paramForServer), {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + jwt
			},
			body: JSON.stringify(dataToSent)
		})
			.then(res => console.log(res))
			.then((response) => {
				console.log('Success:', response)
				fetch('/chargers', {
					method: 'GET',
					headers: {
						'content-type': 'application/json',
						'Authorization': 'Bearer ' + jwt
					}
				}).then((res) => {
					return res.json()
				}).then((db) => {
					chargers = db;
				}).catch(error => console.log(error));

			})
			.catch(error => console.error('Error:', error));;
	});
}



// Enables add new charger button if all fields are filled
$('body').on('input', '#charger-name-input, #charger-address-input, #charger-city-input, #charger-type-input, #charger-level-input, #charger-cost-input', (event) => {
	var formFilled = false;
	if ($('#charger-name-input').val() && $('#charger-address-input').val() && $('#charger-city-input').val()
		&& $('#charger-type-input').val() && $('#charger-level-input').val() && $('#charger-cost-input').val()) {
		formFilled = true;
	}
	console.log(formFilled);
	if (formFilled) {
		console.log('remove');
		$('#submit-charger').removeAttr('disabled');
		$('#submit-charger').removeClass('disabled-button');
	} else {
		$('#submit-charger').prop('disabled', true);
		$('#submit-charger').addClass('disabled-button');
	}
});

$("body").on('click', "#submit-charger", (e) => {
	e.preventDefault();
	const chargeraddress = $('#charger-address-input').val();
	const chargercity = $('#charger-city-input').val();
	const chargerprovince = "BC";
	const chargercountry = "Canada";
	const chargercost = parseFloat($('#charger-cost-input').val());
	const chargername = $('#charger-name-input').val();
	const chargerlevel = parseFloat($('#charger-level-input option:selected').text());
	const chargertype = $('#charger-type-input option:selected').text();
	const chargerdetails = $('#charger-details-input').val();
	const url = '/charger/new'
	const data = {
		address: chargeraddress,
		city: chargercity,
		province: chargerprovince,
		country: chargercountry,
		cost: chargercost,
		chargername: chargername,
		level: chargerlevel,
		type: chargertype,
		details: chargerdetails
	}
	console.log(data);
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	}).then(res => console.log(res))
		.then((response) => {
			console.log('Success: charger added to db!', (response))
			//window.location.replace('/host_dashboard');
		})
		.catch(error => console.error('Error:', error));
});
$('body').on('keypress', '#charger-cost-input', (evt) => {
	if (evt.which < 48 || evt.which > 57)
	{
		evt.preventDefault();
	}
});