// Immediately fetches paid and unpaid bookings.
(async function () {
    const responseUnpaid = await fetch('/host/unpaidBookings', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const unpaidBookings = await responseUnpaid.json();

    const responsePaid = await fetch('/host/paidBookings', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const paidBookings = await responsePaid.json();
    
    if (!$.isEmptyObject(unpaidBookings)) { $('#charger-unpaid').children().remove(); } 
        else { $('#charger-unpaid').children()[0].innerHTML = "<p>You don't have any unpaid booking requests!</p>"  }
    if (!$.isEmptyObject(paidBookings)) { $('#charger-paid').children().remove(); }
        else { $('#charger-paid').children()[0].innerHTML = "<p>You don't have any paid booking requests!</p>" }
    addBookingsToPage(unpaidBookings, 'unpaid');
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
    let colorHighlight = type == 'paid' ? 'green-highlight' : 'orange-highlight';

    $('#charger-' + type).append('<div class="card-panel col-md">'
    + '<div class="price-card-text-wrapper">'
        + '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div>'
        + '<div class="price-card-text-sm ' + colorHighlight + '">' + type + '</div>'
    + '</div>'
    + '<div class="card-text-lg ' + colorHighlight + '">' + localDate +'</div>'
    + '<div class="card-text-md"> ' + localStartTime + ' - ' + localEndTime+ ' </div>'
    + '<div class="card-text-sm ' + colorHighlight + '">' + booking.client + '</div>'
    + '<div class="card-text-sm">Charger: ' + booking.chargername +'</div>'
    + '<div class="card-text-sm">' + booking.address + '</div>'
    + '<div class="card-text-sm">' + booking.city + ', ' + booking.province + ' </div>');
}
