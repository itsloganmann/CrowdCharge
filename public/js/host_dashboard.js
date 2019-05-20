const jwt = localStorage.getItem('jwt');
// Changes tab colours and clears tab contents
// Clearing done when switching tabs to allow for new data population
$('.tab-button').on('click', (e) => {
	$(".tab-button:not(#" + event.target.id + ")").css({ "color": "inherit" });
	$("#" + event.target.id).css({ "color": "#F05A29" });
	$("#tab-content").children().remove();
});

// Fetches data from database 
// Used to retrieve bookings
async function fetchGET(url, jwt) {
    var hostData;
    await fetch(url, {
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
            hostData = JSON.parse(JSON.stringify(db))
        });
    return hostData;
}
function getTime(timeObject) {
	return timeObject.split("T")[1].split(":00.000Z")[0].replace(/^0+/, '');
}

// Function to switch to the chargers tab
const chargersTab = async (e) => {
	let chargers = [];
	await fetch('/chargers', {
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
	//create new content
	var header = $('<h3 class="col-11 inner-header">Chargers</h3>');
	var subheader = $('<h6 class="col-11 inner-subheader">Here are your chargers! Select them to edit details and availability.</h6>');
	var newCharger = $("<div class='col-sm-6'><button id='new-charger' class='charger-button white-button'><span class='fas fa-plus'></span></button></div>");
	var content = $('<div class="col-11 tab-section-data row" id="charger-container"></div>');
	//populating all chargers owned from database
	var yourCharger = [];
	for (i = 0; i < chargers.length; i++) {
		var chargerString = "<div class='col-sm-6'><button onclick='chargerInfo(" + i + ")' class='charger-button orange-button' id='charger" +
			i + "'>" + chargers[i].chargername + "</br>" + chargers[i].address + "</br>" + "</button></div>";
		yourCharger[i] = $(chargerString);
	}
	$('#tab-content').children().remove();
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
}
chargersTab();

//charger tab click event handler
$('#chargers-tab').click(function (event) {
	chargersTab();
});

//request tab click event handler
$('#requests-tab').click(async function (event) {
	createHeader("tab-content", "h3", "Requests", "col-11 inner-header");
	createSubheader("tab-content", "h6", "These are user requests to use your charger. "
		+ "Please reject or accept them by the date of the booking.", "col-11 inner-subheader");
	createContent("tab-content", "div", "request-container", "col-11 tab-section-data row");
	//pending booking data render!
	const pendingData = await fetchGET('/host/pendingBookings', jwt)
	console.log("DATA ", pendingData);
	let countPending = 0;
	if (pendingData.length == 0) {
		$("#request-container").append("<div class='no-data'><p>You don't have any pending booking requests!</p></div>");
	} else {
		pendingData.forEach((booking) => {
		//pending booking information for the host
		createContent("request-container", "div", "pending-card" + countPending, "card-panel col-md-5");
		$('#pending-card' + countPending).append('<div class="price-card-text-wrapper">'
		+ '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div><div class="price-card-text-sm">pending</div></div>');
		createContent("pending-card" + countPending, "div", "acc-rej-container" + countPending, "accept-decline-wrapper");
		createContent("pending-card" + countPending, "div", "pending-date" + countPending, "card-text-lg");
		createContent("pending-card" + countPending, "div", "pending-period" + countPending, "card-text-md");
		$("#pending-period" + countPending).text(getTime(booking.startTime) + "-" + getTime(booking.endTime));
		createContent("pending-card" + countPending, "div", "pending-client" + countPending, "card-text-sm orange-highlight");
		$("#pending-client" + countPending).text(booking.client);

		createContent("pending-card" + countPending, "div", "pending-charger-name" + countPending, "card-text-sm");
		$("#pending-charger-name" + countPending).text("Charger: " + booking.chargername);
		$("#pending-date" + countPending).text(booking.startTime.split("T")[0]);
		//accept or reject 
		createContent("acc-rej-container" + countPending, "span", "accept" + countPending, "fas fa-check-circle accept-icon");
		createContent("acc-rej-container" + countPending, "span", "reject" + countPending, "fas fa-times-circle reject-icon");
		addEventListenerOnAccept($("#accept" + countPending), booking, jwt);
		addEventListenerOnReject($("#reject" + countPending), booking, jwt);

		createContent("pending-card" + countPending, "div", "pending-address" + countPending, "card-text-sm");
		$("#pending-address" + countPending).text(booking.address);
		createContent("pending-card" + countPending, "div", "pending-area" + countPending, "card-text-sm");
		$("#pending-area" + countPending).text(booking.city + ", " + booking.province);
		countPending++;
	}
	);
}});

// Page to add new chargers
const appendAddChargerPage = () => {
	var prevPage = $("#tab-content").children().detach();
	$("#tab-content").append('<h3 class="inner-header col-11">New Charger</h3>'
		+ '<h6 class="inner-subheader col-11">Add a new charger!</h6>'
		+ '<div class="col-11 tab-section-data row">' 
		+ '<form id="new-charger-form">'
		+ '<div class="full-center-wrapper"><label id="charger-name-label" class="form-label-full" for="charger-name-input">Name</label><input type="text" name="name" maxlength="14" id="charger-name-input" class="form-input-full" required></div>'
		+ '<div class="full-center-wrapper"><label id="charger-address-label" class="form-label-full" for="charger-address-input">Address</label><input type="text" name="address" id="charger-address-input" class="form-input-full" required></div>'
		+ '<div class="full-center-wrapper"><label id="charger-city-label" class="form-label-full" for="charger-city-input">City</label><input type="text" name="city" id="charger-city-input" class="form-input-full" required></div>'
		+ '<div class="full-center-wrapper"><label id="charger-type-label" class="form-label-full" for="charger-type-input">Charger Type</label><select id="charger-type-input" class="form-input-full" name="type" form="new-charger-form" required><option value="type1">Wall Outlet</option><option value="type2">Port J1772</option><option value="type3">Nema 1450</option><option value="type4">CHAdeMO</option><option value="type4">SAE Combo CCS</option><option value="type5">Tesla HPWC</option><option value="type4">Telsa supercharger</option></select></div>'
		+ '<div class="full-center-wrapper"><label id="charger-type-label" class="form-label-full" for="charger-level-input">Charger Level</label><select id="charger-level-input" class="form-input-full" name="level" form="new-charger-form" required><option value="level-1">1</option><option value="level-2">2</option></select></div>'
		+ '<div class="full-center-wrapper"><label id="charger-rate-label" class="form-label-full" for="charger-cost-input">Hourly Rate</label><input type="text" name="rate" id="charger-cost-input" class="form-input-full" required></div>'
		+ '<div class="full-center-wrapper"><label id="charger-rate-label" class="form-label-full" for="charger-details-input">Additional Details (optional)</label><textarea name="details" id="charger-details-input" class="form-input-full" rows="6" cols="60"placeholder="Max 80 characters"></textarea></div><input class="orange-button disabled-button" id="submit-charger" type="button" value="Add Charger" disabled><input class="white-button" id="cancel-charger" type="button" value="Cancel"></form></div>');
	$("#cancel-charger").on('click', (e) => {
		$("#tab-content").children().remove();
		$("#tab-content").append(prevPage);
	});
}


//Renders data from database for booking tab
$('#bookings-tab').click(async function (event) {
	createHeader("tab-content", "h3", "Unpaid bookings", "col-11 inner-header");
	createSubheader("tab-content", "h6", "You accepted these requests. "
		+ "We are just waiting for the client to make a payment.", "col-11 inner-subheader");
	createContent("tab-content", "div", "unpaid-container", "col-11 tab-section-data row");
	createHeader("tab-content", "h3", "Paid bookings", "col-11 inner-header");
	createSubheader("tab-content", "h6", "These booking are successfully added to your schedule. "
		+ "Please make sure the client can now use your charger.", "col-11 inner-subheader");
	createContent("tab-content", "div", "paid-container", "col-11 tab-section-data row");
	// Fetch GET method for unpaid bookings
	let unpaidData = await fetchGET('/host/unpaidBookings', jwt);
	let countUnpaid = 0;
	if (unpaidData.length == 0) {
		$("#unpaid-container").append("<div class='no-data'><p>You don't have any unpaid booking requests!</p></div>");
	} else {
	unpaidData.forEach((booking) => {
		// Renders content for unpaid bookings
		createContent("unpaid-container", "div", "unpaid-card" + countUnpaid, "card-panel col-md-5");
		$('#unpaid-card' + countUnpaid).append('<div class="price-card-text-wrapper">'
		+ '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div><div class="price-card-text-sm orange-highlight">unpaid</div></div>');
		createContent("unpaid-card" + countUnpaid, "div", "unpaid-date" + countUnpaid, "card-text-lg orange-highlight");
		createContent("unpaid-card" + countUnpaid, "div", "unpaid-period" + countUnpaid, "card-text-md");
		$("#unpaid-period" + countUnpaid).text(getTime(booking.startTime) + "-" + getTime(booking.endTime));
		createContent("unpaid-card" + countUnpaid, "div", "unpaid-client" + countUnpaid, "card-text-sm orange-highlight");
		$("#unpaid-client" + countUnpaid).text(booking.client);
		createContent("unpaid-card" + countUnpaid, "div", "unpaid-charger-name" + countUnpaid, "card-text-sm");
		$("#unpaid-charger-name" + countUnpaid).text("Charger: " + booking.chargername);
		$("#unpaid-date" + countUnpaid).text(booking.startTime.split("T")[0]);
		createContent("unpaid-card" + countUnpaid, "div", "unpaid-address" + countUnpaid, "card-text-sm");
		$("#unpaid-address" + countUnpaid).text(booking.address);
		createContent("unpaid-card" + countUnpaid, "div", "unpaid-area" + countUnpaid, "card-text-sm");
		$("#unpaid-area" + countUnpaid).text(booking.city + ", " + booking.province);
		countUnpaid++;
	}
	)};
	// Fetch GET method for paid bookings
	let paidData = await fetchGET('/host/paidBookings', jwt);
	let countPaid = 0;
	if (paidData.length == 0) {
		$("#paid-container").append("<div class='no-data'><p>You don't have any paid booking requests!</p></div>");
	} else {
	paidData.forEach((booking) => {
		// Renders content for paid bookings
		createContent("paid-container", "div", "paid-card" + countPaid, "card-panel col-md-5");
		$('#paid-card' + countPaid).append('<div class="price-card-text-wrapper">'
		+ '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div><div class="price-card-text-sm green-highlight">paid</div></div>');
		createContent("paid-card" + countPaid, "div", "paid-date" + countPaid, "card-text-lg green-highlight");
		createContent("paid-card" + countPaid, "div", "paid-period" + countPaid, "card-text-md");
		$("#paid-period" + countPaid).text(getTime(booking.startTime) + "-" + getTime(booking.endTime));
		createContent("paid-card" + countPaid, "div", "paid-client" + countPaid, "card-text-sm green-highlight");
		$("#paid-client" + countPaid).text(booking.client);
		createContent("paid-card" + countPaid, "div", "paid-charger-name" + countPaid, "card-text-sm");
		$("#paid-charger-name" + countPaid).text("Charger: " + booking.chargername);
		$("#paid-date" + countPaid).text(booking.startTime.split("T")[0]);
		createContent("paid-card" + countPaid, "div", "paid-address" + countPaid, "card-text-sm");
		$("#paid-address" + countPaid).text(booking.address);
		createContent("paid-card" + countPaid, "div", "paid-area" + countPaid, "card-text-sm");
		$("#paid-area" + countPaid).text(booking.city + ", " + booking.province);
		countPaid++;
	}
	)};
})

$('#reviews-tab').click(async function (event) {
	//container box and its headers
	createHeader("tab-content", "h3", "Reviews for You", "col-11 inner-header");
	createSubheader("tab-content", "h6", "These are the comments of hosts that you’ve charged with.", "col-11 inner-subheader");
	createContent("tab-content", "div", "review-container", "col-11 tab-section-data row");
    //let reviewData = await fetchGET("host/allChargerReviews", jwt);
	/*reviewData = [{
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
	}];*/

	let countReview = 0;
	$("#review-container").append("<div class='no-data'><p>You don't have any reviews!</p></div>");
	/*
	reviewData.forEach(review => {
		createContent("review-container", "div", "review-card" + countReview, "card-panel col-md-11");
		createContent("review-card" + countReview, "div", "reviewer" + countReview, "card-text-lg");
		$("#reviewer" + countReview).text(review.reviewer);
		createContent("review-card" + countReview, "div", "comment" + countReview, "card-text-md");
		$("#comment" + countReview).text(review.comment);
		createContent("review-card" + countReview, "div", "rating" + countReview, "card-text-lg");
		$("#rating" + countReview).text(review.rating);
		countReview++;
	});
	*/
})


//click event listener on each charger
async function chargerInfo(chargerNumber) {
	let chargers = [];
	await fetch('/chargers', {
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
	//rebuild content div with charger information that a user clicked
	let prevPage = $('#tab-content').children().detach();

	createLabel("tab-content", "charger-name", "Name", "lb-charger-name", "form-label readonly-label");
	//name we only want 20 characters
	//createContent(target id type classname)
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
	createInput("tab-content", "text", true, "rate", "charger-rate", "form-input readonly-input", "$"+ chargers[chargerNumber].cost);
	createLabel("tab-content", "charger-details", "Additional details", "lb-charger-details", "form-label readonly-label");
	$("#tab-content").append("<textarea name='details' id='charger-details' class='form-input-full readonly-input-full' rows='6' cols='60' readonly>");
	//switch between two buttons when clicked
	//edit -> save; save->edit
	createButton("tab-content", "edit-btn", "Edit", "orange-button");
	createButton("tab-content", "save-btn", "Save", "orange-button");
	createButton("tab-content", "back-btn", "Back", "white-button");
	$("#save-btn").css({ "display": "none" });

	$("#back-btn").click((e) => {
		$("#tab-content").children().remove();;
		$("#tab-content").append(prevPage);
	});
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

//geernal header if no booking is created
function nothingToDisplay(container, bookingType) {
	nothingDiv = $("<div class='no-data'><p>You don't have any " + bookingType + "!</p></div>");
	$(container).append(nothingDiv);
}


$("#history-tab").click(async function (event) {
	var historyContainer = createContentContainer("historyContainer", "history-heading", "Booking History", "history-subheading", "These are the past bookings that have been made with you.");
	var historyCardContainer = $("<div class='col-11 tab-section-data row'></div>");
	historyContainer.append(historyCardContainer);
	/*
	let data = await fetchBooking("/host/completedBookings", "completed");
	if (data == "") {
		nothingToDisplay(historyCardContainer, "past bookings");
	} else {
		data.forEach(hData => {
			historyCardContainer.append($(hData));
		});
	}
	*/
	$("#tab-content").append(historyContainer);

})





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
			window.location.replace('/host_dashboard');
		})
		.catch(error => console.error('Error:', error));
});

// Disables non-digit entries for charger hourly rate
$('body').on('keypress', '#charger-cost-input', (evt) => {
	if (evt.which < 48 || evt.which > 57) {
		evt.preventDefault();
	}
});