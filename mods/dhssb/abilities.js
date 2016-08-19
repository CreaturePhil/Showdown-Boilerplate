'use strict';

exports.BattleAbilities = {
	shellarmorclone: {
		onCriticalHit: false,
		onModifyMove: function (move) {
			move.willCrit = true;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 100;
				}
			}
		},
		id: "shellarmorclone",
		name: "Shell Armor",
		rating: 1,
		num: 1075,
	},
	discoverme: {
		onTryHit: function (target, source, move) {
			if (target !== source && (move.type === 'Water')) {
				if (!this.heal(target.maxhp  / 20)) {
					this.add('-immune', target, '[msg]', '[from] ability: discover me');
				}
				return null;
			}
		},
                onSourceModifyDamage: function (damage, source, target, move) {
			if (move.type== "Dragon") {
				this.debug('discover me weaken');
				return this.chainModify(0.5);
			}
		},
		id: "discoverme",
		name: "discover me",
		rating: 3.5,
		num: 10,
	},
	breakthrough: {
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
                                move.ignoreImmunity['Dragon'] = true;
				move.ignoreImmunity['Electric'] = true;
                                move.ignoreImmunity['Ground'] = true;
                                move.ignoreImmunity['Psychic'] = true;
                                move.ignoreImmunity['Poison'] = true;
                                move.ignoreImmunity['Ghost'] = true;
                                move.ignoreImmunity['Water'] = true;
                                move.ignoreImmunity['Fire'] = true;
                                move.ignoreImmunity['Grass'] = true;
                                move.ignoreImmunity['Fairy'] = true;
                                move.ignoreImmunity['Bug'] = true;
                        }
		},
		id: "breakthrough",
		name: "Breakthrough",
		rating: 3,
	},
	toughbounce: {
	        onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
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
		effect: {
			duration: 1,
		},
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Own Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Own Tempo');
			}
		},
		id: "toughbounce",
		name: "Tough Bounce",
		rating: 5,
	},
	breakingpoint: {
		onFoeTrapPokemon: function (pokemon) {
			if ((!pokemon.hasAbility('shadowtag')&&!pokemon.hasAbility('breakingpoint')) && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if ((!pokemon.hasAbility('shadowtag')&&!pokemon.hasAbility('breakingpoint')) && this.isAdjacent(pokemon, source)) {
				pokemon.maybeTrapped = true;
			}
		},
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		id: "breakingpoint",
		name: "Breaking Point",
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
	knowledge: {
		onStart: function (pokemon) {
			this.boost({def:3,spd:3});
		},
		volatileStatus: 'focusenergy',
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'move: Focus Energy');
			},
			onModifyCritRatio: function (critRatio) {
				return critRatio + 2;
			},
		},
	},
	'partingshotspam': {
		onStart: function (source) {
			this.useMove('Parting Shot Spam', source);
		},
		id: "partingshotspam",
		name: "Parting Shot Spam",
	},
	'hidden': {
		onStart: function (source) {
			this.useMove('Substitute', source);
		},
		id: "hidden",
		name: "Hidden",
	},
	"dragonfury": {
		desc: "If this Pokemon, but not its substitute, is struck by a critical hit, its Attack is raised by 12 stages.",
		shortDesc: "If this Pokemon (not its substitute) takes a critical hit, its Attack is raised 12 stages.",
		onAfterDamage: function (damage, target, source, move) {
			this.boost({atk:12});
		},
		id: "dragonfury",
		name: "Dragon Fury",
		rating: 2,
		num: 83,
	},
	'slowchat': {
		onStart: function (source) {
			this.useMove('Defog', source);
			this.useMove('Sticky Web', source);
			this.useMove('Stealth Rock', source);
		},
		id: "slowchat",
		name: "Slowchat",
	},

};
