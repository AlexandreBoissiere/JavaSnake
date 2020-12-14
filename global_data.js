var memory = new Map();
var interrupts = new Map();
var working_directory;
 
function setWorkingDirectory(value) {
    let buffer = String(value);
    working_directory = value;
}

function getWorkingDirectory() {
    return working_directory;
}

module.exports = { memory, interrupts, setWorkingDirectory, getWorkingDirectory }