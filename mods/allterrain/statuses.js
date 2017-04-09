'use strict';

exports.BattleStatuses = {
	allterrain: {
		name: 'All Terrain',
		id: 'allterrain',
		effectType: 'terrain',
		duration: 0,
		onBegin: function() {
			this.setTerrain('allterrain');
		},
		onSetStatus: function (status, target, source, effect) {
			if (!target.isGrounded() || target.isSemiInvulnerable()) return;
			if (status.id === 'slp') {
				if (effect.effectType === 'Move' && !effect.secondaries) {
					this.add('-activate', target, 'Electric Terrain');
				}
				return false;
			}
			if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
				this.add('-activate', target, 'move: Misty Terrain');
			}
			return false;
		},
		onTryAddVolatile: function (status, target) {
			if (!target.isGrounded() || target.isSemiInvulnerable()) return;
			if (status.id === 'yawn') {
				this.add('-activate', target, 'move: Electric Terrain');
				return null;
			}
			if (status.id === 'confusion') {
				this.add('-activate', target, 'move: Misty Terrain');
				return null;
			}
		},
		onTryHitPriority: 4,
		onTryHit: function (target, source, effect) {
			if (!target.isGrounded() || target.isSemiInvulnerable() || target.side === source.side) return;
			if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
				return;
			}
			this.add('-activate', target, 'move: Psychic Terrain');
			return null;
		},
		onBasePower: function (basePower, attacker, defender, move) {
			let weakenedMoves = {'earthquake':1, 'bulldoze':1, 'magnitude':1};
			if (move.id in weakenedMoves) {
				this.debug('move weakened by grassy terrain');
				return this.chainModify(0.5);
			}
			if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
				this.debug('misty terrain weaken');
				return this.chainModify(0.5);
			}
			if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				this.debug('electric terrain boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				this.debug('psychic terrain boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Grass' && attacker.isGrounded()) {
				this.debug('grassy terrain boost');
				return this.chainModify(1.5);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function () {
			this.eachEvent('Terrain');
		},
		onTerrain: function (pokemon) {
			if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
				this.debug('Pokemon is grounded, healing through Grassy Terrain.');
				this.heal(pokemon.maxhp / 16, pokemon, pokemon);
			}
		},
		onStart: function (battle, source, effect) {
			this.add('-fieldstart', 'All Terrain');
		},
		onEnd: function () {
			this.eachEvent('Terrain');
			this.add('-fieldend', 'All Terrain');
		},
	},
};