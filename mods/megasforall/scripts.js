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
			if (item.m4aEvolves) {
				template = this.getTemplate(pokemon.baseTemplate.baseSpecies + item.m4aEvolves);
				if (template.tier === 'M4A') {
					return template;
				}
			} else {
				if (!item.megaStone) return false;
				template = this.getTemplate(item.megaStone);
				if (pokemon.baseTemplate.baseSpecies !== template.baseSpecies) return false;
			}
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
			if (!item.megaStone) return false;
			template = this.getTemplate(item.megaStone);
			if (pokemon.baseTemplate.baseSpecies !== template.baseSpecies) {
				var isM4A = false;
				if (item.m4aEvolves && this.getTemplate(pokemon.baseTemplate.baseSpecies + item.m4aEvolves).tier === 'M4A') {
					template = this.getTemplate(pokemon.baseTemplate.baseSpecies + item.m4aEvolves);
					isM4A = true;
				}
				if (!isM4A) return false;
			}
		}
		if (!template.isMega && !isM4A) return false;

		var foeActive = side.foe.active;
		for (var i = 0; i < foeActive.length; i++) {
			if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		// okay, mega evolution is possible
		pokemon.formeChange(template);
		pokemon.baseTemplate = template; // mega evolution is permanent :o
		pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
		this.add('detailschange', pokemon, pokemon.details);
		this.add('-mega', pokemon, template.baseSpecies, item);
		var oldAbility = pokemon.ability;
		pokemon.setAbility(template.abilities['0']);
		pokemon.baseAbility = pokemon.ability;
		this.runEvent('EndAbility', pokemon, oldAbility);

		side.megaEvo = 1;
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
	},
	
	init: function () {
		// learnsets
		this.modData('Learnsets', 'accelgor').learnset.toxicspikes = ['6L1'];
		this.modData('Learnsets', 'amoonguss').learnset.darkpulse = ['6L1'];
		this.modData('Learnsets', 'arbok').learnset.dragondance = ['6L1'];
		this.modData('Learnsets', 'arbok').learnset.dragonrush = ['6L1'];
		this.modData('Learnsets', 'arbok').learnset.venomdrench = ['6L1'];
		this.modData('Learnsets', 'arcanine').learnset.batonpass = ['6L1'];
		this.modData('Learnsets', 'arcanine').learnset.healingwish = ['6L1'];
		this.modData('Learnsets', 'arcanine').learnset.nobleroar = ['6L1'];
		this.modData('Learnsets', 'arcanine').learnset.blazekick = ['6L1'];
		this.modData('Learnsets', 'articuno').learnset.aeroblast = ['6L1'];
		this.modData('Learnsets', 'articuno').learnset.waterpulse = ['6L1'];
		this.modData('Learnsets', 'articuno').learnset.shadowball = ['6L1'];
		this.modData('Learnsets', 'audino').learnset.chatter = ['6L1'];
		this.modData('Learnsets', 'audino').learnset.boomburst = ['6L1'];
		this.modData('Learnsets', 'audino').learnset.bugbuzz = ['6L1'];
		this.modData('Learnsets', 'aurorus').learnset.moonlight = ['6L1'];
		this.modData('Learnsets', 'aurorus').learnset.powergem = ['6L1'];
		this.modData('Learnsets', 'avalugg').learnset.heavyslam = ['6L1'];
		this.modData('Learnsets', 'bibarel').learnset.stealthrock = ['6L1'];
		this.modData('Learnsets', 'bibarel').learnset.slackoff = ['6L1'];
		this.modData('Learnsets', 'basculin').learnset.closecombat = ['6L1'];
		this.modData('Learnsets', 'basculin').learnset.vacuumwave = ['6L1'];
		this.modData('Learnsets', 'basculin').learnset.poisonfang = ['6L1'];
		this.modData('Learnsets', 'basculin').learnset.coil = ['6L1'];
		this.modData('Learnsets', 'basculin').learnset.icefang = ['6L1'];
		this.modData('Learnsets', 'beedrill').learnset.megahorn = ['6L1'];
		this.modData('Learnsets', 'beedrill').learnset.bravebird = ['6L1'];
		this.modData('Learnsets', 'beheeyem').learnset.flashcannon = ['6L1'];
		this.modData('Learnsets', 'bellossom').learnset.quiverdance = ['6L1'];
		this.modData('Learnsets', 'bellossom').learnset.flamethrower = ['6L1'];
		this.modData('Learnsets', 'bellossom').learnset.fireblast = ['6L1'];
		this.modData('Learnsets', 'bellossom').learnset.moonblast = ['6L1'];
		this.modData('Learnsets', 'bellossom').learnset.drainingkiss = ['6L1'];
		this.modData('Learnsets', 'blissey').learnset.moonblast = ['6L1'];
		this.modData('Learnsets', 'bouffalant').learnset.bulkup = ['6L1'];
		this.modData('Learnsets', 'braviary').learnset.quickattack = ['6L1'];
		this.modData('Learnsets', 'breloom').learnset.highjumpkick = ['6L1'];
		this.modData('Learnsets', 'bronzong').learnset.voltswitch = ['6L1'];
		this.modData('Learnsets', 'butterfree').learnset.psyshock = ['6L1'];
		this.modData('Learnsets', 'cacturne').learnset.firepunch = ['6L1'];
		this.modData('Learnsets', 'cacturne').learnset.icepunch = ['6L1'];
		this.modData('Learnsets', 'cacturne').learnset.knockoff = ['6L1'];
		this.modData('Learnsets', 'carbink').learnset.earthpower = ['6L1'];
		this.modData('Learnsets', 'carnivine').learnset.thunderfang = ['6L1'];
		this.modData('Learnsets', 'carnivine').learnset.icefang = ['6L1'];
		this.modData('Learnsets', 'carnivine').learnset.acidspray = ['6L1'];
		this.modData('Learnsets', 'carracosta').learnset.stoneedge = ['6L1'];
		// pokedex entries
		for (var i in this.data.Pokedex) {
			var template = this.getTemplate(i);
			var baseTemplate = this.getTemplate(template.baseSpecies);
			if (template.tier !== 'M4A') continue;
			this.modData('Pokedex', i).weightkg = template.weightkg || baseTemplate.weightkg;
			this.modData('Pokedex', i).heightm = template.heightm || baseTemplate.heightm;
		}
	}
}
