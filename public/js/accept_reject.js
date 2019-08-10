// This script creates accept/reject buttons for the bookings popup
// and makes fetch calls.

// Create the booking object
var bookingObj;

// Add event listeners
function addEventListenerOnAccept(element, booking, jwt) {
    element.click(event => {
        bookingObj = booking;
        confirmationPopup("accept", booking);
    })
}

function addEventListenerOnReject(element, booking, jwt) {
    element.click(event => {
        bookingObj = booking;
        confirmationPopup("decline", booking);
    })
}

// Creates a popup containing the booking
function confirmationPopup(value, charger) {
    createPopup();
    createPopupHeader("h5", "Are you sure you want to " + value + " the request for<br><b id='confirm-charger-name'>" + charger.chargername + "</b>"
        + " on <b id='confirm-charger-date'>" + charger.startTime.split("T")[0] + "</b>"
        + "<br>at <b id='confirm-charger-stime'>" + getLocalStartTime(new Date(charger.startTime)) + "-</b>"
        + "<b>" + getLocalEndTime(new Date(charger.endTime)) + "</b>" + "?", "confirm-popup-subheader", "popup-subheader");
    createPopupConfirmButton(value + "-btn", value.charAt(0).toUpperCase() + value.substring(1));
    if (value == "accept")
        $("#accept-btn").removeClass('orange-button').addClass('green-button');
    else if (value == "decline") {
        $("#decline-btn").removeClass('orange-button').addClass('red-button');
    }
    createPopupCancelButton("popup-cancel", "Cancel");
}

// The Fetch call if user accepts the request
$('body').on("click", "#accept-btn", (e) => {
    // Set all required info to make a request
    var url = '/booking/acceptBooking';
    const dataToSend = {
        bUID: bookingObj.bookingID
    }
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then(res => {
        if (res.status == 200)
            successful = true;
    })
        .then((response) => {
            $("#popup").children().not("#popup-close-button").remove();
            if (successful) {
                createPopupHeader("h5", "This booking has been accepted.", "confirm-popup-header", "popup-subheader");
                $('body').on("click", (e) => {
                    location.reload(true);
                })

            } else {
                //if we recieve status for 404/400/500 
                createPopupHeader("h5", "Sorry, the action was not successfully done. Please contact us at zapshareplatform@gmail.com"
                    , "confirm-popup-header", "popup-subheader");
                location.replace("/contact");
            }

        })
        .catch(error => console.error(error));
});

// The Fetch call if user declined the request
$('body').on("click", "#decline-btn", (e) => {

    // Set all required info to make a request
    const dataToSend = {
        bUID: bookingObj.bookingID
    }
    fetch('booking/declineBooking', {
        method: 'DELETE',
        body: JSON.stringify(dataToSend),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then(res => {}).then((data) => {
        $("#popup").children().not("#popup-close-button").remove();
        createPopupHeader("h3", "This booking has been declined.", "confirm-popup-header", "popup-subheader");
        $('body').on("click", (e) => {
            location.reload(true);
        })
    }).catch(error => console.error(error));
});