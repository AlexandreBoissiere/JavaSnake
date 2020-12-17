const { getVarHandler, setVarHandler } = require("../vars_global.js");
const { getArrayHandler, setArrayHandler } = require("./arrays_primitives.js");

/*
Array declaration format : 
    SETARRAY <arrayName> [value1, value2, value3,...];
if (value is string):
    set isInValue = true
    search '"' character if it's preceded by '\'
    if not, pass to next value definition.
*/

// args : Preparser output -> action_form based. -> Array [Action, [Args]]; -> here this is [Args]
// Args : Args[0] : array name, Args[1] : array values in form [value1,value2,value3,...].
// Function : Frontend function to set up array into JavaSnake code.
// Returns : 0 if executed correctly
//           1 if at least one error occured
function setArray(args) {
    let temp_args = args;
    let array_name;
    let array_values = "";

    if (temp_args.length == 2) {
        array_name = temp_args[0];
        array_values = args[1];
        if (array_values.startsWith("GETARRAY->")) {
            array_values = array_values.replace("GETARRAY->", "");
            let returned = getArrayHandler(array_values);
            if (returned[1] == 1) {
                return 1;
            }
            array_values = returned[0];
            let opening = "[";
            let closing = "]";
            array_values = opening + String(array_values) + closing;
        }
    }
    else if (temp_args.length > 2) {
        array_name = temp_args[0];
        for (var i = 1; i < temp_args.length; i++) {
            array_values += temp_args[i];
            if (i + 1 < temp_args.length) {
                array_values += " ";
            }
        }
    }
    else {
        console.log("Too few arguments in array declaration of array: ".red + args[0].red);
        return 1;
    }

    try {
        setArrayHandler(array_name, array_values);
        return 0;
    } catch {
        console.log("Error while allocating array in memory. Array name: ".red + array_name.red);
        return 1;
    }
}

function getArray(args) {
    let array_name = args;
    let returned = getArrayHandler(array_name);

	if (returned[1] == 1) {
		console.log("Error while reading array ".red + array_name.red);
	}
	if (Array.isArray(returned[0]) == false) {
		console.log("Specified variable is not an array: ".red + array_name.red);
		returned[0] = undefined;
		returned[1] = 1;
	}
	return returned;
}

module.exports = { setArray, getArray }