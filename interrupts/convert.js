const int_arrays = require("./int_arrays.js");
const { getVarHandler, setVarHandler } = require("../vars_global.js");
const { memory, interrupts, getWorkingDirectory } = require("../global_data.js");
const { getArgs } = require("./interrupts_tools.js");
const { parseValue } = require("../vars_primitive.js");

const ints = [stringToArray, arrayToString, stringToBytes, bytesToString];
const length = ints.length;
const start = int_arrays.start + int_arrays.length;

function stringToArray() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    try {
        let string = String(values[0]);
        let buffer = [];

        for (var i = 0; i < string.length; i++) {
            buffer.push(string[i]);
        }

        setVarHandler("RETURNED", buffer);

        return 0;
    } catch {
        console.log(`Unable to convert string to array: ${values[0]}`.red);
        return 1;
    }
}

function arrayToString() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    if (!Array.isArray(values[0])) {
        console.log("Given variable is not an array (arg0).".red);
        return 1;
    }

    try {
        let array = values[0];
        let buffer = "";

        for (var i = 0; i < array.length; i++) {
            buffer += "" + array[i];
        }

        setVarHandler("RETURNED", buffer);

        return 0;
    } catch {
        console.log(`Unable to convert array to string: ${values[0]}`.red);
        return 1;
    }
}

function stringToBytes() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    try {
        let temp = String(values[0]);
        let buffer = Buffer.from(temp);

        let bytes = [];
        for (var i = 0; i < buffer.length; i++) {
            bytes.push(buffer[i]);
        }

        setVarHandler("RETURNED", bytes);

        return 0;
    } catch {
        console.log("Error while converting string to byte array: ".red + String(values[0]).red);
        return 1;
    }
}

function bytesToString() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    try {
        if (!Array.isArray(values[0])) {
            console.log("Given argument is not an array.".red);
            return 1;
        }

        let bytes = values[0];
        let buffer = Buffer.from(bytes);
        
        let string = buffer.toString('utf8');

        setVarHandler("RETURNED", string);

        return 0;
    } catch {
        return 1;
    }
}

function build() {
    for (var i = start, j = 0; j < length; i++,j++) {
        interrupts.set(i, ints[j]);
    }
}

module.exports = { ints, build, start, length }