const { mapArray } = require("./array_extended.js");
const { memory } = require("./global_data.js");
const { getVarHandler, setVarHandler } = require("./vars_global.js");
const { getArray } = require("./arrays.js");

function setVar(args) {
	let temp_args = args;

	if (args.length == 2) {
		let varName = temp_args[0];
		let varVal  = temp_args[1];
		
		if (varVal.includes("[") && varVal.includes("]")) {
			let temp = varVal.substring(0, varVal.indexOf("[")) + "%index_separator%" + 
				varVal.substring(varVal.indexOf("[") + 1, varVal.indexOf("]"));
			let splited = temp.split("%index_separator%");
			if (splited.length > 2);
			else if (isNaN(splited[1]));
			else {
				let array = splited[0];
				let index = splited[1];
				let mapped = mapArray([array, index]);
				if (mapped[1] == 1);
				else {
					setVarHandler(varName, mapped[0]);
					return 0;
				}
			}
		}
		/*if (varVal.startsWith("MAPARRAY->")) {
			console.log("Too few arguments were passed to SETVAR on variable: ".red + varName.red);
			return 1;
		}*/

		let buffer = parseValue(varVal, "simple");
		if (buffer[1] == 1) {
			return 1;
		}

		varVal = buffer[0];

		let returned = setVarHandler(varName, varVal);
		if (returned == 1) {
			console.log("Error while setting variable value".red);
		}
		return returned;
	
	} else if (args.length > 2) {
		let varName = temp_args[0];

		let temp = temp_args[1];

		for (var i = 2; i < temp_args.length; i++) {
			temp += " " + temp_args[i];
		}

		if (temp.startsWith("GETVAR->")) {
			temp = temp.replace("GETVAR->", "");
			let returned = getVar(temp);
			if (returned[1] == 1) {
				return returned[1];
			}
			temp = returned[0];
		} else if (temp.startsWith("MAPARRAY->")) {
			let buffer = temp_args[1].replace("MAPARRAY->", "");
			if (isNaN(args[2])) {
				console.log("Specified index was not a valid number: ".red + args[2].red);
				return 1;
			}
			if (!Number.isInteger(Number(args[2]))) {
				console.log("Specified index was not an integer: ".red + args[2].red);
			}

			let local_args = [buffer, Number(args[2])];

			let returned = mapArray(local_args);
			if (returned[1] == 1) {
				console.log("Error while reading array in SETVAR on variable: ".red + varName.red);
				console.log("Array name: ".red + temp.replace("MAPARRAY->", ""));
				return 1;
			}
			temp = returned[0];
		}

		if (!isNaN(temp)) {
			temp = Number(temp);
		} else {
			value = temp;
			value = String(value);
			if (value[0] == '"' && value[value.length - 1] == '"') {
				value = value.substring(1, value.length - 1);
			} else {
				console.log(`Missing '"' in declaration of [String]: ${varName}`.red);
				return 1;
			}
			temp = value;
		}
		let returned = setVarHandler(varName, temp);
		if (returned == 1) {
			console.log("Error while setting variable value".red);
		}
		return returned;
	} else {
		console.log("Error: Too few arguments when calling SETVAR".red);
		return 1;
	}
}

function getVar(args) {
	let varName = args;

	let returned = getVarHandler(varName);
	if (returned[1] == 1) {
		console.log("Error while reading variable ".red + varName.red);
	}
	if (Array.isArray(returned[0]) == true) {
		console.log("Trying to access to a complex variable (arrayType): access denied.".red);
		returned[0] = undefined;
		returned[1] = 1;
	}
	return returned;
}

function deleteVar(args) {
	let varName = args[0];

	try {
		memory.delete(varName);
		return 0;
	} catch {
		console.log(`Unable to delete variable: ${varName}`.red);
		return 1;
	}
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
                    let temp = getVar(buffer);
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

module.exports = { setVarHandler, getVarHandler, getVar, setVar, deleteVar, parseValue }