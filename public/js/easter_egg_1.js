// Easter Egg for ZapShare app.

// After hovering on the car logo, it will drive off to the right side of the screen
// and appear again in its proper place from the left.

// Declare timer variable
let timer = undefined;

// Moves the car logo across the screen 
function carGo() {
    // Set position attributes
    $("#logo-img").css({ "position": "absolute", "top": "-21px" });
    // Get Window dimensions
    var fullWidth = window.innerWidth;
    var currentW = $("#logo-img").position();

    // Move car using CSS
    $("#logo-img").animate({ left: (fullWidth) }, 2000,
        function () {
            $("#logo-img").css({ left: "-200px" });
            $("#logo-img").animate({ left: "0px" });
        });
}

// Timer setting of event listener
$("#logo-img").hover(() => {
    if (timer === undefined) {
        timer = setTimeout(carGo, 5000)
    } else {
        timer = clearInterval(timer)
    }
});
