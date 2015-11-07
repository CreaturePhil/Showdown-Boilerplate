'use strict';

exports.BattleStatuses = {
	slp: {
		inherit: true,
		onSwitchIn: function (target) {
			this.effectData.time = this.effectData.startTime;
		}
	},
	partiallytrapped: {
		inherit: true,
		onResidual: function (pokemon) {
			if (this.effectData.source && (!this.effectData.source.isActive || this.effectData.source.hp <= 0)) {
				delete pokemon.volatiles['partiallytrapped'];
				return;
			}
			if (this.effectData.source.hasItem('bindingband')) {
				this.damage(pokemon.maxhp / 8);
			} else {
				this.damage(pokemon.maxhp / 16);
			}
		}
	},
	stall: {
		// Protect, Detect, Endure counter
		duration: 2,
		counterMax: 256,
		onStart: function () {
			this.effectData.counter = 2;
		},
		onStallMove: function () {
			// this.effectData.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			let counter = this.effectData.counter || 1;
			if (counter >= 256) {
				// 2^32 - special-cased because Battle.random(n) can't handle n > 2^16 - 1
				return (this.random() * 4294967296 < 1);
			}
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			return (this.random(counter) === 0);
		},
		onRestart: function () {
			if (this.effectData.counter < this.effect.counterMax) {
				this.effectData.counter *= 2;
			}
			this.effectData.duration = 2;
		}
	},
	gem: {
		duration: 1,
		affectsFainted: true,
		onBasePower: function (basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify(1.5);
		}
	}
};
