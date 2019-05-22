// Controls the host dashboard. Lets the host add chargers,
// view their bookings, check their reviews, and see their earnings.

// Changes tab colours and clears tab contents
// Clearing done when switching tabs to allow for new data population
$('.tab-button').on('click', (e) => {
	$('.tab-button:not(#' + event.target.id + ')').removeClass('orange-highlight');
	$('#' + event.target.id).addClass('orange-highlight');
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

	// Create new content
	var header = $('<h3 class="col-11 inner-header">Chargers</h3>');
	var subheader = $('<h6 class="col-11 inner-subheader">Here are your chargers! Select them to edit details and availability.</h6>');
	var newCharger = $("<div class='col-sm-6'><button id='new-charger' class='charger-button white-button'><span id='new-charger-plus'>+</span></button></div>");
	var content = $('<div class="col-11 tab-section-data row" id="charger-container"></div>');

	// Populating all chargers owned from database
	var yourCharger = [];
	for (i = 0; i < chargers.length; i++) {
		var chargerString = "<div class='col-sm-6'><button onclick='chargerInfo(" + i + ")' class='charger-button orange-button' id='charger" +
			i + "'>" + chargers[i].chargername + "<br>" + chargers[i].address + "<br>" + "</button></div>";
		yourCharger[i] = $(chargerString);
	}

	// Append new content to the tab
	$('#tab-content').children().remove();
	$('#tab-content').append(header);
	$('#tab-content').append(subheader);
	$('#tab-content').append(content);
	for (i = 0; i < chargers.length; i++) {
		$('#charger-container').append(yourCharger[i]);
	}
	$('#charger-container').append(newCharger);
	$("#new-charger").on('click', (e) => {
		appendAddChargerPage();
	});
}
chargersTab();

// Charger tab event handler
$('#chargers-tab').click(function (event) {
	chargersTab();
});

// Request tab event handler
$('#requests-tab').click(async function (event) {
	createHeader("tab-content", "h3", "Requests", "col-11 inner-header");
	createSubheader("tab-content", "h6", "These are user requests to use your charger. "
		+ "Please reject or accept them by the date of the booking.", "col-11 inner-subheader");
	createContent("tab-content", "div", "request-container", "col-11 tab-section-data row");

	// Pending booking data render
	const pendingData = await fetchGET('/host/pendingBookings', jwt)
	console.log("DATA ", pendingData);
	let countPending = 0;
	if (pendingData.length == 0) {
		$("#request-container").append("<div class='no-data'><p>You don't have any pending booking requests!</p></div>");
	} else {
		pendingData.forEach((booking) => {
			let localStartDate = new Date(booking.startTime);
			let localEndDate = new Date(booking.endTime);
			let localStartTime = getLocalStartTime(localStartDate);
			let localEndTime = getLocalEndTime(localEndDate);
			let localDate = getLocalDate(localStartDate);

			// Pending booking information for the host
			createContent("request-container", "div", "pending-card" + countPending, "card-panel col-md-5");
			$('#pending-card' + countPending).append('<div class="price-card-text-wrapper">'
				+ '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div><div class="price-card-text-sm">pending</div></div>');
			createContent("pending-card" + countPending, "div", "pending-date" + countPending, "card-text-lg");
			createContent("pending-card" + countPending, "div", "pending-period" + countPending, "card-text-md");
			$("#pending-period" + countPending).text(localStartTime + " - " + localEndTime);
			createContent("pending-card" + countPending, "div", "pending-client" + countPending, "card-text-sm orange-highlight");
			$("#pending-client" + countPending).text(booking.client);

			createContent("pending-card" + countPending, "div", "pending-charger-name" + countPending, "card-text-sm");
			$("#pending-charger-name" + countPending).text("Charger: " + booking.chargername);
			$("#pending-date" + countPending).text(localDate);
			createContent("pending-card" + countPending, "div", "pending-address" + countPending, "card-text-sm");
			$("#pending-address" + countPending).text(booking.address);
			createContent("pending-card" + countPending, "div", "pending-area" + countPending, "card-text-sm");
			$("#pending-area" + countPending).text(booking.city + ", " + booking.province);
			//accept or reject 
			createContent("pending-card" + countPending, "div", "acc-rej-container" + countPending, "accept-decline-wrapper");
			createButton("acc-rej-container" + countPending, "accept" + countPending, "Accept", "green-button booking-accept-button");
			createButton("acc-rej-container" + countPending, "reject" + countPending, "Decline", "red-button booking-reject-button");
			addEventListenerOnAccept($("#accept" + countPending), booking, jwt);
			addEventListenerOnReject($("#reject" + countPending), booking, jwt);
			countPending++;
		})
	}
});

// Charger page to add new chargers
const appendAddChargerPage = () => {
	var prevPage = $("#tab-content").children().detach();
	$("#tab-content").append('<h3 class="inner-header col-11">New Charger</h3>'
		+ '<h6 class="inner-subheader col-11">Add a new charger!</h6>'
		+ '<div class="col-11 tab-section-data row">'
		+ '<form id="new-charger-form">'
		+ '<div class="full-center-wrapper"><label id="charger-name-label" class="form-label-full" for="charger-name-input">Name</label><input type="text" name="name" maxlength="14" id="charger-name-input" class="form-input-full" required></div>'
		+ '<div class="full-center-wrapper"><label id="charger-address-label" class="form-label-full" for="charger-address-input">Address</label><input type="text" name="address" id="charger-address-input" class="form-input-full" required></div>'
		+ '<div class="full-center-wrapper"><label id="charger-city-label" class="form-label-full" for="charger-city-input">City</label><input type="text" name="city" id="charger-city-input" class="form-input-full" required></div>'
		+ '<div class="full-center-wrapper"><label id="charger-type-label" class="form-label-full" for="charger-type-input">Charger Type</label><select id="charger-type-input" class="form-input-full" name="type" form="new-charger-form" required><option value="type1">Wall Outlet</option><option value="type2">J-1772</option><option value="type3">Tesla (Roadster)</option><option value="type4">NEMA 14-50</option><option value="type5">Tesla</option></select></div>'
		+ '<div class="full-center-wrapper"><label id="charger-level-label" class="form-label-full" for="charger-level-input">Charger Level</label><select id="charger-level-input" class="form-input-full" name="level" form="new-charger-form" required><option value="level-1">1</option><option value="level-2">2</option></select></div>'
		+ '<div class="full-center-wrapper"><label id="charger-rate-label" class="form-label-full" for="charger-cost-input">Hourly Rate</label><input type="text" name="rate" id="charger-cost-input" class="form-input-full" required></div>'
		+ '<div class="full-center-wrapper"><label id="charger-details-label" class="form-label-full" for="charger-details-input">Additional Details (optional)</label><textarea name="details" id="charger-details-input" class="form-input-full" rows="6" cols="60" placeholder="Max 80 characters"></textarea></div><input class="orange-button disabled-button" id="submit-charger" type="button" value="Add Charger" disabled><input class="white-button" id="cancel-charger" type="button" value="Cancel"></form></div>');
		$("#charger-cost-input").after("<div class='dollar-symbol-full'>$</div>");
	$("#cancel-charger").on('click', (e) => {
		$("#tab-content").children().remove();
		$("#tab-content").append(prevPage);
	});
}

// Renders data from database for booking tab
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
			let localStartDate = new Date(booking.startTime);
			let localEndDate = new Date(booking.endTime);
			let localStartTime = getLocalStartTime(localStartDate);
			let localEndTime = getLocalEndTime(localEndDate);
			let localDate = getLocalDate(localStartDate);
			// Renders content for unpaid bookings
			createContent("unpaid-container", "div", "unpaid-card" + countUnpaid, "card-panel col-md-5");
			$('#unpaid-card' + countUnpaid).append('<div class="price-card-text-wrapper">'
				+ '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div><div class="price-card-text-sm orange-highlight">unpaid</div></div>');
			createContent("unpaid-card" + countUnpaid, "div", "unpaid-date" + countUnpaid, "card-text-lg orange-highlight");
			createContent("unpaid-card" + countUnpaid, "div", "unpaid-period" + countUnpaid, "card-text-md");
			$("#unpaid-period" + countUnpaid).text(localStartTime + " - " + localEndTime);
			createContent("unpaid-card" + countUnpaid, "div", "unpaid-client" + countUnpaid, "card-text-sm orange-highlight");
			$("#unpaid-client" + countUnpaid).text(booking.client);
			createContent("unpaid-card" + countUnpaid, "div", "unpaid-charger-name" + countUnpaid, "card-text-sm");
			$("#unpaid-charger-name" + countUnpaid).text("Charger: " + booking.chargername);
			$("#unpaid-date" + countUnpaid).text(localDate);
			createContent("unpaid-card" + countUnpaid, "div", "unpaid-address" + countUnpaid, "card-text-sm");
			$("#unpaid-address" + countUnpaid).text(booking.address);
			createContent("unpaid-card" + countUnpaid, "div", "unpaid-area" + countUnpaid, "card-text-sm");
			$("#unpaid-area" + countUnpaid).text(booking.city + ", " + booking.province);
			countUnpaid++;
		}
		)
	};

	// Fetch GET method for paid bookings
	let paidData = await fetchGET('/host/paidBookings', jwt);
	let countPaid = 0;
	if (paidData.length == 0) {
		$("#paid-container").append("<div class='no-data'><p>You don't have any paid booking requests!</p></div>");
	} else {
		paidData.forEach((booking) => {
			let localStartDate = new Date(booking.startTime);
			let localEndDate = new Date(booking.endTime);
			let localStartTime = getLocalStartTime(localStartDate);
			let localEndTime = getLocalEndTime(localEndDate);
			let localDate = getLocalDate(localStartDate);
			// Renders content for paid bookings
			createContent("paid-container", "div", "paid-card" + countPaid, "card-panel col-md-5");
			$('#paid-card' + countPaid).append('<div class="price-card-text-wrapper">'
				+ '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div><div class="price-card-text-sm green-highlight">paid</div></div>');
			createContent("paid-card" + countPaid, "div", "paid-date" + countPaid, "card-text-lg green-highlight");
			createContent("paid-card" + countPaid, "div", "paid-period" + countPaid, "card-text-md");
			$("#paid-period" + countPaid).text(localStartTime + " - " + localEndTime);
			createContent("paid-card" + countPaid, "div", "paid-client" + countPaid, "card-text-sm green-highlight");
			$("#paid-client" + countPaid).text(booking.client);
			createContent("paid-card" + countPaid, "div", "paid-charger-name" + countPaid, "card-text-sm");
			$("#paid-charger-name" + countPaid).text("Charger: " + booking.chargername);
			$("#paid-date" + countPaid).text(localDate);
			createContent("paid-card" + countPaid, "div", "paid-address" + countPaid, "card-text-sm");
			$("#paid-address" + countPaid).text(booking.address);
			createContent("paid-card" + countPaid, "div", "paid-area" + countPaid, "card-text-sm");
			$("#paid-area" + countPaid).text(booking.city + ", " + booking.province);
			countPaid++;
		}
		)
	};
})

