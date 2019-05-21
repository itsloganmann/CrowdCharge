let notifications = [];
//mock data
/* notifications = [
    {
        type: 'NEWREQ',
        booking: {
            timeStart: "2019-05-14T12:00:00.000Z",
            timeEnd: "2019-05-14T16:00:00.000Z",
            chargername: "Louis's charger"
        }
    }, {
        type: 'ACCEPTED',
        booking: {
            timeStart: "2019-05-14T12:00:00.000Z",
            timeEnd: "2019-05-14T16:00:00.000Z",
            address: "12345 152 St.",
            city: "Surrey",
            province: "BC"
        }
    }, {
        type: 'DECLINED',
        booking: {
            timeStart: "2019-05-14T12:00:00.000Z",
            timeEnd: "2019-05-14T16:00:00.000Z",
            city: "Vancouver",
            province: "BC",
            chargername: "Louis's charger"
        }
    }, {
        type: 'PAID',
        booking: {
            timeStart: "2019-05-14T12:00:00.000Z",
            timeEnd: "2019-05-14T16:00:00.000Z",
            chargername: "Louis's charger"
        }

    }
] */

//Click event Handler function
function deleteNotification(notificationID, index, cardID) {
    reqParam = {
        id: notificationID
    }
    console.log(notificationID)
    fetch('/notifications?' + $.param(reqParam), {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then((res) => {
        return res.json()
    }).then((data) => {
        $("#" +cardID).toggle("drop");
    }).catch(error => console.log(error));
}

//helper functions
function getTime(timeObject) {
    return timeObject.split("T")[1].split(":00.000Z")[0];
}

function noNotification() { }
function buildElement(notificationObj, type, subheading, cardColor, content, index) {
    //create containers if they aren't already exist
    var typeContent = document.getElementById(type + "-content");
    if (!(document.getElementById("tab-content").contains(typeContent))) {
        createContent("tab-content", "div", type + "-content", "tab-section-content col-12");
        createHeader(type + "-content", "h3", type, "col-11 inner-header");
        createSubheader(type + "-content", "h6", subheading, "col-11 inner-subheader");
        createContent(type + "-content", "div", "notif-" + type + "-data", "col-11 tab-section-data row");
    }


    //create card    
    var cardID= type + "-card-" + index;
    createContent("notif-" + type + "-data", "div", cardID, "card-panel col-md-5 " + cardColor + "-card");
    var x = $("<span id='card-close-btn" + index + "' style='float: right' class='fas fa-times ui-button-custom'></span>");
    var span = $("<span>" + content + "</span>");
    $("#" + cardID).append(x);
    $("#" + cardID).append(span);

    $(document).on("click", "#card-close-btn" + index, async (e) => {
        console.log(notificationObj._id);
        deleteNotification(notificationObj._id, index, cardID);

    })
    $(document).on("click", ".fa-arrow-right", async (e) => {
        if (type == "accepted" || type == "declined") {
            location.replace('/client_dashboard');
        } else {
            location.replace('/host_dashboard');
        }
    })



}

//main function
async function renderNotification() {

    //TO BE REMOVE WHEN NOTIFICATION RENDER IS FINISHED
    $("#tab-content").children().remove();
    ///////////////////////////////////////////////////

    //gather notification from database
    await fetch('/notifications', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then((res) => {
        return res.json()
    }).then(async (db) => {
        console.log(db);
        notifications = db;
    }).catch(error => console.log(error));
    //NOTIFICATION FETCH DONE

    if (notifications == "") {
        noNotification();
    } else {
        //msg to display
        let dataInfo = "";
        let count = 0;
        notifications.forEach(async notification => {

            switch (notification.type) {
                //as a host
                case "NEWREQ":
                    dataInfo = "charger Name: "
                        //                        + notification.charger.chargername
                        + "</br>Date: " + notification.booking.timeStart.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.timeStart) + "-"
                        + getTime(notification.booking.timeEnd)
                        + "<span style= 'float: right' class='fas fa-arrow-right' ></span>";

                    buildElement(notification, "request"
                        , "These are user requests to use your"
                        + " charger. Please reject or accept them"
                        + " by the date of the booking."
                        , "orange", dataInfo, count);

                    break;
                case "PAID":
                    dataInfo = "charger name: "
                        //                        + notification.charger.chargername
                        + "</br>Date: " + notification.booking.timeStart.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.timeStart) + "-"
                        + getTime(notification.booking.timeEnd)
                        + "<span style= 'float: right' >...</span>";

                    buildElement(notification, "payment"
                        , "You have received your payment!"
                        , "dark-green", dataInfo, count);

                    break;
                case "CANCELLED":
                    dataInfo = "This is cancellded!";
                    buildElement(notification, "cancelled"
                        , "These pending requests are cancelled."
                        , "grey", dataInfo, count);

                    break;
                //as a client
                case "ACCEPTED":
                    dataInfo = "Address: "
                        //                        + notification.charger.address + " " + notification.charger.city + ", " + notification.charger.province
                        + "</br>Date: " + notification.booking.timeStart.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.timeStart) + "-"
                        + getTime(notification.booking.timeEnd)
                        + "<span style= 'float: right' >...</span>";

                    buildElement(notification, "accepted"
                        , "These bookings have been accepted!"
                        + " Make your payment before the booking day"
                        , "green", dataInfo, count);

                    break;
                case "DECLINED":
                    dataInfo = "Location: "
                        //                        + notification.charger.city + ", " + notification.charger.province
                        + "</br>Date: " + notification.booking.timeStart.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.timeStart) + "-"
                        + getTime(notification.booking.timeEnd)
                        + "<span style= 'float: right' >...</span>";
                    buildElement(notification, "declined"
                        , "these bookings has been declined. "
                        + "You can try to make another booking from the surounding area!"
                        , "dark-orange", dataInfo, count);
                    break;
                default:
                    console.log("data type not found!");
                    break;
            }
            count++;


        });
    }

}


renderNotification();