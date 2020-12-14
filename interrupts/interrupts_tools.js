const { getVarHandler } = require("../vars_global.js");

function getArgs(required_args) {
    if (isNaN(required_args)) {
        console.log("Error while fetching interrupt args: provided required argument number was not a valid number.");
        return 1;
    }
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

    return values;
}

module.exports = { getArgs }