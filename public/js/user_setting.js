
$("#edit-btn").click( function(event){
    $("#name").css({"background-color" : "white"});
    $("#phone").css({"background-color" : "white"});
    $("#email").css({"background-color" : "white"});
    $("#name").removeAttr("readonly");
    $("#phone").removeAttr("readonly");
    $("#email").removeAttr("readonly");
    $("#edit-btn").css({"display" : "none"});
    $("#save-btn").css({"display" : "block"});
});

$("#save-btn").click( function(event){
    var name = $("#name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();


    //      post/fetch methods

    
    console.log(name, phone, email);
    $("#name").css({"background-color" : "#EBEBE4"});
    $("#phone").css({"background-color" : "#EBEBE4"});
    $("#email").css({"background-color" : "#EBEBE4"});

    $("#name").attr("readonly", "true");
    $("#phone").attr("readonly", "true");
    $("#email").attr("readonly", "true");
    $("#save-btn").css({"display" : "none"});
    $("#edit-btn").css({"display" : "block"});
});