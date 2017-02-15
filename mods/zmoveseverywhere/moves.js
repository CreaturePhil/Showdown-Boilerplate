"use strict";

exports.BattleMovedex = {
	"swampysmackdown": {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		id: "swampysmackdown",
		isViable: true,
		name: "Swampy Smackdown",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Frenzy Plant", target);
		},
		onHit: function (target, source, move) {
			target.side.addSideCondition('grasspledge');
		},
		target: "normal",
		type: "Grass",
		isZ: "venusaurumz",
	},
	"intensifiedinferno": {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		id: "intensifiedinferno",
		isViable: true,
		name: "Intensified Inferno",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blast Burn", target);
		},
		onHit: function (target, source, move) {
			target.side.addSideCondition('firepledge');
		},
		target: "normal",
		type: "Fire",
		isZ: "charizardiumz",
	},
	"destructivedownpour": {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		id: "destructivedownpour",
		isViable: true,
		name: "Destructive Downpour",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Cannon", target);
		},
		onHit: function (target, source, move) {
			source.side.addSideCondition('waterpledge');
		},
		target: "normal",
		type: "Water",
		isZ: "blastoisiumz",
	},
	"hailhydra": {
		accuracy: 100,
		basePower: 20,
		category: "Special",
		id: "hailhydra",
		isViable: true,
		name: "Hail Hydra",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icicle Spear", target);
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		multihit: 9,
		target: "normal",
		type: "Ice",
		isZ: "alolaninetaliumz",
	},
	"pursuingstrike": {
		accuracy: 100,
		basePower: 180,
		basePowerCallback: function(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		id: "pursuingstrike",
		isViable: true,
		name: "Pursuing Strike",
		pp: 1,
		priority: 0,
		beforeTurnCallback: function(pokemon, target) {
			target.side.addSideCondition('pursuingstrike', pokemon);
			if (!target.side.sideConditions['pursuingstrike'].sources) {
				target.side.sideConditions['pursuingstrike'].sources = [];
			}
			target.side.sideConditions['pursuingstrike'].sources.push(pokemon);
		},
		onModifyMove: function(move, source, target) {
			if (target && target.beingCalledBack) move.accuracy = true;
		},
		onTryHit: function(target, pokemon) {
			target.side.removeSideCondition('pursuingstrike');
		},
		effect: {
			duration: 1,
			onBeforeSwitchOut: function(pokemon) {
				this.debug('Pursuing Strike start');
				let sources = this.effectData.sources;
				let alreadyAdded = false;
				for (let i = 0; i < sources.length; i++) {
					if (sources[i].moveThisTurn || sources[i].fainted) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Pursuing Strike');
						alreadyAdded = true;
					}
					this.cancelMove(sources[i]);
					// Run through each decision in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (sources[i].canMegaEvo) {
						for (let j = 0; j < this.queue.length; j++) {
							if (this.queue[j].pokemon === sources[i] && this.queue[j].choice === 'megaEvo') {
								this.runMegaEvo(sources[i]);
								this.queue.splice(j, 1);
								break;
							}
						}
					}
					this.runMove('pursuingstrike', sources[i], this.getTargetLoc(pokemon, sources[i]));
				}
			},
		},
		target: "normal",
		type: "Dark",
		isZ: "tyraniumz",
	},
	"earthlycrush": {
		accuracy: 100,
		basePower: 175,
		category: "Physical",
		id: "earthlycrush",
		isViable: true,
		name: "Earthly Crush",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
		},
		onModifyMove: function(move, pokemon, target) {
			if (!target.isGrounded()) {
				move.type = 'Rock';
			}
		},
		onHit: function (target, source, move) {
			this.add('-sidestart', source.side, 'move: Stealth Rock');
			this.add('-sidestart', target.side, 'move: Stealth Rock');
		},
		target: "normal",
		type: "Ground",
		multihit: 2,
		isZ: "hippowniumz",
	},
	"blossominglifedrain": {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		id: "blossominglifedrain",
		isViable: true,
		name: "Blossoming Life Drain",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Giga Drain", target);
		},
		target: "normal",
		type: "Grass",
		drain: [2, 3],
		isZ: "abomasnowniumz",
	},
	"honingrocks": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "honingrocks",
		isViable: true,
		name: "Honing Rocks",
		pp: 1,
		priority: 0,
		boosts: {
			spe: 12,
			atk: 2,
		},
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
		},
		target: "self",
		type: "Rock",
		drain: [2, 3],
		isZ: "gigaliumz",
	},
	"snowstormspinkle": {
		accuracy: 100,
		basePower: 210,
		category: "Special",
		id: "snowstormspinkle",
		isViable: true,
		name: "Snowstorm Spinkle",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		onHit: function(target, source, move) {
			this.add('-sidestart', source.side, 'move: Tailwind');
		},
		weather: 'hail',
		target: "normal",
		type: "Ice",
		isZ: "vanilliumz",
	},
	"infernoburst": {
		accuracy: 100,
		basePower: 195,
		category: "Special",
		id: "infernoburst",
		isViable: true,
		name: "Inferno Burst",
		pp: 1,
		priority: 0,
		flags: {},
		weather: 'sunnyday',
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 3,
				},
			},
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "ninetalesiumz",
	},
	"blitzingtremor": {
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		id: "blitzingtremor",
		isViable: true,
		name: "Blitzing Tremor",
		pp: 1,
		priority: 0,
		flags: {},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ground', type);
		},
		secondary: {
			chance: 70,
			status: 'brn',
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
			this.add('-anim', source, "Earthly Crust", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "groudoniumz",
	},
	"pyrotechnics": { /* Code The Additional Effect: Torkoal deals damage. Afterwards it gains +1 to each stat for each other Fire-type or Grass-type on its team without a status condition, and not fainted. -1 Priority. Fails if you have no other Fire-types or Grass-types on your team- similar checks on teammates to Beat Up. */
		accuracy: 100,
		basePower: 180,
		category: "Special",
		id: "pyrotechnics",
		isViable: true,
		name: "Pyrotechnics ",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "torkoaliumz",
	},
};
