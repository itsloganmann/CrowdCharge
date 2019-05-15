
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

const updateProfile = async () => {
    const userID = await fetch('/users/me', {
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json()
    ).then(function(data){console.log(data)});

    console.log(userID)

    await fetch('/users/', {
        method: 'POST',
        header: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json()
    ).then(function(data){console.log(data)});
}

$("#save-btn").click( function(event){
    event.preventDefault();

    updateProfile();
    $("#name").css({"background-color" : "#EBEBE4"});
    $("#phone").css({"background-color" : "#EBEBE4"});
    $("#email").css({"background-color" : "#EBEBE4"});

    $("#name").attr("readonly", "true");
    $("#phone").attr("readonly", "true");
    $("#email").attr("readonly", "true");
    $("#save-btn").css({"display" : "none"});
    $("#edit-btn").css({"display" : "block"});


    //POST
    event.preventDefault();
    var name = $("#name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    const data = {
        name: name,
        phone: phone,
        email: email
    }

    

});