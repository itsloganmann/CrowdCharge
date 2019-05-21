// Controls the toggle behavior for side menu

// Open
$("#header-nav").on("click", "#open-side-menu-button", (event) => {
	$("#side-menu").toggleClass("expanded-side");
});
// Close
$("#side-menu-close-button, #side-menu-close-button *").on("click", (event) => {
	$("#side-menu").toggleClass("expanded-side");
});