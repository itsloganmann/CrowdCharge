timer = undefined;

function carGo() {
    //animation pre-setting
    $("#logo-img").css({ "position": "absolute", "top": "-25px" });
    var fullWidth = window.innerWidth;
    var currentW = $("#logo-img").position();

    //animation
    $("#logo-img").animate({ left: (fullWidth) }, 2000,
        function () {
            $("#logo-img").css({ left: "-200px" });
            $("#logo-img").animate({ left: "0px" });
        });
}

$("#logo-img").hover(function () {
        if (timer === undefined){
	        timer = setTimeout(carGo, 20000)
	} else {
		timer = clearInterval(timer)
	}
});
