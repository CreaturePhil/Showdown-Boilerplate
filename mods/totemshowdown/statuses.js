'use strict';

exports.BattleStatuses = {
	totem: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add('-message', `Totem ${pokemon.species}'s aura flared to life! Its stats rose!`);
			for (let i in pokemon.stats) {
				pokemon.boosts[i] = 1;
				this.add('-boost', pokemon, i, 1, '[silent]');
			}
		},
		onModifyMove: function (move) {
			delete move.selfSwitch;
		},
		onTrapPokemon: function (pokemon) {
			pokemon.tryTrap();
		},
		onDragOut: function (pokemon) {
			return null;
		},
		onFaint: function (pokemon) {
			this.add('-message', `${pokemon.side.name}'s Totem has fallen!`);
			pokemon.battle.win(pokemon.side.foe);
		},
	}
};
