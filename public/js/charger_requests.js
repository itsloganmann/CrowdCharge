// Immediately fetches requests.
(async function () {
    const response = await fetch('/host/pendingBookings', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const requests = await response.json();
    if (!$.isEmptyObject(requests)) { $('#charger-request').children().remove(); }
    addRequestsToPage(requests);
})();

// Adds all requests to page.
const addRequestsToPage = (requests) => {
    requests.forEach((request, index) => {
        displayBookingCard (request, index);
        addAcceptDeclineFuntionality(request, index);
    });
}

// Displays the specified request on the page.
const displayBookingCard  = (request, index) => {
    let localStartDate = new Date(request.startTime);
    let localEndDate = new Date(request.endTime);
    let localStartTime = getLocalStartTime(localStartDate);
    let localEndTime = getLocalEndTime(localEndDate);
    let localDate = getLocalDate(localStartDate);

    $('#charger-request').append('<div class="card-panel col-md-5">'
    + '<div class="price-card-text-wrapper">'
        + '<div class="price-card-text-lg">$' + request.cost.toFixed(2) + '</div>'
        + '<div class="price-card-text-sm orange-yellow-highlight">pending</div>'
    + '</div>'
    + '<div class="card-text-lg orange-yellow-highlight">' + localDate +'</div>'
    + '<div class="card-text-md"> ' + localStartTime + ' - ' + localEndTime+ ' </div>'
    + '<div class="card-text-sm orange-yellow-highlight">' + request.client + '</div>'
    + '<div class="card-text-sm">Charger: ' + request.chargername +'</div>'
    + '<div class="card-text-sm">' + request.address + '</div>'
    + '<div class="card-text-sm">' + request.city + ', ' + request.province + ' </div>'
    + '<div class="accept-decline-wrapper">' 
        + '<button id="accept-request-' + index + '" class="green-button booking-accept-button">Accept</button>'
        + '<button id="decline-request-' + index + '" class="red-button booking-decline-button">Decline</button></div>'
    + '</div>');
}

// Adds functionality to accept and decline buttons.
const addAcceptDeclineFuntionality = (request, index) => {
    (function (index) {
        $('#accept-request-' + index).on('click', () => {
            createConfirmationPopup('accept', request);
            addAcceptFunctionality(JSON.stringify(request));
        });
        $('#decline-request-' + index).on('click', () => {
            createConfirmationPopup('decline', request);
            addDeclineFunctionality(JSON.stringify(request));
        });
    })(index);
}

// Creates confirmation popup for accept/decline.
const createConfirmationPopup = (choice, request) => {
    let localStartDate = new Date(request.startTime);
    let localEndDate = new Date(request.endTime);
    let localStartTime = getLocalStartTime(localStartDate);
    let localEndTime = getLocalEndTime(localEndDate);
    let localDate = getLocalDate(localStartDate);

    createPopup();
    createPopupHeader("h5", "Are you sure you want to " + choice + " the request for<br><b id='confirm-charger-name'>" + request.chargername + "</b>"
        + " on <b id='confirm-charger-date'>" + localDate + "</b>"
        + "<br>at <b id='confirm-charger-stime'>" + localStartTime + "-</b>"
        + "<b>" + localEndTime + "</b>" + "?", "confirm-popup-subheader", "popup-subheader");
    createPopupConfirmButton(choice + "-btn", choice.charAt(0).toUpperCase() + choice.substring(1));
    if (choice == "accept")
        $("#accept-btn").removeClass('orange-button').addClass('green-button');
    else if (choice == "decline") {
        $("#decline-btn").removeClass('orange-button').addClass('red-button');
    }
    createPopupCancelButton("popup-cancel", "Cancel");
}

// Functionality for clicking confirm accept button.
const addAcceptFunctionality = (request) => {
    $('body').on('click', '#accept-btn', async (e) => {
        request = JSON.parse(request);
        const data = {
            bUID: request.bookingID
        }
        await fetch ('/booking/acceptBooking', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        })
        $("#popup").children().not("#popup-close-button").remove();
        createPopupHeader("h5", "This booking has been accepted.", "confirm-popup-header", "popup-subheader");
        createPopupCancelButton("popup-cancel", "Close");
        $('body').on("click", (e) => {
            location.reload(true);
        })
    })
}

// Functionality for clicking confirm decline button.
const addDeclineFunctionality = (request) => {
    $('body').on('click', '#decline-btn', async (e) => {
        request = JSON.parse(request);
        const data = {
            bUID: request.bookingID
        }
        await fetch('booking/declineBooking', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        })
        $("#popup").children().not("#popup-close-button").remove();
        createPopupHeader("h3", "This booking has been declined.", "confirm-popup-header", "popup-subheader");
        $('body').on("click", (e) => {
            location.reload(true);
        })
    })
}