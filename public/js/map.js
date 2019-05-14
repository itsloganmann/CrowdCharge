$("#map-drawer-expansion-button").on("click", () => {
    $("#map-drawer").toggleClass("map-side-expanded");
    $("#map-drawer-details-wrapper").slideToggle(350);
    $("#map-drawer-expansion-button").toggleClass("fa-chevron-up fa-chevron-down");
});

$("#map-drawer-close-button").on("click", () => {
    var drawer = $("#map-drawer").detach();
});

// Generates popup for booking
$("#request-booking-button").on("click", () => {
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
$(document).on("click", "#popup-wrapper, #popup-cancel, #popup-finish", (e) => {
    if (e.target.id == "popup-wrapper" || e.target.id == "popup-cancel" || e.target.id == "popup-finish") {
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
	createPopupContent("popup", "div", "popup-time-slots", "popup-input-wrapper");
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

$(document).on("click", ".marker", (e) => {
    var clickedMarkerName = (document.getElementsByClassName('host-marker-title')[0]).innerHTML;
    $("#map-drawer-text-wrapper").prepend(clickedMarkerName);
});


$('body').on("click", "#popup-confirm-validate", (e) => {
    const popupDate = $('#popup-date').val();
    const popupTime = $('#popup-time').val();
    date = new Date();
    const url = '/bookings'
    const data = {
        bookingDate : date
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