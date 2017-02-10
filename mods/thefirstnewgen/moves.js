'use strict';

exports.BattleMovedex = {
        "headslam": {
          accuracy: 90,
          basePower: 140,
          category: "Physical",
          id: "headslam",
          isViable: true,
	  name: "Head Slam",
          pp: 15,
          priority: 0,
          flags: {contact: 1, protect: 1, mirror: 1},
          recoil: [2, 5],
          secondary: {
                    chance: 10,
		    status: 'par',
          },
          target: "normal",
          type: "Fighting",
      },
	"ampslam": {
          accuracy: 90,
          basePower: 100,
          category: "Physical",
          id: "ampslam",
          isViable: true,
	  name: "Amp Slam",
          pp: 15,
          priority: 0,
          flags: {contact: 1, protect: 1, mirror: 1},
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
          id: "blazehorn",
          isViable: true,
	  name: "Blaze Horn",
          pp: 15,
          priority: 0,
          flags: {contact: 1, protect: 1, mirror: 1},
          secondary: {
                    chance: 40,
	            status: 'par',
          },
          target: "normal",
          type: "Fire",
      },
	"flamingbarrier": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "flamingbarrier",
		isViable: true,
		name: "flamingbarrier",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'banefulbunker',
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
	"fallingskies": {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		id: "fallingskies",
		isViable: true,
		name: "Falling Skies",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: false,
		target: "normal",
		type: "Flying",
	},
	"laserblast": {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		id: "laserblast",
		name: "Laser Blast",
		pp: 30,
		priority: 3,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	"crystalblast": {
		accuracy: 80,
		basePower: 110,
		category: "Special",
		id: "crystalblast",
		isViable: true,
		name: "Crystal Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "rock",
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
		id: "crazypunch",
		isViable: true,
		name: "Crazy Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'confusion',
		boosts: {
			atk: 2,
		},
		willCrit: true,
		secondary: false,
		target: "normal",
		type: "Fighting",
	},
};
