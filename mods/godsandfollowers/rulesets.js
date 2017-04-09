exports.BattleFormats = {
	followersclause: {
		effectType: 'Rule',
		onValidateTeam: function(team) {
			var problems = [];
			var god = team[0];
			var godName = god.name || god.species;
			var godTemplate = this.getTemplate(god.species);
			var godFormes = godTemplate.otherFormes || [];
			// Look for item changing a forme, if one exists (for example mega
			// stones or Red Orb).
			for (var i = 0; i < godFormes.length; i++) {
				var forme = this.getTemplate(godFormes[i]);
				if (forme.requiredItem === god.item) {
					godTemplate = forme;
					break;
				}
			}

			for (var i = 1; i < team.length; i++) {
				var pokemon = team[i];
				var name = pokemon.name || pokemon.species;
				var template = this.getTemplate(pokemon.species);
				if (template.types.intersect(godTemplate.types).isEmpty()) {
					problems.push("Your " + name + " must share a type with " + godName + ".");
				}
				if (template.tier === 'Uber' || template.isUnreleased) {
					problems.push("You cannot use " + name + " as non-god.");
				}
				var bannedItems = {
					'Gengarite': true,
					'Kangaskhanite': true,
					'Lucarionite': true,
					'Mawilite': true,
					'Salamencite': true
				}
				if (bannedItems[pokemon.item]) {
					problems.push(name + "'s item " + pokemon.item + " is banned for non-gods.");
				}
			}
			// Item check
			for (var i = 0; i < team.length; i++) {
				var pokemon = team[i];
				var name = pokemon.name || pokemon.species;
				var item = this.getItem(pokemon.item);
				if (item.isUnreleased) {
					problems.push(name + "'s item " + set.item + " is unreleased.");
				}
			}
			return problems;
		},
		onStart: function() {
			// Set up god, because the Pokemon positions during battle switch around.
			for (var i = 0; i < this.sides.length; i++) {
				this.sides[i].god = this.sides[i].pokemon[0];
			}
		},
		onFaint: function(pokemon) {
			if (pokemon.side.god === pokemon) {
				this.add('-message', pokemon.name + " has fallen! " + pokemon.side.name + "'s team has been saddled with an endless Embargo!");
				pokemon.side.goddead = true;
			}
		},
		onSwitchIn: function(pokemon) {
			if (pokemon.side.goddead) {
				// What a horrible night to have a Curse.
				pokemon.addVolatile('embargo', pokemon);
			}
		}
	}
};