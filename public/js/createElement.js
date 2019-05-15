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