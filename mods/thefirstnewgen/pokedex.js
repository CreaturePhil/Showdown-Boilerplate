'use strict';

exports.BattlePokedex = {
	/* For pokemon with two abilities use
	   abilities: {0: "Ability1Name", H: "Ability2Name"},
	   For a pokemon with three abilities use
	   abilities: {0: "Ability1Name", 1: "Ability2Name", H: "Ability3Name"}, */
	tubi: {
		num: 8001,
		species: "Tubi",
		types: ["Grass"],
		baseStats: {hp: 43, atk: 70, def: 31, spa: 55, spd: 55, spe: 64},
		abilities: {0: "Overgrow", H: "Moxie"},
	},
	shruber: {
		num: 8002,
		species: "Shrubber",
		types: ["Grass", "Ground"],
		baseStats: {hp: 55, atk: 85, def: 45, spa: 79, spd: 65, spe: 86},
		abilities: {0: "Overgrow", H: "Moxie"},
	},
	fungarai: {
		num: 8003,
		species: "Fungarai",
		types: ["Grass", "Ground"],
		baseStats: {hp: 70, atk: 125, def: 55, spa: 100, spd: 70, spe: 110},
		abilities: {0: "Overgrow", H: "Moxie"},
	},
	shelidillo: {
		num: 8004,
		species: "Shelidillo",
		types: ["Fire"],
		baseStats: {hp: 50, atk: 48, def: 72, spa: 52, spd: 52, spe: 44},
		abilities: {0: "Blaze", H: "Filter"},
	},
	metadillo: {
		num: 8005,
		species: "Metadillo",
		types: ["Fire", "Steel"],
		baseStats: {hp: 70, atk: 65, def: 95, spa: 75, spd: 60, spe: 50},
		abilities: {0: "Blaze", H: "Filter"},
	},
	steelicillo: {
		num: 8006,
		species: "Steelicillo",
		types: ["Fire", "Steel"],
		baseStats: {hp: 92, atk: 75, def: 110, spa: 110, spd: 75, spe: 68},
		abilities: {0: "Blaze", H: "Filter"},
	},
	linnual: {
		num: 8007,
		species: "Linnual",
		types: ["Water"],
		baseStats: {hp: 66, atk: 56, def: 56, spa: 48, spd: 56, spe: 36},
		abilities: {0: "Torrent", H: "Rain Dish"},
	},
	dontidahl: {
		num: 8008,
		species: "Donitidahl",
		types: ["Water", "Ice"],
		baseStats: {hp: 95, atk: 75, def: 70, spa: 65, spd: 70, spe: 40},
		abilities: {0: "Torrent", H: "Rain Dish"},
	},
	dorshellical: {
		num: 8009,
		species: "Dorshellical",
		types: ["Water", "Ice"],
		baseStats: {hp: 124, atk: 105, def: 90, spa: 80, spd: 85, spe: 46},
		abilities: {0: "Torrent", H: "Rain Dish"},
	},
	mantiprey: {
		num: 8010,
		species: "Mantiprey",
		types: ["Bug"],
		baseStats: {hp: 40, atk: 60, def: 30, spa: 20, spd: 30, spe: 60},
		abilities: {0: "Swarm", 1: "Hidden", H: "Unnerve"},
	},
	mantislash: {
		num: 8011,
		species: "Mantislash",
		types: ["Bug", "Dark"],
		baseStats: {hp: 45, atk: 95, def: 30, spa: 20, spd: 30, spe: 95},
		abilities: {0: "Swarm", 1: "Hidden", H: "Unnerve"},
	},
	mantisassin: {
		num: 8012,
		species: "Mantisassin",
		types: ["Bug", "Dark"],
		baseStats: {hp: 50, atk: 143, def: 35, spa: 25, spd: 35, spe: 132},
		abilities: {0: "Swarm", 1: "Hidden", H: "Unnerve"},
	},
	pixinga: {
		num: 8013,
		species: "Pixinga",
		types: ["Flying"],
		baseStats: {hp: 45, atk: 40, def: 40, spa: 55, spd: 46, spe: 60},
		abilities: {0: "Misty Surge", 1: "Tangled Feet", H: "Unaware"},
	},
	pixingillo: {
		num: 8014,
		species: "Pixingillo",
		types: ["Flying", "Fairy"],
		baseStats: {hp: 80, atk: 45, def: 50, spa: 80, spd: 65, spe: 70},
		abilities: {0: "Misty Surge", 1: "Tangled Feet", H: "Unaware"},
	},
	flamingairy: {
		num: 8015,
		species: "Flamingairy",
		types: ["Flying", "Fairy"],
		baseStats: {hp: 104, atk: 49, def: 78, spa: 90, spd: 10, spe: 79},
		abilities: {0: "Misty Surge", 1: "Tangled Feet", H: "Unaware"},
	},
};
