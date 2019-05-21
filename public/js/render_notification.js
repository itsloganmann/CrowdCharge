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

// DELETE function for notifications
function deleteNotification(notificationID) {
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

    createContent("notif-" + type + "-data", "div", type + "-card-" + index, "card-panel col-md-5 " + cardColor + "-card");
    var p = $("<p>" + content + "</p>");
    $("#" + type + "-card-" + index).append(p);
    $(document).on("click", "#" + type + "-card-" + index, async (e) => {
        console.log(notificationObj._id);
        await deleteNotification(notificationObj._id);
        if (type == "accepted" || type == "declined") {
        } else {
           // location.replace('/host_dashboard');
        }
    })
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
                    dataInfo = "charger Name: "
                        + notification.charger.chargername
                        + "</br>Date: " + notification.booking.timeStart.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.timeStart) + "-"
                        + getTime(notification.booking.timeEnd)
                        + "<span style= 'float: right' >...</span>";

                    buildElement(notification, "request"
                        , "These are user requests to use your"
                        + " charger. Please reject or accept them"
                        + " by the date of the booking."
                        , "orange", dataInfo, count);

                    break;
                case "PAID":
                    dataInfo = "charger name: "
                        + notification.charger.chargername
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
                // Client cases
                case "ACCEPTED":
                    dataInfo = "Address: "
                        + notification.charger.address + " " + notification.charger.city + ", " + notification.charger.province
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
                        + notification.charger.city + ", " + notification.charger.province
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