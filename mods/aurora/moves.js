'use strict';

exports.BattleMovedex = {
	"impalingfeather": {
		num: 10001,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 20% chance to lower the target's Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		id: "impalingfeather",
		isViable: true,
		name: "impalingfeather",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		zMovePower: 160,
		contestType: "Cool",
	},
	"sparklingstrike": {
		num: 10002,
		accuracy: true,
		basePower: 60,
		category: "Physical",
		desc: "This move does not check accuracy.",
		shortDesc: "This move does not check accuracy.",
		id: "sparklingstrike",
		isViable: true,
		name: "Sparkling Strike",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMovePower: 120,
		contestType: "Beautiful",
	},
	"divertissement": {
		num: 10003,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		id: "divertissement",
		name: "Divertissement",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMovePower: 100,
		contestType: "Beautiful",
	},
	"rotarydrill": {
		num: 10004,
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "rotarydrill",
		isViable: true,
		name: "Rotary Drill",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Tough",
	},
	"cleansedsoul": {
		num: 10005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user loses its focus and does nothing if it is hit by a damaging attack this turn before it can execute the move.",
		shortDesc: "Fails if the user takes damage before it hits.",
		id: "cleansedsoul",
		name: "Cleansed Soul",
		pp: 20,
		priority: -3,
		flags: {snatch: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('cleansedsoul');
		},
		beforeMoveCallback: function (pokemon) {
			if (pokemon.volatiles['cleansedsoul'] && pokemon.volatiles['cleansedsoul'].lostFocus) {
				this.add('cant', pokemon, 'Cleansed Soul', 'Cleansed Soul');
				return true;
			}
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Cleansed Soul');
			},
			onHit: function (pokemon, source, move) {
				if (move.category !== 'Status') {
					pokemon.volatiles['cleansedsoul'].lostFocus = true;
				}
				if (pokemon.status in {'': 1, 'slp': 1, 'frz': 1}) return false;
				pokemon.cureStatus();
			},
		},
		heal: [1, 2],
		secondary: false,
		target: "normal",
		type: "Ghost",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"dimensionalrift": {
		num: 10006,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following turn and cannot make a move.",
		shortDesc: "User cannot move next turn.",
		id: "dimensionalrift",
		name: "Dimensional Rift",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: false,
		target: "any",
		type: "Ghost",
		zMovePower: 200,
		contestType: "Tough",
	},
};
