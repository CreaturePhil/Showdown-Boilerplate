'use strict';

exports.BattleMovedex = {
	aurasphere: {
		inherit: true,
		accuracy: 100,
		basePower: 90,
		pp: 10,
		secondary: {
			chance: 10,
			boosts: {
				spd: -1
			}
		},
	},
	boomburst: {
		inherit: true,
		basePower: 100,
	},
	bubblebeam: {
		inherit: true,
		basePower: 90,
		pp: 10,
	},
	darkpulse: {
		inherit: true,
		basePower: 90,
		pp: 10,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		},
	},
	dazzlinggleam: {
		inherit: true,
		basePower: 90,
		pp: 10,
		secondary: {
			chance: 10,
			boosts: {
				spa: -1
			}
		},
	},
	dracometeor: {
		inherit: true,
		basePower: 140,
	},
	fissure: {
		inherit: true,
		basePower: 140,
		accuracy: 90,
		ohko: false,
		self: {
			boosts: {
				atk: -2
			}
		},
	},
	focusblast: {
		inherit: true,
		accuracy: 85,
	},
	freezedry: {
		inherit: true,
		basePower: 80,
		pp: 10,
	},
	guillotine: {
		inherit: true,
		basePower: 70,
		accuracy: 90,
		ohko: false,
		multihit: 2,
	},
	horndrill: {
		inherit: true,
		basePower: 100,
		accuracy: 90,
		ohko: false,
		willCrit: true,
	},
	hydropump: {
		inherit: true,
		basePower: 120,
		accuracy: 85,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		},
	},
	knockoff: {
		inherit: true,
		basePower: 70,
		onBasePower: function () {},
	},
	leafstorm: {
		inherit: true,
		basePower: 140,
	},
	leechlife: {
		inherit: true,
		basePower: 75,
		pp: 10,
	},
	lightofruin: {
		inherit: true,
		recoil: false,
		self: {
			boosts: {
				spa: -2
			}
		},
	},
	moonblast: {
		inherit: true,
		basePower: 120,
		accuracy: 85,
		pp: 5,
		secondary: {
			chance: 10,
			boosts: {
				spa: -1
			}
		},
	},
	muddywater: {
		inherit: true,
		basePower: 80,
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ground', type);
		},
	},
	overheat: {
		inherit: true,
		basePower: 140,
	},
	scald: {
		inherit: true,
		basePower: 80,
		pp: 10,
		secondary: {
			chance: 10,
			status: 'brn'
		},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Ice') return 1;
		},
	},
	shadowball: {
		inherit: true,
		basePower: 90,
		secondary: {
			chance: 10,
			boosts: {
				spd: -1
			}
		},
	},
	sheercold: {
		inherit: true,
		basePower: 140,
		accuracy: 90,
		ohko: false,
		self: {
			boosts: {
				spa: -2
			}
		},
	},
	sludgebomb: {
		inherit: true,
		secondary: {
			chance: 10,
			status: 'psn'
		},
	},
	sludgewave: {
		inherit: true,
		basePower: 100,
		secondary: false,
	},
	suckerpunch: {
		inherit: true,
		basePower: 40,
		pp: 48,
		onTry: function () {},
	},
	surf: {
		inherit: true,
		basePower: 100,
		pp: 10,
	},
	tailglow: {
		inherit: true,
		boosts: {
			spa: 1,
			spd: 2
		},
	},
	volttackle: {
		inherit: true,
		recoil: false,
		pp: 10,
	},
	
	
	//////////////////////////////
	//  ChoonMod: Custom Moves  //
	//////////////////////////////
	

	"bloodthirstyblade": {
		num: -1100,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "bloodthirstyblade",
		isViable: true,
		name: "Bloodthirsty Blade",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mean Look", target);
			this.add('-anim', pokemon, "Night Slash", target);
		},
		drain: [1, 2],
		target: "normal",
		type: "Steel",
	},
	"dynamocannon": {
		num: -1101,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze target.",
		id: "dynamocannon",
		isViable: true,
		name: "Dynamo Cannon",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Recover", pokemon);
			this.add('-anim', pokemon, "Zap Cannon", target);
		},
		secondary: {
			chance: 10,
			status: 'par'
		},
		target: "normal",
		type: "Electric",
	},
	"genesisnova": {
		num: -1102,
		accuracy: 100,
		basePower: 180,
		category: "Special",
		desc: "Lowers the user's Speed, Defense, and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense, Sp. Def, Speed by 1.",
		id: "genesisnova",
		isViable: true,
		name: "Genesis Nova",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Judgment", target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
				spe: -1
			}
		},
		target: "normal",
		type: "Psychic",
	},
	"heavenscrack": {
		num: -1103,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "This move can hit airborne Pokemon, which includes Flying-type Pokemon, Pokemon with the Ability Levitate, Pokemon holding an Air Balloon, and Pokemon under the effect of Magnet Rise or Telekinesis. This move can hit a target using Bounce, Fly, or Sky Drop. If this move hits a target under the effect of Bounce, Fly, Magnet Rise, or Telekinesis, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Ability Levitate, it loses its immunity to Ground-type attacks and the Ability Arena Trap as long as it remains active. During the effect, Magnet Rise fails for the target and Telekinesis fails against the target.",
		shortDesc: "Grounds adjacent foes.",
		id: "heavenscrack",
		isViable: true,
		name: "Heaven's Crack",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onPrepareHit: function (target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Rock Slide", target);
			this.add('-anim', pokemon, "Fissure", target);
		},
		volatileStatus: 'smackdown',
		ignoreImmunity: {'Ground': true},
		secondary: false,
		target: "allAdjacentFoes",
		type: "Ground",
	},
	"imprisonedstrike": {
		num: -1104,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "The user prevents all of its foes from using any moves that the user also knows as long as the user remains active.",
		shortDesc: "No foe can use any move known by the user.",
		id: "imprisonedstrike",
		isViable: true,
		name: "Imprisoned Strike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Topsy-Turvy", pokemon);
			this.add('-anim', pokemon, "Dragon Ascent", target);
		},
		self: {
			volatileStatus: 'imprison'
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
	},
	"perfectglacialist": {
		num: -1105,
		accuracy: 99,
		basePower: 9,
		category: "Special",
		desc: "Hits nine times. Has a 0.9% chance to freeze the opponent each hit.",
		shortDesc: "Hits 9 times in one turn. 0.9% chance to freeze the target.",
		id: "perfectglacialist",
		isViable: true,
		name: "Perfect Glacialist",
		pp: 9,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Blizzard", target);
		},
		secondary: {
			chance: 0.9,
			status: 'frz'
		},
		multihit: 9,
		target: "normal",
		type: "Ice",
	},
	"valkyriearrow": {
		num: -1106,
		accuracy: 100,
		basePower: 250,
		category: "Special",
		desc: "The user faints after using this move, even if this move fails for having no target.",
		shortDesc: "Hits adjacent foes. The user faints.",
		id: "valkyriearrow",
		isViable: true,
		name: "Valkyrie Arrow",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Wish", pokemon);
			this.add('-anim', pokemon, "Psystrike", target);
		},
		selfdestruct: true,
		target: "normal",
		type: "Fairy",
	},
};
