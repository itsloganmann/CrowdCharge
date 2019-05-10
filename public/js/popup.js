$("#clickme").on("click", () => {
    console.log("Clicked");
	$("main").before("<div id='popup-wrapper'><div id='popup'></div></div>");
	$("#popup").append("<input type='text'></div>");
});

$(document).on("click", "#popup-wrapper", (e) => {
	if (e.target.id == "popup-wrapper") {
		$("#popup-wrapper").remove();
		e.stopPropagation();
	} 
});