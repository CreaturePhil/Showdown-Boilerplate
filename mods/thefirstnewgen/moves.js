'use strict';

exports.BattleMovedex = {
	"megamelt": { /*Get the Secondary Effect working */
          accuracy: 90,
          basePower: 70,
          category: "Special",
	  shortDesc: "10% chance to OHKO Grass, Bug, Steel, Ice, Rock",
          id: "megameltm",
          isViable: true,
	  name: "Mega Melt",
          pp: 15,
          priority: 0,
          flags: {protect: 1, mirror: 1},
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lava Plume", target);
		},
          target: "normal",
          type: "Fire",
      },
        "headslam": {
          accuracy: 90,
          basePower: 140,
          category: "Physical",
	  shortDesc: "40% Recoil, 10% chance to paralyze",
          id: "headslam",
          isViable: true,
	  name: "Head Slam",
          pp: 15,
          priority: 0,
          flags: {contact: 1, protect: 1, mirror: 1},
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
          recoil: [2, 5],
          secondary: {
                    chance: 10,
		    status: 'par',
          },
          target: "normal",
          type: "Fighting",
      },
	"powerburst": { /*Get the Secondary Effect working */
          accuracy: 100,
          basePower: 40,
          category: "Special",
	  shortDesc: "This move removes all of the users stat boosts (after use), and has 50 more base power per stat bost removed. Also takes the type of the hidden power",
          id: "powerburst",
          isViable: true,
	  name: "Power Burst",
          pp: 15,
          priority: 0,
          flags: {protect: 1, mirror: 1},
          target: "normal",
          type: "Normal",
      },
	"hyperslash": { /*Get the Secondary Effect working */
          accuracy: 75,
          basePower: 130,
          category: "Physical",
	  shortDesc: "If this move Misses, you cannot move next turn",
          id: "hyperslash",
          isViable: true,
	  name: "Hyper Slash",
          pp: 15,
          priority: 0,
          flags: {contact: 1, protect: 1, mirror: 1},
          target: "normal",
          type: "Dark",
      },
	"ampslam": {
          accuracy: 90,
          basePower: 100,
          category: "Physical",
	  shortDesc: "10% chance to paralyze",
          id: "ampslam",
          isViable: true,
	  name: "Amp Slam",
          pp: 15,
          priority: 0,
          flags: {contact: 1, protect: 1, mirror: 1},
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Volt Tackle", target);
		},
          secondary: {
                    chance: 10,
	            status: 'par',
          },
          target: "normal",
          type: "Electric",
      },
	"blazehorn": {
          accuracy: 100,
          basePower: 100,
          category: "Physical",
	  shortDesc: "40% chance to burn",
          id: "blazehorn",
          isViable: true,
	  name: "Blaze Horn",
          pp: 15,
          priority: 0,
          flags: {contact: 1, protect: 1, mirror: 1},
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Charge", target);
		},
          secondary: {
                    chance: 40,
	            status: 'par',
          },
          target: "normal",
          type: "Fire",
      },
	"flamingbarrier": { /* Get the SE working */
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protect, burns on contact",
		id: "flamingbarrier",
		isViable: true,
		name: "Flaming Barrier",
		pp: 10,
		priority: 4,
		flags: {},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Protect", target);
		},
		stallingMove: true,
		onTryHit: function (target, source, move) {
			return !!this.willAct() && this.runEvent('StallMove', target);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					source.trySetStatus('brn', target);
				}
				return null;
			},
		},
		secondary: false,
		target: "self",
		type: "Fire",
	},
	"powerball": {
		accuracy: 90,
		basePower: 75,
		category: "Special",
		desc: "This move's type depends on the user's held Plate.",
		shortDesc: "Type varies based on the held Plate.",
		id: "powerball",
		isViable: true,
		name: "Power Ball",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Weather Ball", target);
		},
		onModifyMove: function (move, pokemon) {
			const item = pokemon.getItem();
			if (item.id && item.onPlate && !item.zMove) {
				move.type = item.onPlate;
			}
		},
		secondary: false,
		target: "normal",
		type: "Normal",
	},
	"fallingskies": {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		shortDesc: "Hits 2-5 times, no contact",
		id: "fallingskies",
		isViable: true,
		name: "Falling Skies",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wing Attack", target);
			this.add('-anim', source, "Wing Attack", target);
		},
		multihit: [2, 5],
		secondary: false,
		target: "normal",
		type: "Flying",
	},
	"laserblast": {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "+3 Priority",
		id: "laserblast",
		name: "Laser Blast",
		pp: 30,
		priority: 3,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge Beam", target);
		},
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	"crystalblast": {
		accuracy: 80,
		basePower: 110,
		category: "Special",
		shortDesc: "10% chance to lower SpD.",
		id: "crystalblast",
		isViable: true,
		name: "Crystal Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Rock",
	},
	"sandpadding": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense by 2 stages.",
		shortDesc: "Raises the user's Defense by 2.",
		id: "sandpadding",
		name: "Sand Padding",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shell Smash", target);
		},
		boosts: {
			def: 2,
		},
		secondary: false,
		target: "self",
		type: "Ground",
	},
	"crazypunch": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Always Crits, Raises Opponents attack by two",
		id: "crazypunch",
		isViable: true,
		name: "Crazy Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dynamic Punch", target);
		},
		boosts: {
			atk: 2,
		},
		willCrit: true,
		secondary: false,
		target: "normal",
		type: "Fighting",
	},
	"excitementpunch": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Raises Crit Chance by 1.",
		id: "excitementpunch",
		isViable: true,
		name: "Excitement Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Punch", target);
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
	},
	"abyssteething": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "20% chance to lower Spd and Def.",
		id: "abyssteething",
		isViable: true,
		name: "Abyss Teething",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crabhammer", target);
		},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
				def: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
	"algalbloom": { /*Get the Secondary Effect working */
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Power is doubled in Sun.",
		id: "algalbloom",
		isViable: true,
		name: "Algal Bloom",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Surf", target);
		},
		target: "normal",
		type: "Water",
	},
	"fairyclaw": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Has 25% chance of lowering target's defense by 1 stage",
		id: "fairyclaw",
		isViable: true,
		name: "Fairy Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
		secondary: {
			chance: 25,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fairy",
	},
		"undergroundtrap": { 
		accuracy: true,
		basePower: 100,
		category: "Special",
		desc: "Fails unless the user is hit by a physical attack from an opponent this turn before it can execute the move.",
		shortDesc: "User must take physical damage before moving.",
		id: "undergroundtrap",
		name: "Underground Trap",
		pp: 5,
		priority: -3,
		flags: {protect: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thousand Waves", target);
		},
		onHit: function (target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('shelltrap');
		},
		beforeMoveCallback: function (pokemon) {
			if (pokemon.volatiles['shelltrap'] && !pokemon.volatiles['shelltrap'].gotHit) {
				this.add('cant', pokemon, 'Shell Trap', 'Shell Trap');
				return true;
			}
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Shell Trap');
			},
			onHit: function (pokemon, source, move) {
				if (pokemon.side !== source.side && move.category === 'Physical') {
					pokemon.volatiles['shelltrap'].gotHit = true;
				}
			},
		},
		target: "allAdjacentFoes",
		type: "Ground",
	},
	"iceblitz": {
          accuracy: 90,
          basePower: 80,
          category: "Physical",
	  shortDesc: "+1 Priority, 30% Recoil",
          id: "iceblitz",
          isViable: true,
	  name: "Ice Blitz",
          pp: 15,
          priority: 1,
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Fangl", target);
		},
          flags: {contact: 1, protect: 1, mirror: 1},
          recoil: [3, 10],
          target: "normal",
          type: "Ice",
      },
	"backstroke": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button.",
		shortDesc: "User switches out after damaging the target.",
		id: "backstroke",
		isViable: true,
		name: "Backstroke",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Liquidation", target);
		},
		selfSwitch: true,
		target: "normal",
		type: "Water",
	},
	"mindtrick": { /*Not Sure about this one*/
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc:"Switches user's SpA and SpD stats.",
		id: "mindtrick",
		name: "Mind Trick",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Trick", target);
		},
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Power Trick');
				let newspa = pokemon.stats.spd;
				let newspd = pokemon.stats.spa;
				pokemon.stats.spa = newspa;
				pokemon.stats.spd = newspd;
			},
			onCopy: function (pokemon) {
				let newspa = pokemon.stats.spd;
				let newspd = pokemon.stats.spa;
				pokemon.stats.spa = newspa;
				pokemon.stats.spd = newspd;
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Power Trick');
				let newspa = pokemon.stats.spd;
				let newspd = pokemon.stats.spa;
				pokemon.stats.spa = newspa;
				pokemon.stats.def = newspd;
			},
			onRestart: function (pokemon) {
				pokemon.removeVolatile('Power Trick');
			},
		},
		target: "self",
		type: "Psychic",
	},
	"shadedclaws": {
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		shortDesc: "Hits 2 times. Makes Contact. High Crit Ratio",
		id: "shadedclaws",
		name: "Shaded Claws",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Claw", target);
			this.add('-anim', source, "Shadow Claw", target);
		},
		critRatio: 2,
		multihit: 2,
		target: "normal",
		type: "Ghost",
	},
	"rinsecycle": {
		accuracy: 100,
		basePower: 20,
		category: "Special",
		shortDesc: "Clears the field of hazards",
		id: "rinsecycle",
		isViable: true,
		name: "Rinse Cycle",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clamp", target);
		},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = {spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1};
				for (let i in sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
						this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		target: "normal",
		type: "Water",
	},
	"brambles": { /*Make it work completely, the first part is working*/
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Sets out brambles that will hurt any opponent upon switching in. If in sunlight, then any opponent that switches in will also have 1/16 of their health drained each turn.(This effectdoes not affect flying types)Cannot coexist with stealth rocks.",
		id: "brambles",
		isViable: true,
		name: "Brambles",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leaf Storm", target);
			this.add('-anim', source, "Leech Seed", target);
		},
		sideCondition: 'brambles',
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Brambles');
			},
			onSwitchIn: function (pokemon) {
				let typeMod = this.clampIntRange(pokemon.runEffectiveness('Grass'), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		target: "foeSide",
		type: "Grass",
	},
	"scrubdown": { /* Get the typing effect working*/
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Heals 50% of Hp. Removes the water, steel, or poison typing from the user for that turn. (If this leaves no typing left for the user, then it will temporarily give them the ??? typing, making all moves nuetral)",
		shortDesc: "Heals 50% of Hp. Removes the water, steel, or poison typing from the user for that turn. (If this leaves no typing left for the user, then it will temporarily give them the ??? typing, making all moves nuetral)",
		id: "scrubdown",
		isViable: true,
		name: "Scrub Down",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Sport", target);
		},
		onHit: function (pokemon) {
			if (pokemon.status in {'': 1, 'slp': 1, 'frz': 1}) return false;
			pokemon.cureStatus();
		},
		heal: [1, 2],
		secondary: false,
		target: "self",
		type: "Water",
	},
	"plummet": {  /* Get the SE Working */
		accuracy: 90,
		basePower: 250,
		category: "Physical",
		shortDesc: "If this move misses, is blocked, or if opponent is immune to the attack, then the user will faint. If it hits, then the user will lose half it's health.",
		id: "plummet",
		name: "Plummet",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Supersonic Skystrike", target);
		},
		hasCustomRecoil: true,
		ifHit: function (target, source, move) {
			this.damage(source.maxhp / 2, source, source, 'plummet');
		},
		selfdestruct: "onMoveFail",
		target: "normal",
		type: "Flying",
	},
	/* Rocky Terrain
	   Electric Terrain
	   Toxic Terrain */
	
	"starburst": {
		  accuracy: 100,
		  basePower: 80,
		  category: "Special",
		  shortDesc: "30% chance to Burn",
		  id: "starburst",
		  isViable: true,
		  name: "Star Burst",
		  pp: 15,
		  priority: 0,
		  flags: {protect: 1, mirror: 1},
		  onPrepareHit: function (target, source) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Psycho Boost", target);
			},
		  secondary: {
			    chance: 30,
			    status: 'brn',
		  },
		  target: "normal",
		  type: "Psychic",
      },
	"goldenrush": {
		accuracy: 95,
		basePower: 95,
		category: "Physical",
		shortDesc: "25% to Confuse target and raise their attack by 1 stage",
		id: "goldenrush",
		name: "Golden Rush",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rush", target);
		},
		boosts: {
			chance: 25,
			atk: 1,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Dragon",
	},
	"bladeslash": {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		shortDesc: "10% to cause Infection. Makes Contact. High Crit Ratio",
		id: "bladeslash",
		name: "Blade Slash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Claw", target);
		},
		critRatio: 2,
		boosts: {
			chance: 25,
			atk: 2,
			 /* Code Infection and add volatileStatus: 'infection', here*/
		},
		target: "normal",
		type: "Steel",
	},
	"despicablestrike": {
		num: 492,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		shortDesc: "Uses the target's Special Attack stat to calculate damage, as opposed to the user's Special Attack stat (SpA Foul Play)",
		id: "despicablestrike",
		isViable: true,
		name: "Despicable Strike",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Void", target);
		},
		useTargetOffensive: true,
		target: "normal",
		type: "Dark",
	},
	"sourstrike": {
          accuracy: 100,
          basePower: 100,
          category: "Special",
	  shortDesc: "40% Chance to Badly Poison",
          id: "sourstrike",
          isViable: true,
	  name: "Sour Strike",
          pp: 15,
          priority: 0,
          flags: {protect: 1, mirror: 1},
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leafage", target);
		},
          secondary: {
                    chance: 40,
	            status: 'tox',
          },
          target: "normal",
          type: "Grass",
      },
	"spicystrike": {
          accuracy: 100,
          basePower: 100,
          category: "Special",
	  shortDesc: "40% Chance to Burn",
          id: "spicystrike",
          isViable: true,
	  name: "Spicy Strike",
          pp: 15,
          priority: 0,
          flags: {protect: 1, mirror: 1},
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Energy Ball", target);
		},
          secondary: {
                    chance: 40,
	            status: 'brn',
          },
          target: "normal",
          type: "Grass",
      },
	"earthenkatana": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Power Doubles if the target has KO'd a Pokémon on the last or current turn",
		id: "earthenkatana",
		name: "Earthen Katana",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Drill Run", target);
		},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.debug('Boosted for a faint last turn');
				return this.chainModify(2);
			}
		},
		target: "normal",
		type: "Ground",
	},
	"scorchshot": {
          accuracy: 90,
          basePower: 60,
          category: "Special",
	  shortDesc: "100% chance to burn",
          id: "scorchshot",
          isViable: true,
	  name: "Scorch Shot",
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flash Cannon", target);
		},
          pp: 15,
          priority: 0,
          flags: {protect: 1, mirror: 1},
          secondary: {
                    chance: 100,
	            status: 'brn',
          },
          target: "normal",
          type: "Steel",
      },
	"arcticblade": {
          accuracy: 90,
          basePower: 90,
          category: "Special",
	  shortDesc: "10% chance to freeze, 10% chance to lower speed by 1 stage",
          id: "arcticblade",
          isViable: true,
	  name: "Arctic Blade",
	  onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Subzero Slammer", target);
		},
          pp: 15,
          priority: 0,
          flags: {protect: 1, mirror: 1, contact: 1},
          secondary: {
                    chance: 10,
	            status: 'frz',
		    spe: -1,
          },
          target: "normal",
          type: "Ice",
      },
	"antlerscorch": {
		  accuracy: 100,
		  basePower: 80,
		  category: "Physical",
		  shortDesc: "No additional effect",
		  id: "antlerscorch",
		  isViable: true,
		  name: "Antler Scorch",
		  pp: 15,
		  priority: 0,
		  flags: {protect: 1, mirror: 1, contact: 1},
		  onPrepareHit: function (target, source) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Flame Wheel", target);
			},
		  target: "normal",
		  type: "Fire",
	      },
	"sweetstrike": {
		  accuracy: 100,
		  basePower: 90,
		  category: "Special",
		  shortDesc: "40% chance to encore",
		  id: "sweetstrike",
		  isViable: true,
		  name: "Sweet Strike",
		  pp: 15,
		  priority: 0,
		  flags: {protect: 1, mirror: 1, contact: 1},
		  onPrepareHit: function (target, source) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Leaf Tornado", target);
			},
			secondary: {
				chance: 40,
				volatileStatus: 'encore',
		  },
		  target: "normal",
		  type: "Grass",
	      },
	"7slashbushidoassault": {
		accuracy: 100,
		basePower: 185,
		category: "Physical",
		id: "7slashbushidoassault",
		isViable: true,
		name: "7-Slash Bushido Assault",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
		},
		target: "normal",
		type: "Ground",
		isZ: "fungariumz",
	},
	"moltensteelblast": {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		id: "moltensteelblast",
		isViable: true,
		name: "Molten Steel Blast",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Corkscrew Crash", target);
		},
		target: "normal",
		type: "Steel",
		isZ: "steelicilliumz",
	},
	"petrifyingglaciercharge": {
		accuracy: 100,
		basePower: 190,
		category: "Physical",
		id: "petrifyingglaciercharge",
		isViable: true,
		name: "Petrifying Glacier Charge",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Subzero Slammer", target);
		},
		target: "normal",
		type: "Ice",
		isZ: "dorshelliumz",
	},
	"incineratingantlerlunge": {
		accuracy: 100,
		basePower: 175,
		category: "Physical",
		id: "incineratingantlerlunge",
		isViable: true,
		name: "Incinerating Antler Lunge",
		pp: 1,
		priority: 0,
		flags: {},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		target: "normal",
		type: "Fire",
		isZ: "pyrominiumz",
	},
	"lightningburst": {
		accuracy: 95,
		basePower: 30,
		category: "Special",
		shortDesc: "Hits 3 times. Last hit has a 10% chance to paralyze the foe",
		id: "lightningburst",
		name: "Lightning Burst",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parabolic Charge", target);
			this.add('-anim', source, "Parabolic Charge", target);
			this.add('-anim', source, "Parabolic Charge", target);
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		multihit: 3,
		target: "normal",
		type: "Electric",
	},
	"thunderblade": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "10% chance to paralyze. High Crit Ratio",
		id: "thunderblade",
		name: "Thunderblade",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wild Charge", target);
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		critRatio: 2,
		target: "normal",
		type: "Electric",
	},
	"plasmaclaw": {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		shortDesc: "20% chance to Burn or Paralyze",
		id: "plasmaclaw",
		name: "Plasma Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	"xray": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "30% chance to badly poison",
		id: "xray",
		name: "X-Ray",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder", target);
		},
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		type: "Electric",
	},
	/* Adrenaline: Fighting Type, Status, Doubles Attack and Speed for 3 turns, but halves defence */
	"cryogenicfire": {
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "20% chance to Burn or Paralyze",
		id: "cryogenicfire",
		name: "Cryogenic Fire",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	"molt": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user cures its burn, poison, or paralysis.",
		shortDesc: "User cures its burn, poison, or paralysis.",
		id: "molt",
		name: "Molt",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onHit: function (pokemon) {
			if (pokemon.status in {'': 1, 'slp': 1, 'frz': 1}) return false;
			pokemon.cureStatus();
		},
		target: "self",
		type: "Flying",
	},
	"moltenglass": {
		  accuracy: 50,
		  basePower: 150,
		  category: "Special",
		  shortDesc: "100% chance to burn the target",
		  id: "moltenglass",
		  isViable: true,
		  name: "Molten Glass",
		  onPrepareHit: function (target, source) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Earth Power", target);
			},
		  pp: 15,
		  priority: 0,
		  flags: {protect: 1, mirror: 1},
		  secondary: {
			    chance: 100,
			    status: 'brn',
		  },
		  target: "normal",
		  type: "Ground",
	 },
	"ludicrousspeed": {
		  accuracy: 90,
		  basePower: 100,
		  category: "Physical",
		  shortDesc: "+3 Priority",
		  id: "ludicrousspeed",
		  isViable: true,
		  name: "Ludicrous Speed",
		  onPrepareHit: function (target, source) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Extreme Speed", target);
			},
		  pp: 15,
		  priority: 1,
		  flags: {protect: 1, mirror: 1},
		  target: "normal",
		  type: "Normal",
	 },
	/* Aquagel: Water Type Status Move, Provides an immunity to fire. Allows you to cross lava and magma in the overworld*/
		"jetstream": {
		  accuracy: 50,
		  basePower: 150,
		  category: "Special",
		  shortDesc: "100% chance to confuse the target",
		  id: "jetstream",
		  isViable: true,
		  name: "Jet Stream",
		  onPrepareHit: function (target, source) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Chatter", target);
			},
		  pp: 15,
		  priority: 0,
		  flags: {protect: 1, mirror: 1},
		  secondary: {
			    chance: 100,
			    volatileStatus: 'confusion',
		  },
		  target: "normal",
		  type: "Flying",
	 },
};
