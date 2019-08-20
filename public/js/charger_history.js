// Immediately fetches history.
(async function () {
    const response = await fetch('/host/completedBookings', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const bookings = await response.json();
    if (!$.isEmptyObject(bookings)) { $('#charger-history').children().remove(); }
    addBookingsToPage(bookings);
})();

// Adds all completed bookings (history) to page.
const addBookingsToPage = (bookings) => {
    bookings.forEach((booking) => {
        displayBookingCard(booking);
    });
}

// Renders completed bookings
const displayBookingCard = (booking) => {
	let localStartDate = new Date(booking.startTime);
	let localEndDate = new Date(booking.endTime);
	let localStartTime = getLocalStartTime(localStartDate);
	let localEndTime = getLocalEndTime(localEndDate);
	let localDate = getLocalDate(localStartDate);

	let container = $("<div class='card-panel col-md'></div>")
	let content = ""
	//right side div
	content += "<div class='price-card-text-wrapper'>"
	content += "<div class='price-card-text-lg'>$" + booking.cost.toFixed(2) + "</div>"
	content += "<div class='price-card-text-sm'>completed</div></div>"

	//main content
	content += "<div class='card-text-lg'>" + localDate + "</div>"
	content += "<div class='card-text-md'>" + localStartTime + " - " + localEndTime + "</div>"
	content += "<div class='card-text-sm'>" + booking.client + "</div>"
	content += "<div class='card-text-sm'>Charger: " + booking.chargername + "</div>"
	content += "<div class='card-text-sm'>" + booking.address + "</div>"
	content += "<div class='card-text-sm'>" + booking.city + ", " + booking.province + "</div>"

	container.append(content)
	leaveHistoryFeedback(booking, container, content);
	$("#charger-history").append(container);
}

// Allows user to leave feedback if haven't been left previously.
const leaveHistoryFeedback = (booking, container, content) => {
	if (booking.reviewStatus == null) {
		$(container).addClass("completedBooking");
		$(container).on("click", function () {
			createPopup();
			createPopupHeader("h3", "Leave a review!", "review-header", "popup-header");
			let reviewDetails = $("<div id='reviewDetails' class='card-panel col-md'></div>");
			reviewDetails.append(content);
			let form = $("<form></form>");
			let rating = $("<div class='form-group'></div>");
			rating.append("<label for='ratingControlRange'><b> Rate your experience: </b></label>");
			rating.append("<input type='range' class='form-control-range' id='formControlRange' min='1'max='5' step='0.5' oninput='formControlRangeDisp.value = formControlRange.value'>");
			rating.append("<output id='formControlRangeDisp'></output>");
			let comments = $("<div class='form-group'></div>");
			comments.append("<label for='ratingControlRange'><b> Comments (optional): </b></label> <br/>");
			comments.append("<textarea id='comments'></textarea>");
			let submit = $("<button type='button' class='orange-button' id='submitBtn'>Submit Review</button>");
			submit.on("click", async (e) => {
				e.preventDefault();
				let review = {};
				review.reviewee = booking.clientID;
				review.details = $("#comments").val();
				review.rating = $("#formControlRange").val();
				review.date = Date.now();
				let data = {};
				data.review = review;
				data.type = "USER";
				data.booking = booking.bookingID;
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
						$("#popup").children().not("#popup-close-button").remove();
						createPopupHeader("h3", "Review Submitted!", "confirm-popup-header", "popup-header");
						$('body').on("click", (e) => {
							location.reload(true);
						});
					})
					.catch(error => console.error('Error:', error));
			});
			form.append(rating, comments, submit);
			$("#popup").append(reviewDetails, form);
		});
	}
	else {
		$(container).addClass("green-card");
	}
}