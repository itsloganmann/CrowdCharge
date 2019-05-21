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

// Changes tab colours
$('.tab-button').on('click', (e) => {
	$('.tab-button:not(#' + event.target.id + ')').removeClass('orange-highlight');
	$('#' + event.target.id).addClass('orange-highlight');
});