// Review tab eventListener
$('#reviews-tab').click(async function (event) {

	// Container box and its headers
	createHeader("tab-content", "h3", "Reviews for You", "col-11 inner-header");
	createSubheader("tab-content", "h6", "These are the comments of hosts that you’ve charged with.", "col-11 inner-subheader");
	createContent("tab-content", "div", "review-container", "col-11 tab-section-data row");

	let countReview = 0;
	$("#review-container").append("<div class='no-data'><p>You don't have any reviews!</p></div>");
})


// Lets the user create a new charger
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

	// Remove old content so we can rebuild with new content
	let prevPage = $('#tab-content').children().detach();
	// Create label and input elements for the new charger form.
	$("#tab-content").html('<h3 class="inner-header col-11">Edit Charger</h3>'
		+ '<h6 class="inner-subheader col-11">Edit your charger!</h6>'
		+ '<div class="col-11 tab-section-data row" id="edit-charger-wrapper"><form id="edit-charger-form"></form></div>');
	$("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargername"></div>');
	$("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargeraddress"></div>');
	$("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargercity"></div>');
	$("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargertype"></div>');
	$("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargerlevel"></div>');
	$("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargerrate"></div>');
	$("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargerdetails"></div>');

	createLabel("edit-chargername", "charger-name", "Name", "lb-charger-name", "form-label readonly-label");
	createInput("edit-chargername", "text", true, "name", "charger-name", "form-input readonly-input", chargers[chargerNumber].chargername);
	createLabel("edit-chargeraddress", "charger-address", "Address", "lb-charger-address", "form-label readonly-label");
	createInput("edit-chargeraddress", "text", true, "address", "charger-address", "form-input readonly-input", chargers[chargerNumber].address);
	createLabel("edit-chargercity", "charger-city", "City", "lb-charger-city", "form-label readonly-label");
	createInput("edit-chargercity", "text", true, "city", "charger-city", "form-input readonly-input", chargers[chargerNumber].city);
	createLabel("edit-chargerprovince", "charger-province", "Province", "lb-charger-province", "form-label readonly-label");
	createInput("edit-chargerprovince", "text", true, "province", "charger-province", "form-input readonly-input", chargers[chargerNumber].province);
	createLabel("edit-chargertype", "charger-type", "Charger Type", "lb-charger-type", "form-label readonly-label");
	createLabel("edit-chargerlevel", "charger-level", "Charger Level", "lb-charger-level", "form-label readonly-label");
	var selectType = '<select disabled id="charger-type" class="form-input readonly-input" name="type" form="edit-charger-form" required><option value="Wall Outlet">Wall Outlet</option><option value="J-1772">J-1772</option><option value="Tesla (Roadster)">Tesla (Roadster)</option><option value="NEMA 14-50">NEMA 14-50</option><option value="Tesla">Tesla</option></select>'
	$("#lb-charger-type").after(selectType);
	$('#charger-type').val(chargers[chargerNumber].type);
	var selectLevel = '<select disabled id="charger-level" class="form-input readonly-input" name="level" form="edit-charger-form" required><option value="1">1</option><option value="2">2</option></select>'
	$("#lb-charger-level").after(selectLevel);
	$('#charger-level').val(chargers[chargerNumber].level);
	createLabel("edit-chargerrate", "charger-rate", "Hourly rate", "lb-charger-rate", "form-label readonly-label");
	createInput("edit-chargerrate", "text", true, "rate", "charger-rate", "form-input readonly-input left-labelled-input-full", chargers[chargerNumber].cost.toFixed(2));
	$("#charger-rate").after("<div class='dollar-symbol'>$</div>");
	createLabel("edit-chargerdetails", "charger-details", "Additional details (optional)", "lb-charger-details", "form-label readonly-label");

	$("#edit-chargerdetails").append("<textarea disabled name='details' placeholder='Max 80 characters'id='charger-details' class='form-input-full readonly-input-full' maxlength='80' rows='6' cols='60'>");
	$("#charger-details").html(chargers[chargerNumber].details);
	// Edit and save buttons
	createButton("edit-charger-form", "edit-btn", "Edit", "orange-button");
	createButton("edit-charger-form", "save-btn", "Save", "orange-button");
	createButton("edit-charger-form", "back-btn", "Cancel", "white-button");
	$("#save-btn").css({ "display": "none" });

	// Append new content
	$("#back-btn").click((e) => {
		e.preventDefault();
		$("#tab-content").children().remove();;
		$("#tab-content").append(prevPage);
	});

	// Event listener for edit button click
	$('#edit-btn').click(function (event) {
		event.preventDefault();
		$('#edit-btn').css({ "display": "none" });
		$('#save-btn').css({ "display": "block" });
		$('.dollar-symbol').css({ "background-color": "white" });;
		$('.readonly-input, .readonly-input-full').removeAttr("disabled");
		$('.readonly-input').removeClass("readonly-input");
		$('.readonly-input-full').removeClass("readonly-input-full");

	});

	// Event listener for save button click
	$('#save-btn').click(function (event) {
		event.preventDefault();
		$('#save-btn').css({ "display": "none" });
		$('#edit-btn').css({ "display": "block" });;
		$('.dollar-symbol').css({ "background-color": "inherit" });;
		$('.form-input, .form-input-full').attr("disabled", true);
		$('.form-input').addClass("readonly-input");
		$('.form-input-full').addClass("readonly-input-full");
		var cname = $("#charger-name").val();
		var caddress = $("#charger-address").val();
		var ccity = $("#charger-city").val();
		//var cprovince = $("#charger-province").val();
		var cprovince = "BC";
		var ctype = $("#charger-type option:selected").text();
		var clevel = parseFloat($("#charger-level option:selected").text());
		var crate = $("#charger-rate").val();
		var cdetails = $("#charger-details").val();
		// Declare data object
		let dataToSent = {
			chargername: cname,
			address: caddress,
			city: ccity,
			type: ctype,
			level: clevel,
			cost: crate,
			details: cdetails
		}

		const paramForServer = {
			cUID: chargers[chargerNumber]._id
		}

		// The Fetch PATCH call to the database
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
					location.reload(true);
				}).catch(error => console.log(error));

			})
			.catch(error => console.error('Error:', error));;
	});
}

// General header if no booking is created
function nothingToDisplay(container, bookingType) {
	nothingDiv = $("<div class='no-data'><p>You don't have any " + bookingType + "!</p></div>");
	$(container).append(nothingDiv);
}

// History tab eventListener
$("#history-tab").click(async function (event) {

	var historyContainer = createContentContainer("historyContainer", "history-heading", "Booking History", "history-subheading", "These are the past bookings that have been made with you.");
	var historyCardContainer = $("<div class='col-11 tab-section-data row'></div>");
	historyContainer.append(historyCardContainer);
	// nothingToDisplay(historyCardContainer, "past bookings");
	let data = await fetchGET('/host/completedBookings', jwt)
	if (data.length == 0) {
		nothingToDisplay(historyCardContainer, "past bookings");
	} else {
		data.forEach(booking => {
			historyCardContainer.append(renderCompletedBooking(booking))
		});
	}

	$("#tab-content").append(historyContainer);
})

// Renders completed bookings
function renderCompletedBooking(booking) {
	let localStartDate = new Date(booking.startTime);
	let localEndDate = new Date(booking.endTime);
	let localStartTime = getLocalStartTime(localStartDate);
	let localEndTime = getLocalEndTime(localEndDate);
	let localDate = getLocalDate(localStartDate);
	let container = $("<div class='card-panel completedBooking col-md'></div>")
	let content = ""
	//right side div
	content += "<div class='price-card-text-wrapper'>"
	content += "<div class='price-card-text-lg'>$" + booking.cost.toFixed(2) + "</div>"
	content += "<div class='price-card-text-sm'>Completed</div></div>"

	//main content
	content += "<div class='card-text-lg'>" + localDate + "</div>"
	content += "<div class='card-text-md'>" + localStartTime + " - " + localEndTime + "</div>"
	content += "<div class='card-text-sm'>" + booking.client + "</div>"
	content += "<div class='card-text-sm'>Charger: " + booking.chargername + "</div>"
	content += "<div class='card-text-sm'>" + booking.address + "</div>"
	content += "<div class='card-text-sm'>" + booking.city + ", " + booking.province + "</div>"

	container.append(content)

	$(container).on("click", function () {
		createPopup();
		createPopupHeader("h3", "Leave a review!", "review-header", "popup-header");
		let reviewDetails = $("<div id='reviewDetails' class='card-panel col-md'></div>")
		reviewDetails.append(content)

		let form = $("<form></form>")

		let rating = $("<div class='form-group'></div>")
		rating.append("<label for='ratingControlRange'><b> Rate your experience: </b></label>")
		rating.append("<input type='range' class='form-control-range' id='formControlRange' min='1'max='5' step='0.5' oninput='formControlRangeDisp.value = formControlRange.value'>")
		rating.append("<output id='formControlRangeDisp'></output>")

		let comments = $("<div class='form-group'></div>")
		comments.append("<label for='ratingControlRange'><b> Comments (optional): </b></label> <br/>")
		comments.append("<textarea id='comments'></textarea>")


		let submit = $("<button type='button' class='orange-button' id='submitBtn'>Submit Review</button>")
		submit.on("click", async (e) => {
			e.preventDefault();
			let review = {};
			review.reviewee = booking.clientID;
			review.details = $("#comments").val();
			review.rating = $("#formControlRange").val()
			review.date = Date.now()
			let data = {};
			data.review = review
			data.type = "USER"
			await fetch('/reviews', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + jwt
				}
			})
				.then(res => console.log(res))
				.then((response) => {
					// console.log('Success: review added to db!', (response))
					// window.location.replace('/host_dashboard');
					$("#popup").children().not("#popup-close-button").remove();
					createPopupHeader("h3", "Review Submitted!", "confirm-popup-header", "popup-header");
					$('body').on("click", (e) => {
						location.reload(true);
					})
				})
				.catch(error => console.error('Error:', error));
		})

		form.append(rating, comments, submit)
		$("#popup").append(reviewDetails, form)
	})

	return (container);
}

