'use strict';

exports.BattleFormats = {
	pokemon: {
		effectType: 'Banlist',
		onValidateSet: function (set, format) {
			if (set.item) {
				let item = this.getItem(set.item);
				if (item.gen > this.gen && item.id !== 'choicescarf') {
					problems.push(item.name + ' does not exist in gen ' + this.gen + '.');
				} else if (item.isNonstandard) {
					problems.push(item.name + ' is not a real item.');
				}
			}
		}
	},
};
