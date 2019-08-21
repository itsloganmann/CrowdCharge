// Immediately fetches chargers hosted by current user.
(async function () {
    const response = await fetch('/chargers', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const chargers = await response.json();
    addChargersToPage(chargers);
})();

// Adds user's chargers to page.
const addChargersToPage = (chargers) => {
    chargers.forEach((charger, index) => {
        displayChargerButton(charger, index);
        addShowChargerInfo(charger, index);
    });
}

// Displays the specified charger button.
const displayChargerButton = (charger, index) => {
    $('#charger-charger').prepend("<div class='col-sm-6'><button class='charger-button orange-button' id='charger-" +
    index + "'>" + charger.chargername + "<br>" + charger.address + "<br>" + "</button></div>");
}

// Adds functionality to show charger info to edit.
const addShowChargerInfo = (charger, index) => {
    (function (index) {
        $('#charger-' + index).on('click', () => {
            showChargerInfo(JSON.stringify(charger))
        });
    })(index);
}

// Shows charger info to user.
async function showChargerInfo(charger) {
    let prevPage = $('#tab-content').children().detach();
    charger = JSON.parse(charger);

    // Populate info from database.
    $("#tab-content").html('<h3 class="inner-header col-11">Edit Charger</h3>'
        + '<h6 class="inner-subheader col-11">Edit your charger!</h6>'
        + '<div class="col-11 tab-section-data row" id="edit-charger-wrapper">'
        + '<form id="edit-charger-form"></form></div>');
    $("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargername"><label id="lb-charger-name" class="form-label readonly-label" for="charger-name">Name</label><input type="text" name="name" disabled="true" value="' + charger.chargername + '" id="charger-name" class="form-input readonly-input" maxlength="14"></div>');
    $("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargeraddress"><label id="lb-charger-address" class="form-label readonly-label" for="charger-address">Address</label><input type="text" name="address" disabled="true" value="' + charger.address + '" id="charger-address" class="form-input readonly-input"></div>');
    $("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargercity"><label id="lb-charger-city" class="form-label readonly-label" for="charger-city">City</label><input type="text" name="city" disabled="true" value="' + charger.city + '" id="charger-city" class="form-input readonly-input"></div>');
    $("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargertype"><label id="lb-charger-type" class="form-label readonly-label" for="charger-type">Charger Type</label><select disabled="" id="charger-type" class="form-input readonly-input" name="type" form="edit-charger-form" required=""><option value="Wall Outlet">Wall Outlet</option><option value="J-1772">J-1772</option><option value="Tesla (Roadster)">Tesla (Roadster)</option><option value="NEMA 14-50">NEMA 14-50</option><option value="Tesla">Tesla</option></select></div>');
    $("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargerlevel"><label id="lb-charger-level" class="form-label readonly-label" for="charger-level">Charger Level</label><select disabled="" id="charger-level" class="form-input readonly-input" name="level" form="edit-charger-form" required=""><option value="1">1</option><option value="2">2</option></select></div>');
    $("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargerrate"><label id="lb-charger-rate" class="form-label readonly-label" for="charger-rate">Hourly rate</label><input type="text" name="rate" disabled="true" value="' + charger.cost.toFixed(2) + '" id="charger-rate" class="form-input readonly-input left-labelled-input-full"><div class="dollar-symbol">$</div></div>');
    $("#edit-charger-form").append('<div class="full-center-wrapper" id="edit-chargerdetails"><label id="lb-charger-details" class="form-label readonly-label" for="charger-details">Additional details (optional)</label><textarea disabled="" name="details" placeholder="Max 80 characters" id="charger-details" class="form-input-full readonly-input-full" maxlength="80" rows="6" cols="60">' + charger.details + '</textarea></div>');
    document.getElementById("charger-type").value = charger.type;
    document.getElementById("charger-level").value = charger.level;

    // Edit and save buttons
    $("#edit-charger-form").append('<button id="edit-btn" class="orange-button">Edit</button>');
    $("#edit-charger-form").append('<button id="save-btn" display:"none" class="orange-button">Save</button>');
    $("#edit-charger-form").append('<button id="back-btn" class="white-button">Cancel</button>');

    $("#save-btn").css({ "display": "none" });

    // Append previous page.
    $("#back-btn").click((e) => {
        e.preventDefault();
        $("#tab-content").children().remove();;
        $("#tab-content").append(prevPage);
    });

    // Event listener for edit button click
    $('#edit-btn').click(function (e) {
        e.preventDefault();
        $('#edit-btn').css({ "display": "none" });
        $('#save-btn').css({ "display": "block" });
        $('.dollar-symbol').css({ "background-color": "white" });;
        $('.readonly-input, .readonly-input-full').removeAttr("disabled");
        $('.readonly-input').removeClass("readonly-input");
        $('.readonly-input-full').removeClass("readonly-input-full");
    });

    // Event listener for save button click
    $('#save-btn').click(function (e) {
        e.preventDefault();
        $('#save-btn').css({ "display": "none" });
        $('#edit-btn').css({ "display": "block" });;
        $('.dollar-symbol').css({ "background-color": "inherit" });;
        $('.form-input, .form-input-full').attr("disabled", true);
        $('.form-input').addClass("readonly-input");
        $('.form-input-full').addClass("readonly-input-full");

        var cname = $("#charger-name").val();
        var caddress = $("#charger-address").val();
        var ccity = $("#charger-city").val();
        var cprovince = "BC";
        var ctype = $("#charger-type option:selected").text();
        var clevel = parseFloat($("#charger-level option:selected").text());
        var crate = $("#charger-rate").val();
        var cdetails = $("#charger-details").val();
        // Declare data object
        let data = {
            chargername: cname,
            address: caddress,
            city: ccity,
            type: ctype,
            level: clevel,
            cost: crate,
            details: cdetails
        }

        const paramForServer = {
            cUID: charger._id
        }
        // The Fetch PATCH call to the database
		fetch('/charger?' + $.param(paramForServer), {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(data)
        })
            .then(res => console.log(res))
            .then((response) => {
                console.log('Success:', response)
                fetch('/chargers', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + jwt
                    }
                }).then((res) => {
                    return res.json()
                }).then((db) => {
                    chargers = db;
                    location.reload(true);
                }).catch(error => console.log(error));

            })
            .catch(error => console.error('Error:', error));;
    });
}

// Functionality to open add new charger page.
$("#new-charger").on('click', (e) => {
    var prevPage = $("#tab-content").children().detach();
    $("#tab-content").html('<h3 class="inner-header col-11">New Charger</h3>'
        + '<h6 class="inner-subheader col-11">Add a new charger!</h6>'
        + '<div class="col-11 tab-section-data row">'
        + '<form id="new-charger-form">'
        + '<div class="full-center-wrapper"><label id="charger-name-label" class="form-label-full" for="charger-name-input">Name</label><input type="text" name="name" maxlength="14" id="charger-name-input" class="form-input-full" required></div>'
        + '<div class="full-center-wrapper"><label id="charger-address-label" class="form-label-full" for="charger-address-input">Address</label><input type="text" name="address" id="charger-address-input" class="form-input-full" required></div>'
        + '<div class="full-center-wrapper"><label id="charger-city-label" class="form-label-full" for="charger-city-input">City</label><input type="text" name="city" id="charger-city-input" class="form-input-full" required></div>'
        + '<div class="full-center-wrapper"><label id="charger-type-label" class="form-label-full" for="charger-type-input">Charger Type</label><select id="charger-type-input" class="form-input-full" name="type" form="new-charger-form" required><option value="type1">Wall Outlet</option><option value="type2">J-1772</option><option value="type3">Tesla (Roadster)</option><option value="type4">NEMA 14-50</option><option value="type5">Tesla</option></select></div>'
        + '<div class="full-center-wrapper"><label id="charger-level-label" class="form-label-full" for="charger-level-input">Charger Level</label><select id="charger-level-input" class="form-input-full" name="level" form="new-charger-form" required><option value="level-1">1</option><option value="level-2">2</option></select></div>'
        + '<div class="full-center-wrapper"><label id="charger-rate-label" class="form-label-full" for="charger-rate-input">Hourly Rate</label><input type="text" name="rate" id="charger-rate-input" class="form-input-full" required></div>'
        + '<div class="full-center-wrapper"><label id="charger-details-label" class="form-label-full" for="charger-details-input">Additional Details (optional)</label><textarea name="details" id="charger-details-input" class="form-input-full" rows="6" cols="60" placeholder="Max 80 characters"></textarea></div><input class="orange-button disabled-button" id="submit-charger" type="button" value="Add Charger" disabled><input class="white-button" id="cancel-charger" type="button" value="Cancel">' 
        + '</form></div>');
    $("#charger-rate-input").after("<div class='dollar-symbol-full'>$</div>");
    $("#cancel-charger").on('click', (e) => {
        $("#tab-content").children().remove();
        $("#tab-content").append(prevPage);
    });
});

// Enables save charger details button if all fields are filled
$('body').on('input', '#charger-name, #charger-address, #charger-city, #charger-type, #charger-level, #charger-rate', (e) => {
    let formFilled = false;
    if ($('#charger-name').val() && $('#charger-address').val() && $('#charger-city').val()
        && $('#charger-type').val() && $('#charger-level').val() && $('#charger-rate').val()) {
        formFilled = true;
    }
    console.log(formFilled);
    if (formFilled) {
        $('#save-btn').removeAttr('disabled');
        $('#save-btn').removeClass('disabled-button');
    } else {
        $('#save-btn').prop('disabled', true);
        $('#save-btn').addClass('disabled-button');
    }
});

// Enables add new charger button if all fields are filled
$('body').on('input', '#charger-name-input, #charger-address-input, #charger-city-input, #charger-type-input, #charger-level-input, #charger-rate-input', (event) => {
    let formFilled = false;
    if ($('#charger-name-input').val() && $('#charger-address-input').val() && $('#charger-city-input').val()
        && $('#charger-type-input').val() && $('#charger-level-input').val() && $('#charger-rate-input').val()) {
        formFilled = true;
    }
    if (formFilled) {
        $('#submit-charger').removeAttr('disabled');
        $('#submit-charger').removeClass('disabled-button');
    } else {
        $('#submit-charger').prop('disabled', true);
        $('#submit-charger').addClass('disabled-button');
    }
});

// Adds new charger data to database upon button click
$("body").on('click', "#submit-charger", (e) => {
    e.preventDefault();
    const chargeraddress = $('#charger-address-input').val();
    const chargercity = $('#charger-city-input').val();
    const chargerprovince = "BC";
    const chargercountry = "Canada";
    const chargercost = parseFloat($('#charger-rate-input').val());
    const chargername = $('#charger-name-input').val();
    const chargerlevel = parseFloat($('#charger-level-input option:selected').text());
    const chargertype = $('#charger-type-input option:selected').text();
    const chargerdetails = $('#charger-details-input').val();
    const url = '/charger/new'
    const data = {
        address: chargeraddress,
        city: chargercity,
        province: chargerprovince,
        country: chargercountry,
        cost: chargercost,
        chargername: chargername,
        level: chargerlevel,
        type: chargertype,
        details: chargerdetails
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then(res => console.log(res))
        .then((response) => {
            console.log('Success: charger added to db!', (response))
            window.location.replace('/host_dashboard');
        })
        .catch(error => console.error('Error:', error));
});

// Prevents users from entering non digit values and the character "-" in the charger rate input fields
$('body').on('keypress', '#charger-rate, #charger-rate-input', (e) => {
    if (e.which < 46 || e.which > 57 || e.which == 47) {
        e.preventDefault();
    }
});
// Prevents input of more than one decimal
$('body').on('keyup', '#charger-rate, #charger-rate-input', (e) => {
    var val = $(e.target).val();
    if (isNaN($(e.target).val())) {
        val = $(e.target).val().replace(/[^0-9\.]/g, '');
        if ($(e.target).val().split('.').length > 2) {
            val = val.replace(/\.+$/, "");
        }
    }
    $(e.target).val(val);
});
// Converts to two decimal places if at zero or one decimal places
$('body').on('focusout', '#charger-rate, #charger-rate-input', (e) => {
    if (!isNaN(parseFloat($(e.target).val()).toFixed(2))) {
        $(e.target).val(parseFloat($(e.target).val()).toFixed(2));
    } else {
        $(e.target).val("0.00");
    }
});