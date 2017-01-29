'use strict';

exports.BattleScripts = {
	getCategory: function(move) {
		move = this.getMove(move);
		let cat = move.category;
		if(this.pseudoWeather["wonderroom"]) {
			if(cat === "Special") return "Physical";
			if(cat === "Physical") return "Special";
		}
		return cat || 'Physical';
	},
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
		team.push(randomSet(this.getTemplate(fotw)));
		return team;
	},
};
