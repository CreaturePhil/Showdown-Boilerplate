'use strict';

exports.BattleAbilities = {
	"arachnate": {
		desc: "This Pokemon's Normal-type moves become Bug type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Bug type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Bug';
				if (move.category !== 'Status') pokemon.addVolatile('arachnate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		id: "arachnate",
		name: "Arachnate",
		rating: 4,
	},
	"badluckbringer": {
		shortDesc: "This Pokemon's critical hit ratio is raised by 1 stage and cannot be struck by a critical hit.",
		onModifyCritRatio: function(critRatio) {
			return critRatio + 1;
		},
		onCriticalHit: false,
		id: "badluckbringer",
		name: "Bad Luck Bringer",
		rating: 1.5,
	},
	"burrow": {
		shortDesc: "This Pokemon's Ground-type moves have their priority increased by 1.",
		onModifyPriority: function(priority, pokemon, target, move) {
			if (move && move.type === 'Ground') return priority + 1;
		},
		id: "burrow",
		name: "Burrow",
		rating: 3,
	},
	"draconiclight": { /* Will code the rst of it later */
		shortDesc: "This Pokemon's Dragon-type attacks have their power multiplied by 1.5.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('DraconicLight boost');
				return this.chainModify(1.5);
			}
		},
		id: "draconiclight",
		name: "Draconic Light",
		rating: 3,
	},
	"frostblood": {
		shortDesc: "This Pokemon's Ice-type attacks have their power multiplied by 1.5.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Frsotblood boost');
				return this.chainModify(1.5);
			}
		},
		id: "frostblood",
		name: "Frostblood",
		rating: 3,
	},
	"scarecrow": {
		shortDesc: "This Pokemon does 1.5 times more damage to and recieves 3/4 damage from flying types.",
		onBasePowerPriority: 0,
		onBasePower: function(basePower, attacker, target, move) {
			if (target.type === 'Flying') {
				this.debug('Scarecrow boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyDamage: function(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Flying') mod *= 3 / 4;
			return this.chainModify(mod);
		},
	},
	"intoxicate": {
		desc: "This Pokemon's Normal-type moves become Poison type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Poison type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Poison';
				if (move.category !== 'Status') pokemon.addVolatile('arachnate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		id: "intoxicate",
		name: "Intoxicate",
		rating: 4,
	},
};
