'use strict';

exports.BattleAbilities = {
  	"rock": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (foeactive[i].ability.id === 'scissors') { 
                                        foeactive[i].hp = 0;
                                }
				if (foeactive[i].ability.id === 'rock') {
                                        foeactive[i].hp = 0;
                                        this.hp = 0;
				}
			}
		},
		id: "rock",
		name: "Rock",
		rating: 3.5,
		num: 1000,
	  },
  	  "paper": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (foeactive[i].ability.id === 'rock') { 
                                        foeactive[i].hp = 0;
                                }
				if (foeactive[i].ability.id === 'paper') {
                                        foeactive[i].hp = 0;
                                        this.hp = 0;
				}
			}
		},
		id: "paper",
		name: "Paper",
		rating: 3.5,
		num: 1001,
	},
  	"scissors": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (foeactive[i].ability.id === 'paper') { 
                                        foeactive[i].hp = 0;
                                }
				if (foeactive[i].ability.id === 'scissors') {
                                        foeactive[i].hp = 0;
                                        this.hp = 0;
				}
			}
		},
		id: "scissors",
		name: "Scissors",
		rating: 3.5,
		num: 1002,
	},
};
