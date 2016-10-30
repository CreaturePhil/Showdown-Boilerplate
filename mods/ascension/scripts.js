'use strict';

exports.BattleScripts = {
	init: function () {
		this.modData('Pokedex', 'samurott').types = ['Water', 'Fighting'];
		this.modData('Learnsets', 'samurott').learnset.closecombat = ['6L100'];
		this.modData('Learnsets', 'samurott').learnset.focusblast = ['6M'];
		this.modData('Learnsets', 'samurott').learnset.shellsmash = ['6L100'];
    
    		this.modData('Pokedex', 'arcanine').abilities['H'] = 'Desolate Land';
				
		this.modData('Pokedex', 'milotic').types = ['Water', 'Dragon'];
    		this.modData('Pokedex', 'milotic').abilities['H'] = 'Poison Heal';
		
		this.modData('Learnsets', 'jynx').learnset.quiverdance = ['6L100'];	
    		this.modData('Pokedex', 'jynx').abilities['1'] = 'Dazzling';
				
		this.modData('Learnsets', 'mew').learnset.sketch = ['6E'];
		this.modData('Pokedex', 'alomomola').types = ['Water', 'Fairy'];
     		this.modData('Pokedex', 'alomomola').abilities['H'] = 'Primordial Sea';
		this.modData('Pokedex', 'banettemega').abilities['1'] = 'Shadow Tag';
	},
};
