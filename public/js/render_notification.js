//This file renders notifications for users



// Functions for inputs, labels, buttons, headers, body, boxes, popups.
// Creates an input element
var createInput = (targetId, type, disabledBool, name, id, className, value) => {
	let input = document.createElement("input")
	input.setAttribute("type", type);
	input.setAttribute("name", name);
	input.setAttribute("disabled", disabledBool);
	if (value !== undefined) {
		input.setAttribute("value", value);
	}
	input.id = id;
	input.className = className;
	$('#' + targetId).append(input);
}

// Creates a label element
var createLabel = (targetId, relatedInput, text, id, className) => {
	let label = document.createElement("label");
	label.id = id;
	label.className = className;
	label.innerText = text;
	label.setAttribute("for", relatedInput);
	$('#' + targetId).append(label);
}

// Creates a button element
var createButton = (targetId, id, text, className) => {
	var button = document.createElement('button');
	button.id = id;
	if (className !== undefined) {
		button.className = className;
	}
	$('#' + targetId).append(button);
	$('#' + id).html(text);
}

// Creates a content card
var createContent = (targetId, type, id, className) => {
	var content = document.createElement(type);
	if (className != undefined) {
		content.className = className;
	}
	content.id = id;
	$('#' + targetId).append(content);
}

// Creates a header element
var createHeader = (targetId, size, text, className) => {
	var header = document.createElement(size);
	header.innerText = text;
	if (className != undefined) {
		header.className = className;
	}
	$('#' + targetId).append(header);
}

// Creates a subheader element
var createSubheader = (targetId, size, text, className) => {
	var subheader = document.createElement(size);
	subheader.innerText = text;
	if (className != undefined) {
		subheader.className = className;
	}
	$('#' + targetId).append(subheader);
}

// Creates a content container element to append to a dashboard tab
function createContentContainer(containerID, headingID, headingInnerText, subHeadingID, subHeadingInnerText) {
	var contentContainer = $("<div id='" + containerID + "' class='tab-section-content col-12'>");
	var h1String = "<h3 class='col-11 inner-header' id='" + headingID + "'><b>" + headingInnerText + "</b></h3>";
	var h2String = "<h6 class='col-11 inner-subheader' id='" + subHeadingID + "'>" + subHeadingInnerText + "</h6>"
	var heading1 = $(h1String);
	var heading2 = $(h2String);
	contentContainer.append(heading1);
	contentContainer.append(heading2);
	return contentContainer;
}




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
    createContent("tab-content", "div", "notif-no-data", "no-data");
    $("#notif-no-data").html("<p>You have no new notifications. Try adding a charger if you haven't done so!</p>");
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
    createContent("notif-" + type + "-data", "div", cardID, "card-panel col-md " + cardColor + "-card");
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
            location.replace('/charger_dashboard');
        //accepted card go to user dashboard
        else if (cardID[0] == "a")
            location.replace('/user_bookings');
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
                    dataInfo = "Charger: "
                        + notification.booking.charger.chargername
                        + "<br>Date: " + getLocalDate(new Date(notification.booking.timeStart))
                        + "<br>Time: " + getLocalStartTime(new Date(notification.booking.timeStart)) + " - "
                        + getLocalEndTime(new Date(notification.booking.timeEnd))

                    buildElement(notification, "payment"
                        , "You have received your payment!"
                        , "dark-green", dataInfo, count);

                    break;
                case "CANCELLED":
                    dataInfo = "This has been cancelled!";
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
                        + " Make your payment before the booking day."
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