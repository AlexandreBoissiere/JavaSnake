const { getVarHandler, setVarHandler } = require("../vars_global.js");
const { getArrayHandler, setArrayHandler } = require("./arrays_primitives.js");
const { memory } = require("../global_data.js");

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
        array_values = args[1];/*
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
        }*/
        try {
            if (array_values.length = 1) {
                let test = memory.get(array_values);
                if (Array.isArray(test)) {
                    array_values = test;
                    try {
                        setArrayHandler(array_name, array_values);
                        return 0;
                    } catch {
                        console.log("Unable to modify array: ".red + array_name.red);
                        return 1;
                    }
                }
            } else {
            }
        } catch {  }

        let splited_array = arraySplit(array_values);

        let buffer = parseArray(splited_array);
        if (buffer[1] == 1) {
            console.log("Unable to fetch values: ".red + array_values.toString().red + " of array ".red + array_name.red);
            return 1;
        }
        //let opening = "[";
        //let closing = "]";
        //array_values = opening + String(buffer[0]) + closing;
        array_values = buffer[0];
        try {
            setArrayHandler(array_name, array_values);
            return 0;
        } catch {
            console.log("Unable to modify variable: ".red + array_name.red);
            return 1;
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

        let splited = arraySplit(array_values);

        let buffer = parseArray(splited);
        if (buffer[1] == 1) {
            console.log("Unable to fetch values: ".red + array_values.toString().red + " of array ".red + array_name.red);
            return 1;
        }
        array_values = buffer[0];
        try {
            setArrayHandler(array_name, array_values);
            return 0;
        } catch {
            console.log("Unable to modify variable: ".red + array_name.red);
            return 1;
        }
    }
    else {
        console.log("Too few arguments in array declaration of array: ".red + args[0].red);
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

function parseValue(value, accessibilityLevel) {
    if (!isNaN(value)) {
        try {
            return [Number(value), 0];
        } catch {
            console.log("Error while casting: ".red + value + " to a Number".red);
            return [undefined, 1];
        }
    }
    else if (value[0] == '"') {
        if (value[value.length - 1] != '"') {
            console.log("Missing \" at string declaration: value => ".red + value.red);
            return [undefined, 1];
        } else {
            let temp = String(value);
            let buffer = temp.substring(1, temp.length - 1);
            return [buffer, 0];
        }
    }
    else {
        if (value.includes(" ")) {
            console.log("Error in variable reference: a variable name shouldn't include a space: ".red + value.red);
            return [undefined, 1];
        } else {
            let buffer = String(value);
            if (String(accessibilityLevel) == "simple") {
                try {
                    let temp = getVarHandler(buffer);
                    if (temp[1] == 1) {
                        return 1;
                    }
                    return [temp[0], 0];
                } catch {
                    console.log("Unable to fetch value of variable: ".red + buffer.red);
                    return [undefined, 1];
                }
            }
            else if (String(accessibilityLevel) == "array") {
                try {
                    let temp = getArray(buffer);
                    if (temp[1] == 1) {
                        return 1;
                    }
                    return [temp[0], 0];
                } catch {
                    console.log("Unable to fetch values of array: ".red + buffer.red);
                    return [undefined, 1];
                }
            }
            else {
                console.log("Error in language kernel: unknown accessibilityLevel" +
                "were passed to parseValue(): exitcode set as 1".red);
                return [undefined, 1];
            }
        }
    }
}

function parseArray(array) {
    let temp = [];
    try {
        for (var i = 0; i < array.length; i++) {
            let buffer = parseValue(array[i], "simple");
            if (buffer[1] == 1) {
                return [undefined, 1];
            }
            temp.push(buffer[0]);
        }
        return [temp, 0];
    } catch {
        return [undefined, 1];
    }
}

function arraySplit(array) {
    if (array[0] != "[") {
        console.log("Bad array declaration: missing '['".red);
        return 1;
    }
    if (array[array.length - 1] != "]") {
        console.log("Bad array declaration: missing ']'".red);
        return 1;
    }

    let tempValues = array;
    let isInValue = false;
    let temp_value = undefined;
    let values_array = [];

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
    return values_array;
}

module.exports = { setArray, getArray }