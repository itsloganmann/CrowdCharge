//This file renders notifications for users

// Declare array to hold notifications
let notifications = [];

//Click event Handler function
function deleteNotification(notificationID, index, cardID) {
    var successfulRemove = false;
    reqParam = {
        id: notificationID
    }
    fetch('/notifications?' + $.param(reqParam), {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    }).then((res) => {
        if (res.status == 200)
            successfulRemove = true;
        return res.json()
    }).then((data) => {
        if (successfulRemove)
            $("#" + cardID).toggle("drop");
    }).catch(error => console.log(error));
}

// Get Header string and format it to have first character be capital
function headerCap(header) {
    return (header[0].toUpperCase() + header.substring(1));
}
// Function for the case of having no notifications
function noNotification() { 
    createContent("tab-content", "p", "notif-no-data", "no-data" );
    $("#notif-no-data").text("You don't have any notification. Try to add your charger if you haven't done so!");
}

// Creates elements to build the notification card.
function buildElement(notificationObj, type, subheading, cardColor, content, index) {
    var typeContent = document.getElementById(type + "-content");

    // Only builds elements that are not already present
    if (!(document.getElementById("tab-content").contains(typeContent))) {
        createContent("tab-content", "div", type + "-content", "tab-section-content col-12");
        createHeader(type + "-content", "h3", headerCap(type), "col-11 inner-header");
        createSubheader(type + "-content", "h6", subheading, "col-11 inner-subheader");
        createContent(type + "-content", "div", "notif-" + type + "-data", "col-11 tab-section-data row");
    }


    //create card    
    var cardID = type + "-card-" + index;
    createContent("notif-" + type + "-data", "div", cardID, "card-panel col-md-5 " + cardColor + "-card");
    var x = $("<span id='card-close-btn" + index + "' style='float: right; font-size: 30pt z-index: 2' class='fas fa-times ui-button-custom'></span>");
    var span = $("<span>" + content + "</span>");
    $("#" + cardID).append(x);
    $("#" + cardID).append(span);
    $("#" + cardID).css({ "z-index": 1 });
    //close notification action
    $(document).on("click", "#card-close-btn" + index, (e) => {
        deleteNotification(notificationObj._id, index, cardID);

    })

    //notification card action
    $(document).on("click", "#" + cardID, (e) => {
        //request card and paid card go to charger dashboard
        if (e.target.id == "card-close-btn" + index) {
            //do nothing
        }
        else if (cardID[0] == "r" || cardID[0] == "p")
            location.replace('/host_dashboard');
        //accepted card go to user dashboard
        else if (cardID[0] == "a")
            location.replace('/client_dashboard');
    })
}

// Main function to render notifications
async function renderNotification() {

    // Fetch notification from database
    await fetch('/notifications', {
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

    // Run the no notification function if none are present, otherwise run main script.
    if (notifications == "") {
        noNotification();
    } else {
        // Create the message to display
        let dataInfo = "";
        // keep track of card number
        let count = 0;

        //render response data
        notifications.forEach(notification => {

            /*5 type of notification: 
            Charger Owner: new request, received payment, request cancelled
            Charger Renter: request accepted, request declined
            */
            switch (notification.type) {
                // Host cases
                case "NEWREQ":
                    dataInfo = "Charger: "
                        + notification.booking.charger.chargername
                        + "<br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "<br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))

                    buildElement(notification, "request"
                        , "These are user requests to use your"
                        + " charger. Please reject or accept them"
                        + " by the date of the booking."
                        , "dark-orange", dataInfo, count);

                    break;
                case "PAID":
                    dataInfo = "charger name: "
                        + notification.booking.charger.chargername
                        + "<br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "<br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))

                    buildElement(notification, "payment"
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
                        + notification.booking.charger.address + " " + notification.booking.charger.city + ", " + notification.booking.charger.province
                        + ""
                        + "<br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "<br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))

                    buildElement(notification, "accepted"
                        , "These bookings have been accepted!"
                        + " Make your payment before the booking day"
                        , "green", dataInfo, count);

                    break;
                case "DECLINED":
                    dataInfo = "Location: "
                        + notification.booking.charger.city + ", " + notification.booking.charger.province
                        + "<br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "<br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))
                    buildElement(notification, "declined"
                        , "These bookings has been declined. "
                        + "You can try to make another booking from the surounding area!"
                        , "orange", dataInfo, count);
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