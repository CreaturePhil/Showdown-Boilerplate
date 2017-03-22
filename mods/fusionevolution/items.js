'use strict';

exports.BattleItems = {

"swampertite": {
		id: "swampertite",
		name: "Swampertite",
		spritenum: 612,
		megaStone: "Swampert-Mega", "Swampamar-Mega", "Swank-Mega",
		megaEvolves: "Swampert", "Swampamar", "Swank",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 752,
		gen: 6,
		desc: "If holder is a Swampert, this item allows it to Mega Evolve in battle."
	},

"gyaradosite": {
		id: "gyaradosite",
		name: "Gyaradosite",
		spritenum: 589,
		megaStone: "Gyarados-Mega", "Gyarotic-Mega", "Aggrodos-Mega-X", "Charatos-Mega-Z", "Sharpedos-Mega-Y", "Garchados-Mega-Y",
		megaEvolves: "Gyarados", "Gyarotic", "Aggrodos", "Charatos", "Sharpedos", "Garchados",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 676,
		gen: 6,
		desc: "If holder is a Gyarados, this item allows it to Mega Evolve in battle."
	},

"sablenite": {
		id: "sablenite",
		name: "Sablenite",
		spritenum: 614,
		megaStone: "Sableye-Mega", "Pangleye-Mega",
		megaEvolves: "Sableye", "Pangleye",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 754,
		gen: 6,
		desc: "If holder is a Sableye, this item allows it to Mega Evolve in battle."
	},

"garchompite": {
		id: "garchompite",
		name: "Garchompite",
		spritenum: 589,
		megaStone: "Garchomp-Mega", "Garchados-Mega-X", "Gargatr-Mega", "Tyranichomp-Mega-Y",
		megaEvolves: "Garchomp", "Garchados", "Gargatr", "Tyranichomp",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 683,
		gen: 6,
		desc: "If holder is a Garchomp, this item allows it to Mega Evolve in battle."
	},

"steelixite": {
		id: "steelixite",
		name: "Steelixite",
		spritenum: 621,
		megaStone: "Steelix-Mega", "Cofagreelix-Mega",
		megaEvolves: "Steelix", "Cofagreelix",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 761,
		gen: 6,
		desc: "If holder is a Steelix, this item allows it to Mega Evolve in battle."
	},

"aggronite": {
		id: "aggronite",
		name: "Aggronite",
		spritenum: 578,
		megaStone: "Aggron-Mega", "Aggrodos", "Aggrosaur",
		megaEvolves: "Aggron", "Aggrodos-Mega-Y", "Aggrosaur-Mega-Y",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 667,
		gen: 6,
		desc: "If holder is an Aggron, this item allows it to Mega Evolve in battle."
	},

"aerodactylite": {
		id: "aerodactylite",
		name: "Aerodactylite",
		spritenum: 577,
		megaStone: "Aerodactyl-Mega", "Archedactyl-Mega",
		megaEvolves: "Aerodactyl", "Archedactyl",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 672,
		gen: 6,
		desc: "If holder is an Aerodactyl, this item allows it to Mega Evolve in battle."
	},

"absolite": {
		id: "absolite",
		name: "Absolite",
		spritenum: 576,
		megaStone: "Absol-Mega", "Weasol-Mega",
		megaEvolves: "Absol", "Weasol",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 677,
		gen: 6,
		desc: "If holder is an Absol, this item allows it to Mega Evolve in battle."
	},

"tyranitarite": {
		id: "tyranitarite",
		name: "Tyranitarite",
		spritenum: 607,
		megaStone: "Tyranitar-Mega", "Tyranichomp-Mega-Y", "Manatar-Mega",
		megaEvolves: "Tyranitar", "Tyranichomp", "Manatar",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 669,
		gen: 6,
		desc: "If holder is a Tyranitar, this item allows it to Mega Evolve in battle."
	},

"glalitite": {
		id: "glalitite",
		name: "Glalitite",
		spritenum: 623,
		megaStone: "Glalie-Mega", "Railie-Mega", "Glakiss-Mega",
		megaEvolves: "Glalie", "Railie", "Glakiss",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 763,
		gen: 6,
		desc: "If holder is a Glalie, this item allows it to Mega Evolve in battle."
	},

"charizarditex": {
		id: "charizarditex",
		name: "Charizardite X",
		spritenum: 585,
		megaStone: "Charizard-Mega-X",
		megaEvolves: "Charizard", "Charatos-Mega-X", "Shaymizard-Mega-X", "Hazard-Mega-X", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 660,
		gen: 6,
		desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle."
	},
	"charizarditey": {
		id: "charizarditey",
		name: "Charizardite Y",
		spritenum: 586,
		megaStone: "Charizard-Mega-Y", "Charatos-Mega-Y", "Shaymizard-Mega-Y", "Hazard-Mega-Y", 
		megaEvolves: "Charizard",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 678,
		gen: 6,
		desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle."
	},

"venusaurite": {
		id: "venusaurite",
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Venusaur-Mega", "Aggrosaur-Mega-X",
		megaEvolves: "Venusaur", "Aggrosaur", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 659,
		gen: 6,
		desc: "If holder is a Venusaur, this item allows it to Mega Evolve in battle."
	},

"altarianite": {
		id: "altarianite",
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Altaria-Mega", "Skaria-Mega", "Entaria-Mega",
		megaEvolves: "Altaria", "Skaria", "Entaria",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 755,
		gen: 6,
		desc: "If holder is an Altaria, this item allows it to Mega Evolve in battle."
	},

"alakazite": {
		id: "alakazite",
		name: "Alakazite",
		spritenum: 579,
		megaStone: "Alakazam-Mega", "Magmozam-Mega",
		megaEvolves: "Alakazam", "Magmozam",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is an Alakazam, this item allows it to Mega Evolve in battle."
	},

"sharpedonite": {
		id: "sharpedonite",
		name: "Sharpedonite",
		spritenum: 619,
		megaStone: "Sharpedo-Mega", "Sharpedos-Mega-X",
		megaEvolves: "Sharpedo", "Sharpedos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 759,
		gen: 6,
		desc: "If holder is a Sharpedo, this item allows it to Mega Evolve in battle."
	},

"pidgeotite": {
		id: "pidgeotite",
		name: "Pidgeotite",
		spritenum: 622,
		megaStone: "Pidgeot-Mega", "Pidgetot-Mega", "Pidgemie-Mega", "Peatran-Mega", "Shot-Mega",
		megaEvolves: "Pidgeot", "Pidgetot", "Pidgemie", "Peatran", "Shot",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 762,
		gen: 6,
		desc: "If holder is a Pidgeot, this item allows it to Mega Evolve in battle."
	},

"scizorite": {
		id: "scizorite",
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Scizor-Mega", "Klazor-Mega",
		megaEvolves: "Scizor", "Klazor",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 670,
		gen: 6,
		desc: "If holder is a Scizor, this item allows it to Mega Evolve in battle."
	},

	"gardevoirite": {
		id: "gardevoirite",
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Gardevoir-Mega", "Jellivoir-Mega", "Mismagivoir-Mega",
		megaEvolves: "Gardevoir", "Jellivoir", "Mismagivoir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 657,
		gen: 6,
		desc: "If holder is a Gardevoir, this item allows it to Mega Evolve in battle."
	},

"metagrossite": {
		id: "metagrossite",
		name: "Metagrossite",
		spritenum: 618,
		megaStone: "Metagross-Mega", "Metabat-Mega", "Banegross-Mega-X", "Metsir-Mega-M",
		megaEvolves: "Metagross", "Metabat", "Banegross", "Metsir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 758,
		gen: 6,
		desc: "If holder is a Metagross, this item allows it to Mega Evolve in battle."
	},
"latiosite": {
		id: "latiosite",
		name: "Latiosite",
		spritenum: 630,
		megaStone: "Latios-Mega", "Dartios-Mega",
		megaEvolves: "Latios", "Dartios", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is a Latios, this item allows it to Mega Evolve in battle."
	},
"banettite": {
		id: "banettite",
		name: "Banettite",
		spritenum: 582,
		megaStone: "Banette-Mega", "Banegross-Mega-Y",
		megaEvolves: "Banette", "Banegross",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 668,
		gen: 6,
		desc: "If holder is a Banette, this item allows it to Mega Evolve in battle."
	},
"pinsirite": {
		id: "pinsirite",
		name: "Pinsirite",
		spritenum: 602,
		megaStone: "Pinsir-Mega", "Herasir-Mega-P", "Metsir-Mega-P",
		megaEvolves: "Pinsir", "Herasir", "Metsir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 671,
		gen: 6,
		desc: "If holder is a Pinsir, this item allows it to Mega Evolve in battle."
	},
"heracronite": {
		id: "heracronite",
		name: "Heracronite",
		spritenum: 590,
		megaStone: "Heracross-Mega", "Herasir-Mega-H", 
		megaEvolves: "Heracross", "Herasir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 680,
		gen: 6,
		desc: "If holder is a Heracross, this item allows it to Mega Evolve in battle."
	},
"manectite": {
		id: "manectite",
		name: "Manectite",
		spritenum: 596,
		megaStone: "Manectric-Mega", "Mana-Mega", "Mampharos-Mega-M",
		megaEvolves: "Manectric", "Mana", "Mampharos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 682,
		gen: 6,
		desc: "If holder is a Manectric, this item allows it to Mega Evolve in battle."
	},
"houndoominite": {
		id: "houndoominite",
		name: "Houndoominite",
		spritenum: 591,
		megaStone: "Houndoom-Mega", "Houndlion-Mega",
		megaEvolves: "Houndoom", "Houndlion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 666,
		gen: 6,
		desc: "If holder is a Houndoom, this item allows it to Mega Evolve in battle."
	},
"lopunnite": {
		id: "lopunnite",
		name: "Lopunnite",
		spritenum: 626,
		megaStone: "Lopunny-Mega", "Loppeye-Mega",
		megaEvolves: "Lopunny", "Loppeye",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 768,
		gen: 6,
		desc: "If holder is a Lopunny, this item allows it to Mega Evolve in battle."
	},
"audinite": {
		id: "audinite",
		name: "Audinite",
		spritenum: 617,
		megaStone: "Audino-Mega", "Houdini-Mega",
		megaEvolves: "Audino", "Houdini",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 757,
		gen: 6,
		desc: "If holder is an Audino, this item allows it to Mega Evolve in battle."
	},
	"blastoisinite": {
		id: "blastoisinite",
		name: "Blastoisinite",
		spritenum: 583,
		megaStone: "Blastoise-Mega", "Blastninja-Mega", "Aurortoise-Mega", "Blasterain-Mega",
		megaEvolves: "Blastoise", "Blastninja", "Aurortoise", "Blasterain",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is a Blastoise, this item allows it to Mega Evolve in battle."
	},
"ampharosite": {
		id: "ampharosite",
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Ampharos-Mega", "Mampharos-Mega-A",
		megaEvolves: "Ampharos", "Mampharos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is an Ampharos, this item allows it to Mega Evolve in battle."
	}

};
