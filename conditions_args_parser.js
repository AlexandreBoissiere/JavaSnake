const { getVar, setVar, parseValue } = require("./vars_primitive.js");
const { getArray, setArray, mapArray } = require("./arrays/arrays.js");
var lodash = require("lodash");
const { memory } = require("./global_data.js");

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
			/*
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
			}*/
			let accessibilityLevel_side0 = undefined;
			let accessibilityLevel_side1 = undefined;
			try {
				let test_side0 = memory.get(sides[0]);
				if (Array.isArray(test_side0)) {
					accessibilityLevel_side0 = "array";
				} else {
					accessibilityLevel_side0 = "simple";
				}
			} catch { }
			try {
				let test_side1 = memory.get(sides[1]);
				if (Array.isArray(test_side1)) {
					accessibilityLevel_side1 = "array";
				} else {
					accessibilityLevel_side1 = "simple";
				}
			} catch { }
			let buffer0 = parseValue(sides[0], accessibilityLevel_side0);
			if (buffer0[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[0].red);
				return -1;
			}
			let buffer1 = parseValue(sides[1], accessibilityLevel_side1);
			if (buffer1[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[1].red);
				return -1;
			}

			if (lodash.isEqual(buffer0[0], buffer1[0])) {
				return true;
			} else {
				return false;
			}
		}
		else if (condition[1].includes("!=")) {
			let sides = condition[1].split("!=");
			/*
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
			*/
			let accessibilityLevel_side0 = undefined;
			let accessibilityLevel_side1 = undefined;
			try {
				let test_side0 = memory.get(sides[0]);
				if (Array.isArray(test_side0)) {
					accessibilityLevel_side0 = "array";
				} else {
					accessibilityLevel_side0 = "simple";
				}
			} catch { }
			try {
				let test_side1 = memory.get(sides[1]);
				if (Array.isArray(test_side1)) {
					accessibilityLevel_side1 = "array";
				} else {
					accessibilityLevel_side1 = "simple";
				}
			} catch { }

			let buffer0 = parseValue(sides[0], accessibilityLevel_side0);
			if (buffer0[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[0].red);
				return -1;
			}
			let buffer1 = parseValue(sides[1], accessibilityLevel_side1);
			if (buffer1[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[1].red);
				return -1;
			}

			if (lodash.isEqual(buffer0[0], buffer1[0])) {
				return false;
			} else {
				return true;
			}
		}
		else if (condition[1].includes("|<|")) {
			let sides = condition[1].split("|<|");
			/*
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
			*/

			let accessibilityLevel_side0 = undefined;
			let accessibilityLevel_side1 = undefined;
			try {
				let test_side0 = memory.get(sides[0]);
				if (Array.isArray(test_side0)) {
					accessibilityLevel_side0 = "array";
				} else {
					accessibilityLevel_side0 = "simple";
				}
			} catch { }
			try {
				let test_side1 = memory.get(sides[1]);
				if (Array.isArray(test_side1)) {
					accessibilityLevel_side1 = "array";
				} else {
					accessibilityLevel_side1 = "simple";
				}
			} catch { }

			let buffer0 = parseValue(sides[0], accessibilityLevel_side0);
			if (buffer0[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[0].red);
				return -1;
			}
			let buffer1 = parseValue(sides[1], accessibilityLevel_side1);
			if (buffer1[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[1].red);
				return -1;
			}

			if (buffer0[0] < buffer1[0]) {
				return true;
			} else {
				return false;
			}
		}
		else if (condition[1].includes("|>|")) {
			let sides = condition[1].split("|>|");
			/*
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
			*/

			let accessibilityLevel_side0 = undefined;
			let accessibilityLevel_side1 = undefined;
			try {
				let test_side0 = memory.get(sides[0]);
				if (Array.isArray(test_side0)) {
					accessibilityLevel_side0 = "array";
				} else {
					accessibilityLevel_side0 = "simple";
				}
			} catch { }
			try {
				let test_side1 = memory.get(sides[1]);
				if (Array.isArray(test_side1)) {
					accessibilityLevel_side1 = "array";
				} else {
					accessibilityLevel_side1 = "simple";
				}
			} catch { }

			let buffer0 = parseValue(sides[0], accessibilityLevel_side0);
			if (buffer0[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[0].red);
				return -1;
			}
			let buffer1 = parseValue(sides[1], accessibilityLevel_side1);
			if (buffer1[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[1].red);
				return -1;
			}
			if (buffer0[0] > buffer1[0]) {
				return true;
			} else {
				return false;
			}
		}
		else if (condition[1].includes("|<=|")) {
			let sides = condition[1].split("|<=|");
			/*
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
			}*/

			let accessibilityLevel_side0 = undefined;
			let accessibilityLevel_side1 = undefined;
			try {
				let test_side0 = memory.get(sides[0]);
				if (Array.isArray(test_side0)) {
					accessibilityLevel_side0 = "array";
				} else {
					accessibilityLevel_side0 = "simple";
				}
			} catch { }
			try {
				let test_side1 = memory.get(sides[1]);
				if (Array.isArray(test_side1)) {
					accessibilityLevel_side1 = "array";
				} else {
					accessibilityLevel_side1 = "simple";
				}
			} catch { }

			let buffer0 = parseValue(sides[0], accessibilityLevel_side0);
			if (buffer0[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[0].red);
				return -1;
			}
			let buffer1 = parseValue(sides[1], accessibilityLevel_side1);
			if (buffer1[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[1].red);
				return -1;
			}

			if (buffer0[0] <= buffer1[0]) {
				return true;
			} else {
				return false;
			}
		}
		else if (condition[1].includes("|>=|")) {
			let sides = condition[1].split("|>=|");
			/*
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
			*/

			let accessibilityLevel_side0 = undefined;
			let accessibilityLevel_side1 = undefined;
			try {
				let test_side0 = memory.get(sides[0]);
				if (Array.isArray(test_side0)) {
					accessibilityLevel_side0 = "array";
				} else {
					accessibilityLevel_side0 = "simple";
				}
			} catch { }
			try {
				let test_side1 = memory.get(sides[1]);
				if (Array.isArray(test_side1)) {
					accessibilityLevel_side1 = "array";
				} else {
					accessibilityLevel_side1 = "simple";
				}
			} catch { }

			let buffer0 = parseValue(sides[0], accessibilityLevel_side0);
			if (buffer0[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[0].red);
				return -1;
			}
			let buffer1 = parseValue(sides[1], accessibilityLevel_side1);
			if (buffer1[1] == 1) {
				console.log("Unable to parse value of: ".red + sides[1].red);
				return -1;
			}

			if (buffer0[0] >= buffer1[0]) {
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