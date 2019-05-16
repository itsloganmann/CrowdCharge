function grabDate(time) {
	let result = "";

	let count = 0;
	let c = "";
	while (c != "T") {
		result += c;
		c = time[count++];
	}
	return result;
};

function grabTime(time) {
	let result = "";
	let c = "";
	let count = 0;
	while (c != "T") {
		c = time[count];
		count++;
	}
	for (i = count; i < time.length; i++) {
		result += time[i];
	}
	return result;
};

function fetchBooking(url, status) {
	const jwt = localStorage.getItem('jwt');
	let data = {};
	let contentString = "";
	fetch(url, {
		method: 'GET',
		headers : {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	})
		.then((res) => {
			return res.json()
		})
		.then((db) => {
			data = JSON.parse(JSON.stringify(db))
		});
	//////////////////////////////////////temp data
	data = {
		startTime: "2019-01-01T00:00:00",
		endTime: "2019-01-01T23:00:00",
		cost: "$15.00",
		address: "12345 MyHome St.",
		city: "Vancouver, BC"
	}
	/////////////////////////////////////To BE REMOVE
	if (status == "pending") {
		contentString = "<div class= 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
			+ "<div class='right'><p class='cost'>" + data.cost + "</p></div>"
			+ "<p class='date'>" + grabDate(data.startTime) + "</p>"
			+ "<p class='time'>" + grabTime(data.startTime) + "-" + grabTime(data.endTime) + "</p>"
			+ "<p class='city'>" + data.city + "</p>"
			+ "</div></div>";
	}
	else {
		contentString = "<div class= 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
		+ "<div class='price-card-text-wrapper'><div class='price-card-text-lg'>" + data.cost + "</div>";
		if (status == "paid") {
			contentString += "<div class='price-card-text-sm'>" + status + "</div></div>";
		}
		else if (status == "unpaid") {
			contentString += "<div class='price-card-text-sm'>" + status + "</div></div>";
		}
		contentString += "<div class='card-text-lg'>" + grabDate(data.startTime) + "</div>"
			+ "<div class='card-text-md'>" + grabTime(data.startTime) + "-" + grabTime(data.endTime) + "</div>"
			+ "<div class='card-text-sm'>" + data.address + "</div>"
			+ "<div class='card-text-sm'>" + data.city + "</div>"
			+ "</div></div>";
	}
	return contentString;
};