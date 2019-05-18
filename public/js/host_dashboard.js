
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



$('#chargers-tab').click(function (event) {
	//create new content
	var header = $("<p class='boxHeader'>Here are your chargers! Select them to edit details and availability.</p>");
	var chargerContainer = $("<div id='chargerContainer'></div>")
	var newCharger = $("<button id='newCharger' class='chargerButton'>+</button>");

	//populating all chargers owned from database
	var yourCharger = [];
	for (i = 0; i < chargers.length; i++) {
		var chargerString = "<button onclick='chargerInfo(" + i + ")' class='chargerButton' id='charger" +
			i + "'>" + chargers[i].chargername + "</br>" + chargers[i].address + "</br>" + "</button>";
		yourCharger[i] = $(chargerString);
	}
	$('#tab-content').append(chargerContainer);
	$('#chargerContainer').append(newCharger);
	for (i = 0; i < chargers.length; i++) {
		$('#chargerContainer').append(yourCharger[i]);
	}
	$("#newCharger").attr("onclick", "window.location.href='./add_new_charger'");

});


//to be move to other js file
function getTime(timeObject) {
	return timeObject.split("T")[1].split("Z")[0];
}

//to be move to mother js file if needed
$('#bookings-tab').click(function (event) {

	createContent("tab-content", "div", "request-container", "col-11 tab-section-data row");
	createHeader("request-container", "h3", "Requests", "col-11 inner-header");
	createSubheader("request-container", "h6", "These are user requests to use your charger. "
		+ "Please reject or accept them by the date of the booking.", "col-11 inner-subheader");

	createContent("tab-content", "div", "unpaid-container", "col-11 tab-section-data row");
	createHeader("unpaid-container", "h3", "Unpaid bookings", "col-11 inner-header");
	createSubheader("unpaid-container", "h6", "You accepted these requests. "
		+ "We are just waiting for the client to make a payment.", "col-11 inner-subheader");

	createContent("tab-content", "div", "paid-container", "col-11 tab-section-data row");
	createHeader("paid-container", "h3", "Paid bookings", "col-11 inner-header");
	createSubheader("paid-container", "h6", "These booking are successfully added to your schedule. "
		+ "Please make sure the client can now use your charger.", "col-11 inner-subheader");
	createButton("tab-content", "history-btn", "BOOKING HISTORY");

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
		addEventListenerOnAccept($("#accept" + countPending), booking.bookingID, jwt);
		addEventListenerOnReject($("#reject" + countPending), booking.bookingID, jwt);

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
	createContent("tab-content", "div", "review-container", "col-11 tab-section-data row");
	createHeader("review-container", "h3", "Reviews for You", "col-11 inner-header");
	createSubheader("review-container", "h6", "These are the comments of hosts that you’ve charged with."
		, "col-11 inner-subheader");

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
			})
			.catch(error => console.error('Error:', error));;
	});
}

