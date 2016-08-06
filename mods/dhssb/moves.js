"use strict";

exports.BattleMovedex = {
	//Flygonerz
	ggm8: {
		accuracy:100,
		pp:15,
		id: "ggm8",
		name: "ggm8",
		isNonstandard: true,
		isViable: true,
		basePower:150,
		category:"Physical",
		type:"Dragon",
		target:"normal",
		secondary:{
			chance:80,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
                recoil : [2, 5],
		onHit: function (target, source) {
			if (this.random(2) === 1) target.trySetStatus('brn', source);
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "V-Create", target);
		},
	},
	sacredhax: {
		accuracy:100,
		pp:15,
		id: "sacredhax",
		name: "Sacred Hax",
		isNonstandard: true,
		isViable: true,
		basePower:150,
		category:"Physical",
		type:"Psychic",
		target:"normal",
		secondary:{
			secondary: {
			chance: 40,
			status: 'brn',
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
	},
	hyperspeedpunch: {
		accuracy: 100,
		basePower: 35,
		category: "Physical",
		id: "hyperspeedpunch",
		isViable: true,
		isNonstandard: true,
		name: "Hyperspeed Punch",
		pp: 10,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mach Punch", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Bug",
	},
evalchomp: {
		accuracy: 100,
		category: "Status",
		id: "evalchomp",
		isNonstandard: true,
		name: "evalchomp",
		pp: 5,
		priority: 2,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		self: {boosts: {spe:1, atk:1, def:1}},
		secondary: false,
		onHit: function (target, source) {
			target.side.addSideCondition('toxicspikes', source);
			target.side.addSideCondition('toxicspikes', source);
			source.side.addSideCondition('luckychant', source);
			if (source.name === 'PI EddyChomp') this.add("c|&PI EddyChomp|Wait guys, powering up! Listen to this: https://www.youtube.com/watch?v=A0fAuX8jiPk while you're waiting! :)");
		},
		onModifyMove: function (move, pokemon, target) {
			move.type = '???';
		},
		target: "normal",
		type: "Normal",
	},
	"blehflame": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 10% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
		id: "blehflame",
		isViable: true,
		name: "Bleh fLame",
		pp: 10,
		priority: 0,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blue Flare", target);
		},
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 40,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 2,
					spd: 1,
					spe: 2,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	haxingrage: {
		accuracy:100,
		pp:10,
		id: "haxingrage",
		name: "Haxing Rage",
		isNonstandard: true,
		isViable: true,
		basePower:110,
		category:"Physical",
		type:"Dragon",
		target:"normal",
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
				},
			},
			volatileStatus: 'confusion',
		},
		drain: [1, 2],
		flags: {protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
	},
	"waitandhope": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		id: "waitandhope",
		name: "Wait and hope",
		pp: 20,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1},
		onTry: function (source, target, move) {
			if (source.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', source, "skyattack", target);
			if (!this.runEvent('ChargeMove', source, target, move)) {
				this.add('-anim', source, "skyattack", target);
				return;
			}
			source.addVolatile('twoturnmove', target);
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
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "any",
		type: "Flying",
	},
	"yomammajoke": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 75% of the damage dealt.",
		id: "yomammajoke",
		isViable: true,
		name: "Yo MaMMa Joke",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1, distance: 1, heal: 1},
		drain: [3, 4],
		secondary: false,
		target: "any",
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Taunt", target);
			this.add('-anim', source, "Extreme Speed", target);
			this.add("c|~Spandan|"+["Yo mama so stupid she got locked in a grocery store and starved!", "Yo mama so fat that the Richie Rich had to pay for her lipo-suction operation.","Yo mama so fat it took her four weeks to die from lethal injection.","Yo mama so fat she sat on an iPhone and turned it into an iPad","Yo mama so fat when she stepped on the scale, the doctor said \"Holy Crap, That's My Phone Number\"","Yo mama so fat she uses Google Earth to take a selfie.","Yo mama so stupid when the computer said \"Press any key to continue\", she couldn't find the \"Any\" key.","Yo mama so bald, I could polish her head and take her bowling.","Yo mama is so ugly, Bob the builder said: 'i can't fix that.'","Yo mama so ugleh, the Illuminati closed its eye.","Yo mama so ugleh, Hello Kitty said goodbye.","Yo mama so ugly, One direction went the other direction."][this.random(12)]);
		},
		type: "Flying",
		contestType: "Cool",
	},
	dragonshift: {
		accuracy: 100,
		category: "Status",
		id: "dragonshift",
		isNonstandard: true,
		name: "Dragon Shift",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		self: {
				boosts: {
					atk: 2,
					accuracy: 1,
					spe: 2,
				},
			},
		secondary: false,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Dance", source);
			if (source.name === 'Flygonerz') this.add("c|@Flygonerz|Get re(kt)ddy");
		},
		target: "self",
		type: "Dragon",
	},
	legendsambition: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		id: "legendsambition",
		isNonstandard: true,
		name: "Legend\'s Ambition",
		pp: 5,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Judgment", target);
		},
		self: {
			boosts: {
				def: -1,
                                spd:-1,
			},
		},
		contestType:"Cool",
		target: "normal",
		type: "Dragon",
	},
	"logicpower": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Def.",
		id: "logicpower",
		isViable: true,
		name: "Logic Power",
		pp: 10,
		priority: 0,
		self: {
			boosts: {
				def: 1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot", target);
		},
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	// Modified moves
	"defog": {
		inherit: true,
		onHit: function (target, source, move) {
			if (!target.volatiles['substitute'] || move.infiltrates) this.boost({evasion:-1});
			let removeTarget = {reflect:1, lightscreen:1, safeguard:1, mist:1, spikes:1, toxicspikes:1, burnspikes:1, stealthrock:1, stickyweb:1};
			let removeAll = {spikes:1, toxicspikes:1, burnspikes:1, stealthrock:1, stickyweb:1};
			for (let targetCondition in removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll[targetCondition]) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + target);
				}
			}
			for (let sideCondition in removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
				}
			}
		},
	},
	"rapidspin": {
		inherit: true,
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = {spikes:1, toxicspikes:1, burnspikes:1, stealthrock:1, stickyweb:1};
				for (let i in sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
						this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
				if (pokemon.hp && pokemon.volatiles['maelstrm']) {
					pokemon.removeVolatile('maelstrm');
				}
				if (pokemon.hp && pokemon.volatiles['splinters']) {
					pokemon.removeVolatile('splinters');
				}
			},
		},
	},
	"hypnosis": {
		inherit: true,
		accuracy: 45,
	},
};
