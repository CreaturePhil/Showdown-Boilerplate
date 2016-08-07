'use strict';

exports.BattleFormats = {
trademarkclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Trademark Clause: Limit one of each Parting Shot or Baton Pass');
		},
		onValidateTeam: function (team, format) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = toId(team[i].ability);
				if(ability=="partingshot"||ability=="batonpass")
				{
				if (!ability) continue;
				if (ability in abilityTable) {
					if (abilityTable[ability] >= 1) {
						return ["You are limited to only one "+(ability=="partingshot"?"Parting Shot":"Baton Pass")+" by the Trademark Clause.", "(You have more than one " + this.getAbility(ability).name + ")"];
					}
					abilityTable[ability]++;
				
				} else {
					abilityTable[ability] = 1;
				}
				}
			}
		},
	},
	
};
