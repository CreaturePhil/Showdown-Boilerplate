'use strict';

exports.BattleScripts = {
	init: function () {
		this.modData('Pokedex', 'banettemega').types = ['Ghost', 'Dark'];
		this.modData('Learnsets', 'miltank').learnset.rapidspin = ['6T'];
		this.modData('Learnsets', 'aromatisse').types = ['Fairy', 'Poison'];
		this.modData('Learnsets', 'aromatisse').learnset.sludgebomb = ['6T'];
		this.modData('Learnsets', 'jynx').learnset.freezedry = ['6T'];
		this.modData('Pokedex', 'mismagius').types = ['Ghost', 'Fairy'];
		this.modData('Pokedex', 'mismagius').abilities['1'] = 'Magic Bounce';
		this.modData('Pokedex', 'floatzel').abilities['1'] = 'Sheer Force';
		this.modData('Pokedex', 'audinomega').abilities['0'] = 'Natural Cure';
		this.modData('Learnsets', 'audino').learnset.softboiled = ['6T'];
		this.modData('Pokedex', 'gastrodon').abilities['H'] = 'Poison Heal';
		this.modData('Learnsets', 'phione').learnset.tailglow = ['6T'];
		this.modData('Pokedex', 'lilligant').abilities['1'] = 'Flower Veil';
		this.modData('Pokedex', 'articuno').abilities['1'] = 'Magic Guard';
		this.modData('Learnsets', 'accelgor').learnset.stickyweb = ['6T'];
		this.modData('Pokedex', 'samurott').abilities['1'] = 'Water Veil';
		this.modData('Learnsets', 'piloswine').learnset.recover = ['6T'];
		this.modData('Learnsets', 'cofagrigus').learnset.recover = ['6T'];
		this.modData('Learnsets', 'cofagrigus').learnset.stealthrock = ['6T'];
		this.modData('Learnsets', 'hoopa').learnset.batonpass = ['6T'];
		this.modData('Pokedex', 'drapion').abilities['1'] = 'Tough Claws';
		this.modData('Pokedex', 'gourgeist').abilities['1'] = 'Prankster';
		this.modData('Pokedex', 'gourgeistsmall').abilities['1'] = 'Prankster';
		this.modData('Pokedex', 'gourgeistlarge').abilities['1'] = 'Prankster';
		this.modData('Pokedex', 'gourgeistsuper').abilities['1'] = 'Prankster';
		this.modData('Learnsets', 'typhlosion').learnset.earthpower = ['6T'];
		this.modData('Learnsets', 'lanturn').learnset.wish = ['6T'];
		this.modData('Learnsets', 'aerodactyl').learnset.uturn = ['6T'];
		this.modData('Learnsets', 'rotommow').learnset.gigadrain = ['6T'];
		this.modData('Pokedex', 'kangaskhan').types = ['Normal', 'Fighting'];
		this.modData('Pokedex', 'typhlosion').types = ['Fire', 'Ground'];
	},
};
