"use strict";

exports.BattleMovedex = {
	"partingshotspam": {
		num: 575,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Attack and Special Attack by 1 stage. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "Lowers target's Atk, Sp. Atk by 1. User switches.",
		id: "partingshotspam",
		isViable: true,
		name: "Parting Shot Spam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, authentic: 1},
		selfSwitch: true,
		boosts: {
			atk: -2,
			spa: -2,
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
"theloomeffect": {
		num: 407,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		id: "theloomeffect",
		name: "The Loom Effect",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 2,
					spd: 2,
				},
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		target: "normal",
		type: "Dragon",
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
		type:"Fire",
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
	flamedash: {
	    accuracy: 95,
	    pp: 15,
	    id: "flamedash",
	    name: "Flame Dash",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 55,
	    category: "Physical",
		type:"Fire",
		target:"normal",
	    priority: 1,
	    flags: {protect: 1, mirror: 1},
	    secondary:{
	      chance: 15,
	      status: 'brn'
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Mach Punch", target)
	    }
	},
	grindinghax: {
	    accuracy: 100,
	    pp: 15,
	    id: "grindinghax",
	    name: "Grinding Hax",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 95,
	    category: "Physical",
		type:"Electric",
		target:"normal",
	    priority: 0,
	    secondary:{
	      chance: 35,
	      volatileStatus: 'flinch',
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Gear Grind", target)
	    }
	},
	celestialpower: {
	    accuracy: 95,
	    pp: 15,
	    id: "celestialpower",
	    name: "Celestial Power",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 35,
	    category: "Special",
		type:"Psychic",
		target:"normal",
	    priority: -1,
	    flags: {contact: 1, protect: 1, mirror: 1},
	    secondary:{
	      chance: 100,
	      boosts: {
	      spa: 1,
	      spd: 1,
	      spe: 1,
	      }
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Shadow Ball", target)
	    }
	},
	insperation: {
		accuracy: true,
	    pp: 8,
	    id: "insperation",
	    name: "Insperation",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 0,
	    category: "Status",
		type:"Fairy",
		target:"self",
	    priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 1,
			spa: 1,
			def: 1,
		},
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Dragon Dance", target)
	    }
	},
	decentfiremove: {
	    accuracy: 95,
	    pp: 15,
	    id: "decentfiremove",
	    name: "Decent Fire Move",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 35,
	    category: "Physical",
		type:"Fire",
		target:"normal",
	    priority: 0,
	    flags: {protect: 1, mirror: 1},
	    secondary:{
	      chance: 100,
		  status: 'brn',
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "V-Create", target)
	    }
	},
	calmpool: {
	    accuracy: 100,
	    pp: 20,
	    id: "calmpool",
	    name: "Calm Pool",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 35,
	    category: "Status",
		type:"Water",
		target:"self",
	    priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
	    secondary:{
	      chance: 100,
		  boosts: {
		  	def: 1,
		  	spa: 1,
		  	spd: 1,
		  },
	    },
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", source);
			this.useMove('Wish', source);
		},
	},
	lightdurst: {
	    accuracy: 95,
	    pp: 8,
	    id: "lightdurst",
	    name: "Light Durst",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 90,
	    category: "Special",
		type:"Rock",
		target:"normal",
	    priority: 0,
	    flags: {protect: 1, mirror: 1},
	    secondary:{
	      chance: 100,
		  status: 'tox',
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Ancient Power", target)
	    }
	},
	freehax: {
	    accuracy: 100,
	    pp: 24,
	    id: "freehax",
	    name: "Free Hax",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 25,
	    category: "Special",
		type:"Normal",
		target:"normal",
	    priority: 0,
	    flags: {protect: 1, mirror: 1},
	    secondary:{
	      chance: 77,
		  status: 'par',
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Hex", target)
	    }
	},
	memezpeed: {
	    accuracy: 100,
	    pp: 16,
	    id: "memezpeed",
	    name: "Meme Zpeed",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 80,
	    category: "Special",
		type:"Normal",
		target:"normal",
	    priority: 2,
	    flags: {protect: 1, mirror: 1, contact: 1},
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Roar of Time", target)
	    }
	},
	hardedge: {
	    accuracy: 100,
	    pp: 16,
	    id: "hardedge",
	    name: "Hard Edge",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 50,
	    category: "Special",
		type:"Psychic",
		target:"normal",
	    priority: 2,
	    flags: {protect: 1, mirror: 1, contact: 1},
	    secondary:{
	      chance: 100,
		  self: {
		  	boosts: {
		  		spd: 1,
		  		def: 1,
		  	}
		  }
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Sheer Cold", target)
	    }
	},
	frozenshard: {
	    accuracy: 100,
	    pp: 16,
	    id: "frozenshard",
	    name: "Frozen Shard",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 55,
	    category: "Physical",
		type:"Ice",
		target:"normal",
	    priority: 1,
	    flags: {protect: 1, mirror: 1, contact: 1},
	    secondary:{
	      chance: 0,
		  self: {
		  	boosts: {
		  		spd: 0,
		  		def: 0,
		  	}
		  }
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Sheer Cold", target)
	    }
	},
	fairydust: {
	    accuracy: true,
	    pp: 15,
	    id: "fairydust",
	    name: "Fairy Dust",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 0,
	    category: "Status",
		type:"Fairy",
		target:"normal",
	    priority: 1,
	    flags: {protect: 1, mirror: 1, contact: 1},
	    secondary:{
	      chance: 100,
	      status: 'sleep',
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Moonblast", target)
	    },
	},
	ancestralpower: {
		accuracy: true,
	    pp: 8,
	    id: "ancestralpower",
	    name: " Ancestral Power",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 0,
	    category: "Status",
		type:"Psychic",
		target:"self",
	    priority: 0,
		flags: {snatch: 1},
		boosts: {
			spd: 2,
			spa: 2,
			spe: 2,
		},
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Geomancy", target)
	    }
	},
		hazekills: {
		accuracy: true,
	    pp: 8,
	    id: "hazekills",
	    name: "Haze Kills",
	    isNonstandard: true,
	    isViable: true,
	    basePower: 110,
	    category: "Special",
		type:"Dark",
		target:"target",
	    priority: 0,
	    flags: {protect: 1, mirror: 1, contact: 1},
	    secondary:{
	      chance: 100,
		  self: {
		  	boosts: {
		  		spd: 2,
		  		spa: 2,
		  	}
		  }
	    },
	    onPrepareHit: function (target, source) {
	        this.attrLastMove('[still]'),
	        this.add('-anim', source, "Geomancy", target)
	    }
	},
};
// http://hastebin.com/raw/tiwezodipi.php
