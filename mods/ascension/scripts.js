'use strict';

exports.BattleScripts = {
	init: function () {
		this.modData('Pokedex', 'samurott').types = ['Water', 'Fighting'];
		this.modData('Learnsets', 'samurott').learnset.closecombat = ['6L100'];
		this.modData('Learnsets', 'samurott').learnset.focusblast = ['6M'];
		this.modData('Learnsets', 'samurott').learnset.shellsmash = ['6L100'];
    
    		this.modData('Pokedex', 'arcanine').abilities['H'] = 'Desolate Land';
	},
};
