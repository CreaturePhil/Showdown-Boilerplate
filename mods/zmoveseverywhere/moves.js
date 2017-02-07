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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Frenzy Plant", target);
		},
		target: "normal",
		type: "Grass",
		isZ: "venusauramz",
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
	  	onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blast Burn", target);
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
	  	onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Cannon", target);
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
	  	onPrepareHit: function (target, source) {
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
		category: "Physical",
		id: "pursuingstrike",
		isViable: true,
		name: "Pursuing Strike",
		pp: 1,
		priority: 0,
		flags: {},
	   	onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black Hole Eclipse", target);
		},
	   	beforeTurnCallback: function (pokemon, target) {
			target.side.addSideCondition('pursuit', pokemon);
			if (!target.side.sideConditions['pursuit'].sources) {
				target.side.sideConditions['pursuit'].sources = [];
			}
			target.side.sideConditions['pursuit'].sources.push(pokemon);
		},
		onModifyMove: function (move, source, target) {
			if (target && target.beingCalledBack) move.accuracy = true;
		},
		onTryHit: function (target, pokemon) {
			target.side.removeSideCondition('pursuit');
		},
		effect: {
			duration: 1,
			onBeforeSwitchOut: function (pokemon) {
				this.debug('Pursuit start');
				let sources = this.effectData.sources;
				let alreadyAdded = false;
				for (let i = 0; i < sources.length; i++) {
					if (sources[i].moveThisTurn || sources[i].fainted) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Pursuit');
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
					this.runMove('pursuit', sources[i], this.getTargetLoc(pokemon, sources[i]));
				}
			},
		},
		target: "normal",
		type: "Dark",
		isZ: "tyraniumz",
	},
	"earthlycrush": {
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		id: "earthlycrush",
		isViable: true,
		name: "Earthly Crush",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
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
		onPrepareHit: function (target, source) {
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
		},
		target: "normal",
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
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		weather: 'hail',
		sideCondition: 'tailwind',
		effect: {
			duration: 4,
			durationCallback: function (target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 6;
				}
				return 4;
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Tailwind');
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
		target: "normal",
		type: "Ice",
		isZ: "vanilliumz",
	},

};
