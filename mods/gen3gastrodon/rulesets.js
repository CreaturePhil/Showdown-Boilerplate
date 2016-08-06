'use strict';

exports.BattleFormats = {
	pokemon: {
		effectType: 'Banlist',
		onValidateSet: function (set, format, pokemon) {
			let template = this.getTemplate(set.species);
			let problems = [];
			if (set.species === set.name) delete set.name;

			if (template.gen > this.gen && pokemon.id !== 'gastrodon') {
				problems.push(set.species + ' does not exist in gen ' + this.gen + '.');
			} else if (template.isNonstandard) {
				problems.push(set.species + ' is not a real Pokemon.');
			}
		},
	},
};
