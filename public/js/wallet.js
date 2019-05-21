// Sets the variables to be passed into the get balance function

// Set routing url
const url = '/users/me'

// JSON Web Token authorization
const jwt = localStorage.getItem('jwt');

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