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
	//////////////////////////////////////temp data
	data = [{
		startTime: "2019-01-01T00:00:00Z",
		endTime: "2019-01-01T23:00:00Z",
		cost: "$15.00",
		address: "12345 MyHome St.",
		city: "Vancouver",
		province: "BC",
		host: "Louis"
	},
	{
		startTime: "2019-01-01T00:00:00Z",
		endTime: "2019-01-01T23:00:00Z",
		cost: "$15.00",
		address: "12345 MyHome St.",
		city: "Vancouver",
		province: "BC",
		host: "Louis"
	}]
	/////////////////////////////////////To BE REMOVE
	for (i = 0; i < data.length; i++) {
		if (status == "pending") {
			contentStrings[i] = "<div class= 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
				+ "<div class='right'><p class='cost'>" + data[i].cost + "</p></div>"
				+ "<p class='date'>" + data[i].startTime.split("T")[0] + "</p>"
				+ "<p class='time'>" + data[i].startTime.split("T")[1].split("Z")[0] + "-" + data[i].endTime.split("T")[1].split("Z")[0] + "</p>"
				+ "<p class='city'>" + data[i].city + "</p>"
				+ "</div></div>";
		}
		else if (status == "complete") {
			contentStrings[i] = "<div class = 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
				+ "<div class='right'><p class='cost'>" + data[i].cost + "</p></div>"
				+ "<p class = 'date'>" + data[i].startTime.split("T")[0] + "</p>"
				+ "<p class = 'address'>" + data[i].address + "</p>" + "<p class ='city'>" + data[i].city
				+ "<p class = 'province'>" + data[i].province + "</p>" + "<p class='hostName'>"
				+ data[i].host + "</p>" + "</div></div>"
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