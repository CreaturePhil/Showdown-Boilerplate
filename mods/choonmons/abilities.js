exports.BattleAbilities = {
	"bigpecks": {
		inherit: true,
		onBoost: function () {},
		onAfterEachBoost: function (boost, target, source) {
			if (!source || target.side === source.side) {
				return;
			}
			var statsLowered = false;
			for (var i in boost) {
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({def: 2});
			}
		},
	},
	"healer": {
		inherit: true,
		onResidual: function (pokemon) {
			var allyActive = pokemon.side.active;
			if (allyActive.length === 1) {
				return;
			}
			for (var i = 0; i < allyActive.length; i++) {
				if (allyActive[i] && this.isAdjacent(pokemon, allyActive[i]) && allyActive[i].status && !this.random(6)) {
					this.debug('healer');
					this.add('-activate', pokemon, 'ability: Healer');
					allyActive[i].cureStatus();
				}
			}
			if (pokemon.hp && pokemon.status && !this.random(6)) {
				this.debug('healer');
				this.add('-activate', pokemon, 'ability: Healer');
				pokemon.cureStatus();
			}
		}
	},
	"keeneye": {
		inherit: true,
		onSourceAccuracy: function (accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('keeneye - enhancing accuracy');
			return accuracy * 1.2;
		}
	},
	"leafguard": {
		inherit: true,
		onSetStatus: function () {},
		onTryHit: function () {},
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.status && this.isWeather(['sunnyday', 'desolateland'])) {
				this.debug('leafguard');
				pokemon.cureStatus();
			}
		}
	},
	"parentalbond": {
		inherit: true,
		onPrepareHit: function (move, pokemon, target) {
			if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.damage && ((target.side && target.side.active.length < 2) || move.target in {any:1, normal:1, randomNormal:1})) {
				move.multihit = 2;
				pokemon.addVolatile('parentalbond');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower) {
				if (this.effectData.hit) {
					return this.chainModify(1/3);
				} else {
					this.effectData.hit = true;
				}
			},
			onModifyMove: function (move) {
				if (this.effectData.hitt) {
					if (move.secondaries) delete move.secondaries;
					if (move.seconadry) delete move.secondary;
				} else {
					this.effectData.hitt = true;
				}
			}
		}
	},
	"stall": {
		inherit: true,
		onSourceModifyDamage: function (damage, source, target, move) {
			this.debug('Stall neutralize');
			return this.chainModify(0.9);
		}
	},
	"tangledfeet": {
		inherit: true,
		onAccuracy: function (accuracy, target) {
			if (typeof accuracy !== 'number') return;
			if (target && target.volatiles['confusion']) {
				this.debug('Tangled Feet - nullifying accuracy');
				return 0;
			}
		},
		onModifyMove: function (move, pokemon, target) {
			if (pokemon.volatiles['confusion']) {
				this.debug('Tangled Feet - nullifying accuracy');
				move.accuracy = 0;
			}
		}
	},
	"wonderguard": {
		inherit: true,
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onTryHit: function (target, source, move) {
			if (target.template.speciesid !== 'shedinja' || target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle' || move.isFutureMove) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				this.add('-activate', target, 'ability: Wonder Guard');
				return null;
			}
		}
	}
};
