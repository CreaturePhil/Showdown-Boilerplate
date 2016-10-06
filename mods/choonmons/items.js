'use strict';

exports.BattleItems = {
	"lightball": {
		inherit: true,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Pichu') {
				return this.chainModify(2);
			}
		},
		onModifySpA: function (spa, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Pichu') {
				return this.chainModify(2);
			}
		},
	},
	"luckypunch": {
		inherit: true,
		onModifyMove: function (move, user) {
			if (user.baseTemplate.species === 'Happiny' || user.baseTemplate.species === 'Chansey' || user.baseTemplate.species === 'Blissey') {
				move.critRatio += 2;
			}
		},
	},
	
	
	//////////////////////////////
	//  ChoonMod: Custom Items  //
	//////////////////////////////

	"venusauritex": {
		id: "venusauritex",
		name: "Venusaurite X",
		spritenum: 608,
		megaStone: "Venusaur-Mega-X",
		megaEvolves: "Venusaur",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1100,
		gen: 6,
		desc: "If holder is a Venusaur, this item allows it to Mega Evolve in battle.",
	},
	"venusauritey": {
		id: "venusauritey",
		name: "Venusaurite Y",
		spritenum: 608,
		megaStone: "Venusaur-Mega-Y",
		megaEvolves: "Venusaur",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 659,
		gen: 6,
		desc: "If holder is a Venusaur, this item allows it to Mega Evolve in battle.",
	},
	"blastoisinitex": {
		id: "blastoisinitex",
		name: "Blastoisinite X",
		spritenum: 583,
		megaStone: "Blastoise-Mega-X",
		megaEvolves: "Blastoise",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 6,
		desc: "If holder is a Blastoise, this item allows it to Mega Evolve in battle.",
	},
	"blastoisinitey": {
		id: "blastoisinitey",
		name: "Blastoisinite Y",
		spritenum: 583,
		megaStone: "Blastoise-Mega-Y",
		megaEvolves: "Blastoise",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1101,
		gen: 6,
		desc: "If holder is a Blastoise, this item allows it to Mega Evolve in battle.",
	},
	"butterfrite": {
		id: "butterfrite",
		name: "Butterfrite",
		spritenum: 576,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1102,
		gen: 6,
		desc: "If holder is a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	"fearowite": {
		id: "fearowite",
		name: "Fearowite",
		spritenum: 622,
		megaStone: "Fearow-Mega",
		megaEvolves: "Fearow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1103,
		gen: 6,
		desc: "If holder is a Fearow, this item allows it to Mega Evolve in battle.",
	},
	"raichuite": {
		id: "raichuite",
		name: "Raichuite",
		spritenum: 0,
		megaStone: "Raichu-Mega",
		megaEvolves: "Raichu",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1104,
		gen: 6,
		desc: "If holder is a Raichu, this item allows it to Mega Evolve in battle.",
	},
	"machampite": {
		id: "machampite",
		name: "Machampite",
		spritenum: 621,
		megaStone: "Machamp-Mega",
		megaEvolves: "Machamp",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1105,
		gen: 6,
		desc: "If holder is a Machamp, this item allows it to Mega Evolve in battle.",
	},
	"slowkingite": {
		id: "slowkingite",
		name: "Slowkingite",
		spritenum: 621,
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1106,
		gen: 6,
		desc: "If holder is a Slowking, this item allows it to Mega Evolve in battle.",
	},
	"mimezite": {
		id: "mimezite",
		name: "Mimezite",
		spritenum: 621,
		megaStone: "Mr. Mime-Mega",
		megaEvolves: "Mr. Mime",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1107,
		gen: 6,
		desc: "If holder is a Mr. Mime, this item allows it to Mega Evolve in battle.",
	},
	"meganiumite": {
		id: "meganiumite",
		name: "Meganiumite",
		spritenum: 608,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1108,
		gen: 6,
		desc: "If holder is a Meganium, this item allows it to Mega Evolve in battle.",
	},
	"typhlosionite": {
		id: "typhlosionite",
		name: "Typhlosionite",
		spritenum: 589,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1109,
		gen: 6,
		desc: "If holder is a Typhlosion, this item allows it to Mega Evolve in battle.",
	},
	"feraligatrite": {
		id: "feraligatrite",
		name: "Feraligatrite",
		spritenum: 589,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -1110,
		gen: 6,
		desc: "If holder is a Feraligatr, this item allows it to Mega Evolve in battle.",
	},
};
