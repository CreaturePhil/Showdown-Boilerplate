'use strict';

exports.BattleScripts = {
	setTerrain: function (status, source, sourceEffect) {
		status = this.getEffect(status);
		if(status.id !== "allterrain") return false;
	},
	isTerrain: function(terrain, target) {
		return true;
	},
};