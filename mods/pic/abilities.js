/*

Ratings and how they work:

-2: Extremely detrimental
	  The sort of ability that relegates Pokemon with Uber-level BSTs into NU.
	ex. Slow Start, Truant

-1: Detrimental
	  An ability that does more harm than good.
	ex. Defeatist, Normalize

 0: Useless
	  An ability with no net effect during a singles battle.
	ex. Healer, Illuminate

 1: Ineffective
	  An ability that has a minimal effect. Should not be chosen over any other ability.
	ex. Damp, Shell Armor

 2: Situationally useful
	  An ability that can be useful in certain situations.
	ex. Blaze, Insomnia

 3: Useful
	  An ability that is generally useful.
	ex. Infiltrator, Sturdy

 4: Very useful
	  One of the most popular abilities. The difference between 3 and 4 can be ambiguous.
	ex. Protean, Regenerator

 5: Essential
	  The sort of ability that defines metagames.
	ex. Desolate Land, Shadow Tag

*/

'use strict';

exports.BattleAbilities = {
    "aerilate": {
		desc: "This Pokemon's Normal-type moves become Flying-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Flying type and have 1.3x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = 'Flying';
				if (move.category !== 'Status') pokemon.addVolatile('aerila');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		id: "aerilate",
		name: "Aerilate",
		rating: 4,
		num: 185,
	},
	"aurabreak": {
		desc: "While this Pokemon is active, the effects of the Abilities Dark Aura and Fairy Aura are reversed, multiplying the power of Dark- and Fairy-type moves, respectively, by 3/4 instead of 1.33.",
		shortDesc: "While this Pokemon is active, the Dark Aura and Fairy Aura power modifier is 0.75x.",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Aura Break');
		},
		onAnyTryPrimaryHit: function (target, source, move) {
			if (target === source || move.category === 'Status') return;
			source.addVolatile('aurabk');
		},
		effect: {
			duration: 1,
		},
		id: "aurabreak",
		name: "Aura Break",
		rating: 2,
		num: 188,
	},
	"flashfire": {
		desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashf')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('flashf');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd: function (target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
		id: "flashfire",
		name: "Flash Fire",
		rating: 3,
		num: 18,
	},
  "levitate": {
		desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
		shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
		// airborneness implemented in battle-engine.js:BattlePokemon#isGrounded
    onTryHit: function (target, source, move) {
			if (!this.pseudoWeather['gravity']&&!('ingrain' in this.volatiles)&&!('smackdown' in this.volatiles)&&(target !== source && move.type === 'Ground')) {
				move.accuracy = true;
				this.add('-immune', target, '[msg]', '[from] ability: Levitate');
				return null;
			}
		},
		id: "levitate",
		name: "Levitate",
		rating: 3.5,
		num: 26,
	},
	"parentalbond": {
		desc: "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage halved. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage halved.",
		onPrepareHit: function (source, target, move) {
			if (move.id in {iceball: 1, rollout: 1}) return;
			if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit) {
				move.multihit = 2;
				source.addVolatile('parentbond');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower) {
				if (this.effectData.hit) {
					this.effectData.hit++;
					return this.chainModify(0.5);
				} else {
					this.effectData.hit = 1;
				}
			},
			onSourceModifySecondaries: function (secondaries, target, source, move) {
				if (move.id === 'secretpower' && this.effectData.hit < 2) {
					// hack to prevent accidentally suppressing King's Rock/Razor Fang
					return secondaries.filter(effect => effect.volatileStatus === 'flinch');
				}
			},
		},
		id: "parentalbond",
		name: "Parental Bond",
		rating: 5,
		num: 184,
	},
	"pixilate": {
		desc: "This Pokemon's Normal-type moves become Fairy-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fairy type and have 1.3x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = 'Fairy';
				if (move.category !== 'Status') pokemon.addVolatile('pixil');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		id: "pixilate",
		name: "Pixilate",
		rating: 4,
		num: 182,
	},
	"refrigerate": {
		desc: "This Pokemon's Normal-type moves become Ice-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.3x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = 'Ice';
				if (move.category !== 'Status') pokemon.addVolatile('refrigerat');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		id: "refrigerate",
		name: "Refrigerate",
		rating: 4,
		num: 174,
	},
	"sheerforce": {
		desc: "This Pokemon's attacks with secondary effects have their power multiplied by 1.3, but the secondary effects are removed.",
		shortDesc: "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects.",
		onModifyMove: function (move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforc');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		id: "sheerforce",
		name: "Sheer Force",
		rating: 4,
		num: 125,
	},
	"slowstart": {
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are halved for 5 turns.",
		onStart: function (pokemon) {
			pokemon.addVolatile('slowstrt');
		},
		onEnd: function (pokemon) {
			delete pokemon.volatiles['slowstrt'];
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
		effect: {
			duration: 5,
			onStart: function (target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd: function (target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		id: "slowstart",
		name: "Slow Start",
		rating: -2,
		num: 112,
	},
	"truant": {
		shortDesc: "This Pokemon skips every other turn instead of using a move.",
		onBeforeMovePriority: 9,
		onBeforeMove: function (pokemon, target, move) {
			if (pokemon.removeVolatile('trunt')) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
			pokemon.addVolatile('trunt');
		},
		effect: {
			duration: 2,
		},
		id: "truant",
		name: "Truant",
		rating: -2,
		num: 54,
	},
	"unburden": {
		desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
		shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
		onAfterUseItem: function (item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			pokemon.addVolatile('unburdn');
		},
		onTakeItem: function (item, pokemon) {
			pokemon.addVolatile('unburdn');
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('unburdn');
		},
		effect: {
			onModifySpe: function (spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(2);
				}
			},
		},
		id: "unburden",
		name: "Unburden",
		rating: 3.5,
		num: 84,
	},
	"zenmode": {
		desc: "If this Pokemon is a Darmanitan, it changes to Zen Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. If Darmanitan loses this Ability while in Zen Mode it reverts to Standard Mode immediately.",
		shortDesc: "If Darmanitan, at end of turn changes Mode to Standard if > 1/2 max HP, else Zen.",
		onResidualOrder: 27,
		onResidual: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.template.speciesid === 'darmanitan') {
				pokemon.addVolatile('zenmod');
			} else if (pokemon.hp > pokemon.maxhp / 2 && pokemon.template.speciesid === 'darmanitanzen') {
				pokemon.addVolatile('zenmod'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmod');
			}
		},
		onEnd: function (pokemon) {
			if (!pokemon.volatiles['zenmod'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmod'];
			if (pokemon.formeChange('Darmanitan')) {
				this.add('-formechange', pokemon, 'Darmanitan', '[silent]');
			}
		},
		effect: {
			onStart: function (pokemon) {
				if (pokemon.template.speciesid === 'darmanitanzen' || !pokemon.formeChange('Darmanitan-Zen')) return;
				this.add('-formechange', pokemon, 'Darmanitan-Zen', '[from] ability: Zen Mode');
			},
			onEnd: function (pokemon) {
				if (!pokemon.formeChange('Darmanitan')) return;
				this.add('-formechange', pokemon, 'Darmanitan', '[from] ability: Zen Mode');
			},
		},
		id: "zenmode",
		name: "Zen Mode",
		rating: -1,
		num: 161,
	},
};
