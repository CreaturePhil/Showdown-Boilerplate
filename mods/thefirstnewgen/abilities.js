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
	"boilingpoint": {
		shortDesc: "When hit by a fire type move, raises Atk,Spa,Spe by 1, but takes 2x damage from it.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa:1, atk:1, spe:1})) {
					this.add(target, '[msg]', '[from] ability: Boiling Point');
					}
				return this.effectData.target;
			}
		},		
		onSourceModifyDamage: function (damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			return this.chainModify(mod);
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
	"draconiclight": { 
		shortDesc: "1.5x Dragon moves and 1/2 damage from fire, water, electric, and grass, but 2x from Dragon",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('DraconicLight boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.type === 'Fire' || move.type === 'Water' || move.type === 'Electric' || move.type === 'Grass') {
				this.debug('Draconic Light weaken');
				return this.chainModify(0.5);
			}
			let mod = 1;
			if (move.type === 'Dragon') mod *= 2;
			return this.chainModify(mod);
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
	"giggawattburst": {
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Electric attacks do 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Electric' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Giggawatt Burst boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Electric' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Giggawatt Burst boost');
				return this.chainModify(1.5);
			}
		},
		id: "giggawattburst",
		name: "Giggawatt Burst",
		rating: 3,
	},
	"gravity": {
		shortDesc: "This Pokemon can Hit flying types with Ground type moves",
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Flying'] = true;
			}
		},
		id: "gravity",
		name: "Gravity",
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
			if (source.type === 'Flying') mod *= 3 / 4;
			return this.chainModify(mod);
		},
		id: "scarecrow",
		name: "Scarecrow",
		rating: 4,
	},
	"intoxicate": {
		desc: "This Pokemon's Normal-type moves become Poison type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Poison type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Poison';
				if (move.category !== 'Status') pokemon.addVolatile('intoxicate');
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
	"quickclaws": {
		shortDesc: "Any attacks with 70 bp or less get a +1 to priority, but deal 1/4 Less Damage.",
		onModifyPriority: function(priority, pokemon, target, move, basePower) {
			if (move.BasePower < 71) return priority + 1;
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.BasePower < 71) {
				this.debug('Quick Claws modifier');
				return this.chainModify(0.75);
			}
		},
		id: "quickclaws",
		name: "Quick Claws",
		rating: 3,
	},
	"lockjaw": {
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be paralyzed.",
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.trySetStatus('par', target);
				}
			}
		},
		id: "lockjaw",
		name: "Lock Jaw",
		rating: 2,
	},
	"macho": {
		shortDesc: "This pokemon's attack and defence are boosted by 1.2x",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(1.2);
		},
		onModifyDefPriority: 5,
		onModifyDef: function (def) {
			return this.chainModify(1.2);
		},
		id: "macho",
		name: "Macho",
		rating: 4,
	},
	"meltingpoint": {
		shortDesc: "Turns Steel Type Moves into Fire type Moves.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Steel' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Fire';
				if (move.category !== 'Status') pokemon.addVolatile('meltingpoint');
			}
		},
		id: "meltingpoint",
		name: "Melting Point",
		rating: 4,
	},
};
