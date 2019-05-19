console.log("file loaded success");
var bookingObj;
var successful = false;
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

function confirmationPopup(value, charger) {
    createPopup();
    createPopupSubheader("h5", "Do you wish to confirm the request for</br><b id='confirm-charger-name'>" + charger.chargername + "</b>"
        + " on <b id='confirm-charger-date'>" + charger.startTime.split("T")[0] + "</b>"
        + "</br>at <b id='confirm-charger-stime'>" + getTime(charger.startTime) + "-</b>"
        + "<b>" + getTime(charger.endTime) + "</b>", "confirm-popup-subheader");
    createPopupConfirmButton(value + "-btn", value);
    createPopupCancelButton("popup-cancel", "Back");


}
//fetch call if user confirmed to accept the request
$('body').on("click", "#accept-btn", (e) => {
    //setting all require info to make a request
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
        console.log(res)
        if (res.status == 200)
            successful = true;
    })
        .then((response) => {
            //to be remove
            successful = true;
            //////////////////
            if (successful) {
                $("#popup").children().remove();
                createPopupSubheader("h5", "You've accepted the booking!", "confirm-popup-header");
                $(document).on("click", (e) => {
                    location.reload(true);
                })

            } else {
                //if we recieve status for 404/400/500 

            }

        })
        .catch(error => console.error(error));
});

//fetch call if user confirmed to decline the request
$(document).on("click", "#decline-btn", (e) => {

    //setting all require info to make a request
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
    }).then(res => {
        console.log(res)
        if (res.status == 200) {
            successful == true;
        }
    }).then((data) => {
        //to be remove
        successful = true;
        //////////////////
        if (successful) {
            $("#popup").children().remove();
            createPopupSubheader("h5", "You've decline the booking!", "confirm-popup-subheader");
            $(document).on("click", (e) => {
                location.reload(true);
            })

        } else {
            //if we recieve status for 404/400/500 
        }

    }).catch(error => console.error(error));
});

// Removes popup for booking
$(document).on("click", "#popup-cancel, #popup-finish", (e) => {
    if (e.target.id == "popup-cancel" || e.target.id == "popup-finish") {
        $("#popup-wrapper").remove();
    }
});