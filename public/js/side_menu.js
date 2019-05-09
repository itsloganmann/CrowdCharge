$("#HeaderNav").on("click", "#open-side-menu-button", (event) => {
	$("#side-menu").toggleClass("expanded-side");
});
$("#side-menu-close-button, #side-menu-close-button *").on("click", (event) => {
	$("#side-menu").toggleClass("expanded-side");
});

