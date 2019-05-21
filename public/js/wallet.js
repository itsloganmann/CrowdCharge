// Sets the variables to be passed into the get balance function
const url = '/users/me'
const jwt = localStorage.getItem('jwt')

// Function declaration to retrieve current balance from the database
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

// Calls the above function to get balance.
getBalance(url, jwt)