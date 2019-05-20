const jwt = localStorage.getItem('jwt');
if (jwt) {
	console.log("Logged in");
	$("#login-button").remove();
} else {
	console.log("Not logged in");
	$("#bell-wrapper").remove();
	$("#user-menu-button").remove();
}

// Creates initial popup
var createPopup = () => {
	$('body').css({'position': 'fixed', 'width': '100%'});
	var popupWrapper = document.createElement('div');
	popupWrapper.id = "popup-wrapper";
	var popup = document.createElement('div');
	popup.id = "popup";
	popupWrapper.appendChild(popup);
	$('body').prepend(popupWrapper);
	$('#popup').prepend('<span id="popup-close-button" class="fas fa-times ui-button-custom"></span>');
	$("#popup").fadeIn(200);
}

// Creates header element
var createPopupHeader = (size, text, id, className) => {
	var popupHeader = document.createElement(size);
	popupHeader.className = className;
	popupHeader.id = id;
	$('#popup').append(popupHeader);
	$(popupHeader).html(text);
}

var createPopupContent = (targetId, type, id, className) => {
	var popupContent = document.createElement(type);
	if (className != undefined) {
		popupContent.className = className;
	}
	popupContent.id = id;
	$('#' + targetId).append(popupContent);
}

var createPopupConfirmButton = (id, text) => {
	var popupConfirm = document.createElement('button');
	popupConfirm.id = id;
	popupConfirm.className = "orange-button";
	$('#popup').append(popupConfirm);
	$('#' + id).html(text);
}

var createPopupCancelButton = (id, text) => {
	var popupCancel = document.createElement('button');
	popupCancel.id = id;
	popupCancel.className = "white-button";
	$('#popup').append(popupCancel);
	$('#' + id).html(text);
}

/*
var createFormButton = (id, text) => {
	var button = document.createElement('input');
	button.setAttribute("type", "submit");
	button.setAttribute("value", "Confirm");
	button.id = id;
	button.className = "orange-button";
	$('#popup').append(button);
}
*/

var months = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"];

var getCurrentDate = () => {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	return (year + "-" + (month >= 10 ? month : "0" + month) + "-" + day);
}

/*
var addPopupHiddenField = (name, value) => {
	let input = document.createElement("input")
	input.setAttribute("type", "hidden");
	input.setAttribute("name", name);
	input.setAttribute("value", value);
	$('#popup').append(input);
}
*/

var createPopupInput = (targetId, type, name, id, className, value) => {
	let input = document.createElement("input")
	input.setAttribute("type", type);
	input.setAttribute("name", name);
	if (value !== undefined) {
		input.setAttribute("value", value);
	}
	input.id = id;
	input.className = className;
	$('#' + targetId).append(input);
}

var createPopupLabel = (targetId, relatedInput, text, id, className) => {
	let label = document.createElement("label");
	label.id = id;
	label.className = className;
	label.innerText = text;
	label.setAttribute("for", relatedInput);
	$('#' + targetId).append(label);
}

var createErrorMessage = (targetId, message, className) => {
	let element = document.createElement("div");
	element.className = className;
	element.innerText = message;
	$('#' + targetId).prepend(element);

}

// Removes popup
$('body').on("click", "#popup-wrapper, #popup-close-button", (e) => {
	if (e.target.id == "popup-wrapper" || e.target.id == "popup-close-button") {
		$("#popup-wrapper").remove();
		$('body').css('position','initial');
	}
});

// Creating login pop-up
$("#login-button").on("click", () => {
	createPopup();
	createPopupHeader("h3", "Log in to your account", "login-header", "popup-header");
	createPopupContent("popup", "div", "login-email-wrapper", "full-center-wrapper");
	createPopupContent("popup", "div", "login-password-wrapper", "full-center-wrapper");

	createPopupLabel("login-email-wrapper", "login-email-input", "Email", "login-email-label", "form-label");
	createPopupLabel("login-password-wrapper", "login-password-input", "Password", "login-password-label", "form-label");

	createPopupInput("login-email-wrapper", "email", "email", "login-email-input", "form-input");
	createPopupInput("login-password-wrapper", "password", "password", "login-password-input", "form-input");

	createPopupConfirmButton("login-popup-button", "LOGIN");
	$("#login-popup-button").addClass("disabled-button");


	createPopupContent("popup", "div", "popup-signup-text");
	$("#popup-signup-text").html("Don't have an account?&nbsp");
	createPopupContent("popup-signup-text", "span", "popup-signup-here");
	$("#popup-signup-here").html("Sign up here!");
	$("#popup").addClass("full-screen-modal");
});

