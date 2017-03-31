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
        types: ["Grass"],
        baseStats: {hp: 88, atk: 93, def: 110, spa: 70, spd: 98, spe: 76},
        abilities: {0: "Overgrow", H: "Sap Sipper"},
        evos: ["treenomian"],
        prevo: "branchion",
	},
  
};
