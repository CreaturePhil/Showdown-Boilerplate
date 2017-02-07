'use strict';

exports.BattleScripts = {
randomFotWTeam: function (side) {
		let fotw = this.getFormat().fotw, team = this.randomTeam(side);
		do {			
			team = this.randomTeam(side);
			team.length = 5;
			for(let i =0;i<5;i++) 
				if(team[i].species === fotw) continue;
			break;
		}
		while(true);
		team.push(this.randomSet(this.getTemplate(fotw)));
		return team;
	},
  };
