'use strict';

exports.BattleFormats = {
	pokemon: {
		effectType: 'Banlist',
		onValidateSet: function (set, format) {
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.gen > this.gen && move.id !== 'trickroom'){
						problems.push(move.name + ' does not exist in gen ' + this.gen + '.');
					} else if (move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
			}
		}
	},
};
