function confirmationPopup(value, booking) {
    createPopup();
    createPopupSubheader("h5", "Do you wish to pay the booking for</br><b id='confirm-charger-address'>" 
    + booking.address + " " + booking.city + ", " + booking.province +"</b>"
        + " on <b id='confirm-charger-date'>" + booking.startTime.split("T")[0] + "</b>"
        + "</br>at <b id='confirm-charger-stime'>" + getTime(booking.startTime) + "-</b>"
        + "<b>" + getTime(booking.endTime) + "</b>", "confirm-popup-subheader");
    createPopupConfirmButton(value + "-btn", value);
    createPopupCancelButton("popup-cancel", "Back");


}
function payNow(booking) {
    console.log(booking);
    confirmationPopup("confirm",booking);
}