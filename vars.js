const { getVarHandler, setVarHandler, memory } = require("./vars_primitive.js");

function incHandler(name) {
    try {
        let returned = getVarHandler(name);
        if (returned[1] == 1) {
            console.log("Unable to increment variable ".red + name.red);
            return 1;
        }
        let value = returned[0];
        value++;
        setVarHandler(name, value);
    } catch {
        return 1;
    }
}

function inc(args) {
    let temp_args = args;

	if (args.length == 1) {
		let varName = temp_args[0];
        
		let returned = incHandler(varName);
		if (returned == 1) {
			console.log("Error while incrementing variable value".red);
		}
		return returned;
	} else if (args.length > 1) {
		let varName = temp_args[0];

		let temp = varName;

		for (var i = 2; i < temp_args.length; i++) {
			temp += " " + temp_args[i];
        }

		let returned = inc(varName);
		if (returned == 1) {
			console.log("Error while incrementing variable value".red);
		}
		return returned;
	} else {
		console.log("Error: Too few arguments when calling INC".red);
		return 1;
	}
}

function decHandler(name) {
    try {
        let returned = getVarHandler(name);
        if (returned[1] == 1) {
            console.log("Unable to decrement variable ".red + name.red);
            return 1;
        }
        let value = returned[0];
        value--;
        setVarHandler(name, value);
    } catch {
        return 1;
    }
}

function dec(args) {
    let temp_args = args;

	if (args.length == 1) {
		let varName = temp_args[0];
        
		let returned = decHandler(varName);
		if (returned == 1) {
			console.log("Error while decrementing variable value".red);
		}
		return returned;
	} else if (args.length > 1) {
		let varName = temp_args[0];

		let temp = varName;

		for (var i = 2; i < temp_args.length; i++) {
			temp += " " + temp_args[i];
        }

		let returned = decHandler(varName);
		if (returned == 1) {
			console.log("Error while decrementing variable value".red);
		}
		return returned;
	} else {
		console.log("Error: Too few arguments when calling DEC".red);
		return 1;
	}
}

function addHandler(name, value) {
    try {
        let returned = getVarHandler(name);
        if (returned[1] == 1) {
            console.log("Unable to add value to variable ".red + name.red);
            return 1;
        }
        let current = returned[0];
        current += value;
        setVarHandler(name, current);
    } catch {
        return 1;
    }
}

function add(args) {
    let temp_args = args;

	if (args.length == 2) {
		let varName = temp_args[0];
		let varVal = temp_args [1];
		if (varVal.startsWith("GETVAR->")) {
			varVal = varVal.replace("GETVAR->", "");
			let returned = getVarHandler(varVal);
			if (returned[1] == 1) {
				return returned[1];
			}
			varVal = returned[0];
        }
		let returned = addHandler(varName, varVal);
		if (returned == 1) {
			console.log("Error while adding variable value".red);
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
		}

		let returned = addHandler(varName, temp);
		if (returned == 1) {
			console.log("Error while adding variable value".red);
		}
		return returned;
	} else {
        console.log("Error: Too few arguments when calling ADD".red);
        return 1;
	}
}

function subHandler(name, value) {
	try {
        let returned = getVarHandler(name);
        if (returned[1] == 1) {
            console.log("Unable to substract value to variable ".red + name.red);
            return 1;
        }
        let current = returned[0];
        current -= value;
		setVarHandler(name, current);
    } catch {
        return 1;
    }
}

function sub(args) {
	let temp_args = args;

	if (args.length == 2) {
		let varName = temp_args[0];
		let varVal = temp_args [1];
		if (varVal.startsWith("GETVAR->")) {
			varVal = varVal.replace("GETVAR->", "");
			let returned = getVarHandler(varVal);
			if (returned[1] == 1) {
				return returned[1];
			}
			varVal = returned[0];
        }
		let returned = subHandler(varName, varVal);
		if (returned == 1) {
			console.log("Error while substracting variable value".red);
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
		}

		let returned = subHandler(varName, temp);
		if (returned == 1) {
			console.log("Error while substracting variable value".red);
		}
		return returned;
	} else {
        console.log("Error: Too few arguments when calling SUB".red);
        return 1;
	}
}

function mulHandler(name, value) {
	try {
        let returned = getVarHandler(name);
        if (returned[1] == 1) {
            console.log("Unable to multiplicate value to variable ".red + name.red);
            return 1;
        }
        let current = returned[0];
        current *= value;
		setVarHandler(name, current);
    } catch {
        return 1;
    }
}

function mul(args) {
	let temp_args = args;

	if (args.length == 2) {
		let varName = temp_args[0];
		let varVal = temp_args [1];
		if (varVal.startsWith("GETVAR->")) {
			varVal = varVal.replace("GETVAR->", "");
			let returned = getVarHandler(varVal);
			if (returned[1] == 1) {
				return returned[1];
			}
			varVal = returned[0];
        }
		let returned = mulHandler(varName, varVal);
		if (returned == 1) {
			console.log("Error while multiplicating variable value".red);
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
		}

		let returned = mulHandler(varName, temp);
		if (returned == 1) {
			console.log("Error while multiplicating variable value".red);
		}
		return returned;
	} else {
        console.log("Error: Too few arguments when calling MUL".red);
        return 1;
	}
}

function divHandler(name, value) {
	try {
        let returned = getVarHandler(name);
        if (returned[1] == 1) {
            console.log("Unable to divide value to variable ".red + name.red);
            return 1;
        }
        let current = returned[0];
        current /= value;
		setVarHandler(name, current);
    } catch {
        return 1;
    }
}

function div(args) {
	let temp_args = args;

	if (args.length == 2) {
		let varName = temp_args[0];
		let varVal = temp_args [1];
		if (varVal.startsWith("GETVAR->")) {
			varVal = varVal.replace("GETVAR->", "");
			let returned = getVarHandler(varVal);
			if (returned[1] == 1) {
				return returned[1];
			}
			varVal = returned[0];
        }
		let returned = divHandler(varName, varVal);
		if (returned == 1) {
			console.log("Error while dividing variable value".red);
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
		}

		let returned = divHandler(varName, temp);
		if (returned == 1) {
			console.log("Error while dividing variable value".red);
		}
		return returned;
	} else {
        console.log("Error: Too few arguments when calling DIV".red);
        return 1;
	}
}

module.exports = { inc, dec, add, sub, mul, div }