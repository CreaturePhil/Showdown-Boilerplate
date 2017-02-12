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
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry: function (pokemon, target) {
			if (pokemon.activeTurns > 1) {
				this.add('-fail', pokemon);
				this.add('-hint', "First Impression only works on your first turn out.");
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
 };
