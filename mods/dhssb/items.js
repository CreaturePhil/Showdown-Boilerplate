'use strict';

exports.BattleItems = {
//%Elcrest
     "unknownsash": {
	id: "unknownsash",
	name: "Unknown Sash",
	megaStone: "Dragonite",
	megaEvolves: "Dratini",
	onTakeItem: function (item, source) {
	  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
	  return true;
	},
        onDamage: function (damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				if (target.useItem()) {
					return target.hp - 1;
						}
					}
				},
	desc: "If holder is Elcrest, this item allows it to Evolve in battle. For some reason, if Elcrest's HP is full, it will survive that would KO it with 1 HP. Single Use"
},
};
