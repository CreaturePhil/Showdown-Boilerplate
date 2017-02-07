'use strict';

exports.BattleItems = {
        //%Elcrest
        "unknownsash": {
                id: "unknownsash",
                name: "Unknown Sash",
                megaStone: "Dragonite",
                megaEvolves: "Dratini",
                onTakeItem: function(item, source) {
                        if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
                        return true;
                },
                onDamage: function(damage, target, source, effect) {
                        if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
                                if (target.useItem()) {
                                        return target.hp - 1;
                                }
                        }
                },
                desc: "If holder is Elcrest, this item allows it to Evolve in battle. For some reason, if Elcrest's HP is full, it will survive that would KO it with 1 HP. Single Use"
        },
        "salamencite": {
                id: "salamencite",
                name: "Salamencite",
                spritenum: 627,
                megaStone: "Salamence-Mega",
                megaEvolves: "Salamence",
				zMove: "Total Annhilation",
				zMoveFrom: "Yo Mamma Joke",
				zMoveUser: ["Salamence-Mega", "Salamence"],
                onTakeItem: function(item, source) {
                        if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
                        return true;
                },
                desc: "If holder is Spandan, this item allows it to Mega Evolve in battle, and also use its special Z Move.",
        },
        "ransiumz": {
                id: "ransiumz",
                name: "Ransium Z",
                onTakeItem: false,
                zMove: "Z-Ransei",
                zMoveFrom: "Legend's Ambition",
                zMoveUser: ["Rayquaza"],
                desc: "If holder is Ransei it can use Z-Ransei",
        },
};