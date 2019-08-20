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

// Immediately fetches bookings that require payment.
(async function () {
	setName();
    const response = await fetch('/client/unpaidBookings', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const unpaidBookings = await response.json();
    
	if (!$.isEmptyObject(unpaidBookings)) { $('#user-payment').children().remove(); }
		else { $('#user-payment').children()[0].innerHTML = "<p>You don't have any unpaid bookings!</p>"  }
    addBookingsToPage(unpaidBookings);
})();

// Adds all bookings to page.
const addBookingsToPage = (bookings) => {
    bookings.forEach((booking, index) => {
        displayBookingCard(booking, index);
        addPaymentFunctionality(booking, index);
    });
}

// Displays the specified bookings on the page.
const displayBookingCard = (booking, index) => {
    let localStartDate = new Date(booking.startTime);
    let localEndDate = new Date(booking.endTime);
    let localStartTime = getLocalStartTime(localStartDate);
    let localEndTime = getLocalEndTime(localEndDate);
    let localDate = getLocalDate(localStartDate);
    let colorHighlight = 'orange-highlight';

    $('#user-payment').append('<div class="card-panel col-md">'
    + '<div class="price-card-text-wrapper">'
        + '<div class="price-card-text-lg">$' + booking.cost.toFixed(2) + '</div>'
        + '<div class="price-card-text-sm ' + colorHighlight + '">unpaid</div>'
    + '</div>'
    + '<div class="card-text-lg ' + colorHighlight + '">' + localDate +'</div>'
    + '<div class="card-text-md"> ' + localStartTime + ' - ' + localEndTime+ ' </div>'
    + '<div class="card-text-sm">Charger: ' + booking.chargername +'</div>'
    + '<div class="card-text-sm">' + booking.city + ', ' + booking.province + ' </div>'
    + '<button id="pay-booking-' + index + '" class="pay-now-btn orange-button">Pay Now</button>');
}

// Adds functionality to payment button.
const addPaymentFunctionality = (booking, index) => {
    (function (index) {
        $('#pay-booking-' + index).on('click', () => {
            createConfirmationPopupPay(booking);
            addConfirmationFunctionality(booking);
        });
    })(index);
}

// Creates popup for payment
const createConfirmationPopupPay = (booking) => {
    let localStartDate = new Date(booking.startTime);
    let localEndDate = new Date(booking.endTime);
    let localStartTime = getLocalStartTime(localStartDate);
    let localEndTime = getLocalEndTime(localEndDate);
    let localDate = getLocalDate(localStartDate);

	createPopup();
	createPopupHeader("h5", "Do you wish to pay for the booking at <br><b id='confirm-charger-address'>"
		+ booking.address + " " + booking.city + ", " + booking.province + "</b><br>"
		+ " on <b id='confirm-charger-date'>" + localDate + "</b>"
		+ "<br>at <b id='confirm-charger-stime'>" + localStartTime + " - "
		+ localEndTime + "</b>?", "confirm-popup-subheader", "popup-subheader");
	createPopupConfirmButton("pay-now-btn", "Pay Now");
    createPopupCancelButton("popup-cancel", "Cancel");
}

// Functionality to confirm payment.
const addConfirmationFunctionality = (booking) => {    
	$("body").off('click', "#pay-now-btn");
	$("body").on('click', "#pay-now-btn", async () => {
		try {
			// Subtracts user balance. If insufficient funds, display message
			await fetch('/users/pay', {
				method: 'PATCH',
				body: JSON.stringify({ cost: booking.cost, bookingID: booking.bookingID }),
				headers: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + jwt
				}
			}).then(res => res.json())
				.then(async (response) => {
					if (response.error) {
						$("#popup").children().not("#popup-close-button").remove();
						createPopupHeader('h5', "Not enough funds! Please reload your balance before proceeding.", "insufficient-funds");
						createPopupCancelButton("popup-cancel", "Close");
					} else {
						// Fetch POST method for an unpaid to paid booking
						await fetch('/booking/payBooking', {
							method: 'POST',
							body: JSON.stringify({ bUID: booking.bookingID }),
							headers: {
								'content-type': 'application/json',
								'Authorization': 'Bearer ' + jwt
							}
						})
						// Informs user of success.
						$("#popup").children().not("#popup-close-button").remove();
						createPopupHeader("h3", "Payment successful!", "confirm-popup-header", "popup-header");
						$('body').on("click", (e) => {
							location.reload(true);
						})
					}
				})
		} catch (error) {
			console.log(error);
		}
	});
}