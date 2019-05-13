var createPopup = () => {
	console.log("Creating popup...");
	
}

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

var setPopupBooking = () => {
	console.log("Setting popup page one...")

	console.log("Setting popup page one complete!")
}
popupHeader.innerHTML = "Book a Time";
popupConfirm.innerHTML = "Book";
popupCancel.innerHTML = "Cancel";

var popupBackButton = document.createElement('button');
popupBackButton.id = "popup-back";
popupBackButton.className = "white-button";
popupBackButton.innerHTML = "Back";

var popupConfirmValidate = document.createElement('button');
popupConfirmValidate.id = "popup-confirm-validate";
popupConfirmValidate.className = "orange-button";
popupConfirmValidate.innerHTML = "Confirm";

var popupFinishButton = document.createElement('button');
popupFinishButton.id = "popup-finish";
popupFinishButton.className = "white-button";
popupFinishButton.innerHTML = "OK";