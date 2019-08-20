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

// Immediately fetches paid and pending bookings.
(async function () {
    setName();
    const responseUnpaid = await fetch('/client/pendingBookings', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const pendingBookings = await responseUnpaid.json();

    const responsePaid = await fetch('/client/paidBookings', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const paidBookings = await responsePaid.json();
    
    if (!$.isEmptyObject(pendingBookings)) { $('#pending-container').children().remove(); }
    if (!$.isEmptyObject(paidBookings)) { $('#paid-container').children().remove(); }
    addBookingsToPage(pendingBookings, 'pending');
    addBookingsToPage(paidBookings, 'paid');
})();

// Adds all bookings to page.
const addBookingsToPage = (bookings, type) => {
    bookings.forEach((booking, index) => {
        displayBookingCard(booking, index, type);
    });
}

// Displays the specified bookings on the page.
const displayBookingCard = (booking, index, type) => {
    let localStartDate = new Date(booking.startTime);
    let localEndDate = new Date(booking.endTime);
    let localStartTime = getLocalStartTime(localStartDate);
    let localEndTime = getLocalEndTime(localEndDate);
    let localDate = getLocalDate(localStartDate);
    let colorHighlight = type == 'paid' ? 'green-highlight' : 'orange-yellow-highlight';

    $('#' + type + '-container').append('<div class="card-panel col-md-5">'
    + '<div class="price-card-text-wrapper">'
        + '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div>'
        + '<div class="price-card-text-sm ' + colorHighlight + '">' + type + '</div>'
    + '</div>'
    + '<div class="card-text-lg ' + colorHighlight + '">' + localDate +'</div>'
    + '<div class="card-text-md"> ' + localStartTime + '-' + localEndTime+ ' </div>'
    + '<div class="card-text-sm">' + (type == 'paid' ? 'Charger: ' + booking.chargername : booking.address) +'</div>'
    + '<div class="card-text-sm">' + booking.city + ', ' + booking.province + ' </div></div>');
}
