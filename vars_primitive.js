const { mapArray } = require("./array_extended.js");
const { memory } = require("./global_data.js");
const { getVarHandler, setVarHandler } = require("./vars_global.js");

function setVar(args) {
	let temp_args = args;

	if (args.length == 2) {
		let varName = temp_args[0];
		let varVal = temp_args [1];
		if (varVal.startsWith("GETVAR->")) {
			varVal = varVal.replace("GETVAR->", "");
			let returned = getVar(varVal);
			if (returned[1] == 1) {
				return returned[1];
			}
			varVal = returned[0];
		} else if (varVal.startsWith("MAPARRAY->")) {
			console.log("Too few arguments were passed to SETVAR on variable: ".red + varName.red);
			return 1;
		}

		if (!isNaN(varVal)) {
			varVal = Number(varVal);
		} else {
			value = VarVal;
			console.log(value);
			value = String(value);
			if (value[0] == '"' && value[value.length - 1] == '"') {
				value = value.substring(1, value.length - 1);
			} else {
				console.log(`Missing '"' in declaration of [String]: ${varNAme}`.red);
				return 1;
			}
			varVal = value;
		}
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

module.exports = { setVarHandler, getVarHandler, getVar, setVar, deleteVar }