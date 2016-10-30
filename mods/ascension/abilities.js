'use strict';

exports.BattleAbilities = {
"dazzling": {
		desc: "This Pokemon is immune to moves with increased priority. ",
		shortDesc: "This PokÃ©mon is immune to moves with increased priority.",
		onTryHit: function (pokemon, target, move) {
			if (move.priority > 0 || (pokemon.ability == "galewings" && move.type == "Flying")) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Dazzling');
				return null;
			}
		},
		id: "dazzling",
		name: "Dazzling",
	},
};
