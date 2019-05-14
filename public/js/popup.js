var months = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"];


// Creates initial popup with generic IDs
var createPopup = () => {
	var popupWrapper = document.createElement('div');
	popupWrapper.id = "popup-wrapper";
	var popup = document.createElement('div');
	popup.id = "popup";
	popupWrapper.appendChild(popup);
	$('body').prepend(popupWrapper);
}

var createPopupHeader = (size, text, id) => {
	var popupHeader = document.createElement(size);
	popupHeader.className = "popup-header";
	popupHeader.id = id;
	$('#popup').append(popupHeader);
	$('.popup-header').html(text);
}

var createPopupSubheader = (size, text, id) => {
	var popupSubheader = document.createElement(size);
	popupSubheader.className = "popup-subheader";
	popupSubheader.id = id;
	$('#popup').append(popupSubheader);
	$('.popup-subheader').html(text);
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

var getCurrentDate = () => {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var monthFmt = months[today.getMonth()];
	var year = today.getFullYear();
	return (monthFmt + " " + day + ", " + year);
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

$("#login-button").on("click", () => {
	createPopup();
	createPopupHeader("h3", "ZapShare", "login-header");
	createPopupContent("popup", "div", "login-email-wrapper", "popup-input-wrapper");
	createPopupContent("popup", "div", "login-password-wrapper", "popup-input-wrapper");

	createPopupLabel("login-email-wrapper", "login-email-input", "Email", "login-email-label", "form-label");
	createPopupLabel("login-password-wrapper", "login-password-input", "Password", "login-password-label", "form-label");

	createPopupInput("login-email-wrapper", "email", "email", "login-email-input", "form-input");
	createPopupInput("login-password-wrapper", "password", "password", "login-password-input", "form-input");

	createPopupConfirmButton("login-popup-button", "LOGIN");

	createPopupContent("popup", "div", "popup-signup-text");
	$("#popup-signup-text").html("Don't have an account?&nbsp");
	createPopupContent("popup-signup-text", "span", "popup-signup-here");
	$("#popup-signup-here").html("Sign up here!");
	$("#popup").fadeIn(100);
});


$('body').on("click", "#popup-signup-here", () => {
	console.log("Creating account...");
	signInPage = $("#popup").children().detach();
	createPopupHeader("h3", "Let's Get Started!", "signup-header");

	createPopupContent("popup", "div", "signup-email-wrapper", "popup-input-wrapper");
	createPopupContent("popup", "div", "signup-name-wrapper", "popup-input-wrapper");
	createPopupContent("popup", "div", "signup-phone-wrapper", "popup-input-wrapper");
	createPopupContent("popup", "div", "signup-password-wrapper", "popup-input-wrapper");
	createPopupContent("popup", "div", "signup-confirm-password-wrapper", "popup-input-wrapper");

	createPopupLabel("signup-email-wrapper", "signup-email-input", "Email", "signup-email-label", "form-label");
	createPopupLabel("signup-name-wrapper", "signup-name-input", "Name", "signup-name-label", "form-label");
	createPopupLabel("signup-phone-wrapper", "signup-phone-input", "Phone", "signup-phone-label", "form-label");
	createPopupLabel("signup-password-wrapper", "signup-password-input", "Password", "signup-password-label", "form-label");
	createPopupLabel("signup-confirm-password-wrapper", "signup-confirm-password-input", "Confirm Password", "signup-confirm-password-label", "form-label");

	createPopupInput("signup-email-wrapper", "email", "email", "signup-email-input", "form-input");
	createPopupInput("signup-name-wrapper", "text", "name", "signup-name-input", "form-input");
	createPopupInput("signup-phone-wrapper", "tel", "phoneNumber", "signup-phone-input", "form-input");
	$("#signup-phone-input").attr("pattern", "[0-9]{3} [0-9]{3} [0-9]{4}");
	$("#signup-phone-input").attr("maxlength", "12");
	createPopupInput("signup-password-wrapper", "password", "password", "signup-password-input", "form-input");
	createPopupInput("signup-confirm-password-wrapper", "password", "password2", "signup-confirm-password-input", "form-input");

	createPopupConfirmButton("signup-popup-button", "SIGN UP");
	createPopupCancelButton("signup-popup-back-button", "BACK TO SIGN IN");
	$("#signup-popup-back-button").on('click', () => {
		$("#popup").children().remove();
		$("#popup").append(signInPage);
	});
});

$('body').on('click', '#login-popup-button', (event) => {
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
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.error('Error:', error));
});

$('body').on('click', '#signup-popup-button', (event) => {
	const useremail = $('#signup-email-input').val();
	const username = $('#signup-name-input').val();
	const userphone = $('#signup-phone-input').val();
	const userpassword = $('#signup-password-input').val();
	const url = '/users/signup'
	const data = {
		name: username,
		email: useremail,
		password: userpassword
	}
	console.log(data);
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.error('Error:', error));
});
