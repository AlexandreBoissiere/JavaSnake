const { memory } = require("../global_data.js");
const { setVarHandler, getVarHandler } = require("../vars_global.js");

// name : array name
// unparsedValues : values to code format ([value1,value2,value3,...]).
// Function : Set an array into program memory.
// Returns : 0 if executed correctly
//           1 if at least one error occured
function setArrayHandler(name, array) {
    if (!Array.isArray(array)) {
        console.log("Trying to set a value to an array which is not an array.".red + " : ".red + array.red + "on array ".red + name.red);
        return 1;
    }

    try {
        memory.set(name, array);
        return 0;
    } catch {
        console.log("Error while creating array ".red + name.red);
        return 1;
    }
}

function getArrayHandler(name) {
    try {
        let returned = [memory.get(name), 1];
		if (memory.get(name) != undefined) {
			returned[1] = 0;
        }
        if (Array.isArray(returned[0]) == false) {
            returned[0] = undefined;
            returned[1] = 1;
            console.log("Trying to access to a variable which is not an array".red);
        }
		return returned;
	} catch {
		console.log("This array doesn't exists".red);
		let returned = [undefined, 1];
		return returned;
	}
}

module.exports = { setArrayHandler, getArrayHandler }