function createWeatherSetter(id, name, weather, type){
	return {
		num: -100,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the weather becomes "+weather+". Lasts for 8 turns if the user is holding Damp Rock. Fails if the current weather is "+weather+".",
		shortDesc: "For 5 turns, "+weather+" powers "+type+" moves.",
		id: id,
		isViable: true,
		name: name,
		pp: 5,
		priority: 0,
		weather: weather,
		secondary: false,
		target: "all",
		type: type
	},
}
exports.BattleMovedex = {
	"dracometeor": {
		inherit: true,
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon, target) {
			return (this.isWeather('meteorstorm') ? 130 : 140);
		},
		onBoost: function (boost) {
			if (this.isWeather('meteorstorm')) boost = {spa:-1}
		}
	},
	"gigaimpact": {
		inherit: true,
		onModifyMove: function (move) {
			if (this.isWeather('clearskies')) move.accuracy = 75;
			else if (this.isWeather('ominousfog')) move.accuracy = 50;
		}
	},
	"hurricane": {
		inherit: true,
		onModifyMove: function (move) {
			if (this.isWeather('raindance') || this.isWeather('deltastream')) move.accuracy = true;
			else if (this.isWeather('sunnyday') || this.isWeather('sandstorm')) move.accuracy = 50;
		}
	},
	"hyperbeam": {
		inherit: true,
		onModifyMove: function (move) {
			if (this.isWeather('clearskies')) move.accuracy = 75;
			else if (this.isWeather('ominousfog')) move.accuracy = 50;
		}
	},
	"thunder": {
		onModifyMove: function (move) {
			if (this.isWeather('raindance') || this.isWeather('thunderstorm')) move.accuracy = true;
			else if (this.isWeather('sunnyday') || this.isWeather('sandstorm')) move.accuracy = 50;
		},
		inherit: true
	},
	"weatherball": {
		inherit: true,
		basePowerCallback: function () {
			if (this.isWeather('clearskies')) return 150;
			if (this.weather) return 100;
			return 50;
		},
		onModifyMove: function (move) {
			switch (this.effectiveWeather()) {
			case 'sunnyday':
				move.type = 'Fire';
				break;
			case 'raindance':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
				move.type = 'Ice';
				break;
			}
		}
	},
	"defog": {
		inherit: true,
		onHit: function (target, source) {
			if (!target.volatiles['substitute']) this.boost({evasion:-1});
			var sideConditions = {reflect:1, lightscreen:1, safeguard:1, mist:1, spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1};
			for (var i in sideConditions) {
				if (target.side.removeSideCondition(i)) {
					this.add('-sideend', target.side, this.getEffect(i).name, '[from] move: Defog', '[of] ' + target);
				}
			}
			for (var i in sideConditions) {
				if (i === 'reflect' || i === 'lightscreen') continue;
				if (source.side.removeSideCondition(i)) {
					this.add('-sideend', source.side, this.getEffect(i).name, '[from] move: Defog', '[of] ' + source);
				}
			}
			if (this.isWeather('sinisterfog') || this.isWeather('pixiefog')) {
				this.setWeather('');
			}
		}
	},
	// move setters
	clearsky: createWeatherSetter('clearsky','Clear Sky','ClearSkies','Normal'),
	warzone: createWeatherSetter('warzone','Warzone','Warzone','Fighting'),
	strongwinds: createWeatherSetter('strongwinds','Strong Winds','DeltaStream','Flying'),
	aciddance: createWeatherSetter('aciddance','Acid Dance','AcidRain','Poison'),
	plague: createWeatherSetter('plague','Plague','Plague','Bug'),
	sinisterfog: createWeatherSetter('sinisterfog','Sinister Fog','SinisterFog','Ghost'),
	metalmeteor: createWeatherSetter('metalmeteor','Metal Meteor','MetalMeteor','Steel'),
	pollenstorm: createWeatherSetter('pollenstorm','Pollen Storm','PollenStorm','Grass'),
	thunderstorm: createWeatherSetter('thunderstorm','Thunderstorm','Thunderstorm','Electric'),
	mindstorm: createWeatherSetter('mindstorm','Mindstorm','Mindstorm','Psychic'),
	meteorstorm: createWeatherSetter('meteorstorm','Meteor Storm','DragonMeteor','Dragon'),
	blackhole: createWeatherSetter('blackhole','Black Hole','BlackHole','Dark'),
	pixiedust: createWeatherSetter('pixiedust','Pixie Dust','PixieFog','Fairy'),
};
