$("#logo-img").hover(function () {
    window.setTimeout(function () {
        carGo();
        $("#logo-img").removeClass("runable");

    }, 5000);
    $("#logo-img").addClass("runable");

});

function carGo() {
    //animation pre-setting
    $(".runable").css({ "position": "absolute", "top": "-25px" });
    var fullWidth = window.innerWidth;
    var currentW = $(".runable").position();

    //animation
    $(".runable").animate({ left: (fullWidth) }, 2000,
        function () {
            $("#logo-img").css({ left: "-200px" });
            $("#logo-img").animate({ left: "0px" });
        });
}