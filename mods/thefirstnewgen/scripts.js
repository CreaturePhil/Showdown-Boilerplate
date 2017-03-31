'use strict';

exports.BattleScripts = {
	init: function() {
		Object.values(this.data.Pokedex).forEach(pokemon => {
			if (pokemon.num >= 8000) this.data.FormatsData[toId(pokemon.name)].tier = "TFNG";
		});
	},
};