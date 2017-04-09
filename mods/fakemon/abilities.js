'use strict';

exports.BattleAbilities = {
  "safeswap": {
		shortDesc: "On switch-in, this Pokemon avoids all attacks.",
		onTryHit: function (target, source, move) {
			if (!target.activeTurns) {
				this.add('-immune', target, '[msg]', '[from] ability: Safe Swap');
				return null;
			}
		},
		id: "safeswap",
		name: "Safe Swap",
		rating: 4,
		num: 1000,
	},
};
