const { memory } = require("./global_data.js");

function setVarHandler(name, value) {
	try {
		if (isNaN(value) == false) {
			value = Number(value);
		}
		memory.set(name, value);
		return 0;
	} catch {
		console.log("Error while assigning value to variable " + name);
		return 1;
	}
}

function getVarHandler(name) {
	try {
		let returned = [memory.get(name), 1];
		if (memory.get(name) != undefined) {
			returned[1] = 0;
		}
		return returned;
	} catch {
		console.log("This variable doesn't exists".red);
		let returned = [undefined, 1];
		return returned;
	}
}

module.exports = { setVarHandler, getVarHandler }