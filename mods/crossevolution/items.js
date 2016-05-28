'use strict';

exports.BattleItems = {
	"deepseascale": {
		inherit: true,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.crossEvolved) return;
			if (pokemon.baseTemplate.species === 'Clamperl') {
				return this.chainModify(2);
			}
		},
	},
	"deepseatooth": {
		inherit: true,
		onModifySpA: function (spd, pokemon) {
			if (pokemon.crossEvolved) return;
			if (pokemon.baseTemplate.species === 'Clamperl') {
				return this.chainModify(2);
			}
		},
	},
	"eviolite": {
		inherit: true,
		onModifyDef: function (def, pokemon) {
			if (pokemon.crossEvolved) return;
			if (pokemon.baseTemplate.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpD: function (spd, pokemon) {
			if (pokemon.crossEvolved) return;
			if (pokemon.baseTemplate.nfe) {
				return this.chainModify(1.5);
			}
		},
	},
	"lightball": {
		inherit: true,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.crossEvolved) return;
			if (pokemon.baseTemplate.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
		onModifySpA: function (spa, pokemon) {
			if (pokemon.crossEvolved) return;
			if (pokemon.baseTemplate.baseSpecies === 'Pikachu') {
				return this.chainModify(2);
			}
		},
	},
	"thickclub": {
		inherit: true,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.crossEvolved) return;
			if (pokemon.baseTemplate.species === 'Cubone' || pokemon.baseTemplate.species === 'Marowak') {
				return this.chainModify(2);
			}
		},
	},
};
