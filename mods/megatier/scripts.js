exports.BattleScripts = {
	gen: 6,
	runMegaEvo: function (pokemon) {
		var side = pokemon.side;
		if (pokemon.template.isMega) return false;
		var item = this.getItem(pokemon.item);
		if (!item.megaStone) return false;
		var template = this.getTemplate(item.megaStone);
		if (!template.isMega) return false;
		if (pokemon.baseTemplate.baseSpecies !== template.baseSpecies) return false;

		// okay, mega evolution is possible
		pokemon.formeChange(template);
		pokemon.baseTemplate = template; // mega evolution is permanent :o
		pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
		this.add('detailschange', pokemon, pokemon.details);
		this.add('message', template.baseSpecies + " has Mega Evolved into Mega " + template.baseSpecies + "!");
		pokemon.setAbility(template.abilities['0']);
		pokemon.baseAbility = pokemon.ability;
		for (var i = 0; i < side.pokemon.length; i++) {
			if (side.pokemon[i].species === pokemon.template.species || side.pokemon[i].species === pokemon.template.baseSpecies)
				side.pokemon[i].canMegaEvo = false;
		}
		return true;
	}
};
