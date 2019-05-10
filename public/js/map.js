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
    console.log(popupWrapper);
    $("main").before(popupWrapper);
});


// Removes popup for booking
$(document).on("click", "#popup-wrapper", (e) => {
    if (e.target.id == "popup-wrapper") {
        var popup = $("#popup-wrapper").detach();
        e.stopPropagation();
    }
});
