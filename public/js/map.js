$("#map-drawer-expansion-button").on("click", () => {
    $("#map-drawer").toggleClass("map-side-expanded");
    $("#map-drawer-details-wrapper").toggleClass("display-reveal");
    $("#map-drawer-expansion-button").toggleClass("fa-chevron-up fa-chevron-down");
});

$("#map-drawer-close-button").on("click", () => {
    var drawer = $("#map-drawer").detach();
});

var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
// Generates popup for booking
$("#request-booking-button").on("click", () => {
    createPopup();
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var monthFmt = months[today.getMonth()];
    var year = today.getFullYear();
    popupSubheader.innerHTML = monthFmt + ", " + day;
    addTimeSlot("0:00", "1:00");
    console.log(popupWrapper);
    $("main").before(popupWrapper);
});

function checkSelected(){
    var selected = document.getElementsByClassName('button-selected');
    console.log(selected[0] === undefined);
    if (selected[0] === undefined){
        $('#popup-confirm').prop('disabled', true);
        $('#popup-confirm').addClass('disabled-button');
        $('#popup-confirm').html('Please select a time slot!');
    } else {
        $('#popup-confirm').html('Request Booking');
        $('#popup-confirm').removeClass('disabled-button');
        $('#popup-confirm').prop('disabled', false);
    }
}
 

// Removes popup for booking
$(document).on("click", "#popup-wrapper, #popup-cancel", (e) => {
    if (e.target.id == "popup-wrapper" || e.target.id == "popup-cancel") {
        $(".time-slot-button").remove();
        $("#popup-wrapper").remove();
    }
});

// Removes popup for booking
$(document).on("click", "#popup-confirm", (e) => {
    if (e.target.id == "popup-confirm") {
        //var list = document.getElementsByClassName('button-selected');
        //selected = $('.button-selected').detach();
        //console.log(list[0]);
        popupPageOne = $("#popup").children().detach();
        //console.log(list[0]);
        //console.log(selected);
        $("#popup").append(popupConfirmValidate);   
        $("#popup").append(popupBackButton);   
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
    $("#popup").children().detach();
    $("#popup").append(popupPageOne);
    $("#popup").css({
        "height": "80vh",
        "transform": "translateY(10vh)"
    });
});

$(document).on("click", "#popup-confirm-validate", (e) => {
    $("#popup").children().detach();
    $("#popup").append("<div>Your booking for May, 11 at 11am-12am and 1pm-3pm has been sent. Please wait for a confirmation from the host.<div>");
    $("#popup").append(popupFinishButton);      
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
    popupContent.appendChild(timeSlot);
}

// Colour change for time slot button
$(document).on("click", ".time-slot-button", (e) => {
    e.preventDefault();
    console.log(e.target);
    $(e.target).toggleClass("button-selected");
    checkSelected();
    e.stopPropagation();
});
