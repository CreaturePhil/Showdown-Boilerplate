'use strict';

exports.BattleAbilities = {
	magicclaws:{
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "magicclaws",
		name: "Magic Claws",
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
	},
	blessedhax: {
		onStart: function (pokemon) {
			this.boost({def:1,spd:1});
		},
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe:1});
			}
		},
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
		},
		id:'blessedhax',
		name:'Blessed Hax',
	},
	wonderbreaker: {
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Wonder Breaker", "[of] " + target);
		},
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Wonder Breaker');
		},
		stopAttackEvents: true,
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		id: "wonderbreaker",
		name: "Wonder Breaker",
	},
	astyabsorb: {
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Asty Absorb');
				}
				return null;
			}
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({atk:1})) {
					this.add('-immune', target, '[msg]', '[from] ability: Asty Absorb');
				}
				return null;
			}
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Grass') {
				this.boost({atk:1}, this.effectData.target);
			}
		},
	},
	// GeoffBruedley
	baitkai: {
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				source.addVolatile('attract', target);
				source.addVolatile('confusion', target);
			}
		},
		id: "baitkai",
		name: "Baitkai",
		rating: 2,
	},
	epicclaws: {
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(1.5);
		},
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		effect: {
			duration: 1,
		},
		id: "epicclaws",
		name: "Epic Claws",
		rating: 2,
	},
	// Frysinger
	funhouse: {
		onStart: function (source) {
			this.useMove('Topsy-Turvy', source);
		},
		id: "funhouse",
		name: "Funhouse",
		rating: 3.5,
	},
	// MattL
	gravitationalfield: {
		shortDesc: "On switch-in, this Pokemon causes the effects of Gravity to occur.",
		onStart: function (source) {
			this.addPseudoWeather('gravity', source);
		},
		id: "gravitationalfield",
		name: "Gravitational Field",
		rating: 4,
	},
	// TEG
	hiddentype: {
		onSwitchInPriority: 101,
		onSwitchIn: function (pokemon) {
			let type = 'Normal';
			type = pokemon.getItem().onPlate;
			if (!type || type === true) {
				type = 'Normal';
			}
			pokemon.addType(type);
			this.add('-start', pokemon, 'typeadd', type, '[from] ability: Hidden Type');
		},
		id: "hiddentype",
		name: "Hidden Type",
		rating: 5,
	},
	// Snowy
	holyhail: {
		onStart: function () {
			this.setWeather('hail');
		},
		onAnySetWeather: function (target, source, weather) {
			if (weather.id !== 'hail') {
				this.add('message', 'The Holy Hail resisted the attempt to change the weather!');
				return false;
			}
		},
		onImmunity: function (type) {
			if (type === 'hail') return false;
		},
		onModifySpe: function () {
			if (this.isWeather(['hail'])) {
				return this.chainModify(2);
			}
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.maxhp / 16);
			}
		},
		id: "holyhail",
		name: "Holy Hail",
		rating: 5,
	},
	// Sunfished
	killjoy: {
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Killjoy');
			this.addPseudoWeather('killjoy', pokemon, "Killjoy");
		},
		onEnd: function (pokemon) {
			const foes = pokemon.side.foe.active;
			if (this.pseudoWeather['killjoy'] && !(foes.length && foes[0].hasAbility('killjoy'))) {
				this.removePseudoWeather('killjoy', pokemon);
			}
		},
		effect: {
			onStart: function () {
				this.add('message', 'All status moves will gain priority and cause recharge in the user!');
			},
			onModifyPriority: function (priority, pokemon, target, move) {
				if (move && move.category === 'Status') return priority + 1;
			},
			onModifyMove: function (move) {
				if (move.category === 'Status') {
					move.flags.recharge = 1;
					move.onAfterMove = function (source) {
						source.addVolatile('mustrecharge', source);
					};
				}
			},
			onEnd: function () {
				this.add('message', 'The priority of status moves have returned to normal.');
			},
		},
		id: "killjoy",
		name: "Killjoy",
		rating: 2,
	},
	// Halite
	lightlysalted: {
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
		onModifyMovePriority: 90,
		onModifyMove: function (move) {
			if (move.category === "Physical") {
				move.category = "Special";
			}
			if (!move.flags['contact']) return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 18,
				status: 'frz',
			});
		},
		id: "lightlysalted",
		name: "Lightly Salted",
		rating: 3.5,
	},
	// Golui
	specialsnowflake: {
		onStart: function (source) {
			this.add('-ability', source, 'Special Snowflake');
			this.add('message', 'All moves that target a Special Snowflake will become Special!');
		},
		onTryHit: function (target, source, move) {
			if (move.category !== 'Status') {
				move.category = 'Special';
			}
		},
		id: "specialsnowflake",
		name: "Special Snowflake",
		rating: 3,
	},
};
