'use strict';

exports.BattleItems = {
	"toxicrock": {
		id: "toxicrock",
		name: "Toxic Rock",
		spritenum: 88,
		fling: {
			basePower: 60,
		},
		num: 10001,
		gen: 7,
		desc: "Holder's use of Noxious Fumes lasts 8 turns instead of 5.",
	},
	"snowboard": {
		id: "snowboard",
		name: "Snowboard",
		spritenum: 69,
		fling: {
			basePower: 40,
		},
		onModifySpe: function (spe) {
			if (this.isWeather('hail')) return this.chainModify(1.5);
		},
		num: 10002,
		gen: 7,
		desc: "Holder's Speed is 1.5x, but only during a hailstorm.",
	},
};