// Creating sign up pop-up
$('body').on("click", "#popup-signup-here", () => {
	console.log("Creating account...");
	signInPage = $("#popup").children().detach();
	createPopupHeader("h3", "Let's Get Started!", "signup-header", "popup-header");

	createPopupContent("popup", "div", "signup-name-wrapper", "full-center-wrapper");
	createPopupContent("popup", "div", "signup-email-wrapper", "full-center-wrapper");
	createPopupContent("popup", "div", "signup-password-wrapper", "full-center-wrapper");
	createPopupContent("popup", "div", "signup-confirm-password-wrapper", "full-center-wrapper");
	createPopupContent("popup", "div", "signup-phone-wrapper", "full-center-wrapper");

	createPopupLabel("signup-email-wrapper", "signup-email-input", "Email", "signup-email-label", "form-label");
	createPopupLabel("signup-name-wrapper", "signup-name-input", "Name", "signup-name-label", "form-label");
	createPopupLabel("signup-phone-wrapper", "signup-phone-input", "Phone", "signup-phone-label", "form-label");
	createPopupLabel("signup-password-wrapper", "signup-password-input", "Password", "signup-password-label", "form-label");
	createPopupLabel("signup-confirm-password-wrapper", "signup-confirm-password-input", "Confirm Password", "signup-confirm-password-label", "form-label");

	createPopupInput("signup-email-wrapper", "email", "email", "signup-email-input", "form-input");
	createPopupInput("signup-name-wrapper", "text", "name", "signup-name-input", "form-input");
	createPopupInput("signup-phone-wrapper", "tel", "phoneNumber", "signup-phone-input", "form-input");
	$("#signup-phone-input").attr("maxlength", "10");
	createPopupInput("signup-password-wrapper", "password", "password", "signup-password-input", "form-input");
	createPopupInput("signup-confirm-password-wrapper", "password", "password2", "signup-confirm-password-input", "form-input");

	createPopupConfirmButton("signup-popup-button", "SIGN UP");
	$("#signup-popup-button").addClass("disabled-button");
	$("#signup-popup-button").prop("disabled", "true");
	createPopupCancelButton("signup-popup-back-button", "BACK TO SIGN IN");
	$("#signup-popup-back-button").on('click', () => {
		$("#popup").children().remove();
		$("#popup").append(signInPage);
	});
});

// Login button listener
$('body').on('click', '#login-popup-button', (event) => {
	$("#login-validation").remove();
	const useremail = $('#login-email-input').val();
	const userpassword = $('#login-password-input').val();
	const url = '/users/login'
	const data = {
		email: useremail,
		password: userpassword
	}

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
		.then((response) => {
			if (response.error){
				$('#login-popup-button').before("<div id='login-validation' class='error-message'>Unable to sign in. Please try again.</div>")
			} else {
				console.log('Success:', JSON.stringify(response))
				localStorage.setItem('jwt', response.token)
				window.location.replace('/client_dashboard');
			}
		})
		.catch(error => console.error('Error:', error));
});

