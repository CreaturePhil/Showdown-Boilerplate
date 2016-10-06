'use strict';

exports.BattleStatuses = {
	frz: {
		inherit: true,
		onBeforeMove: function (pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.random(3) === 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
	},
};
