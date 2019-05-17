
$("#edit-btn").click((event) => {
    event.preventDefault();
    $("#profile-name-input").css({"background-color" : "white"});
    $("#profile-phone-input").css({"background-color" : "white"});
    $("#profile-email-input").css({"background-color" : "white"});
    $("#profile-name-input").removeAttr("readonly");
    $("#profile-phone-input").removeAttr("readonly");
    $("#profile-email-input").removeAttr("readonly");
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

$("#save-btn").click((event) => {
    event.preventDefault();

    updateProfile();
    $("#profile-name-input").css({"background-color" : "#EBEBE4"});
    $("#profile-email-input").css({"background-color" : "#EBEBE4"});
    $("#profile-phone-input").css({"background-color" : "#EBEBE4"});

    $("#profile-name-input").attr("readonly", "true");
    $("#profile-email-input").attr("readonly", "true");
    $("#profile-phone-input").attr("readonly", "true");
    $("#save-btn").css({"display" : "none"});
    $("#edit-btn").css({"display" : "block"});


    //POST
    var name = $("#profile-name-input").val();
    var phone = $("#profile-phone-input").val();
    var email = $("#profile-email-input").val();
    const data = {
        name: name,
        phone: phone,
        email: email
    }

    

});