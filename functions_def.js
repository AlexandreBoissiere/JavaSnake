var functions = new Map();

function func_builder(start, actionFlow) {
	let temp_actions = [];
	let startOfWork;
	let endOfWork;
	let whereContinueAfter;

	let flat_actions = "";

	for (var i = 0; i < actionFlow.length; i++) {
		flat_actions += actionFlow[i][0] + " ";
    }

    let entry = actionFlow[start][0].split("->");
	let function_name = entry[1];
	
	let script_tree = [];

	startOfWork = start + 1;
	let head_position = 1;
	for (var i = startOfWork; i < actionFlow.length; i++) {
		if (actionFlow[i][0].startsWith("FUNCTION->")) {
			script_tree.push(["FUNCTION", head_position, i]);
			head_position++;
		}
		else if (actionFlow[i][0] == "ENDFUNC") {
			head_position--;
			script_tree.push(["ENDFUNC", head_position, i]);
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
	if (!endOfWork || !whereContinueAfter) {
		console.log("Missing end ENDFUNC statement".red);
		return 1;
    }
    
    for (var i = startOfWork; i < endOfWork; i++) {
		temp_actions.push(actionFlow[i]);
    }

    let returned = [whereContinueAfter, 0];
    
    functions.set(function_name, temp_actions);
    return returned;
}

function delete_func(args) {
    let func_name = args[0];
    try {
        functions.delete(func_name);
        return 0;
    } catch {
        console.log(`Unable to delete function ${func_name}`.red);
        return 1;
    }
}

module.exports = { func_builder, functions, delete_func }