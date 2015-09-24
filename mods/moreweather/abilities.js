function createWeatherAbility(id, name, weather){
	return {
		desc: "When this Pokemon enters the battlefield, the weather becomes "+weather+" (for 5 turns normally, or 8 turns while holding Damp Rock).",
		shortDesc: "On switch-in, the weather becomes "+weather+".",
		onStart: function (source) {
			this.setWeather(weather);
		},
		id: id,
		name: name,
		rating: 5,
		num: 2
	},
}
exports.BattleAbilities = {
	"forecast": {
		desc: "This Pokemon's type changes according to the current weather conditions: it becomes Fire-type during Sunny Day, Water-type during Rain Dance, Ice-type during Hail and so on with other weathers.",
		shortDesc: "Castform's type changes to the current weather condition's type.",
		onUpdate: function (pokemon) {
			if (pokemon.baseTemplate.species !== 'Castform' || pokemon.transformed) return;
			var forme = null;
			switch (this.effectiveWeather()) {
			case 'sunnyday':
				if (pokemon.template.speciesid !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
				if (pokemon.template.speciesid !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
				if (pokemon.template.speciesid !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			case 'sandstorm':
				if (pokemon.template.speciesid !== 'castformsandy') forme = 'Castform-Sandy';
				break;
			case 'warzone':
				if (pokemon.template.speciesid !== 'castformgladiator') forme = 'Castform-Gladiator';
				break;
			case 'deltastream':
				if (pokemon.template.speciesid !== 'castformaero') forme = 'Castform-Aero';
				break;
			case 'acidrain':
				if (pokemon.template.speciesid !== 'castformfilthy') forme = 'Castform-Filthy';
				break;
			case 'sinisterfog':
				if (pokemon.template.speciesid !== 'castformominous') forme = 'Castform-Ominous';
				break;
			case 'metalmeteor':
				if (pokemon.template.speciesid !== 'castformiron') forme = 'Castform-Iron';
				break;
			case 'thunderstorm':
				if (pokemon.template.speciesid !== 'castformvolty') forme = 'Castform-Volty';
				break;
			case 'pollenstorm':
				if (pokemon.template.speciesid !== 'castformvine') forme = 'Castform-Vine';
				break;
			case 'blackhole':
				if (pokemon.template.speciesid !== 'castformshadow') forme = 'Castform-Shadow';
				break;
			case 'pixiefog':
				if (pokemon.template.speciesid !== 'castformpixie') forme = 'Castform-Pixie';
				break;
			case 'dragonmeteor':
				if (pokemon.template.speciesid !== 'castformdraco') forme = 'Castform-Draco';
				break;
			case 'plague':
				if (pokemon.template.speciesid !== 'castformpest') forme = 'Castform-Pest';
				break;
			case 'mindstorm':
				if (pokemon.template.speciesid !== 'castformpsycho') forme = 'Castform-Psycho';
				break;
			default:
				if (pokemon.template.speciesid !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme);
				this.add('-formechange', pokemon, forme);
				this.add('-message', pokemon.name + ' transformed! (placeholder)');
			}
		},
		id: "forecast",
		name: "Forecast",
		rating: 4,
		num: 59
	},
	"overcoat": {
		desc: "In battle, the Pokemon does not take damage from weather conditions like Sandstorm or Hail. It is also immune to powder moves.",
		shortDesc: "This Pokemon is immune to residual weather damage, and powder moves.",
		onImmunity: function (type, pokemon) {
			var weatherDamage = {'hail':1,'sandstorm':1,'acidrain':1,'metalmeteor':1,'dragonmeteor':1,'pixiefog':1};
			if (type in weatherDamage || (type === 'powder' && !this.effectiveWeather() === 'pollenstorm')) return false;
		},
		id: "overcoat",
		name: "Overcoat",
		rating: 2,
		num: 142
	},
	"cloudy": createWeatherAbility('cloudy','Cloudy','clearskies'),
	"gladiatoruprise": createWeatherAbility('gladiatoruprise','Gladiator Uprise','warzone'),
	"deltastream": createWeatherAbility('deltastream','Delta Stream','deltastream'),
	"acidwarning": createWeatherAbility('acidwarning','Acid Warning','acidrain'),
	"fluspread": createWeatherAbility('fluspread','Flu Spread','plague'),
	"callofthedeath": createWeatherAbility('callofthedeath','Call of the Death','sinisterfog'),
	"meteorshower": createWeatherAbility('meteorshower','Meteor Shower','metalmeteor'),
	"pollenwarning": createWeatherAbility('pollenstorm','Pollen Warning','pollenstorm'),
	"thunderstorm": createWeatherAbility('thunderwarning','Thunder Warning','thunderstorm'),
	"psychosummoner": createWeatherAbility('psychosummoner','Psycho Summoner','mindstorm'),
	"stormoflegends": createWeatherAbility('stormoflegends','Storm of Legends','meteorshower'),
	"voidhole": createWeatherAbility('voidhole','Void Hole','blackhole'),
	"pixiefog": createWeatherAbility('pixiefog','Pixie Fog','pixiefog'),
};
