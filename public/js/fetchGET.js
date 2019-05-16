function fetchGET(url, jwt) {
    var hostData;
    fetch(url, {
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

    hostData = [{
        "startTime": "2019-05-14T12:00:00.000Z",
        "endTime": "2019-05-14T16:00:00.000Z",
        "cost": "19.99",
        "address": "3341 Wellington Ave",
        "city": "Vancouver", "cName": "my charger",
        "client": "client"
    }, {
        "startTime": "2019-05-14T12:00:00.000Z",
        "endTime": "2019-05-14T16:00:00.000Z",
        "cost": "19.99",
        "address": "3341 Wellington Ave",
        "city": "Vancouver",
        "cName": "your Charger",
        "client": "client"
    }]
    return hostData;
}