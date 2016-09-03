'use strict';

exports.BattleMovedex = {
  	"scald": {
  	  inherit: true,
	  	onModifyMove: function (power, user) {
	  		if (user.template.id === 'simipour') return move.secondaries[i].chance = 100;
	    },
  	},
};
