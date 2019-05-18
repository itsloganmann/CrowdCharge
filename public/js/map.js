$("#map-drawer-expansion-button").on("click", () => {
    $("#map-drawer").toggleClass("map-side-expanded");
    $("#map-drawer-details-wrapper").slideToggle(350);
    $("#map-drawer-expansion-button").toggleClass("fa-chevron-up fa-chevron-down");
});

$("#map-drawer-close-button").on("click", () => {
    $("#map-drawer").hide();
});

// Generates popup for booking
$('#map-drawer').on("click", '#request-booking-button', () => {
    createPopup();
    setPopupBookingPageOne();
    $("#popup").fadeIn(200);
    checkSelected();
    // Testing purposes
    addTimeSlot("0:00", "1:00");
    addTimeSlot("1:00", "2:00");
    addTimeSlot("2:00", "3:00");
});

// Checks if any time has been selected. Disables confirm button if none are selected.
function checkSelected() {
    var selected = document.getElementsByClassName('button-selected');
    if (selected[0] === undefined) {
        $('#popup-confirm').prop('disabled', true);
        $('#popup-confirm').addClass('disabled-button');
        $('#popup-confirm').html('Please select a time slot!');
    } else {
        $('#popup-confirm').removeClass('disabled-button');
        $('#popup-confirm').prop('disabled', false);
        $('#popup-confirm').html('Request Booking');
    }
}


// Removes popup for booking
$(document).on("click", "#popup-cancel, #popup-finish", (e) => {
    if (e.target.id == "popup-cancel" || e.target.id == "popup-finish") {
        $("#popup-wrapper").remove();
    }
});

$(document).on("click", "#popup-confirm", (e) => {
    var date = $("#datepicker").val();;
    var time = $("#popup-time").html();
    console.log(time);
    popupPageOne = $("#popup").children().detach();
    setPopupBookingPageTwo(date, time);

});
$(document).on("click", "#popup-back", (e) => {
    $("#popup").children().remove();
    $("#popup").prepend(popupPageOne);
    e.stopPropagation();
});

$(document).on("click", "#popup-confirm-validate", (e) => {
    var date = $("#popup-date").html();
    var time = $("#popup-time").html();
    $("#popup").children().remove();
    setPopupBookingPageThree(date, time);
});


// Adds a new time slot button
var addTimeSlot = (startTime, endTime) => {
    var timeSlot = document.createElement('button');
    timeSlot.className = "time-slot-button";
    timeSlot.innerHTML = startTime + " - " + endTime;
    $("#popup-time-slots").append(timeSlot);
}

var setPopupBookingPageOne = () => {
    createPopupHeader("h3", "Book a Time", "booking-header");
    createPopupSubheader("div", "<b id='popup-date'><input type='text' readonly class='form-input' id='datepicker' value='" + getCurrentDate() + "'></b>", "booking-datepicker");
    $("#datepicker").datepicker();
    createPopupContent("popup", "div", "popup-time-slots", "full-center-wrapper");
    createPopupConfirmButton("popup-confirm", "Request Booking");
    createPopupCancelButton("popup-cancel", "Cancel");
}
var setPopupBookingPageTwo = (date, time) => {
    console.log(time);
    createPopupSubheader("h5", "You have requested: <b id='popup-date'>" + date + "</b> at <b id='popup-time'>" + time + "</b>. Do you wish to confirm this booking request?", "booking-confirmation-text");
    createPopupConfirmButton("popup-confirm-validate", "Confirm");
    createPopupCancelButton("popup-back", "Back");
}

var setPopupBookingPageThree = (date, time) => {
    createPopupSubheader("h5", "Your booking for <b id='popup-date'>" + date + "</b> at <b id='popup-time'>" + time + "</b> has been sent. Please wait for a confirmation from the host before making your payment.", "booking-finish-text");
    createPopupCancelButton("popup-finish", "Close");
}

// Colour change for time slot button
$(document).on("click", ".time-slot-button", (e) => {
    e.preventDefault();
    $(".time-slot-button").removeClass("button-selected");
    $(".time-slot-button").removeAttr("id");
    $(e.target).addClass("button-selected");
    $(e.target).attr("id", "popup-time");
    checkSelected();
    e.stopPropagation();
});

$('body').on("click", ".marker", async (e) => {
    console.log(e.target.id);
    e.preventDefault();
    try {
        const url = '/charger/query?charger_id=' + e.target.id;
        console.log(url);
        const response = await fetch(url);
        const json = await response.json();
        const data = json['0'];
        const chargername = data['chargername']
        const city = data['city']
        const cost = data['cost']
        const details = data['details']
        const level = data['level']
        const type = data['type']
        const rating = data['rating']
        console.log(data);
        $("#map-drawer").show();
        populateChargerInfo(chargername, city, cost, details, level, type, rating);
    } catch (error) {
        console.log("Error: ", error)
    }
});

const populateChargerInfo = (chargername, city, cost, details, level, type, rating) => {
    //console.log(chargername, city, cost, details, level, type, rating);
    $('#map-drawer-text-wrapper').children().remove();
    $('#map-drawer-text-wrapper').append('<div class="map-drawer-text-row" id="map-drawer-charger-name">' + chargername + '</div>')
    $('#map-drawer-text-wrapper').append('<div class="map-drawer-text-row"><div class="map-drawer-text-left">City</div><div class="map-drawer-text-right">' + city + '</div></div><br>')
    $('#map-drawer-text-wrapper').append('<div class="map-drawer-text-row"><div class="map-drawer-text-left">Level</div><div class="map-drawer-text-right">' + level + '</div></div><br>')
    $('#map-drawer-text-wrapper').append('<div class="map-drawer-text-row"><div class="map-drawer-text-left">Type</div><div class="map-drawer-text-right">' + type + '</div></div><br>')
    $('#map-drawer-text-wrapper').append('<div class="map-drawer-text-row"><div class="map-drawer-text-left">Hourly Rate</div><div class="map-drawer-text-right">$' + cost + '</div></div><br>')
    $('#map-drawer-text-wrapper').append('<div class="map-drawer-text-row"><div class="map-drawer-text-left">' + (rating !== undefined ? rating : "No Rating") + '</div><div class="map-drawer-text-right orange-highlight" id="map-drawer-see-reviews">See Reviews</div></div><br>')
    $('#map-drawer-text-wrapper').append('<div class="map-drawer-text-row" id="map-drawer-details-wrapper"><div class="map-drawer-text-left">Additional Details</div><br><div class="map-drawer-text-left" id="map-drawer-details">' + (details !== '' ? details : "<i>None</i>")  + '</div></div>');
    $('#map-drawer-text-wrapper').append('<button id="request-booking-button" class="orange-button">REQUEST BOOKING</button>')
}


$('body').on("click", "#popup-confirm-validate", (e) => {
    const popupDate = $('#popup-date').val();
    const popupTime = $('#popup-time').val();
    date = new Date();
    const url = '/bookings'
    const data = {
        bookingDate: date
    }
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
});