'use strict';

exports.BattleStatuses = {
	choicelock: {
		inherit: true,
		onDisableMove: function (pokemon) {
			if (!(Tools.getItem(pokemon.ability).isChoice || Tools.getItem(pokemon.item).isChoice) || !pokemon.hasMove(this.effectData.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem()) {
				return;
			}
			let moves = pokemon.moveset;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].id !== this.effectData.move) {
					pokemon.disableMove(moves[i].id, false, this.effectData.sourceEffect);
				}
			}
		},
	},
};
