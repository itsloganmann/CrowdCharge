var popupWrapper = document.createElement('div');
popupWrapper.id = "popup-wrapper";
var popup = document.createElement('div');
popup.id = "popup";
var popupHeader = document.createElement('h3');
popupHeader.id = "popup-header";
popupHeader.innerHTML = "Book a Time";
popup.appendChild(popupHeader);
var popupSubheader = document.createElement('h5');
popupSubheader.id = "popup-subheader";
popup.appendChild(popupSubheader);
var popupContent = document.createElement('div');
popupContent.id = "popup-content";
popup.appendChild(popupContent);
var popupConfirm = document.createElement('button');
popupConfirm.id = "popup-confirm";
popupConfirm.innerHTML = "Confirm";
popup.appendChild(popupConfirm);
var popupCancel = document.createElement('button');
popupCancel.id = "popup-cancel";
popupCancel.innerHTML = "Cancel";
popup.appendChild(popupCancel);
popupWrapper.appendChild(popup);

var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
var today = new Date();
var day = today.getDate();
var month = today.getMonth()+1;
var monthFmt = months[today.getMonth()];
var year = today.getFullYear();
popupSubheader.innerHTML = monthFmt + ", " + day;

var addTimeSlot = (date, startTime, endTime) => {
	var timeSlot = document.createElement('button');
	timeSlot.className = "time-slot-button";
	timeSlot.innerHTML = startTime + " - " + endTime;
	popupContent.appendChild(timeSlot);
}

$(document).on("click", ".time-slot-button" , (e) => {
	e.preventDefault();
	console.log(e.target);
	$(e.target).toggleClass("button-selected");
	e.stopPropagation();
});
