'use strict';

exports.BattleScripts = {
	//Pokemon Modification:
	init: function () {
		for (let i in this.data.Pokedex) {
			let learnset = (this.data.Learnsets[i]) ? this.data.Learnsets[i].learnset : false;
			let pokemon = this.data.Pokedex[i];
			if (learnset) {
				//Everyone who has access to dazzling gleam now has access to moonblast.
				if (learnset.dazzlinggleam) {
					if (learnset.moonblast) {
						this.modData('Learnsets', i).learnset.moonblast = learnset.moonblast.push('6M');
					} else {
						this.modData('Learnsets', i).learnset.moonblast = ['6M'];
					}
				}
				//Defog is now a gen 6 HM.
				if (learnset.defog) {
					this.modData('Learnsets', i).learnset.defog = learnset.defog.push('6M');
				}
				//All ground types have access to Fissure.
				if (pokemon.types.indexOf('Ground') > -1) {
					if (learnset.fissure) {
						this.modData('Learnsets', i).learnset.fissure = learnset.fissure.push('6T');
					} else {
						this.modData('Learnsets', i).learnset.fissure = ['6T'];
					}
				}
				//All grass types have access to Leaf Storm.
				if (pokemon.types.indexOf('Grass') > -1) {
					if (learnset.leafstorm) {
						this.modData('Learnsets', i).learnset.leafstorm = learnset.leafstorm.push('6T');
					} else {
						this.modData('Learnsets', i).learnset.leafstorm = ['6T'];
					}
				}
				//All fire types have access to Overheat.
				if (pokemon.types.indexOf('Fire') > -1) {
					if (learnset.overheat) {
						this.modData('Learnsets', i).learnset.overheat = learnset.overheat.push('6T');
					} else {
						this.modData('Learnsets', i).learnset.overheat = ['6T'];
					}
				}
				//All fairy types have access to Light of Ruin.
				if (pokemon.types.indexOf('Fairy') > -1) {
					if (learnset.lightofruin) {
						this.modData('Learnsets', i).learnset.lightofruin = learnset.lightofruin.push('6T');
					} else {
						this.modData('Learnsets', i).learnset.lightofruin = ['6T'];
					}
				}
				//All ice types have access to Sheer Cold.
				if (pokemon.types.indexOf('Ice') > -1) {
					if (learnset.overheat) {
						this.modData('Learnsets', i).learnset.sheercold = learnset.sheercold.push('6T');
					} else {
						this.modData('Learnsets', i).learnset.sheercold = ['6T'];
					}
				}
				//All water types have access to Bubble Beam.
				if (pokemon.types.indexOf('Water') > -1) {
					if (learnset.bubblebeam) {
						this.modData('Learnsets', i).learnset.bubblebeam = learnset.bubblebeam.push('6M');
					} else {
						this.modData('Learnsets', i).learnset.bubblebeam = ['6M'];
					}
				}
			}
		}
		//Pidgeot slight buff
		this.modData('Learnsets', 'pidgeot').learnset.hypervoice = ['6L1'];
		this.modData('Learnsets', 'pidgeot').learnset.aurasphere = ['6L1'];
		
		//Fearow slight buff
		this.modData('Learnsets', 'fearow').learnset.bravebird = ['6L1'];
		
		//Give Pika the event moves that it deserves, make volt tackle egg-independent, and add coverage. Do the same for Raichu since it branches off of Pichu.
		let chu = {'pikachu':1, 'pikachucosplay':1, 'pikachurockstar':1, 'pikachubelle':1, 'pikachupopstar':1, 'pikachuphd':1, 'pikachulibre':1, 'raichu':1};
		for (let i in chu) {
			//Overlap the cosplay forms with Pikachu's moveset.
			if (i !== 'pikachu' && i !== 'raichu') this.modData('Learnsets', i).learnset = this.data.Learnsets.pikachu.learnset;
			//Do the thing
			this.modData('Learnsets', i).learnset.extremespeed = ['6L1'];
			this.modData('Learnsets', i).learnset.surf = ['6M'];
			this.modData('Learnsets', i).learnset.fly = ['6M'];
			this.modData('Learnsets', i).learnset.volttackle = ['6L1'];
			this.modData('Learnsets', i).learnset.dynamocannon = ['6L1'];
			this.modData('Learnsets', i).learnset.electricterrain = ['6L1'];
			this.modData('Learnsets', i).learnset.flamethrower = ['6M'];
			this.modData('Learnsets', i).learnset.firepunch = ['6T'];
			this.modData('Learnsets', i).learnset.icepunch = ['6T'];
			this.modData('Learnsets', i).learnset.dazzlinggleam = ['6M'];
			this.modData('Learnsets', i).learnset.moonblast = ['6M'];
			this.modData('Learnsets', i).learnset.icebeam = ['6M'];
			this.modData('Learnsets', i).learnset.blizzard = ['6M'];
			this.modData('Learnsets', i).learnset.focusblast = ['6M'];
			this.modData('Learnsets', i).learnset.poisonjab = ['6M'];
			this.modData('Learnsets', i).learnset.sludgebomb = ['6M'];
			this.modData('Learnsets', i).learnset.surf = ['6M'];
			this.modData('Learnsets', i).learnset.darkpulse = ['6M'];
			this.modData('Learnsets', i).learnset.shadowball = ['6M'];
			this.modData('Learnsets', i).learnset.hypervoice = ['6T'];
			this.modData('Learnsets', i).learnset.stoneedge = ['6M'];
			this.modData('Learnsets', i).learnset.rockslide = ['6M'];
			this.modData('Learnsets', i).learnset.bulkup = ['6M'];
			this.modData('Learnsets', i).learnset.swordsdance = ['6M'];
			this.modData('Learnsets', i).learnset.calmmind = ['6M'];
			this.modData('Learnsets', i).learnset.recover = ['6T'];
		}
		//Now for the bonus ducks.
		this.modData('Learnsets', 'pikachu').learnset.earthquake = ['6M'];
		this.modData('Learnsets', 'pikachu').learnset.earthpower = ['6T'];
		this.modData('Learnsets', 'pikachu').learnset.fissure = ['6T'];
		this.modData('Learnsets', 'pikachu').learnset.heavenscrack = ['6L1'];
		this.modData('Learnsets', 'pikachucosplay').learnset.earthquake = ['6M'];
		this.modData('Learnsets', 'pikachucosplay').learnset.earthpower = ['6T'];
		this.modData('Learnsets', 'pikachucosplay').learnset.fissure = ['6T'];
		this.modData('Learnsets', 'pikachucosplay').learnset.heavenscrack = ['6L1'];
		this.modData('Learnsets', 'pikachurockstar').learnset.meteormash = ['6L1'];
		this.modData('Learnsets', 'pikachurockstar').learnset.ironhead = ['6T'];
		this.modData('Learnsets', 'pikachurockstar').learnset.flashcannon = ['6M'];
		this.modData('Learnsets', 'pikachurockstar').learnset.bloodthirstyblade = ['6L1'];
		this.modData('Learnsets', 'pikachubelle').learnset.iciclecrash = ['6L1'];
		this.modData('Learnsets', 'pikachubelle').learnset.iceshard = ['6T'];
		this.modData('Learnsets', 'pikachubelle').learnset.sheercold = ['6T'];
		this.modData('Learnsets', 'pikachubelle').learnset.perfectglacialist = ['6L1'];
		this.modData('Learnsets', 'pikachupopstar').learnset.drainingkiss = ['6L1'];
		this.modData('Learnsets', 'pikachupopstar').learnset.lightofruin = ['6T'];
		this.modData('Learnsets', 'pikachupopstar').learnset.playrough = ['6T'];
		this.modData('Learnsets', 'pikachupopstar').learnset.valkyriearrow = ['6L1'];
		this.modData('Learnsets', 'pikachuphd').learnset.psychic = ['6M'];
		this.modData('Learnsets', 'pikachuphd').learnset.psyshock = ['6M'];
		this.modData('Learnsets', 'pikachuphd').learnset.zenheadbutt = ['6T'];
		this.modData('Learnsets', 'pikachuphd').learnset.genesisnova = ['6L1'];
		this.modData('Learnsets', 'pikachulibre').learnset.flyingpress = ['6L1'];
		this.modData('Learnsets', 'pikachulibre').learnset.closecombat = ['6T'];
		this.modData('Learnsets', 'pikachulibre').learnset.superpower = ['6T'];
		this.modData('Learnsets', 'pikachulibre').learnset.imprisonedstrike = ['6L1'];

		// Happinny
		this.modData('Learnsets', 'happiny').learnset.softboiled = ['6L1'];
		this.modData('Learnsets', 'happiny').learnset.wish = ['6L1'];
		
		// Mimez gets stallz
		this.modData('Learnsets', 'mrmime').learnset.recover = ['6L1'];
		this.modData('Learnsets', 'mrmime').learnset.partingshot = ['6L1'];
		this.modData('Learnsets', 'mrmime').learnset.entrainment = ['6L1'];
		this.modData('Learnsets', 'mrmime').learnset.metalburst = ['6L1'];
		this.modData('Learnsets', 'mrmime').learnset.healbell = ['6L1'];
		this.modData('Learnsets', 'mrmime').learnset.knockoff = ['6T'];
		
		// Aero gets head smash
		this.modData('Learnsets', 'aerodactyl').learnset.headsmash = ['6L1'];

		// Meganium gets Power Whip
		this.modData('Learnsets', 'meganium').learnset.powerwhip = ['6L1'];
		
		// Xatu gets Whirlwind
		this.modData('Learnsets', 'xatu').learnset.whirlwind = ['6L1'];
		
		// Ampharos gets Tail Glow
		this.modData('Learnsets', 'ampharos').learnset.tailglow = ['6L1'];
		
		for (let i in this.data.FormatsData) {
			// Every hidden ability becomes released. Nothing could possibly go wrong™
			this.modData('FormatsData', i).unreleasedHidden = false;
			// Make certain mons OU
			let OUmons = {pikachu:1, pikachurockstar:1, pikachubelle:1, pikachupopstar:1, pikachuphd:1, pikachulibre:1, gengarmega:1, kangaskhanmega:1, blaziken:1, blazikenmega:1, aegislash:1}
			if (i in OUmons) this.modData('FormatsData', i).tier = 'OU';
		}
	},
	//Allow custom mega-evolutions without anything in terms of sprites breaking:
	runMegaEvo: function (pokemon) {
		let template = this.getTemplate(pokemon.canMegaEvo);
		let side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		let foeActive = side.foe.active;
		for (let i = 0; i < foeActive.length; i++) {
			if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}
		
		//Prevent sprites from screwing with our stuff.
		let forbid = {'Venusaur-Mega-X':'Venusaurite X', 'Blastoise-Mega-Y':'Blastoisinite Y', 'Butterfree-Mega':'Butterfrite', 'Fearow-Mega':'Fearowite', 'Raichu-Mega':'Raichuite', 'Machamp-Mega':'Machampite', 'Slowking-Mega':'Slowkingite', 'Mr. Mime-Mega':'Mimezite', 'Meganium-Mega':'Meganiumite', 'Typhlosion-Mega':'Typhlosionite', 'Feraligatr-Mega':'Feraligatrite'};
		if (template.species in forbid) {
			//Case 1: Sprites don't exist
			template = Object.assign({}, template); //Prevent metagame crosstalk.
			template.spriteid = toId(template.baseSpecies);
			template.actualSpecies = template.species;
			template.species = template.species.split('-')[0];
			template.requiredItem = forbid[template.species];
		} else if (template.species === 'Venusaur-Mega-Y') {
			//Case 2: Sprites do exist, but the mega changed.
			template = Object.assign({}, template);
			template.spriteid = 'venusaur-mega';
			template.species = 'Venusaur-Mega';
			template.actualSpecies = 'Venusaur-Mega-Y'; //yes this is venusaur-mega-y
			template.requiredItem = 'Venusaurite Y';
		} else if (template.species === 'Blastoise-Mega-X') {
			//Case 2: Sprites do exist, but the mega changed.
			template = Object.assign({}, template);
			template.spriteid = 'blastoise-mega';
			template.species = 'Blastoise-Mega';
			template.actualSpecies = 'Blastoise-Mega-X';
			template.requiredItem = 'Blastoisinite X';
		}
		pokemon.formeChange(template);
		pokemon.baseTemplate = template; // mega evolution is permanent
		pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
		this.add('detailschange', pokemon, pokemon.details);
		this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
		pokemon.setAbility(template.abilities['0']);
		pokemon.baseAbility = pokemon.ability;
		let changed = {'Blastoise':true, 'Raichu':true, 'Aerodactyl':true, 'Feraligatr':true};
		if (template.actualSpecies in forbid || template.species === 'Venusaur-Mega' || template.baseSpecies in changed) {
			let types = template.types;
			let bTypes = (types.length === 1 || types[1] === 'caw') ? types[0] : types.join('/');
			this.add('-start', pokemon, 'typechange', bTypes, '[silent]');
		}
		if (template.actualSpecies) this.add('-start', pokemon, template.actualSpecies, '[silent]'); //Show the pokemon's actual species

		// Limit one mega evolution
		for (let i = 0; i < side.pokemon.length; i++) {
			side.pokemon[i].canMegaEvo = false;
		}
		return true;
	},
};
