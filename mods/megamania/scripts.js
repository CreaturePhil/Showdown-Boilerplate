exports.BattleScripts = {
    canMegaEvo: function (pokemon) {
        var side = pokemon.side;
        if (side.megaEvo) return false;
        var otherForme;
        var template;
        if (pokemon.baseTemplate.otherFormes) otherForme = this.getTemplate(pokemon.baseTemplate.otherFormes[0]);
        if (otherForme && otherForme.isMega && otherForme.requiredMove) {
            if (pokemon.moves.indexOf(toId(otherForme.requiredMove)) < 0) return false;
            template = otherForme;
        } else {
            var item = this.getItem(pokemon.item);
            if (item.id === 'megastone') {
                if (side.sideConditions["megamania"]) {
                    return false;
                }
                return true;
            }
            if (!item.megaStone) return false;
            template = this.getTemplate(item.megaStone);
            if (pokemon.baseTemplate.isMega) return false;
        }
        if (!template.isMega) return false;
        var foeActive = side.foe && side.foe.active;
        if (foeActive) {
            for (var i = 0; i < foeActive.length; i++) {
                if (!foeActive[i] || !foeActive[i].volatiles['skydrop'] || foeActive[i].volatiles['skydrop'].source !== pokemon) continue;
                return false;
            }
        }
        return template;
    },
 
    runMegaEvo: function (pokemon) {
        var template = this.canMegaEvo(pokemon),
            item = this.getItem(pokemon.item),
            side = pokemon.side;
     
        // okay, mega evolution is possible
     
        if (item.id === 'megastone') {
            // check previous mega evolution
            if (side.sideConditions["megamania"]) {
                return false;
            } else {
                side.addSideCondition("megamania");
            }
            // change stat
            for (var statName in pokemon.baseStats) {
                var newStat = pokemon.baseStats[statName];
                if (pokemon.set.shiny) {
                    if (statName === 'atk') newStat += 30;
                    if (statName === 'spa') newStat += 10;
                } else {
                    if (statName === 'atk') newStat += 10;
                    if (statName === 'spa') newStat += 30;
                }
                if (statName === 'spe'
                    || statName === 'def'
                    || statName === 'spd') newStat += 20;
                pokemon.baseStats[statName] = newStat;
            }
            // abilities
            var oldAbility = pokemon.ability;
            var baseAbility = pokemon.name.split("/")[1],
                ability = this.getAbility(baseAbility);
            if (ability.exists) {
                pokemon.setAbility(ability.name);
                pokemon.baseAbility = pokemon.ability;
            }
            // make mega
            this.add('detailschange', pokemon, pokemon.details);
            this.add('-mega', pokemon, pokemon.baseSpecies, item);
        } else if (template) {
            pokemon.formeChange(template);
            pokemon.baseTemplate = template; // mega evolution is permanent :o
            pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
            this.add('detailschange', pokemon, pokemon.details);
            this.add('-mega', pokemon, template.baseSpecies, item);
            var oldAbility = pokemon.ability;
            pokemon.setAbility(template.abilities['0']);
            pokemon.baseAbility = pokemon.ability;
        }

        for (var i = 0; i < side.pokemon.length; i++) side.pokemon[i].canMegaEvo = false;
        return true;
    },
 
    side: {
        getData: function() {
            var forme;
            var data = {
                name: this.name,
                id: this.id,
                pokemon: []
            };
            for (var i = 0; i < this.pokemon.length; i++) {
                var pokemon = this.pokemon[i];
                data.pokemon.push({
                    ident: pokemon.fullname,
                    details: pokemon.details,
                    condition: pokemon.getHealth(pokemon.side),
                    active: (pokemon.position < pokemon.side.active.length),
                    stats: {
                        atk: pokemon.baseStats['atk'],
                        def: pokemon.baseStats['def'],
                        spa: pokemon.baseStats['spa'],
                        spd: pokemon.baseStats['spd'],
                        spe: pokemon.baseStats['spe']
                    },
                    moves: pokemon.moves.map(function(move) {
                        if (move === 'hiddenpower') {
                            return move + toId(pokemon.hpType) + (pokemon.hpPower === 70 ? '' : pokemon.hpPower);
                        }
                        return move;
                    }),
                    baseAbility: pokemon.baseAbility,
                    item: pokemon.item,
                    pokeball: pokemon.pokeball,
                    canMegaEvo: this.battle.canMegaEvo(pokemon)
                });
            }
            return data;
        }
    }
};
