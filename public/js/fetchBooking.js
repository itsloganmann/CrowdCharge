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
		startTime: "2019-01-01T00:00:00Z",
		endTime: "2019-01-01T23:00:00Z",
		cost: "$15.00",
		address: "12345 MyHome St.",
<<<<<<< HEAD
		city: "Vancouver",
		province: "BC",
		host: "Louis"
=======
		city: "Vancouver, BC",
		host: "Louis Lu"
>>>>>>> ad0d644b3a9e88e522a5d68d4ae2c6658fffc968
	}
	/////////////////////////////////////To BE REMOVE
	if (status == "pending") {
		contentString = "<div class= 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
			+ "<div class='right'><p class='cost'>" + data.cost + "</p></div>"
			+ "<p class='date'>" + data.startTime.split("T")[0] + "</p>"
			+ "<p class='time'>" + data.startTime.split("T")[1].split("Z")[0] + "-" + data.endTime.split("T")[1].split("Z")[0] + "</p>"
			+ "<p class='city'>" + data.city + "</p>"
			+ "</div></div>";
	}
	else if (status == "complete") {
		console.log("Hey");
		contentString = "<div class = 'col-10 well'>" + "<div class='right'><p class='cost'>" 
		+ data.cost + "</p>" + "<p class = 'date'>" + data.startTime.split("T")[0] + "</p>" 
		+ "<p class = 'address'>" + data.address + "</p>" + "<p class = 'city'>" + data.city 
		+ "<p class = 'province'>" + data.province + "</p>" + "<p class = 'hostName'>" 
		+ data.host + "</p>" + "</div>" + "</div>" 
		console.log(contentString);
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
		console.log(data.startTime);
		contentString += "<div class='card-text-lg'>" + data.startTime.split("T")[0] + "</div>"
			+ "<div class='card-text-md'>" + data.startTime.split("T")[1] + "-" + data.endTime.split("T")[1] + "</div>"
			+ "<div class='card-text-sm'>" + data.address + "</div>"
			+ "<div class='card-text-sm'>" + data.city + "</div>"
			+ "</div></div>";
	}
	return contentString;
};