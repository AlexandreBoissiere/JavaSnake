const filestreams = require("./filestreams.js");
const { getVarHandler, setVarHandler } = require("../vars_global.js");
const { memory, interrupts, getWorkingDirectory } = require("../global_data.js");
const { getArgs } = require("./interrupts_tools.js");
const { parseValue } = require("../vars_primitive.js");

const ints = [toString, reverse, array_length, push_array];
const length = ints.length;
const start = filestreams.start + filestreams.length;

function toString() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    try {
        let array = values[0];
        if (array == undefined) {
            return 1;
        }

        if (!Array.isArray(array)) {
            console.log(`Given variable is not an array.`.red);
            return 1;
        }

        let buffer = "";
        for (var i = 0; i < array.length; i++) {
            buffer += array[i];
        }
        
        setVarHandler("RETURNED", buffer);
        return 0;
    } catch {
        console.log(`Unable to convert array '${values[0]}' to String.`.red);
        return 1;
    }
}

function reverse() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    try {
        let array = values[0];
        if (array == undefined) {
            return 1;
        }

        if (!Array.isArray(array)) {
            console.log(`Given variable is not an array.`.red);
            return 1;
        }

        let buffer = [];
        for (var i = array.length - 1, j = 0; i > -1 && j < array.length; i--,j++) {
            buffer[j] = array[i];
        }

        setVarHandler("RETURNED", buffer);

        return 0;
    } catch {
        console.log(`Unable to reverse array '${values[0]}'.`.red);
        return 1;
    }
}

function array_length() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    try {
        let array = values[0];
        if (array == undefined) {
            return 1;
        }

        if (!Array.isArray(array)) {
            console.log(`Given variable is not an array.`.red);
            return 1;
        }

        setVarHandler("RETURNED", array.length);

        return 0;
    } catch {
        console.log(`Unable to get array length of '${values[0]}'.`.red);
        return 1;
    }
}

function push_array() {
    let values = getArgs(2);
    if (values == 1) {
        return 1;
    }

    try {
        let array = values[0];
        let value = values[1];

        if (array == undefined) {
            return 1;
        }

        if (!Array.isArray(array)) {
            console.log(`Given variable is not an array.`.red);
            return 1;
        }

        let buffer = parseValue(value, "simple");
        if (buffer[1] == 1) {
            return 1;
        } else {
            array.push(buffer[0]);
        }

        setVarHandler("RETURNED", array);

        return 0;
    } catch {
        console.log(`Unable to push to array '${values[0]}': ${values[1]}`.red);
        return 1;
    }
}

function build() {
    for (var i = start, j = 0; j < length; i++,j++) {
        interrupts.set(i, ints[j]);
    }
}

module.exports = { ints, build, start, length }