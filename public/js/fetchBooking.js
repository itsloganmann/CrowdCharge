async function fetchBooking(url, status) {
	const jwt = localStorage.getItem('jwt');
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
		dataFromdb = db

	}).catch(error => console.log(error));

	function build() {
		for (i = 0; i < dataFromdb.length; i++) {
			if (status == "pending") {
				contentStrings[i] = "<div class='card-panel col-md-5'>"
					+ "<div class='right'><p class='cost'>" + dataFromdb[i].cost + "</p></div>"
					+ "<p class='date'>" + dataFromdb[i].startTime.split("T")[0] + "</p>"
					+ "<p class='time'>" + dataFromdb[i].startTime.split("T")[1].split(".000Z")[0] + "-"
					+ dataFromdb[i].endTime.split("T")[1].split(".000Z")[0] + "</p>"
					+ "<p class='city'>" + dataFromdb[i].city + "</p>"
					+ "</div></div>";
			}
			else if (status == "complete") {
				contentStrings[i] = "<div class = 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
					+ "<div class='right'><p class='cost'>" + dataFromdb[i].cost + "</p></div>"
					+ "<p class = 'date'>" + dataFromdb[i].startTime.split("T")[0] + "</p>"
					+ "<p class = 'address'>" + dataFromdb[i].address + "</p>" + "<p class ='city'>" + dataFromdb[i].city
					+ "<p class = 'province'>" + dataFromdb[i].province + "</p>" + "<p class='hostName'>"
					+ dataFromdb[i].host + "</p>" + "</div></div>"
			}
			else {
				contentStrings[i] = "<div class= 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
					+ "<div class='price-card-text-wrapper'><div class='price-card-text-lg'>" + dataFromdb[i].cost + "</div>";
				if (status == "paid") {
					contentStrings[i] += "<div class='price-card-text-sm'>" + status + "</div></div>";
				}
				else if (status == "unpaid") {
					contentStrings[i] += "<div class='price-card-text-sm'>" + status + "</div></div>";
				}
				contentStrings[i] += "<div class='card-text-lg'>" + dataFromdb[i].startTime.split("T")[0] + "</div>"
					+ "<div class='card-text-md'>" + dataFromdb[i].startTime.split("T")[1].split(".000Z")[0]
					+ "-" + dataFromdb[i].endTime.split("T")[1].split(".000Z")[0] + "</div>"
					+ "<div class='card-text-sm'>" + dataFromdb[i].address + "</div>"
					+ "<div class='card-text-sm'>" + dataFromdb[i].city + "</div>"
					+ "</div>";
			}
		}

	};
	build();
	return contentStrings;

};