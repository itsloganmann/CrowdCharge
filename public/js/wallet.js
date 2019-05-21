// Sets the variables to be passed into the get balance function

// Set routing url
const url = '/users/me'

// Fetch GET call for balance
const getBalance = async (url, jwt) => {

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	})

	const user = await response.json()
	const userBalance = user.balance

	const walletBalance = document.getElementById('walletamount')

	walletBalance.innerHTML = '$' + userBalance.toFixed(2)
}

getBalance(url, jwt)

// Changes price buttons css for reloading
$('.balance-button').on('click', (e) => {
	$('.balance-button').removeClass('balance-button-selected')
	e.target.className += ' balance-button-selected';
	$('#recharge-button').removeAttr('disabled');
	$('#recharge-button').removeClass('disabled-button');
});


// Changes tab colours and displays appropriate tab
$('.tab-button').on('click', (e) => {
	$('.tab-button:not(#' + event.target.id + ')').removeClass('orange-highlight');
	$('#' + event.target.id).addClass('orange-highlight');
	if (e.target.id == "wallet-tab") {
		$('#view-balance').css('display', 'block');
		$('#recharge-balance').css('display', 'none');
	} else {
		$('#view-balance').css('display', 'none');
		$('#recharge-balance').css('display', 'block');
	}
});

// Creates confirmation popup for recharging
$('#recharge-button').on('click', (e) => {
	if ($('.balance-button-selected').length > 0){
		let amount = $('.balance-button-selected').html().replace(/^\$+/, '');
		createPopup();
		createPopupHeader('h3', 'Confirmation', 'recharge-popup-header');
		createPopupHeader('h5', 'You have selected a balance of <b>$' + amount +'</b> to recharge. Do you wish to continue?', 'recharge-popup-subheader');
		createPopupConfirmButton('recharge-confirm', 'Confirm');
		createPopupCancelButton("popup-cancel", "Cancel");
	}
	
}); 

// After clicking confirmation button for recharging, updates user's balance
$('body').on('click', '#recharge-confirm', async (e) => {
	let amount = $('.balance-button-selected').html().replace(/^\$+/, '');
	await fetch('/users/addBalance', {
		method: "PATCH",
		body: JSON.stringify({ balance: amount}),
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	}).then(res => res.json())
	.then(async (response) => {
        $("#popup").children().not("#popup-close-button").remove();
        createPopupHeader("h5", "You have successfully added <b>$" + amount + "</b> to your balance.", "recharge-finish-header");
        $('body').on("click", (e) => {
            location.reload(true);
        })
	})
});