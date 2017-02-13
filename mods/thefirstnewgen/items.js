'use strict';
exports.BattleItems = {
        "fungariumz": {
        id: "fungariumz",
        name: "Fungarium-Z",
        onTakeItem: false,
        zMove: "7-Slash Bushido Assault",
        zMoveFrom: "Earthen Katana",
        zMoveUser: ["Fungarai"],
      },
      "steelicilliumz": {
        id: "steelicilliumz",
        name: "Steelicillium-Z",
        onTakeItem: false,
        zMove: "Molten Steel Blast",
        zMoveFrom: "Scorch Shot",
        zMoveUser: ["Steelicillo"], 
      },
      "dorshelliumz": {
        id: "dorshelliumz",
        name: "Dorshellium-Z",
        onTakeItem: false,
        zMove: "Petrifying Glacier Charge",
        zMoveFrom: "Arctic Blade",
        zMoveUser: ["Dorshellical"], 
      },
      "pyrominiumz": {
        id: "pyrominiumz",
        name: "Pyrominium-Z",
        onTakeItem: false,
        zMove: "Incinerating Antler Lunge",
        zMoveFrom: "Antler Scorch",
        zMoveUser: ["Pyromoose"], 
      },    
	"snorlaxite": {
		id: "snorlaxite",
		name: "Snorlaxite",
		megaStone: "Snorlax-Mega",
		megaEvolves: "Snorlax",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		desc: "If holder is a Snorlax, this item allows it to Mega Evolve in battle.",
	},
	
        "allrounderbadge": { /* Not Sure about this :P */
		id: "allrounderbadge",
		name: "All-Rounder Badge",
		onModifyAtkPriority: 1,
		onModifyAtk: function (atk) {
			return this.chainModify(1.05);
		},
                onModifyDefPriority: 1,
		onModifyDef: function (def) {
			return this.chainModify(1.05);
		},
                onModifySpAPriority: 1,
		onModifySpA: function (spa) {
			return this.chainModify(1.05);
		},
                onModifySpDPriority: 1,
		onModifySpD: function (spd) {
			return this.chainModify(1.05);
		},
                onModifySpePriority: 1,
		onModifySpe: function (spe) {
			return this.chainModify(1.05);
		},
                
	}, 
	/* Adaptibility Orb, Moon Shard*/
        "assaultshield": {
		id: "assaultshield",
		name: "assault Shield",
		onModifyDefPriority: 1,
		onModifyDef: function (def) {
			return this.chainModify(1.5);
		},
		onDisableMove: function (pokemon) {
			let moves = pokemon.moveset;
			for (let i = 0; i < moves.length; i++) {
				if (this.getMove(moves[i].move).category === 'Status') {
					pokemon.disableMove(moves[i].id);
				}
			}
		},
	},
};
