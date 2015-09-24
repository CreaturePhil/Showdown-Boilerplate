exports.BattleStatuses = {
	slp: {
		inherit: true,
		onBeforeMove: function (pokemon, target, move) {
			if (pokemon.getAbility().isHalfSleep) {
				pokemon.statusData.time--;
			}
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			if (pokemon.ability === 'dreamer') return;
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		}
	},
	brn: {
		inherit: true,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move && move.category === 'Physical' && attacker && attacker.ability !== 'guts' && attacker.ability !== 'gritpower' && move.id !== 'facade') {
				return this.chainModify(0.5);
			}
		}
	},
	raindance: {
		inherit: true,
		durationCallback: function (target, source, effect) {
			var d = 5;
			if (source) {
				if (source.item === 'damprock') d += 3;
				if (source.ability === 'fieldwarp') d += 3;
			}
			return d;
		}
	},
	sunnyday: {
		inherit: true,
		durationCallback: function (target, source, effect) {
			var d = 5;
			if (source) {
				if (source.item === 'heatrock') d += 3;
				if (source.ability === 'fieldwarp') d += 3;
			}
			return d;
			}
	},
	sandstorm: {
		inherit: true,
		durationCallback: function (target, source, effect) {
			var d = 5;
			if (source) {
				if (source.item === 'smoothrock') d += 3;
				if (source.ability === 'fieldwarp') d += 3;
			}
			return d;
			}
	},
	hail: {
		inherit: true,
		durationCallback: function (target, source, effect) {
			var d = 5;
			if (source) {
				if (source.item === 'icyrock') d += 3;
				if (source.ability === 'fieldwarp') d += 3;
			}
			return d;
		}
	},
	mustrecharge: {
		inherit: true,
		onBeforeMove: function (pokemon) {
			if (pokemon.ability === 'tireless') return true;
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			return false;
		},
	},
	seeddropSwitch: {
		onSwitchIn: function (pokemon) {
			if (pokemon === this.effectData.source) return;
			pokemon.heal(pokemon.maxhp / 4);
		}
	}
};
