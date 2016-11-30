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
		this.modData('Learnsets', 'abra').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'kadabra').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'alakazam').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'slowpoke').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'slowbro').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'gastly').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'haunter').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'gengar').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'drowzee').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'hypno').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'exeggcute').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'exeggutor').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'starmie').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'mrmime').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'jynx').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'porygon').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'mewtwo').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'mew').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'natu').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'xatu').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'espeon').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'slowking').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'misdreavus').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'girafarig').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'porygon2').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'stantler').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'smoochum').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'stantler').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'ralts').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'kirlia').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'gardevoir').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'spoink').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'grumpig').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'spinda').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'lunatone').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'solrock').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'baltoy').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'claydol').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'shuppet').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'banette').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'kecleon').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'duskull').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'dusclops').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'chimecho').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'jirachi').learnset.trickroom = ['3L1'];
		this.modData('Learnsets', 'deoxys').learnset.trickroom = ['3L1'];
	},
};
