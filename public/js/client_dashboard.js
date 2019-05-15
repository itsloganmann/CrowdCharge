console.log("js file loaded successfullly");

function grabDate(time) {
	let result = "";

	let count = 0;
	let c = "";
	while (c != "T") {
		result += c;
		c = time[count++];
	}
	return result;
};
function grabTime(time) {
	let result = "";
	let c = "";
	let count = 0;
	while (c != "T") {
		c = time[count];
		count++;
	}
	for (i = count; i < time.length; i++) {
		result += time[i];
	}
	return result;
};
function fetchBooking(url, status) {
	let data = {};
	let contentString = "";
	fetch(url)
		.then((res) => {
			return res.json()
		})
		.then((db) => {
			data = JSON.parse(JSON.stringify(db))
		});
	//////////////////////////////////////temp data
	data = {
		startTime: "2019-01-01T00:00:00",
		endTime: "2019-01-01T23:00:00",
		cost: "$15.00",
		address: "12345 MyHome St.",
		city: "Vancouver, BC"
	}
	/////////////////////////////////////To BE REMOVE
	if (status == "pending") {
		contentString = "<div class= 'col-10 well'>"
			+ "<div class='right'><p class='cost'>" + data.cost + "</p></div>"
			+ "<p class='date'>" + grabDate(data.startTime) + "</p>"
			+ "<p class='time'>" + grabTime(data.startTime) + "-" + grabTime(data.endTime) + "</p>"
			+ "<p class='city'>" + data.city + "</p>"
			+ "</div>";
	}
	else {
		contentString = "<div class= 'col-10 well'>"
		+ "<div class='right'><p class='cost'>" + data.cost + "</p>";
		if (status == "paid") {
			contentString += "<p class='green'>" + status + "</p></div>";
		}
		else if (status == "unpaid") {
			contentString += "<p class='red'>" + status + "</p></div>";
		}
		contentString += "<p class='date'>" + grabDate(data.startTime) + "</p>"
			+ "<p class='time'>" + grabTime(data.startTime) + "-" + grabTime(data.endTime) + "</p>"
			+ "<p class='address'>" + data.address + "</p>"
			+ "<p class='city'>" + data.city + "</p>"
			+ "</div>";
	}
	return contentString;
};

//tab's eventListener
$("#bookings").click(function (event) {
	$("#bookings").css({ "color": "#F05A29" });
	$("#payment").css({ "color": "black" });
	$("#reviews").css({ "color": "black" });
	$("#subContent").html("");

	/*
	CONFIRMED BOOKING
	*/
	var confirmContainer = $("<div class='col-12'></div>");
	var bookingHeading1 = $("<h3 class='col-10 content-margin h1-font-size' id='bookingHeading1'><b>Confirmed Bookings</b></h3>");
	var bookingSubHeading1 = $("<h6 class='col-10 content-margin h2-font-size' id='bookingSubHeading1'> "
		+ "These bookings have been confirmed by the host and are ready to go!</h6>");

	//URL param 
	const confirmedBookingReq = {
		user_id: "",
		booking_type: "paid"
	}
	const confirmedBookingURL = "/bookings?" + $.param(confirmedBookingReq);
	let cBData = fetchBooking(confirmedBookingURL, "paid");
	var confirmedBookingData = $(cBData);

	/*
	PENDING BOOKING
	*/
	var pendingContainer = $("<div class='col-12'></div>");
	var bookingHeading2 = $("<h3 class='col-10  content-margin h1-font-size' id= 'bookingHeading2'><b>Pending Bookings</b></h3>");
	var bookingSubHeading2 = $("<h6 class='col-10 content-margin h2-font-size' id='bookingSubHeading2'>"
		+ "These bookings have not been confirmed by the host yet, we’ll notify you when they do!</h6>");
	//URL param
	const pendingBookingReq = {
		user_id: "",
		booking_type: "pending"
	}
	const pendingBookingURL = "/bookings?" + $.param(pendingBookingReq);
	var pbData = fetchBooking(pendingBookingURL, "pending");
	var pendingBookingData = $(pbData);

	//appending
	confirmContainer.append(bookingHeading1);
	confirmContainer.append(bookingSubHeading1);
	confirmContainer.append(confirmedBookingData);
	pendingContainer.append(bookingHeading2);
	pendingContainer.append(bookingSubHeading2);
	pendingContainer.append(pendingBookingData);

	$("#subContent").append(confirmContainer);
	$("#subContent").append(pendingContainer);

});
//payment tab click; build elements for payment details
$("#payment").click(function (event) {
	$("#bookings").css({ "color": "black" });
	$("#payment").css({ "color": "#F05A29" });
	$("#reviews").css({ "color": "black" });

	$("#subContent").html("");

	//container hold all payment details for user
	var paymentContainer = $("<div class='col-12'></div>");
	var paymentHeading1 = $("<h3 class='col-10 content-margin h1-font-size' id='paymentHeading1'><b>Payment</b></h3>");
	var paymentSubHeading1 = $("<h6 class='col-10 content-margin h2-font-size' id='paymentSubHeading1'>" +
		"These bookings are unpaid for. Pay before the booking date!</h6>");

	const unpaidBookingReq = {
		user_id: "",
		booking_type: "unpaid"
	}
	const unpaidBookingURL = "/bookings?" + $.param(unpaidBookingReq);
	const ubData = fetchBooking(unpaidBookingURL, "unpaid");
	var paymentData = $(ubData);
	//appending
	paymentContainer.append(paymentHeading1);
	paymentContainer.append(paymentSubHeading1);
	paymentContainer.append(paymentData);

	$("#subContent").append(paymentContainer);

});

//reviews tab click; build elements for reviews details
$("#reviews").click(function (event) {
	$("#bookings").css({ "color": "black" });
	$("#payment").css({ "color": "black" });
	$("#reviews").css({ "color": "#F05A29" });

	$("#subContent").html("");

	//container hold all review details for user
	var reviewContainer = $("<div class='col-12'></div>");
	var reviewHeading1 = $("<h3 class='col-10 content-margin h1-font-size' id='reviewHeading1'><b>Reviews for You</b></h3>");
	var reviewSubHeading1 = $("<h6 class='col-10 content-margin h2-font-size' id='reviewSubHeading1'>" +
		"These are the comments of hosts that you’ve charged with.</h6>");
	var reviewsData;
	const reviewReq = {
		user_id: "",
	}
	const reviewURL = "/bookings?" + $.param(reviewReq);
	fetch(reviewURL)
		.then((res) => {
			return res.json();
		})
		.then((db) => {
			let data = JSON.parse(JSON.stringify(db));
			reviewsData = $("<div class='col-10 well' id='reviewsData'>"
				+ "<p id='rv-reviewer'>" + data.user + "</p>"
				+ "<p id='rv-rating'>" + data.rating + "</p>"
				+ "<p id='rv-comment'>" + data.comment + "</p>"
				+ "</div>");
		});

	//appending
	reviewContainer.append(reviewHeading1);
	reviewContainer.append(reviewSubHeading1);
	reviewContainer.append(reviewsData);

	$("#subContent").append(reviewContainer);

});
