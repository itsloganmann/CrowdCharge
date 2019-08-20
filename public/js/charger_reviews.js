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
    if (!$.isEmptyObject(reviews)) { $('#review-container').children().remove(); }
    addReviewsToPage(reviews);
})();

// Adds all reviews to page.
const addReviewsToPage = (reviews) => {
    reviews.forEach((review, index) => {
        displayReviewCard(review, index);
    });
}

// Displays the specified review on the page.
const displayReviewCard = (review, index) => {
    let localStartDate = new Date(review.date);
	let localTime = getLocalStartTime(localStartDate);
	let localDate = getLocalDate(localStartDate);

    $('#review-container').append("<div class='card-panel col-md-10' id='reviewsData'>"
    + "<div class='price-card-text-wrapper price-card-text-lg'>" + review.rating + " " + '<i class="review-star fa fa-star"></i>' + "</div>"
    + "<div class='card-text-lg orange-highlight'>" + review.reviewer + "</div>"
    + "<div class='card-text-md'>" + localDate + " " + localTime + "</div>"
    + "<div class='card-text-sm'>" + review.details + "</div>"
    + "</div>");
}