
// Highlight specified recharge amount and activates recharge button.
$('.balance-button').on('click', (e) => {
	$('.balance-button').removeClass('balance-button-selected')
	e.target.className += ' balance-button-selected';
	$('#recharge-button').removeAttr('disabled');
	$('#recharge-button').removeClass('disabled-button');
});

// Creates confirmation popup for recharging.
$('#recharge-button').on('click', (e) => {
	if ($('.balance-button-selected').length > 0) {
		let amount = $('.balance-button-selected').html().replace(/^\$+/, '');
		createPopup();
		createPopupHeader('h3', 'Confirmation', 'recharge-popup-header');
		createPopupHeader('h5', 'You have selected a balance of <b>$' + amount + '</b> to recharge. Do you wish to continue?', 'recharge-popup-subheader');
		createPopupConfirmButton('recharge-confirm', 'Confirm');
		createPopupCancelButton("popup-cancel", "Cancel");
	}

});

// After clicking confirmation button for recharging, updates user's balance.
$('body').on('click', '#recharge-confirm', async (e) => {
	let amount = $('.balance-button-selected').html().replace(/^\$+/, '');
	const response = await fetch('/users/addBalance', {
		method: "PATCH",
		body: JSON.stringify({ balance: amount }),
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	})
	const res = await response.json();
	$("#popup").children().not("#popup-close-button").remove();
	createPopupHeader("h5", "You have successfully added <b>$" + amount + "</b> to your balance.", "recharge-finish-header");
	$('body').on("click", (e) => {
		location.reload(true);
	})
});
