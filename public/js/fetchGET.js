async function fetchGET(url, jwt) {
    var hostData;
    await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
        .then((res) => {
            return res.json()
        })
        .then((db) => {
            hostData = JSON.parse(JSON.stringify(db))
        });
    return hostData;
}
function getTime(timeObject) {
	return timeObject.split("T")[1].split(":00.000Z")[0].replace(/^0+/, '');
}