//refactored
var createInput = (targetId, type, readonlyBooleanValue, name, id, className, value) => {
	let input = document.createElement("input")
	input.setAttribute("type", type);
    input.setAttribute("name", name);
	input.setAttribute("readonly" , readonlyBooleanValue);
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
	var Content = document.createElement(type);
	if (className != undefined) {
		Content.className = className;
	}
	Content.id = id;
	$('#' + targetId).append(Content);
}