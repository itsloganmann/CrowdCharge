const jwt = localStorage.getItem('jwt');


fetch('/users/me', {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + jwt
    }
}).then((res) => {
    return res.json()
}).then(async (db) => {
    $("#profile-name-input").val(db.name);
    $("#profile-email-input").val(db.email);
    $("#profile-phone-input").val(db.phone);

    $("#profile-name-input").attr("readonly", "true");
    $("#profile-email-input").attr("readonly", "true");
    $("#profile-phone-input").attr("readonly", "true");
}).catch(error => console.log(error));


$("#edit-btn").click(function (event) {
    event.preventDefault();
    $("#profile-name-input").css({ "background-color": "white" });
    $("#profile-email-input").css({ "background-color": "white" });
    $("#profile-phone-input").css({ "background-color": "white" });
    $("#profile-name-input").removeAttr("readonly");
    $("#profile-email-input").removeAttr("readonly");
    $("#profile-phone-input").removeAttr("readonly");
    $("#edit-btn").css({ "display": "none" });
    $("#save-btn").css({ "display": "block" });
});


$("#save-btn").click((event) => {
    event.preventDefault();

    $("#profile-name-input").css({ "background-color": "inherit" });
    $("#profile-email-input").css({ "background-color": "inherit" });
    $("#profile-phone-input").css({ "background-color": "inherit" });
    $("#profile-name-input").attr("readonly", "true");
    $("#profile-email-input").attr("readonly", "true");
    $("#profile-phone-input").attr("readonly", "true");

    $("#save-btn").css({ "display": "none" });
    $("#edit-btn").css({ "display": "block" });


    //POST
    var name = $("#profile-name-input").val();
    var phone = $("#profile-phone-input").val();
    var email = $("#profile-email-input").val();
    const dataToSend = {
        name: name,
        phone: phone,
        email: email
    }


    fetch('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(dataToSend),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then(res => {
        console.log(res)

    }).then((response) => {
    }).catch(error => console.error('Error:', error));


});