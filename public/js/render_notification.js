// Renders notifications for users

// Declare array to hold notifications
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
        $("#" + cardID).toggle("drop");
    }).catch(error => console.log(error));
}

// Get Time object and format it
function getTime(timeObject) {
    return timeObject.split("T")[1].split(":00.000Z")[0];
}

// Function for the case of having no notifications
function noNotification() { }

// Creates elements to build the notification card.
function buildElement(notificationObj, type, subheading, cardColor, content, index) {
    var typeContent = document.getElementById(type + "-content");

    // Only builds elements that are not already present
    if (!(document.getElementById("tab-content").contains(typeContent))) {
        createContent("tab-content", "div", type + "-content", "tab-section-content col-12");
        createHeader(type + "-content", "h3", type, "col-11 inner-header");
        createSubheader(type + "-content", "h6", subheading, "col-11 inner-subheader");
        createContent(type + "-content", "div", "notif-" + type + "-data", "col-11 tab-section-data row");
    }


    //create card    
    var cardID = type + "-card-" + index;
    createContent("notif-" + type + "-data", "div", cardID, "card-panel col-md-5 " + cardColor + "-card");
    var x = $("<span id='card-close-btn" + index + "' style='float: right' class='fas fa-times ui-button-custom'></span>");
    var span = $("<span>" + content + "</span>");
    $("#" + cardID).append(x);
    $("#" + cardID).append(span);

    $(document).on("click", "#card-close-btn" + index, async (e) => {
        console.log(notificationObj._id);
        deleteNotification(notificationObj._id, index, cardID);

    })
    $(document).on("click", "#accept-next", async (e) => {
        location.replace('/client_dashboard');
    })
    $(document).on("click", "#request-next", async (e) => {
        location.replace('/host_dashboard');
    })
    // $(document).on("click", ".fa-arrow-right", async (e) => {
    //     if (type == "Accepted") {
    //         location.replace('/client_dashboard');
    //     } else {
    //         location.replace('/host_dashboard');
    //     }
    // })



}

// Main function to render notifications
async function renderNotification() {

    //TO BE REMOVED WHEN NOTIFICATION RENDER IS FINISHED
    $("#tab-content").children().remove();
    ///////////////////////////////////////////////////

    // Fetch notification from database
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

    // Run the no notification function if none are present, otherwise run main script.
    if (notifications == "") {
        noNotification();
    } else {
        // Create the message to display
        let dataInfo = "";
        let count = 0;
        notifications.forEach(async notification => {

            switch (notification.type) {
                // Host cases
                case "NEWREQ":
                    dataInfo = "Charger: "
                        //notification.charger.name
                        + "Alex's charger"
                        + "</br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "</br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))
                        + "<span id= 'request-next'style= 'float: right' class='fas fa-arrow-right' ></span>";

                    buildElement(notification, "Request"
                        , "These are user requests to use your"
                        + " charger. Please reject or accept them"
                        + " by the date of the booking."
                        , "orange", dataInfo, count);

                    break;
                case "PAID":
                    dataInfo = "Charger: "
                        //notification.charger.name
                        + "Deep Cove"
                        + "</br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "</br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))
                        + "<span style= 'float: right' >...</span>";

                    buildElement(notification, "Payment"
                        , "You have received your payment!"
                        , "dark-green", dataInfo, count);

                    break;
                case "CANCELLED":
                    dataInfo = "This is cancellded!";
                    buildElement(notification, "Cancelled"
                        , "These pending requests are cancelled."
                        , "grey", dataInfo, count);

                    break;
                // Client cases
                case "ACCEPTED":
                    dataInfo = "Address: "
                        //notification.charger.address + notification.charger.city + notification.charger.province
                        + "2940 Panorama Dr" + " North Vancouver" + " BC"
                        + "</br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "</br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))
                        + "<span id='accept-next' style= 'float: right' class='fas fa-arrow-right' ></span>";

                    buildElement(notification, "Accepted"
                        , "These bookings have been accepted!"
                        + " Make your payment before the booking day"
                        , "green", dataInfo, count);

                    break;
                case "DECLINED":
                    dataInfo = "Location: "
                        //                        + notification.charger.city + ", " + notification.charger.province
                        + "North Vancouver" + "BC"
                        + "</br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "</br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))
                        + "<span style= 'float: right' >...</span>";
                    buildElement(notification, "Declined"
                        , "These bookings have been declined. "
                        + "You can try to make another booking from the surounding area!"
                        , "dark-orange", dataInfo, count);
                    break;
                default:
                    console.log("Data type not found!");
                    break;
            }
            count++;
        });
    }
}

renderNotification();