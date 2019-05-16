console.log("js file loaded successfullly");
const jwt = JSON.parse(localStorage.getItem('jwt'));

//tab's eventListener
$("#bookings").click(function (event) {
	$("#bookings").css({ "color": "#F05A29" });
	$("#payment").css({ "color": "black" });
	$("#reviews").css({ "color": "black" });
	$("#history").css({ "color": "black" });
	$("#subContent").html("");

	/*
	CONFIRMED BOOKING
	*/
	var confirmContainer = createContentContainer("bookingHeading1", "Confirmed Bookings", "bookingSubHeading1",
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
	var pendingContainer = createContentContainer("bookingHeading2", "Pending Bookings", "bookingSubHeading2"
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

});

//payment tab click; build elements for payment details
$("#payment").click(function (event) {
	$("#bookings").css({ "color": "black" });
	$("#payment").css({ "color": "#F05A29" });
	$("#reviews").css({ "color": "black" });
	$("#history").css({ "color": "black" });


	//container hold all payment details for user
	var paymentContainer = createContentContainer("paymentHeading1", "Payment", "paymentSubHeading1"
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
$("#reviews").click(function (event) {
	$("#bookings").css({ "color": "black" });
	$("#payment").css({ "color": "black" });
	$("#reviews").css({ "color": "#F05A29" });
	$("#history").css({ "color": "black" });

	$("#tab-content").html("");

	//container hold all review details for user
	var reviewContainer = createContentContainer("reviewHeading1", "Reviews for You", "reviewSubHeading1"
		, "These are the comments of hosts that you’ve charged with.");
	//fetch request
	var reviewsData;
	fetch("/client/reviews", {
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
			reviewsData = $("<div class='col-10 well' id='reviewsData'>"
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

$("#history").click(function (event) {
	$("#bookings").css({ "color": "black" });
	$("#payment").css({ "color": "black" });
	$("#reviews").css({ "color": "black" });
	$("#history").css({ "color": "#F05A29" });

	$("#subContent").html("");

	var historyContainer = createContentContainer("historyContainer", "Booking History", "historysubHeading", "These are your past bookings");

	$("#subContent").append(historyContainer);
})