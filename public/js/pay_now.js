
//fetch call if user confirmed to accept the request
$('body').on("click", "#accept-btn", (e) => {
    //setting all require info to make a request
    var url = '/booking/payBooking';
    const dataToSend = {
        bUID: bookingObj.bookingID
    }
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then(res => {
        console.log(res)
        if (res.status == 200)
            successful = true;
    })
        .then((response) => {
            //to be remove
            successful = true;
            //////////////////
            /*
            if (successful) {
                $("#popup").children().remove();
                createPopupHeader("h3", "You've accepted the booking!", "confirm-popup-header", "popup-header");
                $('body').on("click", (e) => {
                    location.reload(true);
                })

            } else {
                //if we recieve status for 404/400/500 

            }*/
            console.log("success");

        })
        .catch(error => console.error(error));
});


