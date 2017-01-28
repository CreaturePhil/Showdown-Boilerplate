//mods/lockdown/moves.js
'use strict';

exports.BattleMovedex = {
	toxicspikes: {
		inherit: true,
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
			},
			onRestart: function (side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Poison')) return;
				if (pokemon.hasType('Poison')) {
					if (this.turn < 7) {
						this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
						pokemon.side.removeSideCondition('toxicspikes');
					}
				}
				else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				}
				else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	"genesissupernova": {
		inherit: true,
		onHit: function () {
			if(this.turn < 7) {
				this.setTerrain('psychicterrain');
			}
		},
	},
};
