'use strict';

exports.BattleAbilities = {
 flairhax: {
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2.2;
				}
			}
		},
                onStart: function (pokemon) {
			this.boost({spe:2});
},

  speciesball: {
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 1.0;
				}
			}
		},
                onStart: function (pokemon) {
			this.boost({evasion:1});
},