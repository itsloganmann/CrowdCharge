// Checks if passwords match.
const checkPasswordMatch = () => {
    if ($('#profile-newpassword-input').val() !== $('#profile-confirmpassword-input').val()) {
        $("#password-validation").remove();
        $('#profile-confirmpassword-input').after("<div id='password-validation' class='form-error-text'>Your password does not match!</div>");
        $('#profile-confirmpassword-input').addClass('invalid-input-underline');
        $('#profile-confirmpassword-label').addClass('invalid-input-label');
        return false;
    } else {
        return true;
    }
}

// Removes error message when editing confirm password field.
$('#profile-confirmpassword-input, #profile-newpassword-input').on('keydown', () => {
    $('#profile-confirmpassword-input').removeClass('invalid-input-underline');
    $('#profile-confirmpassword-label').removeClass('invalid-input-label');
    $("#password-validation").remove();
});

// Displays error message if passwords do not match upon leaving Confirm Password field.
$('#profile-confirmpassword-input').on('focusout', () => {
    if ($('#profile-confirmpassword-input').val() !== "" && $('#profile-newpassword-input').val() !== "" &&
        $('#profile-confirmpassword-input').val() !== $('#profile-newpassword-input').val() && $('#password-validation').length === 0) {
        $('#profile-confirmpassword-input').after("<div id='password-validation' class='form-error-text'>Your password does not match!</div>")
        $('#profile-confirmpassword-input').addClass('invalid-input-underline');
        $('#profile-confirmpassword-label').addClass('invalid-input-label');
    }
});


// Enables change password button if all fields are filled.
$('#profile-confirmpassword-input, #profile-newpassword-input').on('input', (e) => {
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

// Changes password.
const changePassword = () => {
    const newpassword = $('#profile-newpassword-input').val();
    const url = '/users/me';
    const data = {
        password: newpassword
    };
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then(res => {
        if (res.status == 400) {
            throw new Error();
        } else {
            createPopup();
            createPopupHeader("h5", "Password change successful", "confirm-popup-header", "popup-subheader");
            $('body').on("click", (e) => {
                location.reload(true);
            });
        }
    }).catch((error) => {
        $("#password-validation").remove();
        $('#profile-confirmpassword-input').after("<div id='password-validation' class='form-error-text'>Password does not meet security requirements, please try again.</div>");
        $('#profile-confirmpassword-input').addClass('invalid-input-underline');
        $('#profile-confirmpassword-label').addClass('invalid-input-label');
    });
}

// Password save button functionality.
$('#password-btn').click(function (e) {
    e.preventDefault();
    if (checkPasswordMatch()) {
        changePassword();
    }
});