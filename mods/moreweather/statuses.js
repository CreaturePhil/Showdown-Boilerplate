exports.BattleStatuses = {
	raindance: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'damprock') {
				return 8;
			}
			return 5;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	sunnyday: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'heatrock') {
				return 8;
			}
			return 5;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity: function(type) {
			if (type === 'frz') return false;
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	sandstorm: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'smoothrock') {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD: function(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	hail: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'icyrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	clearskies: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'regularrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'ClearSkies', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'ClearSkies');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'ClearSkies', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	warzone: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'fightingrock') {
				return 8;
			}
			return 5;
		},
		onModifyAtkPriority: 10;
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.hasType('Fighting') && this.isWeather('warzone')) {
				return this.modify(atk, 1.3);
			}
		},
		onModifySpAPriority: 10;
		onModifySpA: function(spa, pokemon) {
			if (pokemon.hasType('Fighting') && this.isWeather('warzone')) {
				return this.modify(spa, 1.3);
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Warzone', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Warzone');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'Warzone', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	deltastream: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'galerock') {
				return 8;
			}
			return 5;
		},
		onEffectiveness: false,
		onModifyDefPriority: 10,
		onModifyDef: function(def, pokemon) {
			if (pokemon.hasType('Flying') && this.isWeather('deltastream')) {
				return this.modify(def, 1.3);
			}
		},
		onModifySpDPriority: 10;
		onModifySpD: function(spd, pokemon) {
			if (pokemon.hasType('Flying') && this.isWeather('deltastream')) {
				return this.modify(spd, 1.3);
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'DeltaStream', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'DeltaStream');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	acidrain: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'toxicrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'AcidRain', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'AcidRain');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'AcidRain', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	sinisterfog: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'cursedrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'SinisterFog', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'SinisterFog');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'SinisterFog', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		},
		onChargeMove: function (pokemon, target, move) {
			if (move.id === 'phantomforce' || move.id === 'shadowforce') return false;
		}
	},
	metalmeteor: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'steelrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'MetalMeteor', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'MetalMeteor');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'MetalMeteor', '[upkeep]');
			if (this.isWeather('metalmeteor')) this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	thunderstorm: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'voltrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Thunderstorm', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Thunderstorm');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'Thunderstorm', '[upkeep]');
			if (this.isWeather('thunderstorm')) this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	pollenstorm: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'mossyrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'PollenStorm', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'PollenStorm');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'PollenStorm', '[upkeep]');
			if (this.isWeather('pollenstorm')) this.eachEvent('Weather');
		},
		onWeather: function(target) {
			if (target.hasType('Grass')) this.heal(target.maxhp / 16);
			else this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		},
		onModifyMove: function (move) {
			if (move.isPowder === true) {
				move.accuracy = true;
				move.alwaysHit = true;
			}
		}
	},
	blackhole: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'darkrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'BlackHole', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'BlackHole');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'BlackHole', '[upkeep]');
			if (this.isWeather('blackhole')) this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	pixiefog: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'pixierock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'PixieFog', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'PixieFog');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'PixieFog', '[upkeep]');
			if (this.isWeather('pixiefog')) this.eachEvent('Weather');
		},
		onWeather: function (target) {
			//if (target.hasType('Psychic')) return;
			this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	dragonmeteor: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'dracorock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'DragonMeteor', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'DragonMeteor');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'DragonMeteor', '[upkeep]');
			if (this.isWeather('dragonmeteor')) this.eachEvent('Weather');
		},
		onWeather: function (target) {
			this.damage(target.maxhp / 16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	plague: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'stickyrock') {
				return 8;
			}
			return 5;
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Plague', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Plague');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'Plague', '[upkeep]');
			if (this.isWeather('plague')) this.eachEvent('Weather');
		},
		onWeather: function (target) {
			//this.trySetStatus('plaguedamage');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		},
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Poison' || move.type === 'Bug'){
				return this.chainModify(1.33);
			}
		},
		onModifyMove: function (move) {
			if (move.category !== "Status") {
				if (!move.secondaries) return;
				for (var i = 0; i < move.secondaries.length; i++) {
					if (move.secondaries[i].status === 'psn') {
						move.secondaries[i].chance *= 2;
					}
				}
			}
		}
	},

	// other

	plaguedamage: {
		effectType: 'Status',
		onResidualOrder: 1,
		onResidual: function(pokemon) {
			if (pokemon.hasType('Bug') || pokemon.hasType('Poison')) return;
			this.damage(pokemon.maxhp / 16);
		}
	}
};
