'use strict';

exports.BattlePokedex = {
  leafien: {
        num: 1000001,
        species: "Leafien",
        types: ["Grass"],
        baseStats: {hp: 38, atk: 32, def: 40, spa: 52, spd: 28, spe: 40},
        abilities: {0: "Overgrow", H: "Sap Sipper"},
        evos: ["branchion"],
	},
  branchion: {
        num: 1000002,
        species: "Branchion",
        types: ["Grass"],
        baseStats: {hp: 53, atk: 48, def: 60, spa: 55, spd: 43, spe: 50},
        abilities: {0: "Overgrow", H: "Sap Sipper"},
        evos: ["treenomian"],
        prevo: "branchion",
	},
  treenomian: {
        num: 1000003,
        species: "Treenomian",
        types: ["Grass", "Ground"],
        baseStats: {hp: 88, atk: 93, def: 110, spa: 70, spd: 98, spe: 76},
        abilities: {0: "Overgrow", H: "Sap Sipper"},
        evos: ["treenomian"],
        prevo: "branchion",
	},
  laviniou: {
        num: 1000004,
        species: "Laviniou",
        types: ["Fire"],
        baseStats: {hp: 30, atk: 50, def: 38, spa: 56, spd: 40, spe: 40},
        abilities: {0: "Blaze", H: "Sheer Force"},
        evos: ["marsminian"],
	},
  marsminian: {
        num: 1000005,
        species: "Marsminian",
        types: ["Fire","Steel"],
        baseStats: {hp: 70, atk: 76, def: 60, spa: 75, spd: 62, spe: 71},
        abilities: {0: "Blaze", H: "Sheer Force"},
        evos: ["volcanolion"],
        prevo: "laviniou",
	},
  volcanolion: {
        num: 1000006,
        species: "Volcanolion",
        types: ["Fire","Steel"],
        baseStats: {hp: 75, atk: 110, def: 80, spa: 105, spd: 73, spe: 99},
        abilities: {0: "Blaze", H: "Sheer Force"},
        prevo: "marsminian",
	},
  
};
