const { memory, interrupts } = require("../global_data.js");
const { getVarHandler, setVarHandler } = require("../vars_global.js");
const str_utils = require("./str_utils.js");

const ints = [square, cube, pow, squareRoot, cubeRoot, abs, acos, acosh, 
    asin, asinh, atan, atanh, cos, tan, sin, ceil, floor, sinh, cosh, tanh, 
    exp, log, log2, log10, fround, round, random, pi];

const length = ints.length;
const start = str_utils.start + str_utils.length;

function square() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", buffer*buffer);
    } catch {
        console.log("Error while computing square of ".red + buffer.red + " in square()".red);
        return 1;
    }
}

function cube() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", buffer*buffer*buffer);
    } catch {
        console.log("Error while computing cube of ".red + buffer.red + " in cube()".red);
        return 1;
    }
}

function pow() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }
    if (isNaN(String(values[1]))) {
        console.log("Specified pow value (arg1) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        let pow = Number(values[1]);
        return setVarHandler("RETURNED", Math.pow(buffer, pow));
    } catch {
        console.log("Error while computing square of ".red + buffer.red + " in sqaure()".red);
        return 1;
    }
}

function squareRoot() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.sqrt(buffer));;
    } catch {
        console.log("Error while computing square root of ".red + buffer.red + " in squareRoot()".red);
        return 1;
    }
}

function cubeRoot() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.cbrt(buffer));;
    } catch {
        console.log("Error while computing cube root of ".red + buffer.red + " in cubeRoot()".red);
        return 1;
    }
}

function abs() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.abs(buffer));;
    } catch {
        console.log("Error while computing absolute value of ".red + buffer.red + " in abs()".red);
        return 1;
    }
}

function acos() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.acos(buffer));;
    } catch {
        console.log("Error while computing arccosine of ".red + buffer.red + " in acos()".red);
        return 1;
    }
}

function acosh() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.acosh(buffer));;
    } catch {
        console.log("Error while computing hyperbolic arccosine of ".red + buffer.red + " in acosh()".red);
        return 1;
    }
}

function asin() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.asin(buffer));;
    } catch {
        console.log("Error while computing arcsine of ".red + buffer.red + " in asin()".red);
        return 1;
    }
}

function asinh() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.asinh(buffer));;
    } catch {
        console.log("Error while computing hyperbolic arcsine of ".red + buffer.red + " in asinh()".red);
        return 1;
    }
}

function atan() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.atan(buffer));;
    } catch {
        console.log("Error while computing arctangent of ".red + buffer.red + " in atan()".red);
        return 1;
    }
}

function atanh() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.atanh(buffer));;
    } catch {
        console.log("Error while computing hyperbolic arctangent of ".red + buffer.red + " in atanh()".red);
        return 1;
    }
}

function cos() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.cos(buffer));;
    } catch {
        console.log("Error while computing cosine of ".red + buffer.red + " in cos()".red);
        return 1;
    }
}

function tan() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.ceil(buffer));;
    } catch {
        console.log("Error while computing tangent of ".red + buffer.red + " in tan()".red);
        return 1;
    }
}

function sin() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.sin(buffer));;
    } catch {
        console.log("Error while computing sine of ".red + buffer.red + " in sin()".red);
        return 1;
    }
}

function sinh() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.sinh(buffer));;
    } catch {
        console.log("Error while computing hyperbolic sine of ".red + buffer.red + " in sinh()".red);
        return 1;
    }
}

function cosh() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.cosh(buffer));;
    } catch {
        console.log("Error while computing hyperbolic cosine of ".red + buffer.red + " in cosh()".red);
        return 1;
    }
}

function tanh() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.tanh(buffer));;
    } catch {
        console.log("Error while computing hyperbolic tangent of ".red + buffer.red + " in tanh()".red);
        return 1;
    }
}

function ceil() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.ceil(buffer));;
    } catch {
        console.log("Error while computing ceil of ".red + buffer.red + " in ceil()".red);
        return 1;
    }
}

function floor() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.floor(buffer));;
    } catch {
        console.log("Error while computing floor of ".red + buffer.red + " in floor()".red);
        return 1;
    }
}

function exp() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.exp(buffer));;
    } catch {
        console.log("Error while computing exp of ".red + buffer.red + " in exp()".red);
        return 1;
    }
}

function log() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.log(buffer));;
    } catch {
        console.log("Error while computing natural logarithm of ".red + buffer.red + " in log()".red);
        return 1;
    }
}

function log2() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.log2(buffer));;
    } catch {
        console.log("Error while computing base-2 logarithm of ".red + buffer.red + " in log2()".red);
        return 1;
    }
}

function log10() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.ceil(buffer));;
    } catch {
        console.log("Error while computing base-10 logarithm of ".red + buffer.red + " in log10()".red);
        return 1;
    }
}

function fround() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.fround(buffer));;
    } catch {
        console.log("Error while computing nearest single precision float representation of ".red + buffer.red + " in fround()".red);
        return 1;
    }
}

function round() {
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
    
    if (isNaN(String(values[0]))) {
        console.log("Specified value (arg0) was not a valid number".red);
        return 1;
    }

    try {
        let buffer = Number(values[0]);
        return setVarHandler("RETURNED", Math.round(buffer));;
    } catch {
        console.log("Error while computing the nearest integer of ".red + buffer.red + " in round()".red);
        return 1;
    }
}

function random() {
    try {
        return setVarHandler("RETURNED", Math.random());;
    } catch {
        console.log("Error while computing random number in random()".red);
        return 1;
    }
}

function pi() {
    try {
        return setVarHandler("RETURNED", Math.PI);;
    } catch {
        console.log("Error while computing random number in random()".red);
        return 1;
    }
}

function build() {
    for (var i = start, j = 0; j < length; i++,j++) {
        interrupts.set(i, ints[j]);
    }
}

module.exports = { ints, build, start, length }