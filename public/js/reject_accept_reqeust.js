console.log("file loaded success");
function addEventListenerOnAccept(element, bookingID, jwt) {
    element.click(async event => {
        var url = '/booking/acceptBooking';
        const dataToSend = {
            bUID: bookingID
        }
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            console.log(res)
            if (res.status == 200) {
                console.log("You've accepted the booking! We are redirecting you to charger dashboard!")
                window.location.replace('/host_dashboard');
            } else {
            }
        })
            .then((response) => {
            })
            .catch(error => console.error('Error:', error));
    })
}

function addEventListenerOnReject(element, bookingID) {
    element.click(async event => {
        const dataToSend = {
            bUID: bookingID
        }
        await fetch('booking/declineBooking', {
            method: 'DELETE',
            body: JSON.stringify(dataToSend),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            console.log(res)
            if (res.status == 200) {
                console.log("You've declined the booking! We are redirecting you to charger dashboard!")
                window.location.replace('/host_dashboard');
            }
        })
            .catch(error => console.error('Error:', error));
    })
}
