const { memory, interrupts } = require("../global_data.js");
const { getVarHandler, setVarHandler } = require("../vars_global.js");

const ints = [includes, extract, strlen, indexOf, charAt, startsWith, endsWith, charCodeAt, toLowerCase, toUpperCase];
const length = ints.length;
const start = 0;

function includes() {
    let required_args = 2;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    if (values[0].includes(values[1])) {
        return setVarHandler("RETURNED", true);
    } else {
        return setVarHandler("RETURNED", false);
    }
}

function extract() {
    let required_args = 3;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        let sub = String(values[0]).substr(Number(values[1]), Number(values[2]));
        return setVarHandler("RETURNED", sub);
    } catch {
        console.log("Error while extracting substring from: ".red + String(values[0]).red);
        return 1;
    }
}

function strlen() {
    let required_args = 1;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        return setVarHandler("RETURNED", values[0].length);
    } catch {
        console.log("Unable to get length of variable: ".red + values[0].red);
        return 1;
    }
}

function indexOf() {
    let required_args = 2;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        return setVarHandler("RETURNED", values[0].indexOf(values[1]));
    } catch {
        console.log(`Error while executing indexOf(searchValue::${String(values[1])}) on variable: ${String(values[0])}`.red);
        return 1;
    }
}

function charAt() {
    let required_args = 2;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        let sub = String(values[0]).charAt(Number(values[1]));
        return setVarHandler("RETURNED", sub);
    } catch {
        console.log("Error while executing charAt(index::".red + String(values[1].red) + ") on variable: ".red 
            + String(values[0]).red);
        return 1;
    }
}

function startsWith() {
    let required_args = 2;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        let sub = String(values[0]).startsWith(String(values[1]));
        return setVarHandler("RETURNED", sub);
    } catch {
        console.log("Error while executing startsWith(searchString::".red + String(values[1].red) + ") on variable: ".red 
            + String(values[0]).red);
        return 1;
    }
}

function endsWith() {
    let required_args = 2;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        let sub = String(values[0]).endsWith(String(values[1]));
        return setVarHandler("RETURNED", sub);
    } catch {
        console.log("Error while executing endsWith(searchString::".red + String(values[1].red) + ") on variable: ".red 
            + String(values[0]).red);
        return 1;
    }
}

function charCodeAt() {
    let required_args = 2;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        let sub = String(values[0]).charCodeAt(Number(values[1]));
        return setVarHandler("RETURNED", sub);
    } catch {
        console.log("Error while executing charCodeAt(index::".red + String(values[1].red) + ") on variable: ".red 
            + String(values[0]).red);
        return 1;
    }
}

function toLowerCase(){
    let required_args = 1;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        return setVarHandler("RETURNED", String(values[0]).toLowerCase());
    } catch {
        console.log("Error while executing toLowerCase() on variable: ".red 
            + String(values[0]).red);
        return 1;
    }
}

function toUpperCase() {
    let required_args = 1;
    let values = [];

    for (var i = 0; i < required_args; i++) {
        let temp = getVarHandler("arg" + i);
        if (temp[1] == 1) {
            console.log(`Unable to fetch arg${i}, has it been correclty declared before calling interrupt ?`.red);
            return 1;
        } else {
            values.push(temp[0]);
        }
    }

    try
    {
        return setVarHandler("RETURNED", String(values[0]).toUpperCase());
    } catch {
        console.log("Error while executing toLowerCase() on variable: ".red 
            + String(values[0]).red);
        return 1;
    }
}

function build() {
    for (var i = start; i < length; i++) {
        interrupts.set(i, ints[i]);
    }
}

module.exports = { ints, build, start, length }