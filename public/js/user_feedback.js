// Sets name to be header
const setName = async() => {
	const response = await fetch('/users/me', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	})
	const res = await response.json();
	$("#user-name").text(res.name.split(" ")[0] + "'s");
}


// Immediately fetches reviews (feedback).
(async function () {
    setName();
    const response = await fetch('/client/Reviews', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const reviews = await response.json();
    if (!$.isEmptyObject(reviews)) { $('#feedback-container').children().remove(); }
    addReviewsToPage(reviews);
})();

// Adds all reviews (feedback) to page.
const addReviewsToPage = (reviews) => {
    reviews.forEach((review, index) => {
        displayBookingCard(review, index);
    });
}

// Displays the specified review (feedback) on the page.
const displayBookingCard = (review, index) => {
    let localStartDate = new Date(review.date);
	let localTime = getLocalStartTime(localStartDate);
	let localDate = getLocalDate(localStartDate);

    $('#feedback-container').append("<div class='card-panel col-md-10' id='reviewsData'>"
    + "<div class='price-card-text-wrapper price-card-text-lg'>" + review.rating + " " + '<i class="review-star fa fa-star"></i>' + "</div>"
    + "<div class='card-text-lg orange-highlight'>" + review.reviewer + "</div>"
    + "<div class='card-text-md'>" + localDate + " " + localTime + "</div>"
    + "<div class='card-text-sm'>" + review.details + "</div>"
    + "</div>");
}