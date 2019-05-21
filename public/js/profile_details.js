// Controls the profile details page.
//
// Lets the host edit their profile information, change their password, 
// and change their notification settings.

// Changes tab colours and clears tab contents
// Clearing done when switching tabs to allow for new data population
$('.tab-button').on('click', (e) => {
    $('.tab-button:not(#' + event.target.id + ')').removeClass('orange-highlight');
	$('#' + event.target.id).addClass('orange-highlight');
	$('#tab-content').children().remove();
});

// Named function for default tab load and on click
function defaultTab () {

    // GET user data
    fetch('/users/me', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then((res) => {
        return res.json()
    }).then(async (db) => {
        // Display user data
        $('#profile-name-input').val(db.name);
        $('#profile-email-input').val(db.email);
        $('#profile-phone-input').val(db.phone);

        // Set attributes to readonly
        $('#profile-name-input').attr('readonly', 'true');
        $('#profile-email-input').attr('readonly', 'true');
        $('#profile-phone-input').attr('readonly', 'true');

    }).catch(error => console.log(error));

    // Rendering
    var detailsContainer = createContentContainer('details-content', 'details-header', 'Profile Details', '', '');
    $(detailsContainer).append($(
        "<div id='profile-details' class='tab-section-content col-12'>" +
                "<form class='col-11 tab-section-data row' id='profile-details-form'>" +
                    "<div class='full-center-wrapper' id='profile-name-wrapper'>" +
                        "<label id='profile-name-label' class='form-label profile-label' for='profile-name-input'>Name</label>" +
                        "<input type='text' name='name' id='profile-name-input' class='form-input profile-input' >" +
                    "</div>" +
                    "<div class='full-center-wrapper' id='profile-email-wrapper'>" +
                        "<label id='profile-email-label' class='form-label profile-label' for='profile-email-input'>Email</label>" +
                        "<input type='text' name='email' id='profile-email-input' class='form-input profile-input' >" +
                    "</div>" +
                    "<div class='full-center-wrapper' id='profile-phone-wrapper'>" +
                        "<label id='profile-phone-label' class='form-label profile-label' for='profile-phone-input'>Phone</label>" +
                        "<input type='text' name='phone' id='profile-phone-input' class='form-input profile-input' >" +
                    "</div>" +
                    
                    "<input type='submit' id='save-btn' class='orange-button small-btn' value='Save'>" +
                    "<button id='edit-btn' class='white-button small-btn'>Edit</button>" +
                "</form>" +
            "</div>"
    ));
    $('#tab-content').append(detailsContainer);

/** Change Password Validation */
// Enables change password button if all fields are filled
$('body').on('input', '#profile-confirmpassword-input, #profile-newpassword-input', (event) => {
	var formFilled = false;
	if ($('#profile-confirmpassword-input').val() && $('#profile-newpassword-input').val()) {
		formFilled = true;
	}
	if (formFilled) {
			$('#password-btn').removeAttr('disabled');
			$('#password-btn').removeClass('disabled-button');
	} else {
			$('#password-btn').prop('disabled', true);
			$('#password-btn').addClass('disabled-button');
	}
});
// Displays error message if passwords do not match upon leaving Confirm Password field for Change Password tab.
$('body').on('focusout', '#profile-confirmpassword-input', () => {
	if ($('#profile-confirmpassword-input').val() != "" && $('#profile-newpassword-input').val() != "" &&
		$('#profile-confirmpassword-input').val() != $('#profile-newpassword-input').val() && $('#password-validation').length === 0) {
		$('#profile-confirmpassword-input').after("<div id='password-validation' class='form-error-text'>Your password does not match!</div>")
		$('#profile-confirmpassword-input').addClass('invalid-input-underline');
		$('#profile-confirmpassword-label').addClass('invalid-input-label');
	}
});
// Removes error message when editing confirm password field
$('body').on('keyup', '#profile-confirmpassword-input', (evt) => {
	$('#profile-confirmpassword-input').removeClass('invalid-input-underline');
	$('#profile-confirmpassword-label').removeClass('invalid-input-label');
	$("#password-validation").remove();
});


    // Edit Button behavior
    $('#edit-btn').click(function (event) {
        event.preventDefault();
        $('#profile-name-input').css({ 'background-color': 'white' });
        $('#profile-email-input').css({ 'background-color': 'white' });
        $('#profile-phone-input').css({ 'background-color': 'white' });
    
        $('#profile-name-input').removeAttr('readonly');
        $('#profile-email-input').removeAttr('readonly');
        $('#profile-phone-input').removeAttr('readonly');
    
        $('#edit-btn').css({ 'display': 'none' });
        $('#save-btn').css({ 'display': 'block' });
    });
    
    //Save button behavior
    $('#save-btn').click((event) => {
        event.preventDefault();
    
        $('#profile-name-input').css({ 'background-color': 'inherit' });
        $('#profile-email-input').css({ 'background-color': 'inherit' });
        $('#profile-phone-input').css({ 'background-color': 'inherit' });
    
        $('#profile-name-input').attr('readonly', 'true');
        $('#profile-email-input').attr('readonly', 'true');
        $('#profile-phone-input').attr('readonly', 'true');
    
        $('#save-btn').css({ 'display': 'none' });
        $('#edit-btn').css({ 'display': 'block' });
    
    
        //PATCH profile information
        var name = $('#profile-name-input').val();
        var phone = $('#profile-phone-input').val();
        var email = $('#profile-email-input').val();
        const dataToSend = {
            name: name,
            phone: phone,
            email: email,
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
};

// Default tab behavior. Onload go to default tab, "Detail"
window.onload = function() {
    defaultTab();
};

// Detail tab event listener
$('#details-tab').click(function (event) {
    defaultTab();
})

// Password tab eventListener
$('#password-tab').click(function (event) {
    // Create a container
    var passwordContainer = createContentContainer('password-content', 'change-password-header', 'Change Password', 'change-password-subheader', '');

    // Append form content
    $(passwordContainer).append($(

        "<form class='col-11 tab-section-data row' id='password-change-form'>" +
            // "<div class='full-center-wrapper' id='profile-currentpassword-wrapper'>" + 
            //     "<label id='profile-currentpassword-label' class='form-label profile-label' for='profile-currentpassword-input'>Current Password</label>" +
            //     "<input type='password' name='currentpassword' id='profile-currentpassword-input' class='form-input profile-input' >" +
            // "</div>" +
            "<div class='full-center-wrapper' id='profile-newpassword-wrapper'>" +
                "<label id='profile-newpassword-label' class='form-label profile-label' for='profile-newpassword-input'>New password</label>" +
                "<input type='password' name='newpassword' id='profile-newpassword-input' class='form-input profile-input' >" +
            "</div>" +
            "<div class='full-center-wrapper' id='profile-confirmpassword-wrapper'>" +
                "<label id='profile-confirmpassword-label' class='form-label profile-label' for='profile-confirmpassword-input'>Confirm new password</label>" +
                "<input type='password' name='confirmpassword' id='profile-confirmpassword-input' class='form-input profile-input' >" +
            "</div>" +
            "<input type='submit' id='password-btn' class='orange-button small-btn disabled-button' value='Save Password' readonly></button>" +
        "</form>"));
    $('#tab-content').append(passwordContainer);
    
    //Submit new password function
    $('#password-btn').click(function (event) {
        event.preventDefault();

        if ($('#profile-newpassword-input').val() !== $('#profile-confirmpassword-input').val()) {
            $("#password-validation").remove();
            $('#profile-confirmpassword-input').after("<div id='password-validation' class='form-error-text'>Your password does not match!</div>")
            $('#profile-confirmpassword-input').addClass('invalid-input-underline');
            $('#profile-confirmpassword-label').addClass('invalid-input-label');
        }
        // Check passwords and PATCH new password
        if ($('#profile-newpassword-input').val() == $('#profile-confirmpassword-input').val()) {
            const newpassword = $('#profile-newpassword-input').val();
            const url = '/users/me'
            const data = {
                password: newpassword
            }
            fetch (url, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                }
            }).then(res => {
                console.log(res);        
            }).then((response) => {
                createPopup();
                createPopupHeader("h5", "Password change successful", "confirm-popup-header", "popup-header");
                $('body').on("click", (e) => {
                    location.reload(true);
                });
            }).catch(error => console.error('Password Error:', error));
        }

    });
});

// Notification tab event listener
$('#notification-tab').click(function (event) {
    var notificationContainer = createContentContainer('notification-container', 'notification-header', 'Notification Settings', 'notification-sub', '');

    $(notificationContainer).append($(
        "<div id='notif-settings' class='tab-section-content col-12'>" +
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