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
	const jwt = JSON.parse(localStorage.getItem('jwt'));
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
		contentString = "<div class= 'col-10 well'>"
			+ "<div class='right'><p class='cost'>" + data.cost + "</p></div>"
			+ "<p class='date'>" + grabDate(data.startTime) + "</p>"
			+ "<p class='time'>" + grabTime(data.startTime) + "-" + grabTime(data.endTime) + "</p>"
			+ "<p class='city'>" + data.city + "</p>"
			+ "</div>";
	}
	else {
		contentString = "<div class= 'col-10 well'>"
		+ "<div class='right'><p class='cost'>" + data.cost + "</p>";
		if (status == "paid") {
			contentString += "<p class='green'>" + status + "</p></div>";
		}
		else if (status == "unpaid") {
			contentString += "<p class='red'>" + status + "</p></div>";
		}
		contentString += "<p class='date'>" + grabDate(data.startTime) + "</p>"
			+ "<p class='time'>" + grabTime(data.startTime) + "-" + grabTime(data.endTime) + "</p>"
			+ "<p class='address'>" + data.address + "</p>"
			+ "<p class='city'>" + data.city + "</p>"
			+ "</div>";
	}
	return contentString;
};