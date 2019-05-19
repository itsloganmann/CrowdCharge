const jwt = localStorage.getItem('jwt');
notifications = [];
//gather notification from database
fetch('notification', {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + jwt
    }
}).then((res) => {
    return res.json()
}).then((db) => {
    notifications = db;
}).catch(error => console.log(error));



