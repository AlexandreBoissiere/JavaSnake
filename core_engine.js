const colors = require("colors");

const vars = require("./vars.js");
const { setVar, getVar, deleteVar, parseValue } = require("./vars_primitive.js");
const conditions = require("./conditions_args_parser.js");
const functions = require("./functions_def.js");
const arrays = require("./arrays.js");
const { getArray } = require("./arrays.js");
const { mapArray } = require("./array_extended.js");
const { setArrayIndex } = require("./array_index.js");
const { action, action_form } = require("./actions_classes.js");
const { importModule } = require("./imports.js");
const { int_engine } = require("./interrupts/interrupts_engine.js");
const { memory } = require("./global_data.js");

function print(args) {
	let temp_args = args;

	if (args.length == 1) {
		let variable_type;
		try {
			let buffer = memory.get(args[0]);
			if (Array.isArray(buffer)) {
				variable_type = "array";
			} else {
				variable_type = "simple";
			}
		} catch {
			console.log("Unable ot determine varibale type of: ".red + args[0].red);
			return 1;
		}
		
		let temp = parseValue(args[0], variable_type);
		if (temp[1] == 1) {
			console.log("Error while fetching value of: ".red + args[0].red);
			return 1;
		} else {
			console.log(temp[0]);
			return 0;
		}
	} else if (args.length > 1) {
		let buffer = temp_args[0];

		for (var i = 1; i < temp_args.length; i++) {
			buffer += " " + temp_args[i];
		}

		let temp = parseValue(buffer, undefined);
		if (temp[1] == 1) {
			return 1;
		}
		console.log(temp[0]);
	} else {
		console.log("PRINT str format was not good.".red);
		return 1;
	}

	return 0;
}

function loopBlock(start, actionFlow) {
	let temp_actions = [];
	let verified;
	let startOfWork;
	let endOfWork;
	let whereContinueAfter;

	let flat_actions = "";

	let exitcode = conditions.checker(actionFlow[start][0]);
	if (exitcode == -1) {
		return 1;
	} else if (exitcode == -2) {
		console.log("No valid condition was specified into WHILE statement".red);
		return 1;
	} else if (exitcode == -3) {
		console.log("No condition specified for WHILE statement".red);
		return 1;
	} else if (exitcode == true || exitcode == false) {
		verified = exitcode;
	}
	else {
		console.log("Error while parsing condition statement.".red);
	}

	for (var i = 0; i < actionFlow.length; i++) {
		flat_actions += actionFlow[i][0] + " ";
	}

	let script_tree = [];

	if (verified) {
		startOfWork = start + 1;
		let head_position = 1;
		for (var i = startOfWork; i < actionFlow.length; i++) {
			if (actionFlow[i][0].startsWith("WHILE_")) {
				script_tree.push(["WHILE", head_position, i]);
				head_position++;
			}
			else if (actionFlow[i][0] == "ENDWHILE") {
				head_position--;
				script_tree.push(["ENDWHILE", head_position, i]);
				if (head_position == 0) {
					whereContinueAfter = i;
					if (!endOfWork) {
						endOfWork = whereContinueAfter;
					}
					break;
				}
			} else {
				script_tree.push([actionFlow[i][0], head_position, i]);
			}
		}
	} else {
		let head_position = 1;
		for (var i = start + 1; i < actionFlow.length; i++) {
			if (actionFlow[i][0].startsWith("WHILE_")) {
				script_tree.push(["WHILE", head_position, i]);
				head_position++;
			}
			else if (actionFlow[i][0] == "ENDWHILE") {
				head_position--;
				script_tree.push(["ENDWHILE", head_position, i]);
				if (head_position == 0) {
					endOfWork = i;
					whereContinueAfter = i;
					if (!startOfWork) {
						startOfWork = null;
					}
					break;
				}
			} else {
				script_tree.push([actionFlow[i][0], head_position, i]);
			}
		}
	}
	if (!endOfWork || !whereContinueAfter) {
		console.log("Missing end of WHILE statement".red);
		return 1;
	}

	if (verified) {
		for (var i = startOfWork; i < endOfWork; i++) {
			temp_actions.push(actionFlow[i]);
		}
	}
	
	while (verified) {
		engine(temp_actions, false);
		let exitcode = conditions.checker(actionFlow[start][0]);
		if (exitcode == -1) {
			return 1;
		} else if (exitcode == -2) {
			console.log("No valid condition was specified into WHILE statement".red);
			return 1;
		} else if (exitcode == -3) {
			console.log("No condition specified for WHILE statement".red);
			return 1;
		} else if (exitcode == true || exitcode == false) {
			verified = exitcode;
		}
		else {
			console.log("Error while parsing condition statement.".red);
		}
	}

	let returned = [whereContinueAfter, 0];
	return returned;
}

