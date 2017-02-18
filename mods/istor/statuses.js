'use strict';

exports.BattleStatuses = {
	noxiousfumes: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function (source, effect) {
			if (source && source.hasItem('toxicrock')) {
				return 8;
			}
			return 5;
		},
        onResidualOrder: 999, //This will always occur as the last possible occurence of the turn's residual phase.
        onResidual: function () {
            this.p1.pokemon[0].trySetStatus('tox');
            this.p2.pokemon[0].trySetStatus('tox');
            //Trust me I tried pokemon.trySetStatus it doesn't work ;_;
        },
		onStart: function (battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'NoxiousFumes', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'NoxiousFumes');
			}
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'NoxiousFumes', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function () {
			this.add('-weather', 'none');
		},
	},
};
