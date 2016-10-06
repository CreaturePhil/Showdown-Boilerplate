'use strict';

exports.BattleScripts = {    
    init: function()
    	{
			let status_ability = {
				aerilate:true,
				aurabreak:true,
				flashfire:true,
				parentalbond:true,
				pixilate:true,
				refrigerate:true,
				sheerforce:true,
				slowstart:true,
				truant:true,
				unburden:true,
				zenmod:true,
			}
    			Object.values(this.data.Abilities).forEach(ability => {
    				if(ability.id=="trace")
    				{
    					this.data.Statuses["trace"] = {
							onUpdate: function (pokemon) {
								let possibleTargets = [];
								for (let i = 0; i < pokemon.side.foe.active.length; i++) {
									if (pokemon.side.foe.active[i] && !pokemon.side.foe.active[i].fainted) possibleTargets.push(pokemon.side.foe.active[i]);
								}
								while (possibleTargets.length) {
									let rand = 0;
									if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
									let target = possibleTargets[rand];
									let ability = this.getAbility(target.innate);
									let bannedAbilities = {flowergift:1, forecast:1, illusion:1, imposter:1, multitype:1, stancechange:1, trace:1, zenmode:1};
									if (bannedAbilities[target.innate]) {
										possibleTargets.splice(rand, 1);
										continue;
									}
									this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
									pokemon.removeVolatile(pokemon.innate);
									pokemon.innate = ability.id;
									pokemon.addVolatile(ability.id);
									return;
								}
							},
							id: "trace",
							name: "Trace",
							effectType: "Ability",
						}
    				}
				else if(status_ability[ability.id])
				{
					this.data.Statuses[ability.id+"1"] = ability;
					this.data.Statuses[ability.id+"1"].effectType = "Ability";
				}
    				else
    				{
    					this.data.Statuses[ability.id] = ability;
    					this.data.Statuses[ability.id].effectType = "Ability";
    				}
    			});
    	},
}
