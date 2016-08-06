'use strict';

exports.BattleScripts = {
	inherit: 'gen5',
	gen: 3,
	init: function () {
		for (let i in this.data.Pokedex) {
			delete this.data.Pokedex[i].abilities['H'];
		}
		let specialTypes = {Fire:1, Water:1, Grass:1, Ice:1, Electric:1, Dark:1, Psychic:1, Dragon:1};
		let newCategory = '';
		for (let i in this.data.Movedex) {
			if (this.data.Movedex[i].category === 'Status') continue;
			newCategory = specialTypes[this.data.Movedex[i].type] ? 'Special' : 'Physical';
			if (newCategory !== this.data.Movedex[i].category) {
				this.modData('Movedex', i).category = newCategory;
			}
		}
		this.modData('Learnsets', 'butterfree').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'beedrill').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'pidgey').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'pidgeotto').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'pidgeot').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'rattata').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'raticate').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'spearow').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'fearow').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'zubat').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'golbat').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'venomoth').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'meowth').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'persian').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'mankey').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'primeape').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'farfetchd').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'scyther').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'articuno').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'zapdos').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'moltres').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'mew').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'sentret').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'furret').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'ledyba').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'ledian').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'crobat').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'natu').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'xatu').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'hoppip').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'skiploom').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'jumpluff').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'aipom').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'yanma').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'gligar').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'scizor').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'celebi').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'beautifly').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'dustox').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'taillow').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'swellow').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'wingull').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'pelipper').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'masquerain').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'ninjask').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'volbeat').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'vibrava').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'flygon').learnset.uturn = ['3L1'];
		this.modData('Learnsets', 'jirachi').learnset.uturn = ['3L1'];
	},
};
