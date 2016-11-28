'use strict';
exports.BattleStatuses = {
// ClassyZ
	simpleinnate: {
		effectType: 'Ability',
		onBoost: function (boost) {
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
	},
	"levitate": {
		desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
		shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
		// airborneness implemented in battle-engine.js:BattlePokemon#isGrounded
		id: "levitate",
		name: "Levitate",
		effectType: "Ability",
	},
	russianwinter: {
		effectType: 'Weather',
		duration: 0,
		onStart: function (battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather: function (target) {
			if(target.name=="Zmeeed") return;
			this.damage(target.maxhp / 4);
		},
		onEnd: function () {
			this.add('-weather', 'none');
		},
	},
};
