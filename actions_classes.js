class action {
	#base = "";
	#parsed = [];
	#subActions = [];

	constructor(string) {
		this.#base = string;
		this.Parse();
	}

	Parse = function() {
		let preParsed = parse_values(this.#base);
		let splited = preParsed.split(';');
		this.#parsed = splited;
		for (var i = 0; i < splited.length; i++) {
			let temp_action = new action_form(splited[i], ' ');
			let built_action = temp_action.Get();
			this.#subActions.push(built_action);
		}
	}

	Get = function() {
		return this.#subActions;
	}
}

class action_form {
	#base;
	#separator = "";
	#action = "";
	#args = [];

	constructor(string, spliting_prefix) {
		this.#base = string;
		this.#separator = spliting_prefix;
		this.Make();
	}

	Make = function() {
		let temp = this.#base.split(this.#separator);
		this.#action = temp[0];

		for (var i = 1; i < temp.length; i++) {
			this.#args.push(temp[i]);
		} 
	}

	Get = function() {
		for (var i = 0; i < this.#args.length; i++) {
			this.#args[i] = String(this.#args[i]).replace("%semcol_mark%", ";");
		}
		let temp = [this.#action, this.#args];
		return temp;
	}
}

function parse_values(str) {
	let buffer = String(str);
	let inVariable = false;

	for (var i = 0; i < buffer.length; i++) {
		if (buffer[i] == '"' && inVariable == false) {
			inVariable = true;
			continue;
		}
		if (buffer[i] == ';' && inVariable == true) {
			buffer[i] = '';
			buffer = (buffer.substring(0, i) + "%semcol_mark%" + buffer.substring(i + 1, buffer.length));
			continue;
		}
		if (buffer[i] == '"' && inVariable == true && buffer[i - 1] != '\\') {
			inVariable = false;
			continue;
		}
	}
	return buffer;
}
 
module.exports = { action, action_form }