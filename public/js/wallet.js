// Sets the variables to be passed into the get balance function
const url = '/users/me'
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