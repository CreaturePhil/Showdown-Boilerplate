exports.BattleStatuses = {
	par: {
		inherit: true,
		onBeforeMove: function (pokemon) {
			if (pokemon.item === 'luckincense') return;
			if (this.random(4) === 0) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		}
	},
	confusion: {
		inherit: true,
		onBeforeMove: function (pokemon) {
			pokemon.volatiles.confusion.time--;
			if (!pokemon.volatiles.confusion.time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (pokemon.item !== 'luckincense') return;
			if (this.random(2) === 0) {
				return;
			}
			this.directDamage(this.getDamage(pokemon, pokemon, 40));
			return false;
		}
	},
	mustrecharge: {
		inherit: true,
		onBeforeMove: function (pokemon) {
			if (pokemon.item === 'charcoal') return true;
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			return false;
		},
	},
}
