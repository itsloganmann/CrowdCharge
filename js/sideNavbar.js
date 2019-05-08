$(document).ready(function () {
	$("#HeaderNav").on("click", "#open-side-menu-button", (event) => {
		$("#side-menu").toggleClass("expanded-side");
	});
	$("#side-menu-close-button, #side-menu-close-button *").on("click", (event) => {
		$("#side-menu").toggleClass("expanded-side");
	});

	
	$(".clickme, .clickme *").on("click", (event) => {
		$("#map-drawer").addClass("semi-expanded-map-drawer");
	});


	$("#map-side-close-button, #map-side-close-button *").on("click", (event) => {
		console.log("Close button");
		$("#map-drawer").removeClass("semi-expanded-map-drawer");
		$("#map-drawer").removeClass("full-expanded-map-drawer");
		$("#map-side-expansion-button").addClass("fa-chevron-up");
		$("#map-side-expansion-button").removeClass("fa-chevron-down");
	});
	$("#map-side-expansion-button, #map-side-expansion-button *").on("click", (event) => {
		console.log("Expansion button");
		$("#map-drawer").toggleClass("full-expanded-map-drawer");
		$("#map-side-expansion-button").toggleClass("fas fa-chevron-down");
		$("#map-side-expansion-button").toggleClass("fas fa-chevron-up");

	});	
});
