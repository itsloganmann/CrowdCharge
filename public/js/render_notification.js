const jwt = localStorage.getItem('jwt');
notifications = [];
//mock data
notifications = [
    {
        type: 'NEWREQ',
        booking: {}
    }, {
        type: 'ACCEPTED',
        booking: {}
    }, {
        type: 'DECLINED',
        booking: {}
    }, {
        type: 'PAID',
        booking: {}
    }
]

//helper functions
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
    createContent("notif-" + type + "-data", "div", type + "-card", "card-panel col-md-5 "+ cardColor +"-card");
    $("#" + type + "-card").text(content);


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
        let dataInfo = "";
        notifications.forEach(notification => {
            switch (notification.type) {
                //as a host
                case "NEWREQ":
                    dataInfo = "This is new request!";
                    buildElement("request"
                        , "These are user requests to use your"
                        + " charger. Please reject or accept them"
                        + " by the date of the booking."
                        ,"orange", dataInfo);

                    break;
                case "PAID":
                    dataInfo = "This is payment recieved!";
                    buildElement("payment"
                        , "You have received your payment!"
                        ,"dark-green", dataInfo);

                    break;
                case "CANCELLED":
                    dataInfo = "This is cancellded!";
                    buildElement("cancelled"
                        , "These pending requests are cancelled."
                        ,"grey", dataInfo);

                    break;
                //as a client
                case "ACCEPTED":
                    dataInfo= "this is accpted!"
                    buildElement("accepted"
                        , "These bookings have been accepted!"
                        + " Make your payment before the booking day"
                        , "green", dataInfo);

                    break;
                case "DECLINED":
                    dataInfo= "this is declined!"
                    buildElement("declined"
                        , "these bookings has been declined. "
                        + "You can try to make another booking from the surounding area!"
                        ,"dark-orange", dataInfo);
                    break;
                default:
                    console.log("data type not found!");
                    break;

            }

        });
    }

}


renderNotification();