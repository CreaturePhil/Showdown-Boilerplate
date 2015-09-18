/**
 * Tools
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Handles getting data about pokemon, items, etc.
 *
 * This file is used by the main process (to validate teams)
 * as well as the individual simulator processes (to get
 * information about pokemon, items, etc to simulate).
 *
 * @license MIT license
 */

var fs = require('fs');
var path = require('path');

module.exports = (function () {
	var moddedTools = {};

	var dataTypes = ['FormatsData', 'Learnsets', 'Pokedex', 'Movedex', 'Statuses', 'TypeChart', 'Scripts', 'Items', 'Abilities', 'Natures', 'Formats', 'Aliases'];
	var dataFiles = {
		'Pokedex': 'pokedex.js',
		'Movedex': 'moves.js',
		'Statuses': 'statuses.js',
		'TypeChart': 'typechart.js',
		'Scripts': 'scripts.js',
		'Items': 'items.js',
		'Abilities': 'abilities.js',
		'Formats': 'rulesets.js',
		'FormatsData': 'formats-data.js',
		'Learnsets': 'learnsets.js',
		'Aliases': 'aliases.js'
	};

	var BattleNatures = dataFiles.Natures = {
		adamant: {name:"Adamant", plus:'atk', minus:'spa'},
		bashful: {name:"Bashful"},
		bold: {name:"Bold", plus:'def', minus:'atk'},
		brave: {name:"Brave", plus:'atk', minus:'spe'},
		calm: {name:"Calm", plus:'spd', minus:'atk'},
		careful: {name:"Careful", plus:'spd', minus:'spa'},
		docile: {name:"Docile"},
		gentle: {name:"Gentle", plus:'spd', minus:'def'},
		hardy: {name:"Hardy"},
		hasty: {name:"Hasty", plus:'spe', minus:'def'},
		impish: {name:"Impish", plus:'def', minus:'spa'},
		jolly: {name:"Jolly", plus:'spe', minus:'spa'},
		lax: {name:"Lax", plus:'def', minus:'spd'},
		lonely: {name:"Lonely", plus:'atk', minus:'def'},
		mild: {name:"Mild", plus:'spa', minus:'def'},
		modest: {name:"Modest", plus:'spa', minus:'atk'},
		naive: {name:"Naive", plus:'spe', minus:'spd'},
		naughty: {name:"Naughty", plus:'atk', minus:'spd'},
		quiet: {name:"Quiet", plus:'spa', minus:'spe'},
		quirky: {name:"Quirky"},
		rash: {name:"Rash", plus:'spa', minus:'spd'},
		relaxed: {name:"Relaxed", plus:'def', minus:'spe'},
		sassy: {name:"Sassy", plus:'spd', minus:'spe'},
		serious: {name:"Serious"},
		timid: {name:"Timid", plus:'spe', minus:'atk'}
	};

	function tryRequire(filePath) {
		try {
			var ret = require(filePath);
			if (!ret || typeof ret !== 'object') return new TypeError("" + filePath + " must export an object except `null`, or it should be removed");
			return ret;
		} catch (e) {
			return e;
		}
	}

	function Tools(mod) {
		if (!mod) mod = 'base';
		this.isBase = (mod === 'base');

		var path = (this.isBase ? './data/' : './mods/' + mod + '/') + dataFiles.Scripts;
		var maybeScripts = tryRequire(path);
		if (maybeScripts instanceof Error) {
			if (maybeScripts.code !== 'MODULE_NOT_FOUND') throw new Error("CRASH LOADING DATA: " + maybeScripts.stack);
		} else {
			var BattleScripts = maybeScripts.BattleScripts;
			if (!BattleScripts || typeof BattleScripts !== 'object') throw new TypeError("Exported property `BattleScripts`from `./data/scripts.js` must be an object except `null`.");
			if (BattleScripts.init) Object.defineProperty(this, 'initMod', {value: BattleScripts.init, enumerable: false, writable: true, configurable: true});
			if (BattleScripts.inherit) Object.defineProperty(this, 'inheritMod', {value: BattleScripts.inherit, enumerable: false, writable: true, configurable: true});
		}
		this.currentMod = mod;
		this.parentMod = this.isBase ? '' : (this.inheritMod || 'base');
	}

	Tools.preloadMods = function () {
		if (Tools.preloadedMods) return;
		var modList = fs.readdirSync(path.resolve(__dirname, 'mods'));
		for (var i = 0; i < modList.length; i++) {
			moddedTools[modList[i]] = new Tools(modList[i]);
		}
		Tools.preloadedMods = true;
	};

	Tools.prototype.mod = function (mod) {
		if (!moddedTools[mod]) {
			mod = this.getFormat(mod).mod;
		}
		if (!mod) mod = 'base';
		return moddedTools[mod].includeData();
	};
	Tools.prototype.modData = function (dataType, id) {
		if (this.isBase) return this.data[dataType][id];
		if (this.data[dataType][id] !== moddedTools[this.parentMod].data[dataType][id]) return this.data[dataType][id];
		return (this.data[dataType][id] = Object.clone(this.data[dataType][id], true));
	};

	Tools.prototype.effectToString = function () {
		return this.name;
	};
	Tools.prototype.getImmunity = function (source, target) {
		// returns false if the target is immune; true otherwise
		// also checks immunity to some statuses
		var sourceType = source.type || source;
		var targetTyping = target.getTypes && target.getTypes() || target.types || target;
		if (Array.isArray(targetTyping)) {
			for (var i = 0; i < targetTyping.length; i++) {
				if (!this.getImmunity(sourceType, targetTyping[i])) return false;
			}
			return true;
		}
		var typeData = this.data.TypeChart[targetTyping];
		if (typeData && typeData.damageTaken[sourceType] === 3) return false;
		return true;
	};
	Tools.prototype.getEffectiveness = function (source, target) {
		var sourceType = source.type || source;
		var totalTypeMod = 0;
		var targetTyping = target.getTypes && target.getTypes() || target.types || target;
		if (Array.isArray(targetTyping)) {
			for (var i = 0; i < targetTyping.length; i++) {
				totalTypeMod += this.getEffectiveness(sourceType, targetTyping[i]);
			}
			return totalTypeMod;
		}
		var typeData = this.data.TypeChart[targetTyping];
		if (!typeData) return 0;
		switch (typeData.damageTaken[sourceType]) {
		case 1: return 1; // super-effective
		case 2: return -1; // resist
		// in case of weird situations like Gravity, immunity is
		// handled elsewhere
		default: return 0;
		}
	};

	/**
	 * Safely ensures the passed variable is a string
	 * Simply doing '' + str can crash if str.toString crashes or isn't a function
	 * If we're expecting a string and being given anything that isn't a string
	 * or a number, it's safe to assume it's an error, and return ''
	 */

	Tools.prototype.getString = function (str) {
		if (typeof str === 'string' || typeof str === 'number') return '' + str;
		return '';
	};

	/**
	 * Sanitizes a username or Pokemon nickname
	 *
	 * Returns the passed name, sanitized for safe use as a name in the PS
	 * protocol.
	 *
	 * Such a string must uphold these guarantees:
	 * - must not contain any ASCII whitespace character other than a space
	 * - must not start or end with a space character
	 * - must not contain any of: | , [ ]
	 * - must not be the empty string
	 *
	 * If no such string can be found, returns the empty string. Calling
	 * functions are expected to check for that condition and deal with it
	 * accordingly.
	 *
	 * getName also enforces that there are not multiple space characters
	 * in the name, although this is not strictly necessary for safety.
	 */

	Tools.prototype.getName = function (name) {
		if (typeof name !== 'string' && typeof name !== 'number') return '';
		name = ('' + name).replace(/[\|\s\[\]\,]+/g, ' ').trim();
		if (name.length > 18) name = name.substr(0, 18).trim();
		return name;
	};

	Tools.prototype.getTemplate = function (template) {
		if (!template || typeof template === 'string') {
			var name = (template || '').trim();
			var id = toId(name);
			if (this.data.Aliases[id]) {
				name = this.data.Aliases[id];
				id = toId(name);
			}
			template = {};
			if (id && this.data.Pokedex[id]) {
				template = this.data.Pokedex[id];
				if (template.cached) return template;
				template.cached = true;
				template.exists = true;
			}
			name = template.species || template.name || name;
			if (this.data.FormatsData[id]) {
				Object.merge(template, this.data.FormatsData[id]);
			}
			if (this.data.Learnsets[id]) {
				Object.merge(template, this.data.Learnsets[id]);
			}
			if (!template.id) template.id = id;
			if (!template.name) template.name = name;
			if (!template.speciesid) template.speciesid = id;
			if (!template.species) template.species = name;
			if (!template.baseSpecies) template.baseSpecies = name;
			if (!template.forme) template.forme = '';
			if (!template.formeLetter) template.formeLetter = '';
			if (!template.spriteid) template.spriteid = toId(template.baseSpecies) + (template.baseSpecies !== name ? '-' + toId(template.forme) : '');
			if (!template.prevo) template.prevo = '';
			if (!template.evos) template.evos = [];
			if (!template.nfe) template.nfe = !!template.evos.length;
			if (!template.gender) template.gender = '';
			if (!template.genderRatio && template.gender === 'M') template.genderRatio = {M:1, F:0};
			if (!template.genderRatio && template.gender === 'F') template.genderRatio = {M:0, F:1};
			if (!template.genderRatio && template.gender === 'N') template.genderRatio = {M:0, F:0};
			if (!template.genderRatio) template.genderRatio = {M:0.5, F:0.5};
			if (!template.tier && template.baseSpecies !== template.species) template.tier = this.data.FormatsData[toId(template.baseSpecies)].tier;
			if (!template.tier) template.tier = 'Illegal';
			if (!template.gen) {
				if (template.forme && template.forme in {'Mega':1, 'Mega-X':1, 'Mega-Y':1}) {
					template.gen = 6;
					template.isMega = true;
				} else if (template.forme === 'Primal') {
					template.gen = 6;
					template.isPrimal = true;
				} else if (template.num >= 650) {
					template.gen = 6;
				} else if (template.num >= 494) {
					template.gen = 5;
				} else if (template.num >= 387) {
					template.gen = 4;
				} else if (template.num >= 252) {
					template.gen = 3;
				} else if (template.num >= 152) {
					template.gen = 2;
				} else if (template.num >= 1) {
					template.gen = 1;
				} else {
					template.gen = 0;
				}
			}
		}
		return template;
	};
	Tools.prototype.getMove = function (move) {
		if (!move || typeof move === 'string') {
			var name = (move || '').trim();
			var id = toId(name);
			if (this.data.Aliases[id]) {
				name = this.data.Aliases[id];
				id = toId(name);
			}
			move = {};
			if (id.substr(0, 11) === 'hiddenpower') {
				var matches = /([a-z]*)([0-9]*)/.exec(id);
				id = matches[1];
			}
			if (id && this.data.Movedex[id]) {
				move = this.data.Movedex[id];
				if (move.cached) return move;
				move.cached = true;
				move.exists = true;
			}
			if (!move.id) move.id = id;
			if (!move.name) move.name = name;
			if (!move.fullname) move.fullname = 'move: ' + move.name;
			move.toString = this.effectToString;
			if (!move.critRatio) move.critRatio = 1;
			if (!move.baseType) move.baseType = move.type;
			if (!move.effectType) move.effectType = 'Move';
			if (!move.secondaries && move.secondary) move.secondaries = [move.secondary];
			if (!move.gen) {
				if (move.num >= 560) {
					move.gen = 6;
				} else if (move.num >= 468) {
					move.gen = 5;
				} else if (move.num >= 355) {
					move.gen = 4;
				} else if (move.num >= 252) {
					move.gen = 3;
				} else if (move.num >= 166) {
					move.gen = 2;
				} else if (move.num >= 1) {
					move.gen = 1;
				} else {
					move.gen = 0;
				}
			}
			if (!move.priority) move.priority = 0;
			if (move.ignoreImmunity === undefined) move.ignoreImmunity = (move.category === 'Status');
			if (!move.flags) move.flags = {};
		}
		return move;
	};
	/**
	 * Ensure we're working on a copy of a move (and make a copy if we aren't)
	 *
	 * Remember: "ensure" - by default, it won't make a copy of a copy:
	 *     moveCopy === Tools.getMoveCopy(moveCopy)
	 *
	 * If you really want to, use:
	 *     moveCopyCopy = Tools.getMoveCopy(moveCopy.id)
	 *
	 * @param  move    Move ID, move object, or movecopy object describing move to copy
	 * @return         movecopy object
	 */
	Tools.prototype.getMoveCopy = function (move) {
		if (move && move.isCopy) return move;
		move = this.getMove(move);
		var moveCopy = Object.clone(move, true);
		moveCopy.isCopy = true;
		return moveCopy;
	};
	Tools.prototype.getEffect = function (effect) {
		if (!effect || typeof effect === 'string') {
			var name = (effect || '').trim();
			var id = toId(name);
			effect = {};
			if (id && this.data.Statuses[id]) {
				effect = this.data.Statuses[id];
				effect.name = effect.name || this.data.Statuses[id].name;
			} else if (id && this.data.Movedex[id] && this.data.Movedex[id].effect) {
				effect = this.data.Movedex[id].effect;
				effect.name = effect.name || this.data.Movedex[id].name;
			} else if (id && this.data.Abilities[id] && this.data.Abilities[id].effect) {
				effect = this.data.Abilities[id].effect;
				effect.name = effect.name || this.data.Abilities[id].name;
			} else if (id && this.data.Items[id] && this.data.Items[id].effect) {
				effect = this.data.Items[id].effect;
				effect.name = effect.name || this.data.Items[id].name;
			} else if (id && this.data.Formats[id]) {
				effect = this.data.Formats[id];
				effect.name = effect.name || this.data.Formats[id].name;
				if (!effect.mod) effect.mod = 'base';
				if (!effect.effectType) effect.effectType = 'Format';
			} else if (id === 'recoil') {
				effect = {
					effectType: 'Recoil'
				};
			} else if (id === 'drain') {
				effect = {
					effectType: 'Drain'
				};
			}
			if (!effect.id) effect.id = id;
			if (!effect.name) effect.name = name;
			if (!effect.fullname) effect.fullname = effect.name;
			effect.toString = this.effectToString;
			if (!effect.category) effect.category = 'Effect';
			if (!effect.effectType) effect.effectType = 'Effect';
		}
		return effect;
	};
	Tools.prototype.getFormat = function (effect) {
		if (!effect || typeof effect === 'string') {
			var name = (effect || '').trim();
			var id = toId(name);
			if (this.data.Aliases[id]) {
				name = this.data.Aliases[id];
				id = toId(name);
			}
			effect = {};
			if (id && this.data.Formats[id]) {
				effect = this.data.Formats[id];
				if (effect.cached) return effect;
				effect.cached = true;
				effect.name = effect.name || this.data.Formats[id].name;
				if (!effect.mod) effect.mod = 'base';
				if (!effect.effectType) effect.effectType = 'Format';
			}
			if (!effect.id) effect.id = id;
			if (!effect.name) effect.name = name;
			if (!effect.fullname) effect.fullname = effect.name;
			effect.toString = this.effectToString;
			if (!effect.category) effect.category = 'Effect';
			if (!effect.effectType) effect.effectType = 'Effect';
		}
		return effect;
	};
	Tools.prototype.getItem = function (item) {
		if (!item || typeof item === 'string') {
			var name = (item || '').trim();
			var id = toId(name);
			if (this.data.Aliases[id]) {
				name = this.data.Aliases[id];
				id = toId(name);
			}
			item = {};
			if (id && this.data.Items[id]) {
				item = this.data.Items[id];
				if (item.cached) return item;
				item.cached = true;
				item.exists = true;
			}
			if (!item.id) item.id = id;
			if (!item.name) item.name = name;
			if (!item.fullname) item.fullname = 'item: ' + item.name;
			item.toString = this.effectToString;
			if (!item.category) item.category = 'Effect';
			if (!item.effectType) item.effectType = 'Item';
			if (item.isBerry) item.fling = {basePower: 10};
			if (item.onPlate) item.fling = {basePower: 90};
			if (item.onDrive) item.fling = {basePower: 70};
			if (item.megaStone) item.fling = {basePower: 80};
			if (!item.gen) {
				if (item.num >= 577) {
					item.gen = 6;
				} else if (item.num >= 537) {
					item.gen = 5;
				} else if (item.num >= 377) {
					item.gen = 4;
				} else {
					item.gen = 3;
				}
				// Due to difference in storing items, gen 2 items must be specified manually
			}
		}
		return item;
	};
	Tools.prototype.getAbility = function (ability) {
		if (!ability || typeof ability === 'string') {
			var name = (ability || '').trim();
			var id = toId(name);
			ability = {};
			if (id && this.data.Abilities[id]) {
				ability = this.data.Abilities[id];
				if (ability.cached) return ability;
				ability.cached = true;
				ability.exists = true;
			}
			if (!ability.id) ability.id = id;
			if (!ability.name) ability.name = name;
			if (!ability.fullname) ability.fullname = 'ability: ' + ability.name;
			ability.toString = this.effectToString;
			if (!ability.category) ability.category = 'Effect';
			if (!ability.effectType) ability.effectType = 'Ability';
			if (!ability.gen) {
				if (ability.num >= 165) {
					ability.gen = 6;
				} else if (ability.num >= 124) {
					ability.gen = 5;
				} else if (ability.num >= 77) {
					ability.gen = 4;
				} else if (ability.num >= 1) {
					ability.gen = 3;
				} else {
					ability.gen = 0;
				}
			}
		}
		return ability;
	};
	Tools.prototype.getType = function (type) {
		if (!type || typeof type === 'string') {
			var id = toId(type);
			id = id.charAt(0).toUpperCase() + id.substr(1);
			type = {};
			if (id && this.data.TypeChart[id]) {
				type = this.data.TypeChart[id];
				if (type.cached) return type;
				type.cached = true;
				type.exists = true;
				type.isType = true;
				type.effectType = 'Type';
			}
			if (!type.id) type.id = id;
			if (!type.effectType) {
				// man, this is really meta
				type.effectType = 'EffectType';
			}
		}
		return type;
	};
	Tools.prototype.getNature = function (nature) {
		if (!nature || typeof nature === 'string') {
			var name = (nature || '').trim();
			var id = toId(name);
			nature = {};
			if (id && this.data.Natures[id]) {
				nature = this.data.Natures[id];
				if (nature.cached) return nature;
				nature.cached = true;
				nature.exists = true;
			}
			if (!nature.id) nature.id = id;
			if (!nature.name) nature.name = name;
			nature.toString = this.effectToString;
			if (!nature.effectType) nature.effectType = 'Nature';
		}
		return nature;
	};
	Tools.prototype.natureModify = function (stats, nature) {
		nature = this.getNature(nature);
		if (nature.plus) stats[nature.plus] *= 1.1;
		if (nature.minus) stats[nature.minus] *= 0.9;
		return stats;
	};

	Tools.prototype.getBanlistTable = function (format, subformat, depth) {
		var banlistTable;
		if (!depth) depth = 0;
		if (depth > 8) return; // avoid infinite recursion
		if (format.banlistTable && !subformat) {
			banlistTable = format.banlistTable;
		} else {
			if (!format.banlistTable) format.banlistTable = {};
			if (!format.setBanTable) format.setBanTable = [];
			if (!format.teamBanTable) format.teamBanTable = [];

			banlistTable = format.banlistTable;
			if (!subformat) subformat = format;
			if (subformat.banlist) {
				for (var i = 0; i < subformat.banlist.length; i++) {
					// don't revalidate what we already validate
					if (banlistTable[toId(subformat.banlist[i])]) continue;

					banlistTable[subformat.banlist[i]] = subformat.name || true;
					banlistTable[toId(subformat.banlist[i])] = subformat.name || true;

					var complexList;
					if (subformat.banlist[i].includes('+')) {
						if (subformat.banlist[i].includes('++')) {
							complexList = subformat.banlist[i].split('++');
							for (var j = 0; j < complexList.length; j++) {
								complexList[j] = toId(complexList[j]);
							}
							format.teamBanTable.push(complexList);
						} else {
							complexList = subformat.banlist[i].split('+');
							for (var j = 0; j < complexList.length; j++) {
								complexList[j] = toId(complexList[j]);
							}
							format.setBanTable.push(complexList);
						}
					}
				}
			}
			if (subformat.ruleset) {
				for (var i = 0; i < subformat.ruleset.length; i++) {
					// don't revalidate what we already validate
					if (banlistTable['Rule:' + toId(subformat.ruleset[i])]) continue;

					banlistTable['Rule:' + toId(subformat.ruleset[i])] = subformat.ruleset[i];
					if (format.ruleset.indexOf(subformat.ruleset[i]) < 0) format.ruleset.push(subformat.ruleset[i]);

					var subsubformat = this.getFormat(subformat.ruleset[i]);
					if (subsubformat.ruleset || subsubformat.banlist) {
						this.getBanlistTable(format, subsubformat, depth + 1);
					}
				}
			}
		}
		return banlistTable;
	};

	Tools.prototype.levenshtein = function (s, t, l) { // s = string 1, t = string 2, l = limit
		// Original levenshtein distance function by James Westgate, turned out to be the fastest
		var d = []; // 2d matrix

		// Step 1
		var n = s.length;
		var m = t.length;

		if (n === 0) return m;
		if (m === 0) return n;
		if (l && Math.abs(m - n) > l) return Math.abs(m - n);

		// Create an array of arrays in javascript (a descending loop is quicker)
		for (var i = n; i >= 0; i--) d[i] = [];

		// Step 2
		for (var i = n; i >= 0; i--) d[i][0] = i;
		for (var j = m; j >= 0; j--) d[0][j] = j;

		// Step 3
		for (var i = 1; i <= n; i++) {
			var s_i = s.charAt(i - 1);

			// Step 4
			for (var j = 1; j <= m; j++) {
				// Check the jagged ld total so far
				if (i === j && d[i][j] > 4) return n;

				var t_j = t.charAt(j - 1);
				var cost = (s_i === t_j) ? 0 : 1; // Step 5

				// Calculate the minimum
				var mi = d[i - 1][j] + 1;
				var b = d[i][j - 1] + 1;
				var c = d[i - 1][j - 1] + cost;

				if (b < mi) mi = b;
				if (c < mi) mi = c;

				d[i][j] = mi; // Step 6
			}
		}

		// Step 7
		return d[n][m];
	};

	Tools.prototype.clampIntRange = function (num, min, max) {
		if (typeof num !== 'number') num = 0;
		num = Math.floor(num);
		if (num < min) num = min;
		if (max !== undefined && num > max) num = max;
		return num;
	};

	Tools.prototype.escapeHTML = function (str) {
		if (!str) return '';
		return ('' + str).escapeHTML();
	};

	Tools.prototype.dataSearch = function (target, searchIn) {
		if (!target) {
			return false;
		}

		searchIn = searchIn || ['Pokedex', 'Movedex', 'Abilities', 'Items', 'Natures'];

		var searchFunctions = {Pokedex: 'getTemplate', Movedex: 'getMove', Abilities: 'getAbility', Items: 'getItem', Natures: 'getNature'};
		var searchTypes = {Pokedex: 'pokemon', Movedex: 'move', Abilities: 'ability', Items: 'item', Natures: 'nature'};
		var searchResults = [];
		for (var i = 0; i < searchIn.length; i++) {
			var res = this[searchFunctions[searchIn[i]]](target);
			if (res.exists) {
				res.searchType = searchTypes[searchIn[i]];
				searchResults.push(res);
			}
		}
		if (searchResults.length) {
			return searchResults;
		}

		var cmpTarget = target.toLowerCase();
		var maxLd = 3;
		if (cmpTarget.length <= 1) {
			return false;
		} else if (cmpTarget.length <= 4) {
			maxLd = 1;
		} else if (cmpTarget.length <= 6) {
			maxLd = 2;
		}
		for (var i = 0; i < searchIn.length; i++) {
			var searchObj = this.data[searchIn[i]];
			if (!searchObj) {
				continue;
			}

			for (var j in searchObj) {
				var word = searchObj[j];
				if (typeof word === "object") {
					word = word.name || word.species;
				}
				if (!word) {
					continue;
				}

				var ld = this.levenshtein(cmpTarget, word.toLowerCase(), maxLd);
				if (ld <= maxLd) {
					searchResults.push({word: word, ld: ld});
				}
			}
		}

		if (searchResults.length) {
			var newTarget = "";
			var newLD = 10;
			for (var i = 0, l = searchResults.length; i < l; i++) {
				if (searchResults[i].ld < newLD) {
					newTarget = searchResults[i];
					newLD = searchResults[i].ld;
				}
			}

			// To make sure we aren't in an infinite loop...
			if (cmpTarget !== newTarget.word) {
				return this.dataSearch(newTarget.word);
			}
		}

		return false;
	};

	Tools.prototype.packTeam = function (team) {
		if (!team) return '';

		var buf = '';

		for (var i = 0; i < team.length; i++) {
			var set = team[i];
			if (buf) buf += ']';

			// name
			buf += (set.name || set.species);

			// species
			var id = toId(set.species || set.name);
			buf += '|' + (toId(set.name || set.species) === id ? '' : id);

			// item
			buf += '|' + toId(set.item);

			// ability
			var template = moddedTools.base.getTemplate(set.species || set.name);
			var abilities = template.abilities;
			id = toId(set.ability);
			if (abilities) {
				if (id === toId(abilities['0'])) {
					buf += '|';
				} else if (id === toId(abilities['1'])) {
					buf += '|1';
				} else if (id === toId(abilities['H'])) {
					buf += '|H';
				} else {
					buf += '|' + id;
				}
			} else {
				buf += '|' + id;
			}

			// moves
			buf += '|' + set.moves.map(toId).join(',');

			// nature
			buf += '|' + set.nature;

			// evs
			var evs = '|';
			if (set.evs) {
				evs = '|' + (set.evs['hp'] || '') + ',' + (set.evs['atk'] || '') + ',' + (set.evs['def'] || '') + ',' + (set.evs['spa'] || '') + ',' + (set.evs['spd'] || '') + ',' + (set.evs['spe'] || '');
			}
			if (evs === '|,,,,,') {
				buf += '|';
			} else {
				buf += evs;
			}

			// gender
			if (set.gender && set.gender !== template.gender) {
				buf += '|' + set.gender;
			} else {
				buf += '|';
			}

			// ivs
			var ivs = '|';
			if (set.ivs) {
				ivs = '|' + (set.ivs['hp'] === 31 || set.ivs['hp'] === undefined ? '' : set.ivs['hp']) + ',' + (set.ivs['atk'] === 31 || set.ivs['atk'] === undefined ? '' : set.ivs['atk']) + ',' + (set.ivs['def'] === 31 || set.ivs['def'] === undefined ? '' : set.ivs['def']) + ',' + (set.ivs['spa'] === 31 || set.ivs['spa'] === undefined ? '' : set.ivs['spa']) + ',' + (set.ivs['spd'] === 31 || set.ivs['spd'] === undefined ? '' : set.ivs['spd']) + ',' + (set.ivs['spe'] === 31 || set.ivs['spe'] === undefined ? '' : set.ivs['spe']);
			}
			if (ivs === '|,,,,,') {
				buf += '|';
			} else {
				buf += ivs;
			}

			// shiny
			if (set.shiny) {
				buf += '|S';
			} else {
				buf += '|';
			}

			// level
			if (set.level && set.level !== 100) {
				buf += '|' + set.level;
			} else {
				buf += '|';
			}

			// happiness
			if (set.happiness !== undefined && set.happiness !== 255) {
				buf += '|' + set.happiness;
			} else {
				buf += '|';
			}
		}

		return buf;
	};

	Tools.prototype.fastUnpackTeam = function (buf) {
		if (!buf) return null;

		var team = [];
		var i = 0, j = 0;

		// limit to 24
		for (var count = 0; count < 24; count++) {
			var set = {};
			team.push(set);

			// name
			j = buf.indexOf('|', i);
			if (j < 0) return;
			set.name = buf.substring(i, j);
			i = j + 1;

			// species
			j = buf.indexOf('|', i);
			if (j < 0) return;
			set.species = buf.substring(i, j) || set.name;
			i = j + 1;

			// item
			j = buf.indexOf('|', i);
			if (j < 0) return;
			set.item = buf.substring(i, j);
			i = j + 1;

			// ability
			j = buf.indexOf('|', i);
			if (j < 0) return;
			var ability = buf.substring(i, j);
			var template = moddedTools.base.getTemplate(set.species);
			set.ability = (template.abilities && ability in {'':1, 0:1, 1:1, H:1} ? template.abilities[ability || '0'] : ability);
			i = j + 1;

			// moves
			j = buf.indexOf('|', i);
			if (j < 0) return;
			set.moves = buf.substring(i, j).split(',');
			i = j + 1;

			// nature
			j = buf.indexOf('|', i);
			if (j < 0) return;
			set.nature = buf.substring(i, j);
			i = j + 1;

			// evs
			j = buf.indexOf('|', i);
			if (j < 0) return;
			if (j !== i) {
				var evs = buf.substring(i, j).split(',');
				set.evs = {
					hp: Number(evs[0]) || 0,
					atk: Number(evs[1]) || 0,
					def: Number(evs[2]) || 0,
					spa: Number(evs[3]) || 0,
					spd: Number(evs[4]) || 0,
					spe: Number(evs[5]) || 0
				};
			}
			i = j + 1;

			// gender
			j = buf.indexOf('|', i);
			if (j < 0) return;
			if (i !== j) set.gender = buf.substring(i, j);
			i = j + 1;

			// ivs
			j = buf.indexOf('|', i);
			if (j < 0) return;
			if (j !== i) {
				var ivs = buf.substring(i, j).split(',');
				set.ivs = {
					hp: ivs[0] === '' ? 31 : Number(ivs[0]) || 0,
					atk: ivs[1] === '' ? 31 : Number(ivs[1]) || 0,
					def: ivs[2] === '' ? 31 : Number(ivs[2]) || 0,
					spa: ivs[3] === '' ? 31 : Number(ivs[3]) || 0,
					spd: ivs[4] === '' ? 31 : Number(ivs[4]) || 0,
					spe: ivs[5] === '' ? 31 : Number(ivs[5]) || 0
				};
			}
			i = j + 1;

			// shiny
			j = buf.indexOf('|', i);
			if (j < 0) return;
			if (i !== j) set.shiny = true;
			i = j + 1;

			// level
			j = buf.indexOf('|', i);
			if (j < 0) return;
			if (i !== j) set.level = parseInt(buf.substring(i, j), 10);
			i = j + 1;

			// happiness
			j = buf.indexOf(']', i);
			if (j < 0) {
				if (buf.substring(i)) {
					set.happiness = Number(buf.substring(i));
				}
				break;
			}
			if (i !== j) set.happiness = Number(buf.substring(i, j));
			i = j + 1;
		}

		return team;
	};

	Tools.prototype.includeMods = function () {
		if (this.modsLoaded) return this;
		if (!this.isLoaded) this.includeData();

		for (var id in moddedTools) {
			if (moddedTools[id].isLoaded) continue;
			moddedTools[id].includeData();
		}

		return this;
	};

	Tools.prototype.includeData = function () {
		if (this.isLoaded) return this;
		if (!this.data) this.data = {mod: this.currentMod};
		var data = this.data;

		var basePath = './data/';
		var parentTools;
		if (this.parentMod) {
			parentTools = moddedTools[this.parentMod];
			if (!parentTools || parentTools === this) throw new Error("Unable to load " + this.currentMod + ". `inherit` should specify a parent mod from which to inherit data, or must be not specified.");
			if (!parentTools.isLoaded) parentTools.includeData();
			basePath = './mods/' + this.currentMod + '/';
		}

		dataTypes.forEach(function (dataType) {
			if (typeof dataFiles[dataType] !== 'string') return (data[dataType] = dataFiles[dataType]);
			if (dataType === 'Natures') {
				if (data.mod === 'base') return (data[dataType] = BattleNatures);
				return;
			}
			var maybeData = tryRequire(basePath + dataFiles[dataType]);
			if (maybeData instanceof Error) {
				if (maybeData.code !== 'MODULE_NOT_FOUND') throw new Error("CRASH LOADING " + data.mod.toUpperCase() + " DATA:\n" + maybeData.stack);
				maybeData['Battle' + dataType] = {}; // Fall back to an empty object
			}
			var BattleData = maybeData['Battle' + dataType];
			if (!BattleData || typeof BattleData !== 'object') throw new TypeError("Exported property `Battle" + dataType + "`from `" + './data/' + dataFiles[dataType] + "` must be an object except `null`.");
			if (BattleData !== data[dataType]) data[dataType] = Object.merge(BattleData, data[dataType]);
		});
		if (this.isBase) {
			// Formats are inherited by mods
			this.includeFormats();
		} else {
			dataTypes.forEach(function (dataType) {
				var parentTypedData = parentTools.data[dataType];
				if (!data[dataType]) data[dataType] = {};
				for (var key in parentTypedData) {
					if (data[dataType][key] === null) {
						// null means don't inherit
						delete data[dataType][key];
					} else if (!(key in data[dataType])) {
						// If it doesn't exist it's inherited from the parent data
						if (dataType === 'Pokedex') {
							// Pokedex entries can be modified too many different ways
							data[dataType][key] = Object.clone(parentTypedData[key], true);
						} else {
							data[dataType][key] = parentTypedData[key];
						}
					} else if (data[dataType][key] && data[dataType][key].inherit) {
						// {inherit: true} can be used to modify only parts of the parent data,
						// instead of overwriting entirely
						delete data[dataType][key].inherit;
						Object.merge(data[dataType][key], parentTypedData[key], false, false);
					}
				}
			});
		}

		// Flag the generation. Required for team validator.
		this.gen = data.Scripts.gen || 6;

		// Execute initialization script.
		if (typeof this.initMod === 'function') this.initMod();

		this.isLoaded = true;
		return this;
	};

	Tools.prototype.includeFormats = function () {
		if (this.formatsLoaded) return this;
		Tools.preloadMods();

		if (!this.data) this.data = {mod: this.currentMod};
		if (!this.data.Formats) this.data.Formats = {};

		// Load [formats] aliases
		var maybeAliases = tryRequire('./data/' + dataFiles.Aliases);
		if (maybeAliases instanceof Error) {
			if (maybeAliases.code !== 'MODULE_NOT_FOUND') throw new Error("CRASH LOADING ALIASES:\n" + maybeAliases.stack);
			maybeAliases.BattleAliases = {}; // Fall back to an empty object
		}
		var BattleAliases = maybeAliases.BattleAliases;
		if (!BattleAliases || typeof BattleAliases !== 'object') throw new TypeError("Exported property `BattleAliases`from `" + "./data/aliases.js` must be an object except `null`.");
		this.data.Aliases = BattleAliases;

		// Load formats
		var maybeFormats = tryRequire('./config/formats.js');
		if (maybeFormats instanceof Error) {
			if (maybeFormats.code !== 'MODULE_NOT_FOUND') throw new Error("CRASH LOADING FORMATS:\n" + maybeFormats.stack);
		}
		var BattleFormats = maybeFormats.Formats;
		if (!Array.isArray(BattleFormats)) throw new TypeError("Exported property `Formats`from `" + "./config/formats.js" + "` must be an array.");

		for (var i = 0; i < BattleFormats.length; i++) {
			var format = BattleFormats[i];
			var id = toId(format.name);
			if (!id) throw new RangeError("Format #" + (i + 1) + " must have a name with alphanumeric characters");
			if (this.data.Formats[id]) throw new Error("Format #" + (i + 1) + " has a duplicate ID: `" + id + "`");
			format.effectType = 'Format';
			if (format.challengeShow === undefined) format.challengeShow = true;
			if (format.searchShow === undefined) format.searchShow = true;
			if (format.tournamentShow === undefined) format.tournamentShow = true;
			if (format.mod === undefined) format.mod = 'base';
			if (!moddedTools[format.mod]) throw new Error("Format `" + format.name + "` requires nonexistent mod: `" + format.mod + "`");
			this.data.Formats[id] = format;
		}

		this.formatsLoaded = true;
		return this;
	};

	/**
	 * Install our Tools functions into the battle object
	 */
	Tools.prototype.install = function (battle) {
		for (var i in this.data.Scripts) {
			battle[i] = this.data.Scripts[i];
		}
	};

	moddedTools.base = new Tools();

	// "gen6" is an alias for the current base data
	moddedTools.gen6 = moddedTools.base;

	Object.getPrototypeOf(moddedTools.base).moddedTools = moddedTools;

	return moddedTools.base;
})();
