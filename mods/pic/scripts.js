'use strict';

exports.BattleScripts = {    
    init: function()
    	{
    			Object.values(this.data.Abilities).forEach(ability => {
    					this.data.Statuses[ability.id] = ability;
    					this.data.Statuses[ability.id].effectType = "Ability";
    			});
    	},
}
