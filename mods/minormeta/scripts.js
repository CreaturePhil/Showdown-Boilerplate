exports.BattleScripts = {
	init: function(){
		// Azumarill
		this.modData('Learnsets','azumarill').learnset.zenheadbutt = ['6L1'];
		// Scolipede
		this.modData('Pokedex','scolipede').baseStats.spd = 89;
		this.modData('Learnsets','whirlipede').learnset.rapidspin = ['6L1'];
		// Flygon
		this.modData('Pokedex','flygon').baseStats.atk = 110;
		this.modData('Pokedex','flygon').baseStats.spe = 110;
		this.modData('Learnsets','flygon').learnset.dragondance = ['6L1'];
		this.modData('Learnsets','flygon').learnset.ironhead = ['6L1'];
		// Moltres
		this.modData('Pokedex','moltres').abilities[1] = "Regenerator";
		// Arcanine
		this.modData('Pokedex','arcanine').types = ["Fire","Normal"];
		this.modData('Pokedex','arcanine').baseStats.atk = 115;
		// Victini
		this.modData('Pokedex','victini').abilities["H"] = "Flame Body";
		this.modData('Learnsets','victini').learnset.morningsun = ['6L1'];
		this.modData('Learnsets','victini').learnset.playrough = ['6L1'];
		// greninja
		this.modData('Learnsets','greninja').learnset.brickbreak = ['6L1'];
		this.modData('Learnsets','greninja').learnset.knockoff = ['6L1'];
		// heracross
		this.modData('Learnsets','heracross').learnset.healorder = ['6L1'];
		// milotic
		this.modData('Pokedex','milotic').types = ["Water","Fairy"];
		this.modData('Learnsets','milotic').learnset.moonblast = ['6L1'];
		// pikachu
		this.modData('Pokedex','pikachu').types = ["Electric","Fairy"];
		this.modData('Pokedex','pikachu').baseStats.atk = 65;
		this.modData('Pokedex','pikachu').baseStats.spe = 100;
		this.modData('Learnsets','pikachu').learnset.moonblast = ['6L1'];
		this.modData('Learnsets','pikachu').learnset.playrough = ['6L1'];
		// raichu
		this.modData('Pokedex','raichu').baseStats.atk = 100;
		this.modData('Pokedex','raichu').types = ["Electric","Fairy"];
		// wobbuffett
		this.modData('Learnsets','wobbuffet').learnset.recover = ['6L1'];
		// jirachi
		this.modData('Pokedex','jirachi').types = ["Steel","Fairy"];
		this.modData('Learnsets','jirachi').learnset.playrough = ['6L1'];
		this.modData('Learnsets','jirachi').learnset.moonblast = ['6L1'];
		// rampardos
		this.modData('Pokedex','rampardos').types = ["Rock","Dragon"];
		this.modData('Learnsets','rampardos').abilities[0] = 'Sand Rush';
		this.modData('Learnsets','rampardos').learnset.dragonclaw = ['6L1'];
	}
}
