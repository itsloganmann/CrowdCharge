function fetchBooking(url, status) {
	const jwt = localStorage.getItem('jwt');
	let data = {};
	let contentStrings = [];
	fetch(url, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	})
		.then((res) => {
			return res.json()
		})
		.then((db) => {
			data = db
		}).catch(error => console.log(error));

	for (i = 0; i < data.length; i++) {
		if (status == "pending") {
			contentStrings[i] = "<div class= 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
				+ "<div class='right'><div class='cost'>" + data[i].cost + "</div></div>"
				+ "<div class='date'>" + data[i].startTime.split("T")[0] + "</div>"
				+ "<div class='time'>" + data[i].startTime.split("T")[1].split("Z")[0] + "-" + data[i].endTime.split("T")[1].split("Z")[0] + "</div>"
				+ "<div class='city'>" + data[i].city + "</div>"
				+ "</div></div>";
		}
		else if (status == "complete") {
			contentStrings[i] = "<div class = 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
				+ "<div class='right'><div class='cost'>" + data[i].cost + "</div></div>"
				+ "<div class = 'date'>" + data[i].startTime.split("T")[0] + "</div>"
				+ "<div class = 'address'>" + data[i].address + "</div>" + "<div class ='city'>" + data[i].city
				+ "<div class = 'province'>" + data[i].province + "</div>" + "<div class='hostName'>"
				+ data[i].host + "</div>" + "</div></div>"
		}
		else {
			contentStrings[i] = "<div class= 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
				+ "<div class='price-card-text-wrapper'><div class='price-card-text-lg'>" + data[i].cost + "</div>";
			if (status == "paid") {
				contentStrings[i] += "<div class='price-card-text-sm'>" + status + "</div></div>";
			}
			else if (status == "unpaid") {
				contentStrings[i] += "<div class='price-card-text-sm'>" + status + "</div></div>";
			}
			contentStrings[i] += "<div class='card-text-lg'>" + data[i].startTime.split("T")[0] + "</div>"
				+ "<div class='card-text-md'>" + data[i].startTime.split("T")[1] + "-" + data[i].endTime.split("T")[1] + "</div>"
				+ "<div class='card-text-sm'>" + data[i].address + "</div>"
				+ "<div class='card-text-sm'>" + data[i].city + "</div>"
				+ "</div></div>";
		}
	};
		return contentStrings;

};