// Enables add new charger button if all fields are filled
$('body').on('input', '#charger-name-input, #charger-address-input, #charger-city-input, #charger-type-input, #charger-level-input, #charger-cost-input', (event) => {
	let formFilled = false;
	if ($('#charger-name-input').val() && $('#charger-address-input').val() && $('#charger-city-input').val()
		&& $('#charger-type-input').val() && $('#charger-level-input').val() && $('#charger-cost-input').val()) {
		formFilled = true;
	}
	console.log(formFilled);
	if (formFilled) {
		$('#submit-charger').removeAttr('disabled');
		$('#submit-charger').removeClass('disabled-button');
	} else {
		$('#submit-charger').prop('disabled', true);
		$('#submit-charger').addClass('disabled-button');
	}
});

// Enables save charger details button if all fields are filled
$('body').on('input', '#charger-name, #charger-address, #charger-city, #charger-type, #charger-level, #charger-rate', (event) => {
	let formFilled = false;
	if ($('#charger-name').val() && $('#charger-address').val() && $('#charger-city').val()
		&& $('#charger-type').val() && $('#charger-level').val() && $('#charger-rate').val()) {
		formFilled = true;
	}
	console.log(formFilled);
	if (formFilled) {
		$('#save-btn').removeAttr('disabled');
		$('#save-btn').removeClass('disabled-button');
	} else {
		$('#save-btn').prop('disabled', true);
		$('#save-btn').addClass('disabled-button');
	}
});


// Prevents users from entering non digit values and the characater "-" in the charger rate input fields
$('body').on('keypress', '#charger-rate, #charger-cost-input', (evt) => {
    if (evt.which < 46 || evt.which > 57 || evt.which == 47)
    {
        evt.preventDefault();
	}
});
// Prevents input of more one decimal
$('body').on('keyup', '#charger-rate, #charger-cost-input', (e) => {
	var val = $(e.target).val();
    if(isNaN($(e.target).val())){
		val =  $(e.target).val().replace(/[^0-9\.]/g,'');
         if( $(e.target).val().split('.').length > 2) {
			 val = val.replace(/\.+$/,"");
		 }
	}
	$(e.target).val(val);
});
// Converts to two decimal places if at zero or one decimal places
$('body').on('focusout', '#charger-rate, #charger-cost-input', (e) => {
	if (!isNaN(parseFloat($(e.target).val()).toFixed(2))){
		$(e.target).val(parseFloat($(e.target).val()).toFixed(2));
	} else {
		$(e.target).val("0.00");
	}
});
// POSTS new charger data to database upon button click
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

	// The Fetch call
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

