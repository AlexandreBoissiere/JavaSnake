const { memory } = require("../global_data.js");
const { setVarHandler, getVarHandler } = require("../vars_global.js");

// name : array name
// unparsedValues : values to code format ([value1,value2,value3,...]).
// Function : Set an array into program memory.
// Returns : 0 if executed correctly
//           1 if at least one error occured
function setArrayHandler(name, unparsedValues) {
    try {
        let tempValues = unparsedValues;
        let isInValue = false;

        let temp_value = undefined;
        let values_array = [];

        if (tempValues[0] != "[") {
            console.log("Bad array declaration: missing '['".red);
            return 1;
        }
        if (tempValues[tempValues.length - 1] != "]") {
            console.log("Bad array declaration: missing ']'".red);
            return 1;
        }

        for (var i = 1; i < tempValues.length - 1; i++) {
            temp_value = "";
            while ((tempValues[i] != ',' || isInValue) && i < tempValues.length - 1) {
                if (tempValues[i] == '"' && !isInValue) {
                    isInValue = true;
                    temp_value += tempValues[i];
                    i++;
                    continue;
                }
                if (tempValues[i] == '"' && isInValue && tempValues[i - 1] != '\\') {
                    isInValue = false;
                    temp_value += tempValues[i];
                    i++;
                    continue;
                }
                if (tempValues[i] == ' ' && !isInValue) {
                    i++;
                    continue;
                }
                temp_value += tempValues[i];
                i++;
            }
            if (!isNaN(temp_value)) {
                temp_value = Number(temp_value);
            }
            values_array.push(temp_value);
        }

        setVarHandler(name, values_array);
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