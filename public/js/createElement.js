//refactored
var createInput = (targetId, type, readonlyBooleanValue, name, id, className, value) => {
	let input = document.createElement("input")
	input.setAttribute("type", type);
	input.setAttribute("name", name);
	input.setAttribute("readonly", readonlyBooleanValue);
	if (value !== undefined) {
		input.setAttribute("value", value);
	}
	input.id = id;
	input.className = className;
	$('#' + targetId).append(input);
}

var createLabel = (targetId, relatedInput, text, id, className) => {
	let label = document.createElement("label");
	label.id = id;
	label.className = className;
	label.innerText = text;
	label.setAttribute("for", relatedInput);
	$('#' + targetId).append(label);
}

var createButton = (targetId, id, text, className) => {
	var button = document.createElement('button');
	button.id = id;
	if (className !== undefined) {
		button.className = className;
	}
	$('#' + targetId).append(button);
	$('#' + id).html(text);
}

var createContent = (targetId, type, id, className) => {
	var content = document.createElement(type);
	if (className != undefined) {
		content.className = className;
	}
	content.id = id;
	$('#' + targetId).append(content);
}

var createHeader = (targetId, size, text, className) => {
	var header = document.createElement(size);
	header.innerText = text;
	if (className != undefined) {
		header.className = className;
	} 
	$('#' + targetId).append(header);
}

var createSubheader = (targetId, size, text, className) => {
	var subheader = document.createElement(size);
	subheader.innerText = text;
	if (className != undefined) {
		subheader.className = className;
	}
	$('#' + targetId).append(subheader);
}

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