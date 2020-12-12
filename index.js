const colors = require("colors");
const structure = require("./core_engine.js");
const { memory } = require("./global_data.js");
const { functions } = require("./functions_def.js");
const yargs = require("yargs");
const { engine } = require("./core_engine.js");

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
.help()
.alias('help', 'h')
.argv;

if (argv._.includes('execute')) {
   const file = argv.script_file || null;
   if (file == null) {
      console.log("No file file were specified".red);
      return 1;
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