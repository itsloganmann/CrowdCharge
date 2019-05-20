const jwt = localStorage.getItem('jwt');
notifications = [];
//mock data
notifications = [
    {
        type: 'NEWREQ',
        booking: {
            startTime: "2019-05-14T12:00:00.000Z",
            endTime: "2019-05-14T16:00:00.000Z",
            chargername: "Louis's charger"
        }
    }, {
        type: 'ACCEPTED',
        booking: {
            startTime: "2019-05-14T12:00:00.000Z",
            endTime: "2019-05-14T16:00:00.000Z",
            address: "12345 152 St.",
            city: "Surrey",
            province: "BC"
        }
    }, {
        type: 'DECLINED',
        booking: {
            startTime: "2019-05-14T12:00:00.000Z",
            endTime: "2019-05-14T16:00:00.000Z",
            city: "Vancouver",
            province: "BC",
            chargername: "Louis's charger"
        }
    }, {
        type: 'PAID',
        booking: {
            startTime: "2019-05-14T12:00:00.000Z",
            endTime: "2019-05-14T16:00:00.000Z",
            chargername: "Louis's charger"
        }

    }
]

//helper functions
function getTime(timeObject) {
    return timeObject.split("T")[1].split(":00.000Z")[0];
}

function noNotification() { }
function buildElement(type, subheading, cardColor, content) {
    //create containers if they aren't already exist
    var typeContent = document.getElementById(type + "-content");
    if (!(document.getElementById("tab-content").contains(typeContent))) {
        createContent("tab-content", "div", type + "-content", "tab-section-content col-12");
        createHeader(type + "-content", "h3", type, "col-11 inner-header");
        createSubheader(type + "-content", "h6", subheading, "col-11 inner-subheader");
        createContent(type + "-content", "div", "notif-" + type + "-data", "col-11 tab-section-data row");
    }


    //create card    
    createContent("notif-" + type + "-data", "div", type + "-card", "card-panel col-md-5 " + cardColor + "-card");
    var p = $("<p>" + content + "</p>");
    $("#" + type + "-card").append(p);


}
//main function
async function renderNotification() {

    //TO BE REMOVE WHEN NOTIFICATION RENDER IS FINISHED
    $("#tab-content").children().remove();
    ///////////////////////////////////////////////////

    //gather notification from database
    await fetch('notification', {
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

    if (notifications == "") {
        noNotification();
    } else {
        //msg to display
        let dataInfo = "";

        notifications.forEach(notification => {
            switch (notification.type) {
                //as a host
                case "NEWREQ":
                    dataInfo = "charger Name: "
                        + notification.booking.chargername
                        + "</br>Date: " + notification.booking.startTime.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.startTime) + "-"
                        + getTime(notification.booking.endTime)
                        + "<span style= 'float: right' >...</span>";

                    buildElement("request"
                        , "These are user requests to use your"
                        + " charger. Please reject or accept them"
                        + " by the date of the booking."
                        , "orange", dataInfo);

                    break;
                case "PAID":
                    dataInfo = "charger name: "
                        + notification.booking.chargername
                        + "</br>Date: " + notification.booking.startTime.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.startTime) + "-"
                        + getTime(notification.booking.endTime)
                        + "<span style= 'float: right' >...</span>";

                    buildElement("payment"
                        , "You have received your payment!"
                        , "dark-green", dataInfo);

                    break;
                case "CANCELLED":
                    dataInfo = "This is cancellded!";
                    buildElement("cancelled"
                        , "These pending requests are cancelled."
                        , "grey", dataInfo);

                    break;
                //as a client
                case "ACCEPTED":
                    dataInfo = "Address: "
                        + notification.booking.address + " " + notification.booking.city + ", " + notification.booking.province
                        + "</br>Date: " + notification.booking.startTime.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.startTime) + "-"
                        + getTime(notification.booking.endTime)
                        + "<span style= 'float: right' >...</span>";

                    buildElement("accepted"
                        , "These bookings have been accepted!"
                        + " Make your payment before the booking day"
                        , "green", dataInfo);

                    break;
                case "DECLINED":
                    dataInfo = "Location: "
                        + notification.booking.city + ", " + notification.booking.province
                        + "</br>Date: " + notification.booking.startTime.split("T")[0]
                        + "</br>Time: " + getTime(notification.booking.startTime) + "-"
                        + getTime(notification.booking.endTime)
                        + "<span style= 'float: right' >...</span>";
                    buildElement("declined"
                        , "these bookings has been declined. "
                        + "You can try to make another booking from the surounding area!"
                        , "dark-orange", dataInfo);
                    break;
                default:
                    console.log("data type not found!");
                    break;

            }

        });
    }

}


renderNotification();