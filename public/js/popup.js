var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


// Creates initial popup with generic IDs
var createPopup = () => {
	console.log("Creating popup...");
	var popupWrapper = document.createElement('div');
	popupWrapper.id = "popup-wrapper";
	var popup = document.createElement('div');
	popup.id = "popup";
	var popupHeader = document.createElement('h3');
	popupHeader.id = "popup-header";
	popup.appendChild(popupHeader);
	var popupSubheader = document.createElement('h5');
	popupSubheader.id = "popup-subheader";
	popup.appendChild(popupSubheader);
	var popupContent = document.createElement('div');
	popupContent.id = "popup-content";
	popup.appendChild(popupContent);
	var popupConfirm = document.createElement('button');
	popupConfirm.id = "popup-confirm";
	popupConfirm.className = "orange-button";
	popupConfirm.disabled = true;
	popup.appendChild(popupConfirm);
	var popupCancel = document.createElement('button');
	popupCancel.id = "popup-cancel";
	popupCancel.className = "white-button";
	popup.appendChild(popupCancel);
	popupWrapper.appendChild(popup);
	$('body').prepend(popupWrapper);
	console.log("Creating popup complete!");
}

var setPopupBookingPageOne = () => {
	console.log("Setting popup page one...")
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var monthFmt = months[today.getMonth()];
	var year = today.getFullYear();
	$('#popup-subheader').html(monthFmt + ", " + day);
	$('#popup-header').html("Book a Time");
	$('#popup-confirm').html("Request Booking");
	$('#popup-cancel').html("Cancel");
	console.log("Setting popup page one complete!")
}

var setPopupBookingPageTwo = () => {
	$("#popup-confirm").attr("id", "popup-confirm-validate");
	$("#popup-confirm-validate").html("Validate");
	$("#popup-cancel").attr("id", "popup-back");
	$("#popup-back").html("Back");
}

var setPopupBookingPageThree = () => {
	$("#popup-confirm-validate").remove();
	$("#popup-back").attr("id", "popup-finish");
	$("#popup-finish").html("Close");
}