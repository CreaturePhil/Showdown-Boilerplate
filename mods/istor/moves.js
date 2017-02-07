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
		target: "self",
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
	"honeyblaze": {
		num: 10007,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Burns the target.",
		shortDesc: "Burns the target.",
		id: "honeyblaze",
		isViable: true,
		name: "Honey Blaze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'brn',
		secondary: false,
		target: "normal",
		type: "Fire",
		zMoveBoost: {atk: 1, spa: 1, spe: 1},
		contestType: "Beautiful",
	},
	"honeychill": {
		num: 10008,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Freezes the target.",
		shortDesc: "Freezes the target.",
		id: "honeychill",
		isViable: true,
		name: "Honey Chill",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'frz',
		secondary: false,
		target: "normal",
		type: "Ice",
		zMoveBoost: {atk: 1, spa: 1, spe: 1},
		contestType: "Beautiful",
	},
	"honeystun": {
		num: 10009,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Paralyzes the target.",
		shortDesc: "Paralyzes the target.",
		id: "honeystun",
		isViable: true,
		name: "Honey Stun",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'par',
		secondary: false,
		target: "normal",
		type: "Electric",
		zMoveBoost: {atk: 1, spa: 1, spe: 1},
		contestType: "Beautiful",
	},
	"honeytrance": {
		num: 10010,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Sleeps the target.",
		shortDesc: "Sleeps the target.",
		id: "honeytrance",
		isViable: true,
		name: "Honey Trance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'slp',
		secondary: false,
		target: "normal",
		type: "Psychic",
		zMoveBoost: {atk: 1, spa: 1, spe: 1},
		contestType: "Beautiful",
	},
	"honeyvirus": {
		num: 10011,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Burns the target.",
		shortDesc: "Burns the target.",
		id: "honeyvirus",
		isViable: true,
		name: "Honey Virus",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'psn',
		secondary: false,
		target: "normal",
		type: "Poison",
		zMoveBoost: {atk: 1, spa: 1, spe: 1},
		contestType: "Beautiful",
	},
	"burrow": {
		num: 10012,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If the user is hit by a contact move this turn before it can execute this move, the attacker is burned.",
		shortDesc: "Burns on contact with the user before it moves.",
		id: "burrow",
		isViable: true,
		name: "Burrow",
		pp: 15,
		priority: -3,
		flags: {snatch: 1, heal: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('burrow');
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Burrow');
			},
			onTryHit: function (pokemon, source, move) {
				if(move.basePower) {
					move.basePower*=0.5;
				}
			},
		},
		onMoveAborted: function (pokemon) {
			pokemon.removeVolatile('burrow');
		},
		onAfterMove: function (pokemon) {
			pokemon.removeVolatile('burrow');
		},
		secondary: false,
		heal: [1, 3],
		target: "self",
		type: "Ground",
		zMoveBoost: {def: 1, spd: 1},
		contestType: "Smart",
	},
	"rockrequite": {
		num: 10013,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If the user is hit by a contact move this turn before it can execute this move, the attacker is burned.",
		shortDesc: "Burns on contact with the user before it moves.",
		id: "rockrequite",
		isViable: true,
		name: "Rock Requite",
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('rockrequite');
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Rock Requite');
			},
			onTryHit: function (pokemon, source, move) {
				if(move.basePower) {
					move.basePower*=0.5;
				}
			},
		},
		onMoveAborted: function (pokemon) {
			pokemon.removeVolatile('rockrequite');
		},
		onAfterMove: function (pokemon) {
			pokemon.removeVolatile('rockrequite');
		},
		secondary: false,
		target: "normal",
		type: "Rock",
		zMovePower: 140,
		contestType: "Tough",
	},
	"nuclearray": {
		num: 10014,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "Has a 10% chance to burn the target. This move's type effectiveness against Steel is changed to be super effective no matter what this move's type is.",
		shortDesc: "10% chance to burn. Super effective on Steel.",
		id: "nuclearray",
		isViable: true,
		name: "Nuclear Ray",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		ignoreImmunity: {'Poison': true},
		target: "normal",
		type: "Poison",
		zMovePower: 140,
		contestType: "Beautiful",
	},
	"shackleswing": {
		num: 10015,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "Lowers the user's Speed by 1 stage.",
		shortDesc: "Lowers the user's Speed by 1.",
		id: "shackleswing",
		isViable: true,
		name: "Shackle Swing",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Tough",
	},
	"meteorimpact": {
		num: 10016,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Gust, Hurricane, Sky Uppercut, Smack Down, Thousand Arrows, Thunder, and Twister. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Flies up on first turn, then strikes the next turn.",
		id: "meteorimpact",
		name: "Meteor Impact",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1, punch: 1},
		onTry: function (attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		effect: {
			duration: 2,
			onAccuracy: function (accuracy, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return;
				}
				if (move.id === 'skyuppercut' || move.id === 'thunder' || move.id === 'hurricane' || move.id === 'smackdown' || move.id === 'thousandarrows' || move.id === 'helpinghand') {
					return;
				}
				if (source.hasAbility('noguard') || target.hasAbility('noguard')) {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			},
			onSourceModifyDamage: function (damage, source, target, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: false,
		target: "any",
		type: "Rock",
		zMovePower: 190,
		contestType: "Cool",
	},
	"plague": {
		num: 10017,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Has a 50% chance to torment the target.",
		shortDesc: "50% chance to torment the target.",
		id: "plague",
		isViable: true,
		name: "Plague",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'torment',
		secondary: {
			noCopy: true,
			chance: 50,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Torment');
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Torment');
			},
			onDisableMove: function (pokemon) {
				if (pokemon.lastMove !== 'struggle') pokemon.disableMove(pokemon.lastMove);
			},
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 140,
		contestType: "Tough",
	},
	"frigidslam": {
		num: 10018,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 30% chance to paralyze the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "30% chance to paralyze the target.",
		id: "frigidslam",
		isViable: true,
		name: "Frigid Slam",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 160,
		contestType: "Tough",
	},
};
