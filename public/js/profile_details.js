// Save button functionality
$('#save-btn').click((e) => {
    e.preventDefault();
    var name = $('#profile-name-input').val();
    var phone = $('#profile-phone-input').val();
    var email = $('#profile-email-input').val();
    const data = {
        name: name,
        phone: phone,
        email: email,
    }

    fetch('/users/me', {
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
            $('#profile-name-input').css({ 'background-color': 'inherit' });
            $('#profile-email-input').css({ 'background-color': 'inherit' });
            $('#profile-phone-input').css({ 'background-color': 'inherit' });

            $('#profile-name-input').attr('disabled', 'true');
            $('#profile-email-input').attr('disabled', 'true');
            $('#profile-phone-input').attr('disabled', 'true');

            $('#save-btn').css({ 'display': 'none' });
            $('#edit-btn').css({ 'display': 'block' });
            $("#gen-validation").remove();
        }
    }).catch(error => {
        $("#gen-validation").remove();
        $('#save-btn').after("<div id='gen-validation' class='form-error-text'>There was an issue saving your details, please try again.</div>")
    });
});

// Edit button functionality
$('#edit-btn').click(function (e) {
    e.preventDefault();
    $('#profile-name-input').css({ 'background-color': 'white' });
    $('#profile-email-input').css({ 'background-color': 'white' });
    $('#profile-phone-input').css({ 'background-color': 'white' });

    $('#profile-name-input').removeAttr('disabled');
    $('#profile-email-input').removeAttr('disabled');
    $('#profile-phone-input').removeAttr('disabled');

    $('#edit-btn').css({ 'display': 'none' });
    $('#save-btn').css({ 'display': 'block' });
});

// Enables save profile details button if all fields are filled.
$('#profile-name-input, #profile-email-input, #profile-phone-input').on('input', (e) => {
    let formFilled = false;
    if ($('#profile-name-input').val() && $('#profile-email-input').val() && $('#profile-phone-input')) {
        formFilled = true;
    }
    if (formFilled) {
        $('#save-btn').removeAttr('disabled');
        $('#save-btn').removeClass('disabled-button');
    } else {
        $('#save-btn').prop('disabled', true);
        $('#save-btn').addClass('disabled-button');
    }
});

// Prevents users from entering non-digit values in the phone input field.
$('#profile-phone-input').on('keypress', (e) => {
    if (e.which < 48 || e.which > 57) {
        e.preventDefault();
    }
});

// Gets and displays profile details.
(async function retrieveProfileDetails() {
    const response = await fetch('/users/me', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const res = await response.json();
    // Display user data
    $('#profile-name-input').val(res.name);
    $('#profile-email-input').val(res.email);
    $('#profile-phone-input').val(res.phone);
})();