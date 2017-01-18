'use strict';

exports.BattleItems = {
	"deepseascale": {
		id: "deepseascale",
		name: "DeepSeaScale",
		spritenum: 93,
		fling: {
			basePower: 30,
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if(pokemon.fusion) return;
			if (pokemon.baseTemplate.species === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		num: 227,
		gen: 3,
		desc: "If holder is a Clamperl, its Sp. Def is doubled.",
	},
	"deepseatooth": {
		id: "deepseatooth",
		name: "DeepSeaTooth",
		spritenum: 94,
		fling: {
			basePower: 90,
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa, pokemon) {
			if(pokemon.fusion) return;
			if (pokemon.baseTemplate.species === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		num: 226,
		gen: 3,
		desc: "If holder is a Clamperl, its Sp. Atk is doubled.",
	},
	"eviolite": {
		id: "eviolite",
		name: "Eviolite",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (pokemon.baseTemplate.nfe && this.getTemplate(pokemon.fusion).nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.nfe && this.getTemplate(pokemon.fusion).nfe) {
				return this.chainModify(1.5);
			}
		},
		num: 538,
		gen: 5,
		desc: "If holder's species can evolve, its Defense and Sp. Def are 1.5x.",
	},
	"lightball": {
		id: "lightball",
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onModifyAtkPriority: 1,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Pikachu' && pokemon.fusion === "Pikachu") {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Pikachu' && pokemon.fusion === "Pikachu") {
				return this.chainModify(2);
			}
		},
		num: 236,
		gen: 2,
		desc: "If holder is a Pikachu, its Attack and Sp. Atk are doubled.",
	},
	"souldew": {
		id: "souldew",
		name: "Soul Dew",
		spritenum: 459,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 6,
		onBasePower: function (basePower, user, target, move) {
			if(user.template.num !== 380 && user.template.num !== 381) return;
			if (move && (this.getTemplate(user.fusion).num === 380 || this.getTemplate(user.fusion).num === 381) && (move.type === 'Psychic' || move.type === 'Dragon')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: 225,
		gen: 3,
		desc: "If holder's a Latias/Latios, its Dragon- and Psychic-type moves have 1.2x power.",
	},
	"thickclub": {
		id: "thickclub",
		name: "Thick Club",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.fusion === 'Cubone' && pokemon.baseTemplate.baseSpecies === 'Marowak') {
				return this.chainModify(2);
			}
			if (pokemon.baseTemplate.baseSpecies === 'Cubone' || pokemon.fusion === 'Marowak') {
				return this.chainModify(2);
			}
		},
		num: 258,
		gen: 2,
		desc: "If holder is a Cubone or a Marowak, its Attack is doubled.",
	},
};
