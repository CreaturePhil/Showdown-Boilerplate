'use strict';

exports.BattleFormats = {
	donorclause: {
		effectType: 'Banlist',
		name: 'Donor Clause',
		onStart: function() {
			this.add('rule', "Donor Clause: No two Pokemon may inherit from the same evolutionary line.");
		},
		onValidateTeam: function(team, format, teamHas) {
			// Donor Clause
			let evoFamilyLists = [];
			for (let i = 0; i < team.length; i++) {
				let set = team[i];
				if (!set.abilitySources) continue;
				evoFamilyLists.push(new Set(set.abilitySources.map(format.getEvoFamily)));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple PokÃ©mon only legal for exactly one family. FIXME?
			let requiredFamilies = Object.create(null);
			for (let i = 0; i < evoFamilyLists.length; i++) {
				let evoFamilies = evoFamilyLists[i];
				if (evoFamilies.size !== 1) continue;
				evoFamilies = Array.from(evoFamilies);
				if (requiredFamilies[evoFamilies[0]]) return ["You are limited to one inheritance from each family by the Donor Clause.", "(You inherit more than once from " + this.getTemplate(evoFamilies[0]).species + "'s.)"];
				requiredFamilies[evoFamilies[0]] = 1;
			}
		},
	},
};
