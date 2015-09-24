exports.BattleAbilities = {
	"vampiricblade": {
		desc: "When this Pokemon uses a contact move, it will recover 1/6 of it's damage. Liquid Ooze affects this.",
		shortDesc: "1/6 recovery on contact moves.",
		id: "vampiricblade",
		name: "Vampiric Blade",
		onModifyMove: function (move) {
			if(move.isContact) move.drain = [1, 6];
		},
		rating: 4,
		num: -5
	},
	"unadaptable": {
		desc: "This Pokemon's attacks that doesn't recieve STAB hits for 70%",
		shortDesc: "This Pokemon's attacks that doesn't recieve STAB hits for 70%",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if(!move.hasSTAB){
				this.debug('Unadaptable weaken');
				return this.chainModify(0.7);
			}
		},
		id: "unadaptable",
		name: "Unadaptable",
		rating: 2,
		num: -6
	},
	"awareness": {
		desc: "This Pokemon is immune to entry hazards (Stealth Rock, Spikes,...) damage.",
		shortDesc: "This Pokemon is immune to entry hazards damage.",
		id: "awareness",
		name: "Awareness",
		onDamage: function (damage, target, source, effect) {
			var entryHazards = {'stealthrock':1,'spikes':1};
			if (effect && effect.id in entryHazards) {
				return false;
			}
		},
		rating: 4,
		num: -7
	},
	"castrophany": {
		desc: "When this Pokemon uses a sound-based attack, the move's Base Power receives a 50% boost.",
		shortDesc: "This Pokemon's sound-based attack gets boosted by 1.5x",
		onBasePowerPriority: 8,
		onBasePower: function (attacker, defender, move) {
			if (move.isSoundBased) {
				return this.chainModify(1.5);
			}
		},
		id: "castrophany",
		name: "Castrophany",
		rating: 4,
		num: -8
	},
	"gritpower": {
		desc: "When this Pokemon is poisoned (including Toxic), burned, paralyzed or asleep (including self-induced Rest), its Sp. Attack stat receives a 50% boost",
		shortDesc: "If this Pokemon is statused, its Sp. Attack is 1.5x",
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		id: "gritpower",
		name: "Grit Power",
		rating: 4,
		num: -9
	},
	"amplifier": {
		desc: "When this Pokemon uses a sound-based attack, the move's Base Power receives a 30% boost.",
		shortDesc: "User's sound moves deal 1.3x damage",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.isSoundBased) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "amplifier",
		name: "Amplifier",
		rating: 4,
		num: -10
	},
	"awakenedpower": {
		desc: "User's in-game Special Attack stat is doubled. When user uses a move with secondary effects, those secondary effects are guaranteed to activate.",
		shortDesc: "User's Special Attack stat is doubled. When user uses a move with secondary effects, those secondary effects are guaranteed to activate.",
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			return this.chainModify(2);
		},
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('awakenedpower');
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 100;
				}
			}
		},
		id: "awakenedpower",
		name: "Awakened Power",
		rating: 4,
		num: -11
	},
	"bugjuice": {
		desc: "Immunity to Bug. User's HP is healed by 25% when hit by a Bug-type move.",
		shortDesc: "Immunity to Bug. User's HP is healed by 25% when hit by a Bug-type move.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Bug') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]');
				}
				return null;
			}
		},
		id: "bugjuice",
		name: "Bug Juice",
		rating: 4,
		num: -13
	},
	"capacitance": {
		desc: "When user uses a contact move, the opponent has a 30% chance of becoming paralyzed.",
		shortDesc: "When user uses a contact move, the opponent has a 30% chance of becoming paralyzed.",
		onModifyMove: function (move) {
			if (!move || !move.isContact) return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'par'
			});
		},
		id: "capacitance",
		name: "Capacitance",
		rating: 4,
		num: -14
	},
	"corrosion": {
		desc: "This Pokemon has the ability to hit Steel-type Pokemon with Poison-type moves. Effectiveness of these moves takes into account the Steel-type Pokemon's other weaknesses and resistances.",
		shortDesc: "This Pokemon can hit Steel-types with Poison-type moves.",
		onModifyMove: function (move) {
			if (move.type === 'Poison') {
				move.affectedByImmunities = false;
			}
		},
		id: "corrosion",
		name: "Corrosion",
		rating: 4,
		num: -15
	},	
	"pollinate": {
		desc: "This Pokemon's Powder moves have their priority increased by 1.",
		shortDesc: "Gives priority to Powder moves.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move.isPowderMove) return priority + 1;
		},
		id: "pollinate",
		name: "Pollinate",
		rating: 4,
		num: -16
	},
	"bruteforce": {
		desc: "Makes all of this Pokemon's attacks physical.",
		shortDesc: "This Pokemon's moves all become physical.",
		onModifyMove: function (move) {
			if (move.category == 'Special') {
				move.category = 'Physical';
			}
		},
		id: "brute force",
		name: "Brute Force",
		rating: 3,
		num: -17
	},
	"iceage": {
		desc: "Non super-effective damaging moves targeted on this Pokemon become Ice-type attacks.",
		shortDesc: "Non super-effective moves used on this Pokemon become Ice-type.",
		onTryHit: function (target, source, move) {
			if (this.getEffectiveness(move, target) <= 0) {
				move.type = 'Ice';
			}
		},
		id: "iceage",
		name: "Ice Age",
		rating: 3,
		num: -18
	},
	"pollenshield": {
		desc: "If this Pokemon is active while Sunny Day is in effect, its Defense and Special Defense are increased by 50%",
		shortDesc: "If Sunny Day is active, this Pokemon's Defense and Special Defense are increased by 50%.",
		onModifyDef: function (defMod) {
			if (this.isWeather('sunnyday')) {
				return this.chain(defMod, 1.5);
			}
		},
		onModifySpD: function (spdMod) {
			if (this.isWeather('sunnyday')) {
				return this.chain(spdMod, 1.5);
			}
		},
		id: "pollenshield",
		name: "Pollen Shield",
		rating: 2,
		num: -19
	},
	"stormforce": {
		desc: "Raises the power of this Pokemon's Flying, Electric, and Dragon-type moves by 1.3x if the weather is Rainy.",
		shortDesc: "This Pokemon's Flying/Electric/Dragon attacks do 1.3x in Rain.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.isWeather('raindance')) {
				if (move.type === 'Flying' || move.type === 'Electric' || move.type === 'Dragon') {
					this.debug('Storm Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		id: "stormforce",
		name: "Storm Force",
		rating: 2,
		num: -20
	},
	"doppler": {
		desc: "Raises the power of this Pokemon's Water-type moves by 50% in rain, Fire-type moves by 50% in sun, Rock-Type moves by 50% in sandstorm, and Ice-Type moves by 50% in hail.",
		shortDesc: "Raises the power of moves that corresponds with the current weather.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.isWeather('raindance')) {
				if (move.type === 'Water') {
					this.debug('Doppler boost');
					return this.chainModify(1.5);
				}
			};
			if (this.isWeather('sunnyday')) {
				if (move.type === 'Fire') {
					this.debug('Doppler boost');
					return this.chainModify(1.5);
				}
			};
			if (this.isWeather('sandstorm')) {
				if (move.type === 'Rock') {
					this.debug('Doppler boost');
					return this.chainModify(1.5);
				}
			};
			if (this.isWeather('hail')) {
				if (move.type === 'Ice') {
					this.debug('Doppler boost');
					return this.chainModify(1.5);
				}
			}
		},
		id: "doppler",
		name: "Doppler",
		rating: 2,
		num: -20
	},
	"soothingpulse": {
		desc: "When this Pokemon enters the field, Every Pokemon in the user's party is cured of its major status problem..",
		shortDesc: "On switch-in, cures entire team of status.",
		onStart: function (pokemon, source) {
			var side = pokemon.side;
			for (var i = 0; i < side.pokemon.length; i++) {
				side.pokemon[i].status = '';
			}
			this.add('-cureteam', source, '[from] ability: Soothing Pulse');
		},
		id: "soothingpulse",
		name: "Soothing Pulse",
		rating: 4,
		num: -21
	},
	"quickwitted": {
		desc: "This Pokemon's Psychic-type moves have their priority increased by 1.",
		shortDesc: "Gives priority to Psychic-type moves.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Psychic') return priority + 1;
		},
		id: "quickwitted",
		name: "Quick-Witted",
		rating: 4.5,
		num: -22
	},
	"shiver": {
		desc: "When this Pokemon enters the field, the Special Attack stat of each of its opponents lowers by one stage.",
		shortDesc: "On switch-in, this Pokemon lowers adjacent foes' Special Attack by 1.",
		onStart: function (pokemon) {
			var foeactive = pokemon.side.foe.active;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Shiver', '[of] ' + pokemon);
				} else {
					this.add('-ability', pokemon, 'Shiver', '[of] ' + foeactive[i]);
					this.boost({spa: -1}, foeactive[i], pokemon);
				}
			}
		},
		id: "shiver",
		name: "Shiver",
		rating: 3.5,
		num: -23
	},
	"comboartist": {
		desc: "This Pokemon does 50% more damage to targets with lowered Speed.",
		shortDesc: "Does 1.5x damage to slowed targets.",
		onBasePower: function (basePower, attacker, defender, move) {
			if (target.boosts[6] < 0) {
				return this.chainModify(1.5);
			}
		},
		id: "comboartist",
		name: "Combo Artist",
		rating: 3,
		num: -24
	},
	"dimensionalwarp": {
		desc: "When it enters the field. this Pokemon starts the Trick Room effect, or cancels it if it is already in effect.",
		shortDesc: "Uses Trick Room upon field entry.",
		id: "dimensionalwarp",
		name: "Dimensional Warp",
		onStart: function(source) {
			this.useMove('trickroom');
		},
		rating: 4,
		num: -25
	},
	"dreamer": {
		desc: "This Pokemon's Special Attack is increased by 50% when it is asleep, and it can still use moves while asleep.",
		shortDesc: "While asleep, can use moves and has 1.5x Special Attack.",
		onModifySpA: function (spa, pokemon) {
			if (pokemon.status === 'slp') {
				return this.chainModify(1.5);
			}
		},
		//implement move choice in the sleep status itself
		id: "dreamer",
		name: "Dreamer",
		rating: 3,
		num: -26
	},
	"energycrystal": {
		desc: "This Pokemon takes 3/4 damage from special moves. When it is hit by a special move, its Special Attack is boosted by one stage.",
		shortDesc: "Takes 3/4 damage from special moves and raises Special Attack by 1 when hit by a special move.",
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.category === 'Special') {
				this.boost({spa:1});
				return this.chainModify(0.75);
			}
		},
		id: "energycrystal",
		name: "Energy Crystal",
		rating: 3,
		num: -27
	},
	"fireabsorb": {
		desc: "This Pokemon is immune to Fire moves. If hit by a Fire move, it recovers 25% of its max HP.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Fire moves; Fire immunity.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]');
				}
				return null;
			}
		},
		id: "fireabsorb",
		name: "Fire Absorb",
		rating: 3,
		num: -28
	},
	"grounded": {
		desc: "While user is on the field, all Pokemon have their Ground immunities ignored.",
		shortDesc: "All immunities to Ground are ignored while user is active.",
		onAnyModifyPokemon: function(pokemon) {
			pokemon.negateImmunity['Ground'] = true;
		},
		id: "grounded",
		name: "Grounded",
		rating: 3,
		num: -29
	},
	"heatseek": {
		desc: "This Pokemon's Fire moves cannot miss.",
		shortDesc: "This Pokemon's Fire moves cannot miss.",
		onModifyMove: function(move) {
			if (move.type === 'Fire') {
				move.accuracy = true;
			}
		},
		id: "heatseek",
		name: "Heat Seek",
		rating: 3,
		num: -30
	},
	"ignate": {
		desc: "Turns all of this Pokemon's Normal-typed attacks into Fire-typed and deal 1.3x damage. Does not affect Hidden Power.",
		shortDesc: "This Pokemon's Normal moves become Fire-type and do 1.3x damage.",
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'hiddenpower') {
				move.type = 'Fire';
				pokemon.addVolatile('ignate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "ignate",
		name: "Ignate",
		rating: 3,
		num: -31
	},
	"judoka": {
		desc: "This Pokemon does 1.5x damage against opponents weighing 60 kg (132.3 lbs) or more.",
		shortDesc: "50% damage bonus against targets weighing 60 kg (132.3 lbs) or more.",
		onBasePower: function (basePower, attacker, defender, move) {
			if (target.weightkg >= 60) {
				return this.chainModify(1.5);
			}
		},
		id: "judoka",
		name: "Judoka",
		rating: 3,
		num: -32
	},
	"paintshield": {
		desc: "Halves the damage done to this Pokemon by special attacks.",
		shortDesc: "Halves special damage done to this Pokemon.",
		onModifySpAPriority: 6,
		onSourceModifySpA: function (spa, attacker, defender, move) {
			return this.chainModify(0.5);
		},
		id: "paintshield",
		name: "Paint Shield",
		rating: 3.5,
		num: -33
	},
	"petrified": {
		desc: "Turns all of this Pokemon's Grass-typed attacks into Rock-typed and deal 1.3x damage. Also prevents all damage except from direct attacks.",
		shortDesc: "This Pokemon can only be damaged by direct attacks. Its Grass moves become Rock-type and do 1.3x damage.",
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Grass') {
				move.type = 'Rock';
				pokemon.addVolatile('petrified');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "petrified",
		name: "Petrified",
		rating: 3,
		num: -34
	},
	"propogate": {
		desc: "When this Pokemon enters battle, it afflicts its opponent with Leech Seed.",
		shortDesc: "Uses Leech Seed on switch-in.",
		onStart: function (pokemon) {
			var foeactive = pokemon.side.foe.active;
				for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (foeactive[i].volatiles['substitute']) {
					// does it give a message?
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Propogate', '[of] ' + pokemon);
				}
				else if (target.hasType('Grass')) {
					this.add('-immune', target, '[msg]');
					return null;
				} 
				else {
					this.add('-ability', pokemon, 'Propogate', '[of] ' + foeactive[i]);
				}
			}
		},
		volatileStatus: 'leechseed', //necessary?
		effect: {
			onStart: function (target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual: function (pokemon) {
				var target = pokemon.side.foe.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				var damage = this.damage(pokemon.maxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			}
		},
		id: "propogate",
		name: "Propogate",
		rating: 3,
		num: -35
	},
	"purify": {
		desc: "This Pokemon is immune to all Poison-type attacks and Toxic Spikes and absorbs Toxic Spikes on its side of the field when it enters battle; additionally, its Grass-type attacks receive a 50% boost if a Poison-type move hits this Pokemon or if it absorbs Toxic Spikes. Multiple boosts do not occur if this Pokemon is hit with multiple Poison-type attacks or if it is hit with a Poison-type attack after absorbing Toxic Spikes.",
		shortDesc: "This Pokemon's Grass attacks do 1.5x damage if hit by one Poison move or by Toxic Spikes; absorbs Toxic Spikes; Poison immunity.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Poison') {
				move.accuracy = true;
			if (!target.addVolatile('purify')) {
				this.add('-immune', target, '[msg]');
			}
			return null;
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (effect && effect.id === 'toxicspikes') {
				if (!target.addVolatile('purify')) {
					this.add('-immune', target, '[msg]');
				}
				return false;
			}
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (target) {
				this.add('-start', target, 'ability: Purify');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === 'Grass') {
					this.debug('Purify boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === 'Grass') {
					this.debug('Purify boost');
					return this.chainModify(1.5);
				}
			}
		},
		id: "purify",
		name: "Purify",
		rating: 3,
		num: -36
	},
	"quickwitted": {
		desc: "This Pokemon's Psychic-type moves have their priority increased by 1.",
		shortDesc: "Gives priority to Psychic-type moves.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Psychic') return priority + 1;
		},
		id: "quickwitted",
		name: "Quick-Witted",
		rating: 3.5,
		num: -37
	},
	"roadblock": {
		desc: "When this Pokemon enters the field, its opponents cannot switch or flee the battle unless they are part Flying-type, have the Levitate ability, are holding Shed Shell, or they use the moves Baton Pass or U-Turn. Flying-type and Levitate Pokemon cannot escape if they are holding Iron Ball or Gravity is in effect. Levitate Pokemon also cannot escape if their ability is disabled through other means, such as Skill Swap or Gastro Acid.",
		shortDesc: "Prevents foes from switching out normally unless they have immunity to Ground.",
		onFoeModifyPokemon: function (pokemon) {
			if (pokemon.runImmunity('Ground', false)) {
				pokemon.tryTrap();
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon) {
			if (pokemon.runImmunity('Ground', false)) {
				pokemon.maybeTrapped = true;
			}
		},
		id: "roadblock",
		name: "Road Block",
		rating: 5,
		num: -38
	},
	"levitate": { //update levitate's description to indicate immunity to road block
		inherit: true,
		desc: "This Pokemon is immune to Ground-type attacks, Spikes, Toxic Spikes and the Arena Trap and Road Block abilities; it loses these immunities while holding Iron Ball, after using Ingrain or if Gravity is in effect.",
	},
	"scarecrow": {
		desc: "This Pokemon is immune to Flying-type attacks.",
		shortDesc: "This Pokemon is immune to Flying.",
		onImmunity: function (type) {
			if (type === 'Flying') return false;
		},
		id: "scarecrow",
		name: "Scarecrow",
		rating: 3,
		num: -39
	},
	"sneaky": {
		desc: "This Pokemon's Dark-type moves have their priority increased by 1.",
		shortDesc: "Gives priority to Dark-type moves.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Dark') return priority + 1;
		},
		id: "sneaky",
		name: "Sneaky",
		rating: 3,
		num: -40
	},
	"sweetdreams": {
		desc: "If this Pokemon is asleep at the end of a turn, it recovers 1/8 of its max HP.",
		shortDesc: "Recovers 1/8 of max HP every turn spent asleep",
		onResidualOrder: 5,
		onResidual: function (pokemon) {
			if (this.status === 'slp') {
				this.heal(pokemon.maxhp / 16);
			}
		},
		id: "sweetdreams",
		name: "Sweet Dreams",
		rating: 3,
		num: -41
	},
	"swordsman": {
		desc: "Boosts the power of Blade, Slash, Cut, and Sword moves by 50%",
		shortDesc: "Boosts the power of Blade, Slash, Cut, and Sword moves by 50%.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.isSwordMove) {
				return this.chainModify(1.5);
			}
		},
		id: "swordsman",
		name: "Swordsman",
		rating: 3,
		num: -42
	},
	"trickster": {
		desc: "This Pokemon's status moves that lower a target's stats have their effect doubled.",
		shortDesc: "Stat-lowering status moves have their effect doubled.",
		onModifyMove: function (move, pokemon) {
			var boosts = move.boosts;
			if (boosts) {
				if (boosts.atk && boosts.atk < 0) {
					boosts.atk *= 2;
				}
				if (boosts.def && boosts.def < 0) {
					boosts.def *= 2;
				}
				if (boosts.spa && boosts.spa < 0) {
					boosts.spa *= 2;
				}
				if (boosts.spd && boosts.spd < 0) {
					boosts.spd *= 2;
				}
				if (boosts.spe && boosts.spe < 0) {
					boosts.spe *= 2;
				}
			}
		},
		id: "trickster",
		name: "Trickster",
		rating: 3,
		num: -43
	},
	"accumulation": {
		desc: "User's Rollout and Ice Ball deal triple damage.",
		shortDesc: "Rollout and Ice Ball deal triple damage.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.id === 'rollout' || move.id === 'iceball') {
				return this.chainModify(3);
			}
		},
		id: "accumulation",
		name: "Accumulation",
		rating: 3,
		num: -44
	},
	"benthic": {
		desc: "User's Water-type moves are supereffective against the Grass type.",
		shortDesc: "Water-type moves are supereffective against the Grass type.",
		onEffectiveness: function (typeMod, target, type, move) {
			if (type === 'Grass' && move.type === 'Water') return 1;
		},
		id: "benthic",
		name: "Benthic",
		rating: 3,
		num: -45
	},
	"megatransform": {
		desc: "When user enters the battle or gains this ability, it transforms into the opponent's Mega-X form.",
		shortDesc: "Transforms user into the opponent's Mega form.",
		onStart: function (pokemon) {
			var target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				var megaTarget = Object.clone(target);
				var megaTemplate = megaTarget.baseTemplate;
				for (var i in megaTemplate.formes) {
					if (this.getTemplate(megaTemplate.formes[i]).forme === 'Mega-X') {
						megaTarget.baseTemplate = this.getTemplate(megaTarget.formes[i]);
						megaTarget.details = megaTarget.species + (megaTarget.level === 100 ? '' : ', L' + megaTarget.level) + (megaTarget.gender === '' ? '' : ', ' + megaTarget.gender) + (megaTarget.set.shiny ? ', shiny' : '');
						break;
					}
				}
				if (!megaTarget.template.isMega) return;
				pokemon.transformInto(megaTarget, pokemon);
			}
		},
		id: "megatransform",
		name: "Mega Transform",
		rating: 3,
		num: -45
	},
	"wintershield": {
		desc: "Immunity to moves striking with increased priority.",
		shortDesc: "Immunity to moves striking with increased priority.",
		onTryHit: function (target, source, move) {
			if (move.category === 'Status') return true;
			if (move.priority > 0) {
				return null;
			}
		},
		id: "wintershield",
		name: "Winter Shield",
		rating: 3,
		num: -46
	},
	"tireless": {
		desc: "User does not have to recharge after using recharge moves.",
		shortDesc: "User does not have to recharge after using recharge moves.",
		//implement move in the recharge status itself
		id: "tireless",
		name: "Tireless",
		rating: 3,
		num: -47
	},
	"tempest": {
		desc: "When user enters the battle or gains this ability, user uses the move Twister without taking up a turn or using PP.",
		shortDesc: "Upon switch in or gaining this ability, Pokemon uses Twister",
		onStart: function (source) {
			source.useMove('twister');
		},
		id: "tempest",
		name: "Tempest",
		rating: 3,
		num: -48
	},
	"stuffed": {
		desc: "When user enters the battle or gains this ability, user gains the Stockpile 3 effect.",
		shortDesc: "Upon switch in or gaining this ability, user gains the Stockpile 3 effect.",
		onStart: function (source) {
			source.addVolatile('stockpile');
			source.volatiles['stockpile'].layers = 3;
		},
		id: "stuffed",
		name: "Stuffed",
		rating: 3,
		num: -49
	},
	"stormforce": {
		desc: "When Rain Dance or Drizzle is active, user's Flying-, Electric-, and Dragon-type moves deal 30% more damage.",
		shortDesc: "Boosts Flying, Electric and Dragon-type moves by 30% on Rain.",
		onBasePowerPriority: 4,
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.isWeather('raindance') && move.type in {'Flying':1,'Electric':1,'Dragon':1}) {
				return this.chainModify(1.3);
			}
		},
		id: "stormforce",
		name: "Storm Force",
		rating: 3,
		num: -50
	},
	"raider": {
		desc: "When user enters the battle or gains this ability, user uses the move Pluck without taking up a turn or using PP.",
		shortDesc: "Upon switch in or gaining this ability, user uses Pluck.",
		onStart: function (source) {
			source.useMove('pluck');
		},
		id: "raider",
		name: "Raider",
		rating: 3,
		num: -51
	},
	"seeddrop": {
		desc: "When user switches out, its replacement's HP is healed by 25%.",
		shortDesc: "When user switches out, its replacement's HP is healed by 25%.",
		sideCondition: 'SeedDrop',
		onBeforeSwitchOut: function (pokemon) {
			pokemon.addSideCondition("seeddropSwitch");
			pokemon.side.sideConditions["seeddropSwitch"].source = pokemon;
		},
		id: "seeddrop",
		name: "Seed Drop",
		rating: 3,
		num: -52
	},
	"clearsky": {
		desc: "When user enters the battle or gains this ability, all weather conditions are removed.",
		shortDesc: "All weather conditions are removed.",
		onStart: function (source) {
			this.setWeather('');
		},
		id: "clearsky",
		name: "Clear Sky",
		rating: 3,
		num: -53
	},
	"valiant": {
		desc: "This Pokemon has the ability to hit Fairy-type Pokemon with Dragon-type moves. Effectiveness of these moves takes into account the Steel-type Pokemon's other weaknesses and resistances.",
		shortDesc: "This Pokemon can hit Fairy-types with Dragon-type moves.",
		onModifyMove: function (move) {
			if (move.type === 'Dragon') {
				move.affectedByImmunities = false;
			}
		},
		id: "valiant",
		name: "Valiant",
		num: -15,
		rating: -54,
	},
	"germinate": {
		desc: "Turns all of this Pokemon's Normal-typed attacks into Grass-type and deal 1.3x damage. Does not affect Hidden Power.",
		shortDesc: "This Pokemon's Normal moves become Grass-type and do 1.3x damage.",
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'hiddenpower') {
				move.type = 'Grass';
				pokemon.addVolatile('germinate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "germinate",
		name: "Germinate",
		rating: 3,
		num: -55
	},
	"heatseek": {
		desc: "Every Fire-type attack used by this Pokemon will always hit regardless of Evasion or Accuracy modifiers.",
		shortDesc: "This Pokemon's Fire-type attacks will never miss",
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Fire') {
				return true;
			}
			return accuracy;
		},
		id: "heatseek",
		name: "Heat Seek",
		rating: 2,
		num: -56
	},
	"hibernate": {
		desc: "When the user with this ability is asleep, its Defense and Special Defense receive a 300% boost.",
		shortDesc: "When this Pokemon is asleep, its defenses are 3x.",
		//300% boost is the same as 75% damamge reduction. 
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.status === 'slp') {
				return this.chainModify(3);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (SpD, pokemon) {
			if (pokemon.status === 'slp') {
				return this.chainModify(3);
			}
		},
		id: "hibernate",
		name: "Hibernate",
		rating: 3,
		num: -57
	},
	"hubris": {
		desc: "If this Pokemon knocks out another Pokemon with a damaging attack, its Secial Attack is raised by one stage.",
		shortDesc: "This Pokemon's Special Attack is boosted by 1 if it attacks and faints another Pokemon.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa:1}, source);
			}
		},
		id: "hubris",
		name: "Hubris",
		rating: 4,
		num: -58
	},
	"spiritabsorb": {
		desc: "If another Pokemon faints when user is active, user's HP is healed by 25%.",
		shortDesc: "If another Pokemon faints when user is active, user's HP is healed by 25%.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.heal(source.maxhp / 4);
			}
		},
		id: "spiritabsorb",
		name: "Spirit Absorb",
		rating: 4,
		num: -59
	},
	"soulless": {
		desc: "When user faints, the opponent directly opposite of user faints as well.",
		shortDesc: "When user faints, the opponent directly opposite of user faints as well.",
		onFaint: function (target, source, effect) {
			if (!source || !effect) return;
			source.faint();
		},
		id: "soulless",
		name: "Soulless",
		rating: 4,
		num: -60
	},
	"reflector": {
		desc: "When user enters the battle or gains this ability, Reflect is set up on user's side for five turns.",
		shortDesc: "Reflect is set up on user's side for five turns.",
		onStart: function(source) {
			this.useMove('reflect');
		},
		id: "reflector",
		name: "Reflector",
		rating: 4,
		num: -61
	},
	"projector": {
		desc: "When user enters the battle or gains this ability, Light Screen is set up on user's side for five turns.",
		shortDesc: "Light Screen is set up on user's side for five turns.",
		onStart: function(source) {
			this.useMove('lightscreen');
		},
		id: "projector",
		name: "Projector",
		rating: 4,
		num: -62
	},
	"precision": {
		desc: "When this Pokemon uses an attack that has 40 Base Power or less (including Struggle), the move's Base Power receives a 2x boost. For example, a move with 40 Base Power effectively becomes a move with 80 Base Power.",
		shortDesc: "This Pokemon's attacks of 40 Base Power or less do 2x damage. Includes Struggle.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (basePower <= 40) {
				this.debug('Technician boost');
				return this.chainModify(2);
			}
		},
		id: "precision",
		name: "Precision",
		rating: 4,
		num: -63
	},
	"overwhelm": {
		desc: "When user enters the battle or gains this ability, the Taunt effect is applied to the opponent.",
		shortDesc: "When user enters the battle or gains this ability, the Taunt effect is applied to the opponent.",
		onStart: function(source) {
			this.useMove('taunt');
		},
		id: "overwhelm",
		name: "Overwhelm",
		rating: 4,
		num: -63
	},
	"mineraldissolve": {
		desc: "Immunity to Rock and Sandstorm. User's HP is healed by 25% when hit by a Rock-type move or Stealth Rock. Sandstorm restores user's HP by 12.5% per turn.",
		shortDesc: "Immunity to Rock and Sandstorm. User's HP is healed by 25% when hit by a Rock-type move or Stealth Rock. Sandstorm restores user's HP by 12.5% per turn.",
		onWeather: function (target, source, effect) {
			if (effect.id === 'sandstorm' || effect.id === 'stealthrock') {
				this.heal(target.maxhp / 8);
			}
		},
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Rock') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]');
				}
				return null;
			}
		},
		id: "mineraldissolve",
		name: "Mineral Dissolve",
		rating: 4,
		num: -64
	},
	"looming": {
		desc: "User's Dragon-type attacks gain +1 priority.",
		shortDesc: "Gives priority to Dragon-type moves.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move.type === 'Dragon') return priority + 1;
		},
		id: "looming",
		name: "Looming",
		rating: 4,
		num: -65
	},
	"entrenchment": {
		desc: "For each stage that user's Speed stat is lowered, its Defense stat is raised by one stage.",
		shortDesc: "For each stage that user's Speed stat is lowered, its Defense stat is raised by one stage.",
		onAfterEachBoost: function (boost, target, source) {
			if (!source || target.side === source.side) {
				return;
			}
			var statsLowered = false;
			if (boost['spd'] < 0) {
				statsLowered = true;
			}
			if (statsLowered) {
				this.boost({def: 2});
			}
		},
		id: "entrenchment",
		name: "Entrenchment",
		rating: 4,
		num: -66
	},
}
