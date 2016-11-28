'use strict';

exports.BattleMovedex = {
			"gastroacid": {
				num: 380,
				accuracy: 100,
				basePower: 0,
				category: "Status",
				desc: "Causes the target's Ability to be rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. Fails if the target's Ability is Multitype or Stance Change.",
				shortDesc: "Nullifies the target's Ability.",
				id: "gastroacid",
				name: "Gastro Acid",
				pp: 10,
				priority: 0,
				flags: {protect: 1, reflectable: 1, mirror: 1},
				volatileStatus: 'gastroacid',
				onTryHit: function (pokemon) {
					let bannedAbilities = {multitype:1, stancechange:1};
					if (bannedAbilities[pokemon.ability]) {
						return false;
					}
				},
				effect: {
					// Ability suppression implemented in BattlePokemon.ignoringAbility() within battle-engine.js
					onStart: function (pokemon) {
						this.add('-endability', pokemon);
						this.singleEvent('End', this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid'); 
						if(pokemon.hasAbility(pokemon.abilitwo)) pokemon.removeVolatile(pokemon.abilitwo, pokemon);
					},
				},
				secondary: false,
				target: "normal",
				type: "Poison",
				contestType: "Tough",
			},
};
