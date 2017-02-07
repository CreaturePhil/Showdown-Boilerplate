exports.BattleStatuses = {
    raindance: {
        inherit: true,
        onStart: function (battle, source, effect) {
            if (effect && effect.effectType === 'Ability') {
                this.effectData.duration = 0;
                this.add('-weather', 'RainDance', '[from] ability: ' + effect, '[of] ' + source);
            } else {
                this.add('-weather', 'RainDance');
            }
        }
    },
    sunnyday: {
        inherit: true,
        onStart: function (battle, source, effect) {
            if (effect && effect.effectType === 'Ability') {
                this.effectData.duration = 0;
                this.add('-weather', 'SunnyDay', '[from] ability: ' + effect, '[of] ' + source);
            } else {
                this.add('-weather', 'SunnyDay');
            }
        }
    },
    sandstorm: {
        inherit: true,
        onStart: function (battle, source, effect) {
            if (effect && effect.effectType === 'Ability') {
                this.effectData.duration = 0;
                this.add('-weather', 'Sandstorm', '[from] ability: ' + effect, '[of] ' + source);
            } else {
                this.add('-weather', 'Sandstorm');
            }
        }
    },
    hail: {
        inherit: true,
        onStart: function (battle, source, effect) {
            if (effect && effect.effectType === 'Ability') {
                this.effectData.duration = 0;
                this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
            } else {
                this.add('-weather', 'Hail');
            }
        }
    },
    arceus: {
        onSwitchInPriority: 101,
        onSwitchIn: function (pokemon) {
            var type = pokemon.types[0];
            if (pokemon.ability === 'multitype') {
                type = this.runEvent('Plate', pokemon);
                if (!type || type === true) {
                    type = 'Normal'; //FOR THE MINDGAMES
                }
            }
            pokemon.setType(type, true);
        }
    }
};
