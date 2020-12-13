const colors = require("colors");
const structure = require("./core_engine.js");
const { memory } = require("./global_data.js");
const { functions } = require("./functions_def.js");
const yargs = require("yargs");
const { engine } = require("./core_engine.js");
const { addImportDirectory } = require("./imports.js");

const argv = yargs.command('execute', 'Execute a JavaSnake script file',  {
   script_file: {
      description: 'The file to execute',
      alias: 'f',
      type: 'string'
   }
})
.option('exitcode', {
   alias: 'r',
   description: 'Show the program exit code after its execution',
   type: 'boolean'
})
.option('memorylog', {
   alias: 'm',
   description: 'Show the program memory after its execution',
   type: 'boolean'
})
.option('functionslog', {
   alias: 'fm',
   description: 'Show the program functions memory after its execution',
   type: 'boolean'
})
.option('importdirectory', {
   alias: 'i',
   description: 'Specify an import directory (you can specify multiple by separating them with a comma).',
   type: 'string'
})
.help()
.alias('help', 'h')
.argv;

if (argv._.includes('execute')) {
   const file = argv.script_file || null;
   if (file == null) {
      console.log("No file file were specified".red);
      return 1;
   }

   try {
      let exec_path = require('path').dirname(require('fs').realpathSync(file)) + "/";
      addImportDirectory(exec_path);
   } catch {
      console.log("Unable to import script file: ".red + file.red);
      console.log("Process terminated with code 1".magenta);
      return 1;
   }

   if (argv.importdirectory) {
      let temp = argv.importdirectory;
      temp = temp.split(',');
      for (var i = 0; i < temp.length; i++) {
         if (temp[i] == "CWD") {
            temp[i] = __dirname;
         }
         if (temp[i].startsWith("CWD/")) {
            temp[i] = __dirname + "/" + temp[i].substring(4, temp[i].length);
         }
         addImportDirectory(temp[i]);
      }
   }
   
   let import_script = `IMPORT ${file};`;
   let returned = engine(import_script);

   if (argv.memorylog) {
      console.log(memory);
   }
   if (argv.functionslog) {
      console.log(functions);
   }
   if (argv.exitcode) {
      console.log(`Program has exited with code: ${returned}`.magenta);
   }
} else {
   console.log("Please specify an action to do.".red);
   return 1;
}