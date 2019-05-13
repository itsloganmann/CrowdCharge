var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


// Creates initial popup with generic IDs
var createPopup = () => {
	console.log("Creating popup...");
	var popupWrapper = document.createElement('div');
	popupWrapper.id = "popup-wrapper";
	var popup = document.createElement('div');
	popup.id = "popup";
	popupWrapper.appendChild(popup);
	$('body').prepend(popupWrapper);
	console.log("Creating popup complete!");
}

var createPopupHeader = (size, text) => {
	var popupHeader = document.createElement(size);
	popupHeader.id = "popup-header";
	$('#popup').append(popupHeader);
	$('#popup-header').html(text);
}

var createPopupSubheader = (size, text) => {
	var popupSubheader = document.createElement(size);
	popupSubheader.id = "popup-subheader";
	$('#popup').append(popupSubheader);
	$('#popup-subheader').html(text);
}

var createPopupContent = () => {
	var popupContent = document.createElement('div');
	popupContent.id = "popup-content";
	$('#popup').append(popupContent);
}

var createPopupConfirmButton = (id, text) => {
	var popupConfirm = document.createElement('button');
	popupConfirm.id = id;
	popupConfirm.className = "orange-button";
	$('#popup').append(popupConfirm);
	$('#' + id).html(text);
}

var createPopupCancelButton = (id, text) => {
	var popupCancel = document.createElement('button');
	popupCancel.id = id;
	popupCancel.className = "white-button";
	$('#popup').append(popupCancel);
	$('#' + id).html(text);
}

var getCurrentDate = () => {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var monthFmt = months[today.getMonth()];
	var year = today.getFullYear();
	return (monthFmt + " " + day + ", " + year);
}
var setPopupBookingPageOne = () => {
	createPopupHeader("h3", "Book a Time");
	createPopupSubheader("h5", "<b id='popup-date'><input type='text' readonly id='datepicker' value='" + getCurrentDate() + "'></b>");
	$("#datepicker").datepicker();
	createPopupContent();
	createPopupConfirmButton("popup-confirm", "Request Booking");
	createPopupCancelButton("popup-cancel", "Cancel");
}
var setPopupBookingPageTwo = (date, time) => {
	console.log(time);
	createPopupHeader("h5", "You have requested: <b id='popup-date'>" + date + "</b> at <b id='popup-time'>" + time + "</b>. Do you wish to confirm this booking request?");
	createPopupConfirmButton("popup-confirm-validate", "Confirm");
	createPopupCancelButton("popup-back", "Back");
}

var setPopupBookingPageThree = (date, time) => {
	createPopupHeader("h5", "Your booking for <b id='popup-date'>" + date + "</b> at <b id='popup-time'>" + time + "</b> has been sent. Please wait for a confirmation from the host before making your payment.");
	createPopupCancelButton("popup-finish", "Close");
}

var getText = (id) => {
	return $("#" + id).html();
}