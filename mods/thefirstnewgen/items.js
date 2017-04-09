'use strict';

exports.BattleItems = {
	"fungariumz": {
		id: "fungariumz",
		name: "Fungarium-Z",
		onTakeItem: false,
		gen: 7,
		zMove: "7-Slash Bushido Assault",
		zMoveFrom: "Earthen Katana",
		zMoveUser: ["Fungarai"],
	},
	"steelicilliumz": {
		id: "steelicilliumz",
		name: "Steelicillium-Z",
		onTakeItem: false,
		gen: 7,
		zMove: "Molten Steel Blast",
		zMoveFrom: "Scorch Shot",
		zMoveUser: ["Steelicillo"],
	},
	"dorshelliumz": {
		id: "dorshelliumz",
		name: "Dorshellium-Z",
		onTakeItem: false,
		gen: 7,
		zMove: "Petrifying Glacier Charge",
		zMoveFrom: "Arctic Blade",
		zMoveUser: ["Dorshellical"],
	},
	"pyrominiumz": {
		id: "pyrominiumz",
		name: "Pyrominium-Z",
		onTakeItem: false,
		gen: 7,
		zMove: "Incinerating Antler Lunge",
		zMoveFrom: "Antler Scorch",
		zMoveUser: ["Pyromoose"],
	},
	"snorlaxite": {
		id: "snorlaxite",
		name: "Snorlaxite",
		megaStone: "Snorlax-Mega",
		megaEvolves: "Snorlax",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Snorlax, this item allows it to Mega Evolve in battle.",
	},
	"knyffinite": {
		id: "knyffinite",
		name: "Knyffinite",
		megaStone: "Knyffe-Mega",
		megaEvolves: "Knyffe",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Knyffe, this item allows it to Mega Evolve in battle.",
	},
	"carnivite": {
		id: "carnivite",
		name: "Carnivite",
		megaStone: "Carnivine-Mega",
		megaEvolves: "Carnivine",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Carnivine, this item allows it to Mega Evolve in battle.",
	},
	"allrounderbadge": { 
		id: "allrounderbadge",
		name: "All-Rounder Badge",
		fling: {
			basePower: 40,
		},
		onModifyAtkPriority: 2,
		onModifyAtk: function(atk, pokemon) {
			return this.chainModify(1.05);
		},
		onModifyDefPriority: 2,
		onModifyDef: function(def, pokemon) {
			return this.chainModify(1.05);
		},
		onModifySpAPriority: 2,
		onModifySpA: function(spa, pokemon) {
			return this.chainModify(1.05);
		},
		onModifySpDPriority: 2,
		onModifySpD: function(spd, pokemon) {
			return this.chainModify(1.05);
		},
		onModifySpePriority: 2,
		onModifySpe: function(spe, pokemon) {
			return this.chainModify(1.05);
		},

	},
	/* Adaptibility Orb, Moon Shard*/
	"assaultshield": {
		id: "assaultshield",
		name: "assault Shield",
		onModifyDefPriority: 1,
		onModifyDef: function(def) {
			return this.chainModify(1.5);
		},
		onDisableMove: function(pokemon) {
			let moves = pokemon.moveset;
			for (let i = 0; i < moves.length; i++) {
				if (this.getMove(moves[i].move).category === 'Status') {
					pokemon.disableMove(moves[i].id);
				}
			}
		},
	},
};
