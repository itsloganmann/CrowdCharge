// Immediately fetches reviews.
(async function () {
    const response = await fetch('/host/allChargerReviews', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const reviews = await response.json();
    if (!$.isEmptyObject(reviews)) { $('#charger-review').children().remove(); }
        else { $('#charger-review').children()[0].innerHTML = "<p>You don't have any reviews for your chargers!</p>"  }
    addBookingsToPage(reviews);
})();

// Adds all reviews to page.
const addBookingsToPage = (reviews) => {
    reviews.forEach((review, index) => {
        displayBookingCard(review, index);
    });
}

// Displays the specified review on the page.
const displayBookingCard = (review, index) => {
    let localStartDate = new Date(review.date);
	let localTime = getLocalStartTime(localStartDate);
	let localDate = getLocalDate(localStartDate);

    $('#charger-review').append("<div class='card-panel col-md'>"
    + "<div class='price-card-text-wrapper price-card-text-lg'>" + review.rating + " " + '<i class="review-star fa fa-star"></i>' + "</div>"
    + "<div class='card-text-lg orange-highlight'>" + review.reviewer + "</div>"
    + "<div class='card-text-md'>" + localDate + " " + localTime + "</div>"
    + "<div class='card-text-sm'>" + review.details + "</div>"
    + "</div>");
}