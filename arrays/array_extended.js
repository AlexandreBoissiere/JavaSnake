const { getArrayHandler } = require("./arrays_primitives.js");

function mapArray(args) {
    let array_name = args[0];
    let array_index = args[1];

    let returned = getArrayHandler(array_name);

	if (returned[1] == 1) {
        console.log("Error while reading array ".red + array_name.red);
        return returned;
	}
	if (Array.isArray(returned[0]) == false) {
		console.log("Specified variable is not an array: ".red + array_name.red);
		returned[0] = undefined;
        returned[1] = 1;
        return returned;
    }
    if (array_index >= returned[0].length) {
        console.log("Index out of range on array: ".red + array_name.red);
        returned[0] = undefined;
        returned[1] = 1;
        return returned;
    }

    returned[0] = returned[0][Number(array_index)];
    /*
    if (!isNaN(returned[0])) {
        returned[0] = Number(returned[0]);
    } else if (typeof returned[0] === "string") {
        returned[0] = returned[0].substr(1, returned[0].length - 2);
    }*/
	return returned;
}

module.exports = { mapArray }