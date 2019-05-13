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
    // Testing purposes
    addTimeSlot("0:00", "1:00");
});

function checkSelected(){
    var selected = document.getElementsByClassName('button-selected');
    console.log(selected[0] === undefined);
    if (selected[0] === undefined){
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
$(document).on("click", "#popup-wrapper, #popup-cancel", (e) => {
    if (e.target.id == "popup-wrapper" || e.target.id == "popup-cancel") {
        console.log("Gone!!");
        $(".time-slot-button").remove();
        $("#popup-wrapper").remove();
    }
});

// Removes popup for booking
$(document).on("click", "#popup-confirm", (e) => {
    if (e.target.id == "popup-confirm") {
        setPopupBookingPageTwo();
        popupPageOneHeader = $("#popup-header").detach();
        popupPageOneSubheader = $("#popup-subheader").detach();
        popupPageOneContent = $("#popup-content").detach();
        $("#popup").css({
            "height": "60vh",
            "transform": "translateY(20vh)"
        });

    }
});

function appendTimes(id, list) {
    console.log(list);
    for (let item of list){
        console.log(item);
    }
}

$(document).on("click", "#popup-back", (e) => {
    $("#popup").prepend(popupPageOneContent);
    $("#popup").prepend(popupPageOneSubheader);
    $("#popup").prepend(popupPageOneHeader);
	$("#popup-confirm-validate").attr("id", "popup-confirm");
    $("#popup-back").attr("id", "popup-cancel");
    e.stopPropagation();

    $("#popup").css({
        "height": "80vh",
        "transform": "translateY(10vh)"
    });
});

$(document).on("click", "#popup-confirm-validate", (e) => {
    setPopupBookingPageThree();
    $("#popup").append("<div>Your booking for May, 11 at 11am-12am Please wait for a confirmation from the host.<div>");
    $("#popup").css({
        "height": "40vh",
        "transform": "translateY(30vh)"
    });
});


$(document).on("click", "#popup-finish", (e) => {
    $("#popup").children().remove();
    $("#popup-wrapper").remove();

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
    console.log(e.target);
    $(e.target).toggleClass("button-selected");
    checkSelected();
    e.stopPropagation();
});