// Signup button listener
$('body').on('click', '#signup-popup-button', (event) => {
	if ($('#signup-confirm-password-input').val() == $('#signup-password-input').val()) {
	const useremail = $('#signup-email-input').val();
	const username = $('#signup-name-input').val();
	const userphone = $('#signup-phone-input').val();
	const userpassword = $('#signup-password-input').val();
	const url = '/users/signup'
	const data = {
		name: username,
		email: useremail,
		password: userpassword,
		phone: userphone
	}
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
		.then( (response) => {
			if (response.errors || response.name) {
			if (response.name === "MongoError") {
				$("#email-validation").remove();
				$('#signup-email-input').after("<div id='email-validation' class='form-error-text'>Invalid email, please use another email!</div>")
				$('#signup-email-input').addClass('invalid-input-underline');
				$('#signup-email-label').addClass('invalid-input-label');
			}	
			if (response.errors.email) {
				$("#email-validation").remove();
				$('#signup-email-input').after("<div id='email-validation' class='form-error-text'>Invalid email format!</div>")
				$('#signup-email-input').addClass('invalid-input-underline');
				$('#signup-email-label').addClass('invalid-input-label');
			}
			if (response.errors.phone) {
				$("#phone-validation").remove();
				$('#signup-phone-input').after("<div id='phone-validation' class='form-error-text'>Invalid phone number!</div>")
				$('#signup-phone-input').addClass('invalid-input-underline');
				$('#signup-phone-label').addClass('invalid-input-label');
			} 
			if (response.errors.password) {
				$("#password-validation").remove();
				$('#signup-confirm-password-input').after("<div id='password-validation' class='form-error-text'>Invalid password!</div>")
				$('#signup-confirm-password-input').addClass('invalid-input-underline');
				$('#signup-confirm-password-label').addClass('invalid-input-label');
			} 
		} else if (!response.errors) {
			console.log('Login success:', JSON.stringify(response))
			localStorage.setItem('jwt', response.token)
			window.location.replace('/client_dashboard');
			}
		})
		.catch(error => console.error('Error:', error));
	} else {
		$("#password-validation").remove();
		$('#signup-confirm-password-input').after("<div id='password-validation' class='form-error-text'>Your password does not match!</div>")
		$('#signup-confirm-password-input').addClass('invalid-input-underline');
		$('#signup-confirm-password-label').addClass('invalid-input-label');
	}
});

// Logout button listener
$('body').on('click', '#logout-button', (event) => {
	event.preventDefault();
	const url = '/users/logout'

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	}).then(res => console.log(res))
		.then((response) => {
			console.log('Success:', JSON.stringify(response))
			localStorage.removeItem('jwt')
			window.location.replace('/index');
		})
		.catch(error => console.error('Error:', error));
});

// Enables sign up button if all fields are filled
$('body').on('input', '#signup-name-input, #signup-email-input, #signup-password-input, #sigup-confirm-password-input, #signup-phone-input', (event) => {
	var formFilled = false;
	if ($('#signup-name-input').val() && $('#signup-email-input').val() && $('#signup-password-input').val()
		&& $('#signup-confirm-password-input').val() && $('#signup-phone-input').val()) {
		formFilled = true;
	}
	if (formFilled) {
		$('#signup-popup-button').removeAttr('disabled');
		$('#signup-popup-button').removeClass('disabled-button');
	} else {
		$('#signup-popup-button').prop('disabled', true);
		$('#signup-popup-button').addClass('disabled-button');
	}
});

// Enables log in button if all fields are filled
$('body').on('input', '#login-email-input, #login-password-input', (event) => {
	var formFilled = false;
	if ($('#login-email-input').val() && $('#login-password-input').val()) {
		formFilled = true;
	}
	if (formFilled) {
			$('#login-popup-button').removeAttr('disabled');
			$('#login-popup-button').removeClass('disabled-button');
	} else {
			$('#login-popup-button').prop('disabled', true);
			$('#login-popup-button').addClass('disabled-button');
	}
});

// Displays error message if passwords do not match upon leaving Confirm Password field.
$('body').on('focusout', '#signup-confirm-password-input', () => {
	if ($('#signup-password-input').val() != "" && $('#signup-password-input').val() != "" &&
		$('#signup-confirm-password-input').val() != $('#signup-password-input').val() && $('#password-validation').length === 0) {
		$('#signup-confirm-password-input').after("<div id='password-validation' class='form-error-text'>Your password does not match!</div>")
		$('#signup-confirm-password-input').addClass('invalid-input-underline');
		$('#signup-confirm-password-label').addClass('invalid-input-label');
	}
});

// Prevents users from entering non-digit values in the phone input field
$('body').on('keypress', '#signup-phone-input', (evt) => {
    if (evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
});


// Removes error messages when typing in the input fields
$('body').on('keyup', '#signup-confirm-password-input', (evt) => {
	$('#signup-confirm-password-input').removeClass('invalid-input-underline');
	$('#signup-confirm-password-label').removeClass('invalid-input-label');
	$("#password-validation").remove();
});
$('body').on('keyup', '#signup-email-input', (evt) => {
	$('#signup-email-input').removeClass('invalid-input-underline');
	$('#signup-email-label').removeClass('invalid-input-label');
	$("#email-validation").remove();
});
$('body').on('keyup, keypress', '#signup-phone-input', (evt) => {
	$('#signup-phone-input').removeClass('invalid-input-underline');
	$('#signup-phone-label').removeClass('invalid-input-label');
	$("#phone-validation").remove();
});