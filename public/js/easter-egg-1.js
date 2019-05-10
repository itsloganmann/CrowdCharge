var timeOut;
$("#logo-img").hover(function(){
    if(!timeOut){
        timeOut = window.setTimeout(function(){
            timeOut = null;
        //animation
        console.log("animation start!");            
        carGo();
        }, 3000);
    }
});

function carGo(){
    $("#logo-img").css({"position" : "absolute", "top" : "-25px"});
    var withh= window.innerWidth;
    console.log(withh);
    var currentW = $("#logo-img").position();
    console.log(currentW.left);
        $("#logo-img").animate({left: (withh)}, 2000, 
        function(){
            $("#logo-img").css({left: "-200px"});
            $("#logo-img").animate({left: "0px"});
        });
}