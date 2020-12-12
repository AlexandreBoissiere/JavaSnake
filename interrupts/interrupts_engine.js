const str_utils = require("./str_utils.js");
const maths = require("./maths.js");
const { getVarHandler } = require("../vars_global.js");
const { interrupts } = require("../global_data.js");

function int_engine() {
    let returned = getVarHandler("INT_ID");
    if (returned[1] == 1) {
        console.log("Unable to fetch 'INT_ID' variable to get interrupt number, has it been correctly declared?".red);
        return 1;
    }

    let int_id = returned[0];
    try {
        int_id = Number(int_id);
    } catch {
        console.log("Unable to convert INT_ID to a number, was it a valid number?".red);
        return 1;
    }

    if (!interrupts.has(int_id)) {
        if (int_id >= str_utils.start && int_id < str_utils.length) {
            str_utils.build();
        }
        else if (int_id >= maths.start && int_id < maths.length + maths.start) {
            maths.build();
        }
        else {
            console.log("Unknown interrupt number: ".red + String(int_id).red);
            return 1;
        }
    }

    interrupts.get(int_id)();
}

module.exports = { int_engine }