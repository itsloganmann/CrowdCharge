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
		startTime: "2019-01-01T00:00:00Z",
		endTime: "2019-01-01T23:00:00Z",
		cost: "$15.00",
		address: "12345 MyHome St.",
		city: "Vancouver, BC"
	}
	/////////////////////////////////////To BE REMOVE
	if (status == "pending") {
		contentString = "<div class= 'col-10 well'>"
			+ "<div class='right'><p class='cost'>" + data.cost + "</p></div>"
			+ "<p class='date'>" + data.startTime.split("T")[0] + "</p>"
			+ "<p class='time'>" + data.startTime.split("T")[1] + "-" + data.endTime.split("T")[1] + "</p>"
			+ "<p class='city'>" + data.city + "</p>"
			+ "</div>";
	}
	else if (status == "complete"){

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
		contentString += "<p class='date'>" + data.startTime.split("T")[0] + "</p>"
			+ "<p class='time'>" + data.startTime.split("T")[1] + "-" + data.endTime.split("T")[1] + "</p>"
			+ "<p class='address'>" + data.address + "</p>"
			+ "<p class='city'>" + data.city + "</p>"
			+ "</div>";
	}
	return contentString;
};