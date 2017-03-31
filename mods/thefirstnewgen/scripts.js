'use strict';

exports.BattleScripts = {
	init: function() {
		let fData = Object.assign({}, Tools.data.FormatsData);
		Object.values(this.data.Pokedex).forEach(pokemon => {
			if (pokemon.num >= 8000) fData[toId(pokemon.name)].tier = "TFNG";
		});
		this.data.FormatsData = fData;
	},
};