const { getVar, setVar } = require("./vars_primitive.js");
const { getArray, setArray, mapArray } = require("./arrays/arrays.js");
var lodash = require("lodash");

function checker(args) {
	condition = args.split('_');
	if (condition[1][0] != "(" || condition[1][condition[1].length - 1] != ")") {
		console.log(`Missing '(' or ')' in condition declaration`.red);
		return -2;
	}
	condition[1] = String(condition[1]);
	condition[1] = condition[1].substring(1, condition[1].length - 1);
    if (condition[1]) {
		if (condition[1].includes("==")) {
			let sides = condition[1].split("==");
			if (sides[0].startsWith("GETVAR->")) {
				let returned = getVar(sides[0].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			} else if (sides[0].startsWith("GETARRAY->")) {
				let returned = getArray(sides[0].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			}
			if (sides[1].startsWith("GETVAR->")) {
				let returned = getVar(sides[1].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			} else if (sides[1].startsWith("GETARRAY->")) {
				let returned = getArray(sides[1].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			}
			if (!isNaN(sides[0])) {
				sides[0] = Number(sides[0]);
			}
			if (!isNaN(sides[1])) {
				sides[1] = Number(sides[1]);
			}
			if (lodash.isEqual(sides[0], sides[1])) {
				return true;
			} else {
				return false;
			}
		}
		else if (condition[1].includes("!=")) {
			let sides = condition[1].split("!=");
			if (sides[0].startsWith("GETVAR->")) {
				let returned = getVar(sides[0].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			} else if (sides[0].startsWith("GETARRAY->")) {

				let returned = getArray(sides[0].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			}
			if (sides[1].startsWith("GETVAR->")) {
				let returned = getVar(sides[1].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			} else if (sides[1].startsWith("GETARRAY->")) {
				let returned = getArray(sides[1].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			}
			if (!isNaN(sides[0])) {
				sides[0] = Number(sides[0]);
			}
			if (!isNaN(sides[1])) {
				sides[1] = Number(sides[1]);
			}
			if (lodash.isEqual(sides[0], sides[1])) {
				return false;
			} else {
				return true;
			}
		}
		else if (condition[1].includes("|<|")) {
			let sides = condition[1].split("|<|");
			if (sides[0].startsWith("GETVAR->")) {
				let returned = getVar(sides[0].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			} else if (sides[0].startsWith("GETARRAY->")) {

				let returned = getArray(sides[0].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			}
			if (sides[1].startsWith("GETVAR->")) {
				let returned = getVar(sides[1].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			} else if (sides[1].startsWith("GETARRAY->")) {
				let returned = getArray(sides[1].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			}
			if (!isNaN(sides[0])) {
				sides[0] = Number(sides[0]);
			}
			if (!isNaN(sides[1])) {
				sides[1] = Number(sides[1]);
			}
			if (sides[0] < sides[1]) {
				return true;
			} else {
				return false;
			}
		}
		else if (condition[1].includes("|>|")) {
			let sides = condition[1].split("|>|");
			if (sides[0].startsWith("GETVAR->")) {
				let returned = getVar(sides[0].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			} else if (sides[0].startsWith("GETARRAY->")) {

				let returned = getArray(sides[0].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			}
			if (sides[1].startsWith("GETVAR->")) {
				let returned = getVar(sides[1].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			} else if (sides[1].startsWith("GETARRAY->")) {
				let returned = getArray(sides[1].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			}
			if (!isNaN(sides[0])) {
				sides[0] = Number(sides[0]);
			}
			if (!isNaN(sides[1])) {
				sides[1] = Number(sides[1]);
			}
			if (sides[0] > sides[1]) {
				return true;
			} else {
				return false;
			}
		}
		else if (condition[1].includes("|<=|")) {
			let sides = condition[1].split("|<|");
			if (sides[0].startsWith("GETVAR->")) {
				let returned = getVar(sides[0].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			} else if (sides[0].startsWith("GETARRAY->")) {

				let returned = getArray(sides[0].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			}
			if (sides[1].startsWith("GETVAR->")) {
				let returned = getVar(sides[1].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			} else if (sides[1].startsWith("GETARRAY->")) {
				let returned = getArray(sides[1].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			}
			if (!isNaN(sides[0])) {
				sides[0] = Number(sides[0]);
			}
			if (!isNaN(sides[1])) {
				sides[1] = Number(sides[1]);
			}
			if (sides[0] <= sides[1]) {
				return true;
			} else {
				return false;
			}
		}
		else if (condition[1].includes("|>=|")) {
			let sides = condition[1].split("|<|");
			if (sides[0].startsWith("GETVAR->")) {
				let returned = getVar(sides[0].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			} else if (sides[0].startsWith("GETARRAY->")) {

				let returned = getArray(sides[0].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[0] = returned[0];
			}
			if (sides[1].startsWith("GETVAR->")) {
				let returned = getVar(sides[1].replace("GETVAR->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			} else if (sides[1].startsWith("GETARRAY->")) {
				let returned = getArray(sides[1].replace("GETARRAY->", ""));
				if (returned[1] == 1) {
					return -1;
				}
				sides[1] = returned[0];
			}
			if (!isNaN(sides[0])) {
				sides[0] = Number(sides[0]);
			}
			if (!isNaN(sides[1])) {
				sides[1] = Number(sides[1]);
			}
			if (sides[0] >= sides[1]) {
				return true;
			} else {
				return false;
			}
		}
        else {
            return -2;
        }
	}
	else {
        return -3;
    }
}

module.exports = { checker }