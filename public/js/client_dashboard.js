console.log("js file loaded successfullly");
const jwt = localStorage.getItem('jwt');

// Changes tab colours and clears tab contents
// Clearing done when switching tabs to allow for new data population
$('.tab-button').on('click', (e) => {
	$(".tab-button:not(#" + event.target.id + ")").css({ "color": "black" });
	$("#" + event.target.id).css({ "color": "#F05A29" });
	$("#tab-content").children().remove();
});


//tab's eventListener
$("#bookings-tab").click(function (event) {

	/*
	CONFIRMED BOOKING
	*/
	var confirmContainer = createContentContainer("confirmed-content", "client-confirmed-header", "Confirmed Bookings", "client-confirmed-subheader",
		"These bookings have been confirmed by the host and are ready to go!");

	///////////////////TO BE REMOVE AFTER CLIENT/XXXXBOOKING IS PULL
	const confirmedBookingReq = {
		user_id: "",
		booking_type: "paid"
	}
	const confirmedBookingURL = "/bookings?" + $.param(confirmedBookingReq);
	///////////////////TO BE REMOVE AFTER CLIENT/XXXXBOOKING IS PULL

	//const confirmedBookingURL = "/client/paidBookings";
	let cBData = fetchBooking(confirmedBookingURL, "paid");
	var confirmedBookingData = $(cBData);

	/*
	PENDING BOOKING
	*/
	var pendingContainer = createContentContainer("pending-content", "bookingHeading2", "Pending Bookings", "bookingSubHeading2"
		, "These bookings have not been confirmed by the host yet, we’ll notify you when they do!")



	///////////////////TO BE REMOVE AFTER CLIENT/XXXXBOOKING IS PULL
	//URL param
	const pendingBookingReq = {
		user_id: "",
		booking_type: "pending"
	}
	const pendingBookingURL = "/bookings?" + $.param(pendingBookingReq);
	///////////////////TO BE REMOVE AFTER CLIENT/XXXXBOOKING IS PULL


	//const pendingBookingURL = "/client/pendingBookings"
	var pbData = fetchBooking(pendingBookingURL, "pending");
	var pendingBookingData = $(pbData);

	//appending
	confirmContainer.append(confirmedBookingData);
	pendingContainer.append(pendingBookingData);

	$("#tab-content").append(confirmContainer);
	$("#tab-content").append(pendingContainer);

	var request = new Request('/client/bookings', {
		method: 'POST',
		body: {"uUID" : "hello", "bookingType" : "PENDING"}
	});

	fetch(request)
    .then((res)=> {return res.json()})
    .then((db) => {
		// console.log(db);
        // const data = JSON.stringify(db);
        // let confirmedBookingData = $("<div class= 'col-10 well' id='confirmedBookingData>"
        // +"<p id='cb-date'>" + data.date + "</p>"
        // +"<p id='cb-cost'>" + data.cost + "</p>"
        // +"<p id='cb-time'>" + data.startTime + "-" + data.endTime + "</p>"
        // +"<p id='cb-address'>" + data.address + "</p>"
        // +"<p id='cb-city'>" + data.city + "</p>"
		// +"</div>");
		// confirmContainer.append(confirmedBookingData);
		console.log("returned");
    });

});

//payment tab click; build elements for payment details
$("#payments-tab").click(function (event) {
	//container hold all payment details for user
	var paymentContainer = createContentContainer("payment-content", "paymentHeading1", "Payment", "paymentSubHeading1"
		, "These bookings are unpaid for. Pay before the booking date!");

	///////////////////TO BE REMOVE AFTER CLIENT/XXXXBOOKING IS PULL
	//fetch request
	const unpaidBookingReq = {
		user_id: "",
		booking_type: "unpaid"
	}
	const unpaidBookingURL = "/bookings?" + $.param(unpaidBookingReq);
	///////////////////TO BE REMOVE AFTER CLIENT/XXXXBOOKING IS PULL

	//const unpaidBookingURL = "/client/pendingBookings"
	const ubData = fetchBooking(unpaidBookingURL, "unpaid");
	var paymentData = $(ubData);

	//appending
	paymentContainer.append(paymentData);

	$("#tab-content").append(paymentContainer);

});

//reviews tab click; build elements for reviews details
$("#reviews-tab").click(function (event) {

	//container hold all review details for user
	var reviewContainer = createContentContainer("review-content", "reviewHeading1", "Reviews for You", "reviewSubHeading1"
		, "These are the comments of hosts that you’ve charged with.");
	//fetch request
	var reviewsData;
	fetch("/bookings", {
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
			let data = JSON.parse(JSON.stringify(db));
			reviewsData = $("<div class='col-11 tab-section-data row' id='reviewsData'>"
				+ "<p id='rv-reviewer'>" + data.user + "</p>"
				+ "<p id='rv-rating'>" + data.rating + "</p>"
				+ "<p id='rv-comment'>" + data.comment + "</p>"
				+ "</div>");
		})
		.catch(error => console.error('Error:', error));


	//appending
	reviewContainer.append(reviewsData);

	$("#tab-content").append(reviewContainer);

});

$("#history-tab").click(function (event) {

	var historyContainer = createContentContainer("historyContainer", "Booking History", "historysubHeading", "These are your past bookings");

	///////////////////TO BE REMOVE AFTER CLIENT/XXXXBOOKING IS PULL
	//URL param
	const completeBooking = {
		user_id: "",
		booking_type: "complete"
	}
	const completeBookingURL = "/bookings?" + $.param(completeBooking);
	///////////////////TO BE REMOVE AFTER CLIENT/XXXXBOOKING IS PULL

	// let hData = fetchBooking("/client/completeBookings", "complete");
	let hData = fetchBooking(completeBookingURL, "complete");
	console.log("Sent?");
	let historyData = $(hData);

	$(historyContainer).append(historyData);
	$("#tab-content").append(historyContainer);
	
})

