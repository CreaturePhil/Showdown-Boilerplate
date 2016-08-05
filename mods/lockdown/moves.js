//mods/lockdown/moves.js
'use strict';

exports.BattleMovedex = {
	watersport: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				if (this.turn > 2) return 999;
				return 5;			
			},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Water Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('water sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onResidualOrder: 21,
			onEnd: function () {
				this.add('-fieldend', 'move: Water Sport');
			},
		}
	},
	mudsport: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				if (this.turn > 2) return 999;
				return 5;			
			},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('mud sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onResidualOrder: 21,
			onEnd: function () {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
	},
	electricterrain: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				if (this.turn > 2) return 999;
				return 5;			
			},
			onSetStatus: function (status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					this.debug('Interrupting sleep from Electric Terrain');
					return false;
				}
			},
			onTryHit: function (target, source, move) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (move && move.id === 'yawn') {
					return false;
				}
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart: function () {
				this.add('-fieldstart', 'move: Electric Terrain');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
	grassyterrain: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				if (this.turn > 2) return 999;
				return 5;			
			},
			onBasePower: function (basePower, attacker, defender, move) {
				let weakenedMoves = {'earthquake':1, 'bulldoze':1, 'magnitude':1};
				if (move.id in weakenedMoves) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Grassy Terrain');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual: function (battle) {
				this.debug('onResidual battle');
				let pokemon;
				for (let s in battle.sides) {
					for (let p in battle.sides[s].active) {
						pokemon = battle.sides[s].active[p];
						if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
							this.debug('Pokemon is grounded, healing through Grassy Terrain.');
							this.heal(pokemon.maxhp / 16, pokemon, pokemon);
						}
					}
				}
			},
			onEnd: function () {
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	mistyterrain: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				if (this.turn > 2) return 999;
				return 5;			
			},
			onSetStatus: function (status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				this.debug('misty terrain preventing status');
				return false;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart: function (side) {
				this.add('-fieldstart', 'Misty Terrain');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function (side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},
	gravity: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				//ignoring Persistent ability
				if (this.turn > 2) return 999;
				return 5;
			},
			onStart: function () {
				this.add('-fieldstart', 'move: Gravity');
				for (let side of this.sides) for (let pokemon of side.pokemon) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'Gravity');
				}
			},
			onModifyAccuracy: function (accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove: function (pokemon) {
				let disabledMoves = {bounce:1, fly:1, flyingpress:1, highjumpkick:1, jumpkick:1, magnetrise:1, skydrop:1, splash:1, telekinesis:1};
				for (let m in disabledMoves) {
					pokemon.disableMove(m);
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd: function () {
				this.add('-fieldend', 'move: Gravity');
			},
		},
	},
	trickroom: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				if (this.turn > 2) return 999;
				return 5;
			},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			// Speed modification is changed in BattlePokemon.getDecisionSpeed() in battle-engine.js
			onResidualOrder: 23,
			onEnd: function () {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},	
	magicroom: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				if (this.turn > 2) return 999;
				return 5;
			},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
			},
			// Item suppression implemented in BattlePokemon.ignoringItem() within battle-engine.js
			onResidualOrder: 25,
			onEnd: function () {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectData.source);
			},
		},

	},	
	wonderroom: {
		inherit: true,
		effect: {
			duration: 5,
			durationCallback: function () {
				if (this.turn > 2) return 999;
				return 5;
			},
			onStart: function (side, source) {
				this.add('-fieldstart', 'move: WonderRoom', '[of] ' + source);
			},
			onModifyMovePriority: -100,
			onModifyMove: function (move) {
				move.defensiveCategory = ((move.defensiveCategory || this.getCategory(move)) === 'Physical' ? 'Special' : 'Physical');
				this.debug('Defensive Category: ' + move.defensiveCategory);
			},
			onResidualOrder: 24,
			onEnd: function () {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
	},
	defog: {
		inherit: true,
		onHit: function (target, source, move) {
			if (!target.volatiles['substitute'] || move.infiltrates) this.boost({evasion:-1});

			let removeTarget = {reflect:1, lightscreen:1, safeguard:1, mist:1};
			if (this.turn < 7) {
				removeTarget = {reflect:1, lightscreen:1, safeguard:1, mist:1, spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1};
			}
			
			let removeAll = {spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1};


			for (let targetCondition in removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll[targetCondition]) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + target);
				}
			}
			if (this.turn < 7) {
				for (let sideCondition in removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					}
				}
			}
		},
	},
	rapidspin: {
		inherit: true,
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = {spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1};
				if (this.turn < 7) {
					for (let i in sideConditions) {
						if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
							this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
						}
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
	},
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
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	}	
}
