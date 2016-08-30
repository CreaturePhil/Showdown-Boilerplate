'use strict';

exports.BattlePokedex = {
	//%Elcrest
	dragonite: {
		inherit: true,
		basespecies: "Pidgey",
		forme: "Mega",
		formeLetter: "M",
		abilities:{0:"Multiscale"},
	},
        gyarados: {
		inherit: true,
		basespecies: "Pidgey",
		forme: "Rainy",
		formeLetter: "R",
		abilities:{0:"Water Change"},
	},
	dratini: {
		inherit: true,
		otherForms: ["dragonite", "gyarados"],
	},
};
