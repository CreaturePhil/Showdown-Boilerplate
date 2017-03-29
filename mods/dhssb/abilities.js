'use strict';

exports.BattleAbilities = {
	"rawr": {
		shortDesc: "Thick Fat + Clear Body",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Rawr');
			this.add('-formechange', pokemon, 'Sharpedo-Mega', '[msg]');
			this.add('-formechange', pokemon, 'Sharpedo', '[msg]');
			this.add('-formechange', pokemon, 'Absol-Mega', '[msg]');
			this.add('-formechange', pokemon, 'Zygarde-Complete', '[msg]');
			pokemon.formeChange("Zygarde-Complete");
		},
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Rawr weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Rawr weaken');
				return this.chainModify(0.5);
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Rawr", "[of] " + target);
		},
		name:"Rawr",
		id:"rawr",
	},
	"contraryplusplus": {
		onModifyMove: function(move, pokemon) {
			move.ignoreAbility = true;
		},
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				boost[i] *= -1;
			}
		},
		shortDesc: 'Contrary + Mold breaker.',
		desc: 'Contrary + Mold breaker.',
		id: "contraryplusplus",
		name: "Contrary Plus Plus",
	},
	"ultratechnical": {
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (basePower <= 90) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		id: "ultratechnical",
		name: "Ultra Technical",
	},
	"dankzone": {
		shortDesc: "Truggets Grassy Terrain, Sunny Day and Trick Room on switch in",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Dank Zone');
			this.addPseudoWeather('trickroom', pokemon);
			this.setWeather('sunnyday');
			this.setTerrain('grassyterrain');
		},
		name: 'Dank Zone',
		id: 'dankzone',
	},
	"staticboost": {
		shortDesc: "+1 in all stats upon switch in",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Static Boost');
			this.boost({atk:1, def:1, spa:1, spd:1, spe:1, accuracy:1, evasion:1});
		},
		id:'staticboost',
		name:'Static Boost',
	},
	"phantomguard": {
		shortDesc: "This Pokemon can only be damaged by supereffective moves and indirect damage.",
		onStart: function (pokemon) {
			this.boost({def:3});
		},
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) = 1) {
				this.add('-immune', target, '[msg]', '[from] ability: Phantom Guard');
				return null;
			}
		},
		id: "phantomguard",
		name: "Phantom Guard",
		rating: 5,
		num: 25,
	},
	"waterchange": {
			shortDesc: "If user is Elcrest and Rain Dance is active, it changes to Gyarados and it and allies' Attack and Speed are 1.5x.",
			onStart: function (pokemon) {
			delete this.effectData.forme;
		},
		onUpdate: function (pokemon) {
			if (!pokemon.isActive || pokemon.baseTemplate.speciesid !== 'dratini') return;
			if (this.isWeather(['raindance', 'primordialsea'])) {
				if (pokemon.template.speciesid !== 'gyarados') {
					pokemon.formeChange('Gyarados');
					this.add('-formechange', pokemon, 'Gyarados', '[msg]');
				}
			} else {
				if (pokemon.template.speciesid === 'gyarados') {
					pokemon.formeChange('Dratini');
					this.add('-formechange', pokemon, 'Dratini', '[msg]');
				}
			}
		},
		onModifyAtkPriority: 3,
		onAllyModifyAtk: function (atk) {
			if (this.effectData.target.baseTemplate.speciesid !== 'dratini') return;
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 4,
		onAllyModifySpD: function (spe) {
			if (this.effectData.target.baseTemplate.speciesid !== 'dratini') return;
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		id: "waterchange",
		name: "Water Change",
                },
                "russianwinter": {
		onStart: function (source) {
			this.setWeather('russianwinter');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'russianwinter' && !(weather.id in {desolateland:1, primordialsea:1, deltastream:1})) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility('russianwinter')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		id: "russianwinter",
		name: "Russian Winter",
	},
        "flairhax": {
		shortDesc: "Serene Grace and Protean with +2 Speed on switch in",
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2.2;
				}
			}
		},
                onStart: function (pokemon) {
			this.boost({spe:2});
		},
                onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] Flair Hax');
			}
		},
		id: "flairhax",
		name: "Flair Hax",
	},
	pressurebreaker: {
		shortDesc: "Pressure + Mold Breaker",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Pressure');
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		onDeductPP: function (target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		onModifyMove: function(move, pokemon) {
			move.ignoreAbility = true;
		},
		id: "pressurebreaker",
		name: "Pressure Breaker",
		rating: 1.5,
	},
	flameguard: {
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flame Guard');
				}
				return null;
			}
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd: function (target) {
				this.add('-end', target, 'ability: Flame Guard', '[silent]');
			},
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.type === 'Fire') {
				this.add('-setboost', target, 'atk', 12, '[from] ability: Flame Guard');
			}
		},
		id: "flameguard",
		name: "Flame Guard",
	},
	breakthrough: {
		shortDesc: "This Pokemon's moves ignores type immunities",
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
                                move.ignoreImmunity['Dragon'] = true;
				move.ignoreImmunity['Electric'] = true;
                                move.ignoreImmunity['Ground'] = true;
                                move.ignoreImmunity['Psychic'] = true;
                                move.ignoreImmunity['Poison'] = true;
                                move.ignoreImmunity['Ghost'] = true;
                                move.ignoreImmunity['Water'] = true;
                                move.ignoreImmunity['Fire'] = true;
                                move.ignoreImmunity['Grass'] = true;
                                move.ignoreImmunity['Fairy'] = true;
                                move.ignoreImmunity['Bug'] = true;
                        }
		},
		id: "breakthrough",
		name: "Breakthrough",
		rating: 3,
	},
	toughbounce: {
		shortDesc: "Tough Claws + Magic Bounce + Own Tempo",
	        onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Own Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Own Tempo');
			}
		},
		id: "toughbounce",
		name: "Tough Bounce",
		rating: 5,
	},
	breakingpoint: {
		shortDesc: "Shadow Tag + No Guard",
		onFoeTrapPokemon: function (pokemon) {
			if ((!pokemon.hasAbility('shadowtag')&&!pokemon.hasAbility('breakingpoint')) && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if ((!pokemon.hasAbility('shadowtag')&&!pokemon.hasAbility('breakingpoint')) && this.isAdjacent(pokemon, source)) {
				pokemon.maybeTrapped = true;
			}
		},
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		id: "breakingpoint",
		name: "Breaking Point",
		rating: 2,
	},
	"theunderlord": {
		shortDesc: "Flame Body + changes type to resist the opposing Pokemon's last attack.",
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (parseInt(this.random(10)) == 7) {
					source.trySetStatus('brn', target);
				}
			}
		},
		onAfterMoveSecondary: function (target, source, move) {
			if (!target.lastMove) {
				return false;
			}
			let possibleTypes = [];
			let attackType = this.getMove(target.lastMove).type;
			for (let type in this.data.TypeChart) {
				if (source.hasType(type) || target.hasType(type)) continue;
				let typeCheck = this.data.TypeChart[type].damageTaken[attackType];
				if (typeCheck === 2 || typeCheck === 3) {
					possibleTypes.push(type);
				}
			}
			if (!possibleTypes.length) {
				return false;
			}
			let randomType = possibleTypes[this.random(possibleTypes.length)];
			target.types = [].push(randomType);
			this.add('-start', target, 'typechange', randomType);
		},
		onSwitchOut: function(pokemon) {
			pokemon.types = pokemon.baseTemplate.types;
		},
		id: "theunderlord",
		name: "The Underlord",
	},
	epicclaws: {
		shortDesc: "Tough Claws + Magic Bounce",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(1.5);
		},
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		effect: {
			duration: 1,
		},
		id: "epicclaws",
		name: "Epic Claws",
		rating: 2,
	},
	wonderbreaker: {
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Wonder Breaker", "[of] " + target);
		},
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Wonder Breaker');
		},
		onModifyMove: function(move, pokemon) {
			move.ignoreAbility = true;
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		id: "wonderbreaker",
		name: "Wonder Breaker",
	},
	magicclaws:{
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "magicclaws",
		name: "Magic Claws",
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
	},
	blessedhax: {
		shortDesc: "Speed Boost + Serne Grace and +1 Def and SpD boost on switch in",
		onStart: function (pokemon) {
			this.boost({def:1,spd:1});
		},
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe:1});
			}
		},
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
		},
		id:'blessedhax',
		name:'Blessed Hax',
	},
	knowledge: {
		shortDesc: "+3 Def and SpD on switch in, high crit ratio",
		onStart: function (pokemon) {
			this.boost({def:3,spd:3});
		},
		volatileStatus: 'focusenergy',
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'move: Focus Energy');
			},
			onModifyCritRatio: function (critRatio) {
				return critRatio + 2;
			},
		},
	},
	'partingshotspam': {
		shortDesc: "Uses Parting Shot on switch in",
		onStart: function (source) {
			this.useMove('Parting Shot Spam', source);
		},
		id: "partingshotspam",
		name: "Parting Shot Spam",
	},
	'hidden': {
		shortDesc: "Uses substitute on switch in",
		onStart: function (source) {
			this.useMove('Substitute', source);
		},
		id: "hidden",
		name: "Hidden",
	},
	"dragonfury": {
		desc: "If this Pokemon, but not its substitute, is struck by a critical hit, its Attack is raised by 12 stages.",
		shortDesc: "If this Pokemon (not its substitute) takes a critical hit, its Attack is raised 12 stages.",
		onAfterDamage: function (damage, target, source, move) {
			this.boost({atk:12});
		},
		id: "dragonfury",
		name: "Dragon Fury",
		rating: 2,
		num: 83,
	},
	'slowchat': {
		shortDesc: "Uses Defog, Sticky Web then Stealth Rock on switch in",
		onStart: function (source) {
			this.useMove('Defog', source);
			this.useMove('Sticky Web', source);
			this.useMove('Stealth Rock', source);
		},
		id: "slowchat",
		name: "Slowchat",
	},

};
