// Gets and displays user balance.
(async function getBalance(url) {
	const response = await fetch('/users/me', {
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
})();