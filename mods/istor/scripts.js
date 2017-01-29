'use strict';

exports.BattleScripts = {
	getCategory: function(move) {
		move = this.getMove(move);
		let cat = move.category;
		if(this.pseudoWeather["wonderroom"]) {
			if(cat === "Special") return "Physical";
			if(cat === "Physical") return "Special";
		}
		return cat || 'Physical';
	},
};
