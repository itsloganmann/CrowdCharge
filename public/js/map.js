$("#map-drawer-expansion-button").on("click", () => {
    $("#map-drawer").toggleClass("map-side-expanded");
    $("#map-drawer-details-wrapper").toggleClass("display-reveal");
    $("#map-drawer-expansion-button").toggleClass("fa-chevron-up fa-chevron-down");
});

$("#map-drawer-close-button").on("click", () => {
    var drawer = $("#map-drawer").detach();
});

// Generates popup for booking
$("#request-booking-button").on("click", () => {
    createPopup();
    setPopupBookingPageOne();
    checkSelected();
    // Testing purposes
    addTimeSlot("0:00", "1:00");
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
    popupPageOne = $("#popup").children().detach();
    setPopupBookingPageTwo();

});
$(document).on("click", "#popup-back", (e) => {
    $("#popup").children().remove();
    $("#popup").prepend(popupPageOne);
    e.stopPropagation();
});

$(document).on("click", "#popup-confirm-validate", (e) => {
    $("#popup").children().remove();
    setPopupBookingPageThree();
});


// Adds a new time slot button
var addTimeSlot = (startTime, endTime) => {
    var timeSlot = document.createElement('button');
    timeSlot.className = "time-slot-button";
    timeSlot.innerHTML = startTime + " - " + endTime;
    $("#popup-content").append(timeSlot);
}

// Colour change for time slot button
$(document).on("click", ".time-slot-button", (e) => {
    e.preventDefault();
    $(e.target).toggleClass("button-selected");
    checkSelected();
    e.stopPropagation();
});