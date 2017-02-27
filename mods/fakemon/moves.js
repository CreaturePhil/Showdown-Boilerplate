'use strict';

exports.BattleMovedex = {
	"roadsweep": {
		num: 1000,
		accuracy: 95,
		basePower: 60,
		category: "Physical",
		desc: "Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only.",
		id: "roadsweep",
		isViable: true,
		name: "Roadsweep",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onTry: function(pokemon, target) {
			if (pokemon.activeTurns > 1) {
				this.add('-fail', pokemon);
				this.add('-hint', "Roadsweep only works on your first turn out. #loser");
				return null;
			}
		},
		forceSwitch: true,
		secondary: false,
		target: "normal",
		type: "Ground",
		zMovePower: 120,
		contestType: "Tough",
	},
	"abyssteething": {
		num: 1000,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 20% chance to lower the target's Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		id: "abyssteething",
		isViable: true,
		name: "Abyss Teething",
		pp: 15,
		priority: 0,
		flags: {
			bite: 1,
			contact: 1,
			protect: 1,
			mirror: 1
		},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Water",
		zMovePower: 160,
		contestType: "Tough",
	},
};
