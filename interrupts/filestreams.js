const cryptosecurity = require("./cryptosecurity.js");
const { getVarHandler, setVarHandler } = require("../vars_global.js");
const { memory, interrupts, getWorkingDirectory } = require("../global_data.js");
const fs = require("fs");
const { getArgs } = require("./interrupts_tools.js");

const ints = [readFile, writeFile, appendFile, readFileBytes, writeFileBytes, appendFileBytes];
const length = ints.length;
const start = cryptosecurity.start + cryptosecurity.length;

function readFile() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    try {
        let filecontent = fs.readFileSync(getWorkingDirectory() + String(values[0]), {
            encoding: 'utf8',
            flag: 'r'
        });

        setVarHandler("RETURNED", String(filecontent));

        return 0;
    } catch {
        console.log("Error while reading file: ".red + getWorkingDirectory().red + String(values[0]).red);
        return 1;
    }
}

function writeFile() {
    let values = getArgs(2);
    if (values == 1) {
        return 1;
    }

    try {
        fs.writeFileSync(getWorkingDirectory() + String(values[0]), String(values[1]), {
            encoding: 'utf8'
        });

        return 0;
    } catch {
        console.log("Error while writing to file: ".red + getWorkingDirectory().red + String(values[0]).red);
        return 1;
    }
}

function appendFile() {
    let values = getArgs(2);
    if (values == 1) {
        return 1;
    }

    try {
        fs.appendFileSync(getWorkingDirectory() + String(values[0]), String(values[1]), {
            encoding: 'utf8',
        });

        return 0;
    } catch {
        console.log("Error while appending to file: ".red + getWorkingDirectory().red + String(values[0]).red);
        return 1;
    }
}

function readFileBytes() {
    let values = getArgs(1);
    if (values == 1) {
        return 1;
    }

    try {
        let filecontent = fs.readFileSync(getWorkingDirectory() + String(values[0]), {
            flag: 'r'
        });

        setVarHandler("RETURNED", String(filecontent));

        return 0;
    } catch {
        console.log("Error while reading file: ".red + getWorkingDirectory().red + String(values[0]).red);
        return 1;
    }
}

function writeFileBytes() {
    let values = getArgs(2);
    if (values == 1) {
        return 1;
    }

    try {
        fs.writeFileSync(getWorkingDirectory() + String(values[0]), String(values[1]));

        return 0;
    } catch {
        console.log("Error while writing to file: ".red + getWorkingDirectory().red + String(values[0]).red);
        return 1;
    }
}

function appendFileBytes() {
    let values = getArgs(2);
    if (values == 1) {
        return 1;
    }

    try {
        fs.appendFileSync(getWorkingDirectory() + String(values[0]), String(values[1]));

        return 0;
    } catch {
        console.log("Error while appending to file: ".red + getWorkingDirectory().red + String(values[0]).red);
        return 1;
    }
}

function build() {
    for (var i = start, j = 0; j < length; i++,j++) {
        interrupts.set(i, ints[j]);
    }
}

module.exports = { ints, build, start, length }