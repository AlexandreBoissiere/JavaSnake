const fs = require("fs");
const colors = require("colors");
const { action } = require("./actions_classes.js");

function importsHandler(file_name) {
    try {
        let module_content = fs.readFileSync(file_name, {encoding:'utf8',flag:'r'});
        module_content = module_content.replace(/(\r\n|\n|\r)/gm, "");
        module_content = module_content.split("    ").join("");
        let actionFlow = new action(module_content);
        actionFlow = actionFlow.Get();
        return [actionFlow, 0];
    } catch {
        try {
            let module_content = fs.readFileSync("lib/"+ file_name, {encoding:'utf8',flag:'r'});
            module_content = module_content.replace(/(\r\n|\n|\r)/gm, "");
            module_content = module_content.split("    ").join("");
            let actionFlow = new action(module_content);
            actionFlow = actionFlow.Get();
        return [actionFlow, 0];
        } catch {
            console.log("Unable to import module: ".red + file_name.red);
            return [undefined, 1];
        }
    }
}  

function importModule(args) {
    if (args.length == 1) {
        let module_name = args[0];
        let returned = importsHandler(module_name);
        if (returned[1] == 1) {
            return [undefined, 1];
        } else {
            return returned;
        }
    } else if (args.length > 1) {
        let module_name = args[0];
        for (var i = 0; i < args.length; i++) {
            module_name += " " + args[1];
        }
        let returned = importsHandler(module_name);
        if (returned[1] == 1) {
            return [undefined, 1];
        } else {
            return returned;
        }
    } else {
        console.log("Too few arguments were passed when calling IMPORT".red);
        return [undefined, 1];
    }
}

module.exports = { importsHandler, importModule }