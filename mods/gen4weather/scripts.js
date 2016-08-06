'use strict';

exports.BattleScripts = {
	inherit: 'gen5',
	gen: 4,
	init: function () {
		for (let i in this.data.Pokedex) {
			delete this.data.Pokedex[i].abilities['H'];
		}
		this.modData('Pokedex', 'politoed').abilities['1'] = 'Drizzle';
		this.modData('Pokedex', 'ninetales').abilities['1'] = 'Drought';
	},
};
