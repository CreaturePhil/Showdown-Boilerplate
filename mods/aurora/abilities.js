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
	"infernalscales": {
		desc: "This Pokemon's Fire-type attacks have their power doubled, the power of Ice-type attacks against this Pokemon is halved, and this Pokemon cannot be frozen. Gaining this Ability while frozen cures it.",
		shortDesc: "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved.",
		onBasePowerPriority: 7,
		onSourceBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(2);
			}
		},
		onUpdate: function (pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Water Bubble');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'frz') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Water Bubble');
			return false;
		},
		id: "infernalscales",
		name: "Infernal Scales",
		rating: 3.5,
		num: 10001,
	},
	"magicalemanation": {
		shortDesc: "On switch-in, this Pokemon summons Magic Room.",
		onStart: function (source, effect) {
			this.addPseudoWeather('magicroom', source, effect, '[of] ' + source);
		},
		id: "magicalemanation",
		name: "Magical Emanation",
		rating: 4.5,
		num: 10002,
	},
	"trickyemanation": {
		shortDesc: "On switch-in, this Pokemon summons Magic Room.",
		onStart: function (source, effect) {
			this.addPseudoWeather('trickroom', source, effect, '[of] ' + source);
		},
		id: "trickyemanation",
		name: "Tricky Emanation",
		rating: 4.5,
		num: 10003,
	},
	"wondrousmanation": {
		shortDesc: "On switch-in, this Pokemon summons Magic Room.",
		onStart: function (source, effect) {
			this.addPseudoWeather('wonderroom', source, effect, '[of] ' + source);
		},
		id: "wondrousemanation",
		name: "Wondrous Emanation",
		rating: 4.5,
		num: 10004,
	},
};
