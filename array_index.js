const { getArrayHandler, setArrayHandler } = require("./arrays_primitives.js");
const { parseValue } = require("./vars_primitive.js");

function setArrayIndex(args) {
    let array_name = args[0];
    let array_index = args[1];
    let value = args[2];
    if (args.length > 3) {
        value = `"` + value;
        for (var i = 3; i < args.length; i++) {
            value += " " + args[i];
        }
        value += `"`;
    } else if (args.length < 3) {
        console.log("Too few arguments were passed to set array index on array: ".red + array_name.red);
    }

    let returned = getArrayHandler(array_name);

	if (returned[1] == 1) {
        console.log("Error while reading array ".red + array_name.red);
        return 1;
	}
	if (Array.isArray(returned[0]) == false) {
		console.log("Specified variable is not an array: ".red + array_name.red);
		return 1;
    }

    let array_values = returned[0];
    if (array_index >= array_values.length) {
        console.log("Index out of range on array: ".red + array_name.red);
        return 1;
    }

    let buffer = parseValue(value, "simple");
    if (buffer[1] == 1) {
        console.log(`Error while trying to set value to array ${array_name} at index ${index}`);
        return 1;
    }
    value = buffer[0];

    array_values[array_index] = value;
    let opening = "[";
    let closing = "]";
    let array_str = opening + array_values + closing;
    setArrayHandler(array_name, array_str);

	return 0;
}

module.exports = { setArrayIndex }