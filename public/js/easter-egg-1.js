$("#logo-img").hover(function () {
        window.setTimeout(function () {
            carGo();
        }, 5000);
});

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