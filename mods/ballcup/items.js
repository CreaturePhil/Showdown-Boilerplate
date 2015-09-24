exports.BattleItems = {
	"pokeball":{
		inherit: true,
		desc: "At the end of every turn, holder restores 1/16 of its max HP.",
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp / 16);
		},
	},
	"greatball":{
		inherit: true,
		desc: "Holder's attacks have 1.2x power.",
		onBasePowerPriority: 6,
		onBasePower: function (basePower, user, target, move) {
			return this.chainModify(1.2);
		},
	},
	"ultraball":{
		inherit: true,
		desc: "The accuracy of attacks by the holder is 1.2x.",
		onModifyMove: function (move) {
			if (typeof move.accuracy === 'number') {
				move.accuracy *= 1.2;
			}
		},
	},
	"masterball":{
		inherit: true,
		desc: "Holder's critical hit ratio is boosted by 1.",
		onModifyMove: function (move) {
			move.critRatio += 1;
		},
	},
	"safariball":{
		inherit: true,
		desc: "Increases holders stats by 1.2x but it skips every other turn instead of using a move.",
		onModifyAtkPriority: 1,
		onModifyAtk: function (atk) {
			return this.chainModify(1.2);
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def) {
			return this.chainModify(1.2);
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa) {
			return this.chainModify(1.2);
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd) {
			return this.chainModify(1.2);
		},
		onModifySpe: function (speMod) {
			return this.chain(speMod, 1.2);
		},
		onBeforeMove: function (pokemon, target, move) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant', pokemon, 'item: Safari Ball', move);
				return false;
			}
			pokemon.addVolatile('truant');
		},
	},
	"levelball":{
		inherit: true,
		desc: "This Pokemon moves will always go last",
		onModifyPriority: function (priority) {
			return -8;
		},
	},
	"lureball":{
		inherit: true,
		desc: "Water Types have their speed increased by x1.2",
		onModifySpe: function (speMod, pokemon) {
			if (pokemon.hasType('Water')){
				return this.chain(speMod, 1.2);
			}
		},
	},
	"moonball":{
		inherit: true,
		desc: "If the holder is a Fairy-type, all stats get increased by 1.1x",
		onModifyAtkPriority: 1,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.hasType('Fairy')){
				return this.chainModify(1.1);
			}
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (pokemon.hasType('Fairy')){
				return this.chainModify(1.1);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.hasType('Fairy')){
				return this.chainModify(1.1);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.hasType('Fairy')){
				return this.chainModify(1.1);
			}
		},
		onModifySpe: function (speMod, pokemon) {
			if (pokemon.hasType('Fairy')){
				return this.chain(speMod, 1.1);
			}
		}
	},
	"friendball":{
		inherit: true,
		desc: "This pokemon's happiness is increased by 50",
		onModifyPokemon: function (pokemon) {
			pokemon.happiness += 50;
		}
	},
	"loveball":{
		inherit: true,
		desc: "If the opposing Pokemon is infatuated, moves do x1.5 more power.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, target, pokemon) {
			if (target.volatiles['attract']) {
				return this.chainModify(1.5);
			}
		}
	},
	"heavyball":{
		inherit:true,
		desc: "Increases the Pokemon's weight by 50%",
		onModifyPokemon: function (pokemon) {
			pokemon.weightkg *= 1.5;
		},
	},
	"fastball":{
		inherit:true,
		desc: "When switched in, the Pokemon's first move will always go first.",
		effect: {
			duration: 1,
			onModifyPriority: function (priority, pokemon, target, move) {
				if (move) return 7;
			},
		}
	},
	"sportball":{
		inherit:true,
		desc: "All Physical Attacks get x1.5 but has Special Attacks x0.5",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.category === 'Physical') return this.chainModify(1.5);
			else if (move.category === 'Special') return this.chainModify(0.5);
		}, 
	},
	"premierball":{
		inherit:true,
		desc: "All Special Attacks get x1.5 but has Physical Attacks x0.5",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.category === 'Special') return this.chainModify(1.5);
			else if (move.category === 'Physical') return this.chainModify(0.5);
		},
	},
	"repeatball":{
		inherit:true,
		desc: "Moves that hit multiple times have their power increased by 5.",
		onBasePowerPriority: 8,
		basePowerCallBack: function (target, source, move) {
			if (move.multihit && move.multihit.length) {
				return move.basePower + 5;
			}
		},
	},
	"timerball":{
		inherit:true,
		desc: "After being in for 5 turns, this pokemon's speed stat is increased to +2",
		effect: {
			duration: 5,
			onStart: function (pokemon){
				pokemon.addVolatile('timerball');
			},
			onEnd: function (pokemon) {
				pokemon.boost({spe:2});
				pokemon.removeVolatile('timerball');
			}
		}
	},
	"nestball": {
		inherit: true,
		desc: "If holder's species can evolve, its Defense and Sp. Def are 1.5x.",
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			if (pokemon.baseTemplate.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.baseTemplate.nfe) {
				return this.chainModify(1.5);
			}
		},
	},
	"diveball": {
		inherit: true,
		desc: "Prevents burns on the user",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.status && pokemon.status === 'brn'){
				pokemon.cureStatus();
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'brn') return false;
		},
	},
	"luxuryball":{
		inherit: true,
		desc: "Increases Defense and Special Defense by x1.5, lowers Attack and Special Attack x0.5",
		onModifyAtkPriority: 1,
		onModifyAtk: function (atk) {
			return this.chainModify(0.5);
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def) {
			return this.chainModify(1.5);
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa) {
			return this.chainModify(0.5);
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd) {
			return this.chainModify(1.5);
		},
	},
	"healball":{
		inherit: true,
		desc: "Holder heals 1/4 of its max HP when it switches out.",
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 4);
		},
	},
	"quickball":{
		inherit: true,
		desc: "Speed is increased by x1.2",
		onModifySpe: function (speMod) {
			return this.chain(speMod, 1.2);
		},
	},
	"cherishball":{
		inherit: true,
		desc: "Increases Defence by x1.2",
		onModifyDef: function (def) {
			return this.chainModify(1.2);
		},
	},
	"duskball":{
		inherit: true,
		desc: "If the pokemon is a Ghost or Dark type, it has increased special attack x1.2",
		onModifySpAPriority: 1,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.hasType('Ghost') || pokemon.hasType('Dark')){
				return this.chainModify(1.2);
			}
		},
	},
	"parkball":{
		inherit: true,
		desc: "Special effects on moves are increased by x1.2",
		onModifyMove: function (move) {
			if (move.secondaries){
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 1.2;
				}
			}
		}
	},
	"dreamball":{
		inherit: true,
		desc: "Move power is increased by x1.5 but has a 20% chance to fall asleep",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			return this.chainModify(1.5);
		},
		onModifyMove: function (move) {
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 20,
				self: {
					status: 'slp'
				}
			});
		},
	}
}
