exports.BattleItems = {
	brightpowder: {
		inherit: true,
		onAccuracy: function() {},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			return this.chainModify(1.1);
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			return this.chainModify(1.1);
		}
	},
	laxincense: {
		inherit: true,
		onAccuracy: function() {},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			return this.chainModify(1.1);
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			return this.chainModify(1.1);
		}
	},
	luckypunch: {
		inherit: true,
		onModifyAtkPriority: 2,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.template.species === 'Chansey') return this.chainModify(1.25);
		},
		onModifySpAPriority: 2,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.template.species === 'Chansey') return this.chainModify(1.25);
		}
	},
	micleberry: {
		inherit: true,
		effect: {
			duration: 2,
			onModifyAtkPriority: 2,
			onModifyAtk: function (atk, pokemon) {
				return this.chainModify(1.2);
			},
			onModifySpAPriority: 2,
			onModifySpA: function (spa, pokemon) {
				return this.chainModify(1.2);
			}
		}
	},
	quickclaw: {
		inherit: true,
		onModifyPriority: function () {},
		onModifyMove: function (move) {
			if (!move.secondaries) move.secondaries = [];
			for (var i = 0; i < move.secondaries.length; i++) {
				if (move.secondaries[i].boosts && move.secondaries[i].boosts.spe) return;
			}
			move.secondaries.push({
				chance: 20,
				boosts: {spe: 1}
			});
		}
	},
	razorclaw: {
		inherit: true,
		onModifyAtkPriority: 2,
		onModifyAtk: function (atk, pokemon) {
			return this.chainModify(1.125);
		},
		onModifySpAPriority: 2,
		onModifySpA: function (spa, pokemon) {
			return this.chainModify(1.125);
		}
	},
	scopelens: {
		inherit: true,
		onModifyAtkPriority: 2,
		onModifyAtk: function (atk, pokemon) {
			return this.chainModify(1.125);
		},
		onModifySpAPriority: 2,
		onModifySpA: function (spa, pokemon) {
			return this.chainModify(1.125);
		}
	},
	starfberry: {
		inherit: true,
		onEat: function (pokemon) {
			var toBoost = 'atk';
			var previousMax = pokemon.baseStats.atk;
			for (var i in pokemon.baseStats) {
				if (pokemon.baseStats[i] > previousMax && pokemon.boosts[i] < 6) {
					toBoost = i;
					previousMax = pokemon.baseStats[i];
				}
			}
			var boost = {};
			boost[toBoost] = 2;
			this.boost(boost);
		}
	},
	stick: {
		inherit: true,
		onModifyAtkPriority: 2,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.template.species === "Farfetch'd") return this.chainModify(1.25);
		},
		onModifySpAPriority: 2,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.template.species === "Farfetch'd") return this.chainModify(1.25);
		}
	},
	widelens: {
		inherit: true,
		onModifyAtkPriority: 2,
		onModifyAtk: function (atk, pokemon) {
			return this.chainModify(1.1);
		},
		onModifySpAPriority: 2,
		onModifySpA: function (spa, pokemon) {
			return this.chainModify(1.1);
		}
	},
	zoomlens: {
		inherit: true,
		onModifyMove: function (move, user, target) {
			if (typeof move.basePower === 'number' && !this.willMove(target)) {
				this.debug('Zoom Lens boosting power');
				move.basePower *= 1.2;
			}
		}
	}
};