function conditionBlock(start, actionFlow) {
	let temp_actions = [];
	let verified;
	let startOfWork;
	let endOfWork;
	let whereContinueAfter;

	let flat_actions = "";

	let exitcode = conditions.checker(actionFlow[start][0]);
	if (exitcode == -1) {
		return 1;
	} else if (exitcode == -2) {
		console.log("No valid condition was specified into IF statement".red);
		return 1;
	} else if (exitcode == -3) {
		console.log("No condition specified for IF statement".red);
		return 1;
	} else if (exitcode == true || exitcode == false) {
		verified = exitcode;
	}
	else {
		console.log("Error while parsing condition statement.".red);
	}

	for (var i = 0; i < actionFlow.length; i++) {
		flat_actions += actionFlow[i][0] + " ";
	}

	let script_tree = [];

	if (verified) {
		startOfWork = start + 1
		let head_position = 1;
		for (var i = startOfWork; i < actionFlow.length; i++) {
			if (actionFlow[i][0].startsWith("IF_")) {
				script_tree.push(["IF", head_position, i]);
				head_position++;
			}
			else if (actionFlow[i][0] == "ELSE") {
				head_position--;
				script_tree.push(["ELSE", head_position, i]);
				if (head_position == 0) {
					endOfWork = i;
				}
				head_position++;
			}
			else if (actionFlow[i][0] == "ENDIF") {
				head_position--;
				script_tree.push(["ENDIF", head_position, i]);
				if (head_position == 0) {
					whereContinueAfter = i;
					if (!endOfWork) {
						endOfWork = whereContinueAfter;
					}
					break;
				}
			} else {
				script_tree.push([actionFlow[i][0], head_position, i]);
			}
		}
	} else {
		let head_position = 1;
		for (var i = start + 1; i < actionFlow.length; i++) {
			if (actionFlow[i][0].startsWith("IF_")) {
				script_tree.push(["IF", head_position, i]);
				head_position++;
			}
			else if (actionFlow[i][0] == "ELSE") {
				head_position--;
				script_tree.push(["ELSE", head_position, i]);
				if (head_position == 0) {
					startOfWork = i + 1;
				}
				head_position++;
			}
			else if (actionFlow[i][0] == "ENDIF") {
				head_position--;
				script_tree.push(["ENDIF", head_position, i]);
				if (head_position == 0) {
					endOfWork = i;
					whereContinueAfter = i;
					if (!startOfWork) {
						startOfWork = null;
					}
					break;
				}
			} else {
				script_tree.push([actionFlow[i][0], head_position, i]);
			}
		}
	}
	if (!endOfWork || !whereContinueAfter) {
		console.log("Missing expected end of IF statement".red);
		return 1;
	}

	if (startOfWork == null) {
		return [whereContinueAfter, 0];
	}

	for (var i = startOfWork; i < endOfWork; i++) {
		temp_actions.push(actionFlow[i]);
	}
	
	engine(temp_actions, false);

	let returned = [whereContinueAfter, 0];
	return returned;
}

function call_func(args) {
	let func_map = functions.functions;
	let func_name = args[0];
    try {
		let temp_actions = func_map.get(func_name);
        let returned = engine(temp_actions, false);
        return returned;
    } catch {
        console.log("Error while calling function ".red + func_name.red);
        return 1;
    }
}

function engine(string, rebuild) {
	let temp;
	let Actions;

	if (rebuild != false) {
		string = string.replace(/(\r\n|\n|\r)/gm, "");
		string = string.split("    ").join("");
		temp = new action(string);
		Actions = temp.Get();
	} else  {
		Actions = string;
	}

	if (Actions === undefined) {
		console.log("Error: accessing to undefined actions flow -> Exiting program with code 1".red);
		return 1;
	}

	for (var i = 0; i < Actions.length; i++) {
		if (Actions[i][0] == '') {
			continue;
		}
		if (Actions[i][0].startsWith("IF")) {
			let returned = conditionBlock(i, Actions);
			if (returned[1] == 1) {
				return 1;
			}
			i = returned[0];
		} else if (Actions[i][0].startsWith("WHILE")) {
			let returned = loopBlock(i, Actions);
			if (returned[1] == 1) {
				return 1;
			}
			i = returned[0];
		} else if (Actions[i][0].startsWith("PRINT")) {
			let returned = print(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("SETVAR")) {
			let returned = setVar(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("DELVAR")) {
			let returned = deleteVar(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("INC")) {
			let returned = vars.inc(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("DEC")) {
			let returned = vars.dec(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("ADD")) {
			let returned = vars.add(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("SUB")) {
			let returned = vars.sub(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("MUL")) {
			let returned = vars.mul(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("DIV")) {
			let returned = vars.div(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("FUNCTION")) {
			let returned = functions.func_builder(i, Actions);
			if (returned[1] == 1) {
				return 1;
			}
			i = returned[0];
		} else if (Actions[i][0].startsWith("CALL")) {
			let returned = call_func(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("DELFUNC")) {
			let returned = functions.delete_func(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("SETARRAY_VALUE")) {
			let returned = setArrayIndex(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("SETARRAY")) {
			let returned = arrays.setArray(Actions[i][1]);
			if (returned == 1) {
				return 1;
			}
		} else if (Actions[i][0].startsWith("IMPORT")) {
			let returned = importModule(Actions[i][1]);
			if (returned[1] == 1) {
				return 1;
			}
			engine(returned[0], false);
		} else if (Actions[i][0] == "SYSINT") {
			let returned = int_engine();
			if (returned == 1) {
				return 1;
			}
		}
		else if (Actions[i][0].startsWith("ENDPROG")) {
			return -1;
		} else if (Actions[i][0].startsWith("//") || Actions[i][0] == "") {
			continue;
		} 
		else {
			console.log("Warning: unknown action: ".yellow + Actions[i][0].yellow);
		}
	}

	return 0;
}

module.exports = { engine }