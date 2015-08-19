exports.BattleStatuses = {
	par: {
		inherit: true,
		onBeforeMove: function (pokemon) {}
	},
	slp: {
		inherit: true,
		onStart: function (target) {
			this.add('-status', target, 'slp');
			this.effectData.startTime = 3;
			this.effectData.time = this.effectData.startTime;
		}
	},
	frz: {
		inherit: true,
		onStart: function (target) {
			this.add('-status', target, 'frz');
			if (target.species === 'Shaymin-Sky' && target.baseTemplate.species === target.species) {
				var template = this.getTemplate('Shaymin');
				target.formeChange(template);
				target.baseTemplate = template;
				target.setAbility(template.abilities['0']);
				target.baseAbility = target.ability;
				target.details = template.species + (target.level === 100 ? '' : ', L' + target.level) + (target.gender === '' ? '' : ', ' + target.gender) + (target.set.shiny ? ', shiny' : '');
				this.add('detailschange', target, target.details);
				this.add('message', target.species + " has reverted to Land Forme! (placeholder)");
			}
			this.effectData.startTime = 5;
			this.effectData.time = this.effectData.startTime;
		},
		onHit: function (target, source, move) {
			if (move.thawsTarget || move.type in {'Fire':1, 'Rock':1, 'Fighting':1, 'Normal':1, 'Ground':1}) {
				target.cureStatus();
			}
		},
		onBeforeMovePriority: 2,
		onBeforeMove: function (pokemon, target, move) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		}
	},
	confusion: {
		// this is a volatile status
		onStart: function (target, source, sourceEffect) {
			var result = this.runEvent('TryConfusion', target, source, sourceEffect);
			if (!result) return result;
			this.add('-start', target, 'confusion');
			this.effectData.time = 4;
		},
		onEnd: function (target) {
			this.add('-end', target, 'confusion');
		},
		onModifyDamage: function (damage, source, target, move) {
			source.volatiles.confusion.time--;
			if (!source.volatiles.confusion.time) {
				source.removeVolatile('confusion');
				return;
			}
			this.add('-activate', source, 'confusion');
			this.directDamage(this.getDamage(pokemon, pokemon, 20));
			return this.chainModify(0.5);
		}
	},
	partiallytrapped: {
		inherit: true,
		duration: 5,
		durationCallback: function (target, source) {
			if (source.hasItem('gripclaw')) return 8;
			return 5;
		}
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		duration: 2,
		inherit: true,
		onStart: function (target, source, effect) {
			this.effectData.trueDuration = 2;
			this.effectData.move = effect.id;
		},
		onRestart: function () {
			if (this.effectData.trueDuration >= 2) {
				this.effectData.duration = 2;
			}
		}
	},
	stall: {
		// Protect, Detect, Endure counter
		duration: 2,
		onStart: function () {
			this.effectData.counter = 1;
			this.effectData.move = this.activeMove.id;
		},
		onStallMove: function () {
			// Don't allow pointless Endure stall
			var move = this.activeMove.id;
			if (move === 'endure' || move === 'craftyshield') {
				return !this.effectData.counter;
			}
		},
		onFoeModifyMove: function (move) {
			if (move === 'endure' || move === 'craftyshield' || this.effectData.duration === 1) return;
			if (this.effectData.counter !== 1) {
				move.isNotProtectable = true;
			}
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 1 - Math.pow(2, 1 - this.effectData.counter);
				}
			}
		},
		onSourceModifyDamage: function () {
			var move = this.effectData.move;
			if (move === 'endure' || move === 'craftyshield' || this.effectData.duration === 1) return;
			return this.chainModify(1 - Math.pow(2, 1 - this.effectData.counter));
		},
		onRestart: function () {
			this.effectData.counter += 1;
			this.effectData.duration = 2;
			this.effectData.move = this.activeMove.id;
		}
	}
};
