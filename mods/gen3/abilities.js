'use strict';

exports.BattleAbilities = {
	"cutecharm": {
		inherit: true,
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(3) < 1) {
					source.addVolatile('attract', target);
				}
			}
		}
	},
	"effectspore": {
		inherit: true,
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact'] && !source.status) {
				let r = this.random(300);
				if (r < 10) {
					source.setStatus('slp');
				} else if (r < 20) {
					source.setStatus('par');
				} else if (r < 30) {
					source.setStatus('psn');
				}
			}
		}
	},
	"flamebody": {
		inherit: true,
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(3) < 1) {
					source.trySetStatus('brn', target, move);
				}
			}
		}
	},
	"flashfire": {
		inherit: true,
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (move.id === 'willowisp' && (target.hasType('Fire') || target.status || target.volatiles['substitute'])) {
					return;
				}
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]');
				}
				return null;
			}
		}
	},
	"lightningrod": {
		desc: "During double battles, this Pokemon draws any single-target Electric-type attack to itself. If an opponent uses an Electric-type attack that affects multiple Pokemon, those targets will be hit. This ability does not affect Electric Hidden Power or Judgment.",
		shortDesc: "This Pokemon draws opposing Electric moves to itself.",
		onFoeRedirectTargetPriority: 1,
		onFoeRedirectTarget: function (target, source, source2, move) {
			if (move.type !== 'Electric') return;
			if (this.validTarget(this.effectData.target, source, move.target)) {
				return this.effectData.target;
			}
		},
		id: "lightningrod",
		name: "Lightning Rod",
		rating: 3.5,
		num: 32
	},
	"pickup": {
		inherit: true,
		onResidualOrder: null,
		onResidualSubOrder: null,
		onResidual: function () {}
	},
	"poisonpoint": {
		inherit: true,
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(3) < 1) {
					source.trySetStatus('psn', target, move);
				}
			}
		}
	},
	"pressure": {
		inherit: true,
		onStart: function () { }
	},
	"roughskin": {
		inherit: true,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 16, source, target);
			}
		}
	},
	"shadowtag": {
		inherit: true,
		onFoeModifyPokemon: function (pokemon) {
			pokemon.trapped = true;
		}
	},
	"static": {
		inherit: true,
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.flags['contact']) {
				if (this.random(3) < 1) {
					source.trySetStatus('par', target, effect);
				}
			}
		}
	},
	"stench": {
		inherit: true,
		onModifyMove: function () {}
	},
	"sturdy": {
		inherit: true,
		onDamage: function () {}
	},
	"synchronize": {
		inherit: true,
		onAfterSetStatus: function (status, target, source) {
			if (!source || source === target) return;
			let id = status.id;
			if (id === 'slp' || id === 'frz') return;
			if (id === 'tox') id = 'psn';
			source.trySetStatus(id);
		}
	},
	"trace": {
		inherit: true,
		onUpdate: function (pokemon) {
			let target = pokemon.side.foe.randomActive();
			if (!target || target.fainted) return;
			let ability = this.getAbility(target.ability);
			let bannedAbilities = {forecast:1, multitype:1, trace:1};
			if (bannedAbilities[target.ability]) {
				return;
			}
			if (pokemon.setAbility(ability)) {
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
			}
		}
	},
	"voltabsorb": {
		inherit: true,
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Electric' && move.id !== 'thunderwave') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]');
				}
				return null;
			}
		}
	}
};
