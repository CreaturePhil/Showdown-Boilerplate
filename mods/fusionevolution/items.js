'use strict';

exports.BattleItems = {

"swampamarite": {
		id: "swampamarite",
		name: "Swampamarite",
		megaStone: "Swampamar-Mega",
		megaEvolves: "Swampamar",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Swampert, this item allows it to Mega Evolve in battle."
	},
"swankite": {
		id: "swankite",
		name: "Swankite",
		megaStone: "Swank-Mega",
		megaEvolves: "Swank",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Swampert, this item allows it to Mega Evolve in battle."
	},

"gyaroticite": {
		id: "gyaroticite",
		name: "Gyaroticite",
		megaStone: "Gyarotic-Mega",
		megaEvolves: "Gyarotic",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Gyarados, this item allows it to Mega Evolve in battle."
	},
"aggrodositex": {
		id: "aggrodositex",
		name: "Aggrodosite X",
		spritenum: 589,
		megaStone: "Aggrodos-Mega-X",
		megaEvolves: "Aggrodos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Gyarados, this item allows it to Mega Evolve in battle."
	},
"charatositez": {
		id: "charatositez",
		name: "Charatosite Z",
		spritenum: 589,
		megaStone: "Charatos-Mega-Z",
		megaEvolves: "Charatos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Gyarados, this item allows it to Mega Evolve in battle."
	},
"sharpedositey": {
		id: "sharpedositey",
		name: "Sharpedosite Y",
		spritenum: 589,
		megaStone: "Sharpedos-Mega-Y",
		megaEvolves: "Sharpedos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Gyarados, this item allows it to Mega Evolve in battle."
	},
"garchadositey": {
		id: "garchadositey",
		name: "Garchadosite Y",
		spritenum: 589,
		megaStone: "Garchados-Mega-Y",
		megaEvolves: "Garchados",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Gyarados, this item allows it to Mega Evolve in battle."
	},

"pangleyeite": {
		id: "pangleyeite",
		name: "Pangleyeite",
		megaStone: "Pangleye-Mega",
		megaEvolves: "Pangleye",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Sableye, this item allows it to Mega Evolve in battle."
	},

"garchadositex": {
		id: "garchadositex",
		name: "Garchadosite X",
		megaStone: "Garchados-Mega-X",
		megaEvolves: "Garchados",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Garchomp, this item allows it to Mega Evolve in battle."
	},
"gargatrite": {
		id: "gargatrite",
		name: "Gargatrite",
		megaStone: "Gargatr-Mega", 
		megaEvolves: "Gargatr",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Garchomp, this item allows it to Mega Evolve in battle."
	},
"tyranichompitey": {
		id: "tyranichompitey",
		name: "Tyranichompite Y",
		megaStone: "Tyranichomp-Mega-Y",
		megaEvolves: "Tyranichomp",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Garchomp, this item allows it to Mega Evolve in battle."
	},


"cofagreelixite": {
		id: "cofagreelixite",
		name: "Cofagreelixite",
		megaStone: "Cofagreelix-Mega",
		megaEvolves: "Cofagreelix",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 761,
		gen: 6,
		desc: "If holder is a Steelix, this item allows it to Mega Evolve in battle."
	},

"aggrodositey": {
		id: "aggrodosite",
		name: "Aggrodosite",
		spritenum: 578,
		megaStone: "Aggrodos-Mega-Y",
		megaEvolves: "Aggrodos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 667,
		gen: 6,
		desc: "If holder is an Aggron, this item allows it to Mega Evolve in battle."
	},
"aggrosauritey": {
		id: "aggrosauritey",
		name: "Aggrosaurite Y",
		spritenum: 578,
		megaStone: "Aggrosaur-Mega-Y",
		megaEvolves: "Aggrosaur",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 667,
		gen: 6,
		desc: "If holder is an Aggron, this item allows it to Mega Evolve in battle."
	},

"archedactylite": {
		id: "archedactylite",
		name: "Archedactylite",
		spritenum: 577,
		megaStone: "Archedactyl-Mega",
		megaEvolves: "Archedactyl",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 672,
		gen: 6,
		desc: "If holder is an Aerodactyl, this item allows it to Mega Evolve in battle."
	},

"weasolite": {
		id: "weasolite",
		name: "Weasolite",
		spritenum: 576,
		megaStone: "Weasol-Mega",
		megaEvolves: "Weasol",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 677,
		gen: 6,
		desc: "If holder is an Absol, this item allows it to Mega Evolve in battle."
	},

"tyranichompitey": {
		id: "tyranichompitey",
		name: "Tyranichompite Y",
		spritenum: 607,
		megaStone: "Tyranichomp-Mega-Y",
		megaEvolves: "Tyranichomp",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 669,
		gen: 6,
		desc: "If holder is a Tyranitar, this item allows it to Mega Evolve in battle."
	},
"mantarite": {
		id: "mantarite",
		name: "Mantarite",
		spritenum: 607,
		megaStone: "Manatar-Mega",
		megaEvolves: "Manatar",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 669,
		gen: 6,
		desc: "If holder is a Tyranitar, this item allows it to Mega Evolve in battle."
	},

"railieite": {
		id: "railieite",
		name: "Railieite",
		spritenum: 623,
		megaStone: "Railie-Mega",
		megaEvolves: "Railie",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 763,
		gen: 6,
		desc: "If holder is a Glalie, this item allows it to Mega Evolve in battle."
	},
"glakissite": {
		id: "glakissite",
		name: "Glakissite",
		spritenum: 623,
		megaStone: "Glakiss-Mega",
		megaEvolves: "Glakiss",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Glalie, this item allows it to Mega Evolve in battle."
	},

"chartositex": {
		id: "chartositex",
		name: "Chartosite X",
		spritenum: 585,
		megaStone: "Charatos-Mega-X",
		megaEvolves: "Charatos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 660,
		gen: 6,
		desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle."
	},
"shaymizarditex": {
		id: "shaymizarditex",
		name: "Shaymizardite X",
		spritenum: 585,
		megaStone: "Shaymizard-Mega-X",
		megaEvolves: "Shaymizard",  
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 660,
		gen: 6,
		desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle."
	},
"hazarditex": {
		id: "hazarditex",
		name: "Hazardite X",
		spritenum: 585,
		megaStone: "Hazard-Mega-X",
		megaEvolves: "Hazard", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 660,
		gen: 6,
		desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle."
	},
"charatositey": {
		id: "charatositey",
		name: "Charatosite Y",
		spritenum: 586,
		megaStone: "Charatos-Mega-Y", 
		megaEvolves: "Charatos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 678,
		gen: 6,
		desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle."
	},
"shaymizarditey": {
		id: "shaymizarditey",
		name: "Shaymizardite Y",
		spritenum: 586,
		megaStone: "Shaymizard-Mega-Y",
		megaEvolves: "Shaymizard",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 678,
		gen: 6,
		desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle."
	},
"hazarditey": {
		id: "hazarditey",
		name: "Hazardite Y",
		spritenum: 586,
		megaStone: "Hazard-Mega-Y", 
		megaEvolves: "Hazard",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 678,
		gen: 6,
		desc: "If holder is a Charizard, this item allows it to Mega Evolve in battle."
	},

"aggrosauritex": {
		id: "aggrosauritex",
		name: "Aggrosaurite X",
		spritenum: 608,
		megaStone: "Aggrosaur-Mega-X",
		megaEvolves: "Aggrosaur", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 659,
		gen: 6,
		desc: "If holder is a Venusaur, this item allows it to Mega Evolve in battle."
	},

"skariaite": {
		id: "skariaite",
		name: "Skariaite",
		spritenum: 615,
		megaStone: "Skaria-Mega", 
		megaEvolves: "Skaria",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 755,
		gen: 6,
		desc: "If holder is an Altaria, this item allows it to Mega Evolve in battle."
	},
	
"entariaite": {
		id: "entariaite",
		name: "Entariaite",
		spritenum: 615,
		megaStone: "Entaria-Mega",
		megaEvolves: "Entaria",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 6,
		desc: "If holder is an Altaria, this item allows it to Mega Evolve in battle."
	},

"magmozamite": {
		id: "magmozamite",
		name: "Magmozamite",
		spritenum: 579,
		megaStone: "Magmozam-Mega",
		megaEvolves:"Magmozam",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 6,
		desc: "If holder is an Alakazam, this item allows it to Mega Evolve in battle."
	},

"sharpedositex": {
		id: "sharpedositex",
		name: "Sharpedositex",
		spritenum: 619,
		megaStone: "Sharpedos-Mega-X",
		megaEvolves: "Sharpedos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 759,
		gen: 6,
		desc: "If holder is a Sharpedo, this item allows it to Mega Evolve in battle."
	},

"pidgetotite": {
		id: "pidgetotite",
		name: "Pidgetotite",
		spritenum: 622,
		megaStone: "Pidgetot-Mega", 
		megaEvolves: "Pidgetot",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 762,
		gen: 6,
		desc: "If holder is a Pidgeot, this item allows it to Mega Evolve in battle."
	},
"pidgemieite": {
		id: "pidgemieite",
		name: "Pidgemieite",
		spritenum: 622,
		megaStone: "Pidgemie-Mega",
		megaEvolves: "Pidgemie",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 762,
		gen: 6,
		desc: "If holder is a Pidgeot, this item allows it to Mega Evolve in battle."
	},
"petranite": {
		id: "petranite",
		name: "Petranite",
		spritenum: 622,
		megaStone: "Peatran-Mega",
		megaEvolves:"Peatran", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 762,
		gen: 6,
		desc: "If holder is a Pidgeot, this item allows it to Mega Evolve in battle."
	},
"shotite": {
		id: "shotite",
		name: "Shotite",
		spritenum: 622,
		megaStone: "Shot-Mega",
		megaEvolves: "Shot",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 762,
		gen: 6,
		desc: "If holder is a Pidgeot, this item allows it to Mega Evolve in battle."
	},

"klazorite": {
		id: "klazorite",
		name: "Klazorite",
		spritenum: 605,
		megaStone: "Klazor-Mega",
		megaEvolves: "Klazor",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 670,
		gen: 6,
		desc: "If holder is a Scizor, this item allows it to Mega Evolve in battle."
	},

"jellivoirite": {
		id: "jellivoirite",
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Jellivoir-Mega",
		megaEvolves: "Jellivoir", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 657,
		gen: 6,
		desc: "If holder is a Gardevoir, this item allows it to Mega Evolve in battle."
	},
"mismagivoirite": {
		id: "mismagivoirite",
		name: "Mismagivoirite",
		spritenum: 587,
		megaStone: "Mismagivoir-Mega",
		megaEvolves: "Mismagivoir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 657,
		gen: 6,
		desc: "If holder is a Gardevoir, this item allows it to Mega Evolve in battle."
	},

"metabatite": {
		id: "metabatite",
		name: "Metabatite",
		spritenum: 618,
		megaStone: "Metabat-Mega",
		megaEvolves: "Metabat",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 758,
		gen: 6,
		desc: "If holder is a Metagross, this item allows it to Mega Evolve in battle."
	},
"banegrossitex": {
		id: "banegrossitex",
		name: "Banegrossite X",
		spritenum: 618,
		megaStone: "Banegross-Mega-X", 
		megaEvolves: "Metabat",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 758,
		gen: 6,
		desc: "If holder is a Metagross, this item allows it to Mega Evolve in battle."
	},
"metisiritem": {
		id: "metisiritem",
		name: "Metisirite M",
		spritenum: 618,
		megaStone: "Metsir-Mega-M",
		megaEvolves: "Metsir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 758,
		gen: 6,
		desc: "If holder is a Metagross, this item allows it to Mega Evolve in battle."
	},
"dartiosite": {
		id: "dartiosite",
		name: "Dartiosite",
		spritenum: 630,
		megaStone: "Dartios-Mega",
		megaEvolves: "Dartios", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is a Latios, this item allows it to Mega Evolve in battle."
	},
"banegrossitey": {
		id: "banegrossitey",
		name: "Banegrossite Y",
		spritenum: 582,
		megaStone: "Banegross-Mega-Y",
		megaEvolves: "Banegross",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 668,
		gen: 6,
		desc: "If holder is a Banette, this item allows it to Mega Evolve in battle."
	},
"herasiritep": {
		id: "herasiritep",
		name: "Herasirite P",
		spritenum: 602,
		megaStone: "Herasir-Mega-P", 
		megaEvolves: "Herasir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 671,
		gen: 6,
		desc: "If holder is a Pinsir, this item allows it to Mega Evolve in battle."
	},
"metisiritep": {
		id: "metisiritep",
		name: "Metisirite P",
		spritenum: 602,
		megaStone: "Metsir-Mega-P",
		megaEvolves: "Metsir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 671,
		gen: 6,
		desc: "If holder is a Pinsir, this item allows it to Mega Evolve in battle."
	},
"herasiriteh": {
		id: "herasiriteh",
		name: "Herasiriteh",
		spritenum: 590,
		megaStone: "Herasir-Mega-H", 
		megaEvolves: "Herasir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 680,
		gen: 6,
		desc: "If holder is a Heracross, this item allows it to Mega Evolve in battle."
	},
"manaite": {
		id: "manaite",
		name: "Manaite",
		spritenum: 596,
		megaStone: "Mana-Mega", 
		megaEvolves: "Mana",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 682,
		gen: 6,
		desc: "If holder is a Manectric, this item allows it to Mega Evolve in battle."
	},
"mampharositem": {
		id: "mampharositem",
		name: "Mampharosite M",
		spritenum: 596,
		megaStone: "Mampharos-Mega-M",
		megaEvolves: "Mampharos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 682,
		gen: 6,
		desc: "If holder is a Manectric, this item allows it to Mega Evolve in battle."
	},
"houndlionite": {
		id: "houndlionite",
		name: "Houndlionite",
		spritenum: 591,
		megaStone: "Houndlion-Mega",
		megaEvolves: "Houndlion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 666,
		gen: 6,
		desc: "If holder is a Houndoom, this item allows it to Mega Evolve in battle."
	},
"loppeyeite": {
		id: "loppeyeite",
		name: "Loppeyeite",
		spritenum: 626,
		megaStone: "Loppeye-Mega",
		megaEvolves: "Loppeye",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 768,
		gen: 6,
		desc: "If holder is a Lopunny, this item allows it to Mega Evolve in battle."
	},
"houdininite": {
		id: "houdininite",
		name: "Houdininite",
		spritenum: 617,
		megaStone: "Houdini-Mega",
		megaEvolves: "Houdini",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 757,
		gen: 6,
		desc: "If holder is an Audino, this item allows it to Mega Evolve in battle."
	},
"blastninjaite": {
		id: "blastninjaite",
		name: "Blastninjaite",
		spritenum: 583,
		megaStone: "Blastninja-Mega",
		megaEvolves: "Blastninja", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is a Blastoise, this item allows it to Mega Evolve in battle."
	},
"aurortoise": {
		id: "aurortoise",
		name: "Aurortoise",
		spritenum: 583,
		megaStone: "Aurortoise-Mega", 
		megaEvolves: "Aurortoise", 
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is a Blastoise, this item allows it to Mega Evolve in battle."
	},
"blasterainite": {
		id: "blasterainite",
		name: "Blasterainite",
		spritenum: 583,
		megaStone: "Blasterain-Mega",
		megaEvolves: "Blasterain",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is a Blastoise, this item allows it to Mega Evolve in battle."
	},
"mampharositea": {
		id: "mampharositea",
		name: "mampharositea",
		spritenum: 580,
		megaStone: "Mampharos-Mega-A",
		megaEvolves: "Mampharos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is an Ampharos, this item allows it to Mega Evolve in battle."
	}

};
