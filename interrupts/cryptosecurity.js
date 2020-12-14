const maths = require("./maths.js");
const { getVarHandler, setVarHandler } = require("../vars_global.js");
const { memory, interrupts } = require("../global_data.js");
const crypto = require("crypto");

const ints = [sha256Hash, sha512Hash];
const length = ints.length;
const start = maths.start + maths.length;

function sha256Hash() {
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

    let value = values[0];

    let sha256 = crypto.createHash('sha256');
    sha256.setEncoding('utf8');

    try {
        let buffer = String(value);

        sha256.update(buffer);
        let hashed = sha256.digest('hex');

        setVarHandler("RETURNED", hashed);
        return 0;
    } catch {
        console.log("Error while computing hash value (Sha256) for: ".red + String(value).red);
        return 1;
    }
}

function sha512Hash() {
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

    let value = values[0];

    let sha512 = crypto.createHash('sha512');
    sha512.setEncoding('utf8');

    try {
        let buffer = String(value);

        sha512.update(buffer);
        let hashed = sha512.digest('hex');

        setVarHandler("RETURNED", hashed);
        return 0;
    } catch {
        console.log("Error while computing hash (Sha512) value for: ".red + String(value).red);
        return 1;
    }
}

function build() {
    for (var i = start, j = 0; j < length; i++,j++) {
        interrupts.set(i, ints[j]);
    }
}

module.exports = { ints, build, start, length }