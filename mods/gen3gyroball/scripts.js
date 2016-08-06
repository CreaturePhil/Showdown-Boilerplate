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
		this.modData('Learnsets', 'squirtle').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'wartortle').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'blastoise').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'sandshrew').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'sandslash').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'jigglypuff').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'geodude').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'graveler').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'golem').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'magnemite').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'magneton').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'onix').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'voltorb').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'electrode').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'koffing').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'weezing').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'staryu').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'starmie').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'omanyte').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'omastar').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'mew').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'typhlosion').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'pineco').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'forretress').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'steelix').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'qwilfish').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'shuckle').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'magcargo').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'donphan').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'hitmontop').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'miltank').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'torkoal').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'lunatone').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'solrock').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'baltoy').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'claydol').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'glalie').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'metang').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'metagross').learnset.gyroball = ['3L1'];
		this.modData('Learnsets', 'rayquaza').learnset.gyroball = ['3L1'];
	},
};
