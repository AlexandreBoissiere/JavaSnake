const { getArray } = require("./arrays.js");
const { getVar } = require("./vars_primitive.js");

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

module.exports = { parseValue }