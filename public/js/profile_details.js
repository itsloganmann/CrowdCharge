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
    $('#profile-name-input').val(db.name);
    $('#profile-email-input').val(db.email);
    $('#profile-phone-input').val(db.phone);

    $('#profile-name-input').attr('readonly', 'true');
    $('#profile-email-input').attr('readonly', 'true');
    $('#profile-phone-input').attr('readonly', 'true');
    $('#profile-currentpassword-input').attr('readonly', 'true');
    $('#profile-newpassword-input').attr('readonly', 'true');
    $('#profile-confirmpassword-input').attr('readonly', 'true');

}).catch(error => console.log(error));

// Changes tab colours and clears tab contents
// Clearing done when switching tabs to allow for new data population
$('.tab-button').on('click', (e) => {
	$('.tab-button:not(#' + event.target.id + ')').css({ 'color': 'black' });
	$('#' + event.target.id).css({ 'color': '#F05A29' });
	$('#tab-content').children().remove();
});

//tab's eventListener
$('#password-tab').click(function (event) {

    // Create a container
    var passwordContainer = createContentContainer('password-content', 'change-password-header', 'Change Password', 'change-password-subheader', '');

    // Append form content
    $(passwordContainer).append($(
        "<form class='col-11 tab-section-data row' id='password-change-form'>" +
            "<div class='full-center-wrapper' id='profile-currentpassword-wrapper'>" + 
                "<label id='profile-currentpassword-label' class='form-label profile-label' for='profile-currentpassword-input'>Current Password</label>" +
                "<input type='password' name='currentpassword' id='profile-currentpassword-input' class='form-input profile-input' >" +
            "</div>" +
            "<div class='full-center-wrapper' id='profile-newpassword-wrapper'>" +
                "<label id='profile-newpassword-label' class='form-label profile-label' for='profile-newpassword-input'>New password</label>" +
                "<input type='password' name='newpassword' id='profile-newpassword-input' class='form-input profile-input' >" +
            "</div>" +
            "<div class='full-center-wrapper' id='profile-confirmpassword-wrapper'>" +
                "<label id='profile-confirmpassword-label' class='form-label profile-label' for='profile-confirmpassword-input'>Confirm new password</label>" +
                "<input type='text' name='confirmpassword' id='profile-confirmpassword-input' class='form-input profile-input' >" +
            "</div>" +
            "<input type='submit' id='submit-btn' class='orange-button small-btn' value='Save Password'></button>" +
        "</form>"));
    $('#tab-content').append(passwordContainer);
});

$('#notification-tab').click(function (event) {
    var notificationContainer = createContentContainer('notification-container', 'notification-header', '', 'notification-sub', '');

    $(notificationContainer).append($(
        "<div id='notif-settings' class='tab-section-content col-12'>" +
        "<h3 class='col-11 inner-header' id='notif-settings-header'><b>Notification Settings</b></h3>" +
        "<div class='col-11 tab-section-data row' id='notif-settings-form'>" +
            "<div class='full-center-wrapper'>" +
                "<input type='checkbox' class='notif-checkbox' id='notif-requests-checkbox' checked disabled>" +
                "<label id='notif-requests-checkbox' class='form-label notif-label' for='notif-requests-checkbox'>Receive" +
                    " notifications for booking requests</label>" +
            "</div>" +
            "<div class='full-center-wrapper'>" +
                "<input type='checkbox' class='notif-checkbox' id='notif-unpaid-checkbox' checked disabled>" +
                "<label id='notif-unpaid-checkbox' class='form-label notif-label' for='notif-unpaid-checkbox'>Receive " +
                    "notifications for unpaid bookings</label>" +
            "</div>" +
            "<button id='notif-button' class='orange-button disabled-button small-btn' disabled>Save</button>" +
        "</div>" +
        "</div>"
    ));
    $('#tab-content').append(notificationContainer);
})

$('#submit-btn').click(function (event) {
    event.preventDefault();
    console.log('Password save button clicked');
})

$('#edit-btn').click(function (event) {
    event.preventDefault();
    $('#profile-name-input').css({ 'background-color': 'white' });
    $('#profile-email-input').css({ 'background-color': 'white' });
    $('#profile-phone-input').css({ 'background-color': 'white' });
    $('#profile-currentpassword-input').css({'background-color': 'white'});
    $('#profile-newpassword-input').css({'background-color': 'white'});
    $('#profile-confirmpassword-input').css({'background-color': 'white'});

    $('#profile-name-input').removeAttr('readonly');
    $('#profile-email-input').removeAttr('readonly');
    $('#profile-phone-input').removeAttr('readonly');
    $('#profile-currentpassword-input').removeAttr('readonly');
    $('#profile-newpassword-input').removeAttr('readonly');
    $('#profile-confirmpassword-input').removeAttr('readonly');

    $('#edit-btn').css({ 'display': 'none' });
    $('#save-btn').css({ 'display': 'block' });
});


$('#save-btn').click((event) => {
    event.preventDefault();

    $('#profile-name-input').css({ 'background-color': 'inherit' });
    $('#profile-email-input').css({ 'background-color': 'inherit' });
    $('#profile-phone-input').css({ 'background-color': 'inherit' });
    $('#profile-currentpassword-input').css({'background-color': 'inherit'});
    $('#profile-newpassword-input').css({'background-color': 'inherit'});
    $('#profile-confirmpassword-input').css({'background-color': 'inherit'});

    $('#profile-name-input').attr('readonly', 'true');
    $('#profile-email-input').attr('readonly', 'true');
    $('#profile-phone-input').attr('readonly', 'true');
    $('#profile-currentpassword-input').attr('readonly', 'true');
    $('#profile-newpassword-input').attr('readonly', 'true');
    $('#profile-confirmpassword-input').attr('readonly', 'true');

    $('#save-btn').css({ 'display': 'none' });
    $('#edit-btn').css({ 'display': 'block' });


    //POST
    var name = $('#profile-name-input').val();
    var phone = $('#profile-phone-input').val();
    var email = $('#profile-email-input').val();
    var newpassword = $('#profile-newpassword-input').val();
    const dataToSend = {
        name: name,
        phone: phone,
        email: email,
        password: newpassword
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