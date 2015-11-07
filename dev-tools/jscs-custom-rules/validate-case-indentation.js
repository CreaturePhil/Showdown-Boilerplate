/**
 * Enforces Pokémon Showdown code style for switch cases
 *
 * Type: `Boolean`
 *
 * Value: `true`
 *
 * #### Example
 *
 * ```js
 * "validateCaseIndentation": true
 * ```
 *
 * ##### Valid
 *
 * ```js
 *  switch (foo) {
 *  case 'foo':
 *  	// Do some stuff
 *  }
 *
 *  switch (foo) {
 *  case 'foo':
 *  	// Do some stuff
 *  default:
 *  	// Do some other stuff
 *  }
 * ```
 *
 * ##### Invalid
 *
 * ```js
 *  switch (foo) {
 *  	case 'foo':
 *  		// Do some stuff
 *  }
 *
 *  switch (foo) {
 *  	case 'foo':
 *  		// Do some stuff
 *  	default:
 *  		// Do some other stuff
 *  }
 * ```
 */

'use strict';

const assert = require('assert');

module.exports = function () {};

module.exports.prototype = {

	configure: function (options) {
		assert(
			options === true,
			this.getOptionName() + ' option requires a true value or should be removed'
		);
	},

	getOptionName: function () {
		return 'validateCaseIndentation';
	},

	check: function (file, errors) {
		file.iterateNodesByType('SwitchStatement', function (node) {
			let column = node.loc.start.column;
			let currentLine = 0;
			for (let i = 0; i < node.cases.length; i++) {
				let currentCase = node.cases[i];
				if (currentCase.loc.line === currentLine) continue;
				currentLine = currentCase.loc.line;
				if (currentCase.loc.start.column === column) continue;
				errors.add("Bad indentation for case", currentCase.loc.start);
				break;
			}
		});
	}
};
