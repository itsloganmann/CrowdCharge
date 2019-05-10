$("#clickme").on("click", () => {
    console.log("Clicked");
    $(main).before("<div id='popup'></div>");
});