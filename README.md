# JavaSnake Language
## Command-line usage

### Commands
- execute

### Commands options
- #### execute
##### Required

|short argument |long argument|Description                    |
|---------------|-------------|-------------------------------|
|-f `<filename>`|None         |The JavaSnake script to execute|

##### Optionals

|short argument|long argument |Description                                          |
|--------------|--------------|-----------------------------------------------------|
|--version     |None          |Show the version number                              |
|-r            |--exitcode    |Show the program exit code after its execution       |
|-m            |--memorylog   |Show the program memory after its execution          |
|--fm          |--functionslog|Show the program functions memory after its execution|
|-h            |--help        |Show this message                                    |


## Installation
### Without building source
1. Move /build/`<javasnake_executable>` to scripts folder (main folder).
2. Add javasnake main folder path to PATH environment variable (reference to your Operating System environment variable to know which is corresponding to PATH)
3. You can use JavaSnake in any folder, just by typing `<javasnake_executable>` and the corresponding options (add -h or --help to see help message)