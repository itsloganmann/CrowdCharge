console.log("file loaded success");
function addEventListenerOnAccept(element, bookingID, jwt) {
    element.click(async event => {

        var url = '/booking/acceptBooking';

        const dataToSend = {
            bUID: '5cdf0f52ce2067d7e420c9da'
        }
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => console.log(res))
        .then((response) => {
            console.log('Success: booking accepted!', (response))
        })
        .catch(error => console.error('Error:', error));
    })
}

function addEventListenerOnReject(element, bookingID) {
    element.click(async event => {


        await fetch('booking/declineBooking', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body:JSON.stringify({
                bUID: bookingID
            })
        }).then(res => console.log(res)
        ).then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    })
}
