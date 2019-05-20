
const jwt = localStorage.getItem('jwt');

function addEventListenerOnPayNow(element, booking, jwt) {
    $('body').on('click', element, event => {
        bookingObj = booking;
        console.log("clicked");
        confirmationPopupPay("Pay Now", booking);
	})
	
}

function confirmationPopupPay(value, booking) {
    createPopup();
    createPopupHeader("h5", "Do you wish to pay the booking for</br><b id='confirm-charger-address'>" 
    + booking.address + " " + booking.city + ", " + booking.province +"</b>"
        + " on <b id='confirm-charger-date'>" + booking.startTime.split("T")[0] + "</b>"
        + "</br>at <b id='confirm-charger-stime'>" + getTime(booking.startTime) + "-</b>"
        + "<b>" + getTime(booking.endTime) + "</b>", "confirm-popup-subheader", "popup-subheader");
    createPopupConfirmButton("pay-now-btn", value);
    createPopupCancelButton("popup-cancel", "Back");


}

async function fetchBooking(url, status) {
	let dataFromdb = [];
	let contentStrings = [];
	await fetch(url, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	}).then((res) => {
		return res.json()
	}).then((db) => {
		console.log(db)
		dataFromdb = db
	}).catch(error => console.log(error));

	const build = () => {
		for (i = 0; i < dataFromdb.length; i++) {
			if (status == "completed" || status == "pending") {
				contentStrings[i] = "<div class='card-panel col-md-5'><div class='price-card-text-wrapper'>"
					+ "<div class='price-card-text-lg'>$" + dataFromdb[i].cost.toFixed(2)
					+ "</div><div class='price-card-text-sm'>" + status + "</div></div>"
					+ "<div class='card-text-lg'>" + dataFromdb[i].startTime.split("T")[0] + "</div>"
					+ "<div class='card-text-md'>" + (dataFromdb[i].startTime.split("T")[1].split(":00.000Z")[0]).replace(/^0+/, '') + "-"
					+ (dataFromdb[i].endTime.split("T")[1].split(":00.000Z")[0]).replace(/^0+/, '') 
					+ ((status == "completed") ? ("</div>" + dataFromdb[i].address) : "")
					+ "<div class='card-text-sm'> Charger: " + dataFromdb[i].chargername + "</div>"
					+ "<div class='card-text-sm'>" + dataFromdb[i].city + ", " + dataFromdb[i].province + "</div>"
					+ "</div></div>";
			} else {
				contentStrings[i] = "<div class='card-panel col-md-5'><div class='price-card-text-wrapper'>"
					+ "<div class='price-card-text-lg'>$" + dataFromdb[i].cost.toFixed(2)
					+ "</div><div class='price-card-text-sm "
					+ ((status == "paid") ? "green-highlight" : "orange-highlight") + "'>" + status + "</div></div>"
					+ "<div class='card-text-lg " + ((status == "paid") ? "green-highlight" : "orange-highlight") + "'>" + dataFromdb[i].startTime.split("T")[0] + "</div>"
					+ "<div class='card-text-md'>" + (dataFromdb[i].startTime.split("T")[1].split(":00.000Z")[0]).replace(/^0+/, '') + "-"
					+ (dataFromdb[i].endTime.split("T")[1].split(":00.000Z")[0]).replace(/^0+/, '') + "</div>"
					+ ((status == "paid") ? "<div class='card-text-sm'>" + dataFromdb[i].address + "</div>" : "<div class='card-text-sm'> Charger: " + dataFromdb[i].chargername + "</div>")
					+ "<div class='card-text-sm'>" + dataFromdb[i].city + ", " + dataFromdb[i].province + "</div>"
					+ ((status == "unpaid") ? ("<button id= 'payment-" + i + "' class='pay-now-btn orange-button'>Pay Now</button>") : "")
					+ "</div></div>";
					addEventListenerOnPayNow("#payment-" + i, dataFromdb[i], jwt);
			}
		}
	};
	$("#tab-content").children().remove();
	build();
	return contentStrings;
};