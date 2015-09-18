/**
 * Gen 2 moves
 */
exports.BattleMovedex = {
	aeroblast: {
		inherit: true,
		critRatio: 3
	},
	bellydrum: {
		inherit: true,
		onHit: function (target) {
			if (target.boosts.atk >= 6) {
				return false;
			}
			if (target.hp <= target.maxhp / 2) {
				this.boost({atk: 2});
				return false;
			}
			this.directDamage(target.maxhp / 2);
			target.setBoost({atk: 6});
			this.add('-setboost', target, 'atk', '6', '[from] move: Belly Drum');
		}
	},
	counter: {
		inherit: true,
		damageCallback: function (pokemon, target) {
			if (pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn && (this.getCategory(pokemon.lastAttackedBy.move) === 'Physical' || this.getMove(pokemon.lastAttackedBy.move).id === 'hiddenpower') && target.lastMove !== 'sleeptalk') {
				return 2 * pokemon.lastAttackedBy.damage;
			}
			return false;
		},
		beforeTurnCallback: function () {},
		onTryHit: function () {},
		effect: {},
		priority: -1
	},
	crabhammer: {
		inherit: true,
		critRatio: 3
	},
	crosschop: {
		inherit: true,
		critRatio: 3
	},
	dig: {
		inherit: true,
		effect: {
			duration: 2,
			onImmunity: function (type, pokemon) {
				if (type === 'sandstorm') return false;
			},
			onAccuracy: function (accuracy, target, source, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude' || move.id === 'fissure') {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			},
			onSourceBasePower: function (basePower, target, source, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			}
		}
	},
	encore: {
		inherit: true,
		effect: {
			durationCallback: function () {
				return this.random(3, 7);
			},
			onStart: function (target) {
				var noEncore = {encore:1, metronome:1, mimic:1, mirrormove:1, sketch:1, sleeptalk:1, struggle:1, transform:1};
				var moveIndex = target.moves.indexOf(target.lastMove);
				if (!target.lastMove || noEncore[target.lastMove] || (target.moveset[moveIndex] && target.moveset[moveIndex].pp <= 0)) {
					// it failed
					this.add('-fail', target);
					delete target.volatiles['encore'];
					return;
				}
				this.effectData.move = target.lastMove;
				this.add('-start', target, 'Encore');
				if (!this.willMove(target)) {
					this.effectData.duration++;
				}
			},
			onOverrideDecision: function (pokemon) {
				return this.effectData.move;
			},
			onResidualOrder: 13,
			onResidual: function (target) {
				if (target.moves.indexOf(target.lastMove) >= 0 && target.moveset[target.moves.indexOf(target.lastMove)].pp <= 0) {
					// early termination if you run out of PP
					delete target.volatiles.encore;
					this.add('-end', target, 'Encore');
				}
			},
			onEnd: function (target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove: function (pokemon) {
				if (!this.effectData.move || !pokemon.hasMove(this.effectData.move)) {
					return;
				}
				for (var i = 0; i < pokemon.moveset.length; i++) {
					if (pokemon.moveset[i].id !== this.effectData.move) {
						pokemon.disableMove(pokemon.moveset[i].id);
					}
				}
			}
		}
	},
	explosion: {
		inherit: true,
		basePower: 250,
		noSketch: true
	},
	fly: {
		inherit: true,
		effect: {
			duration: 2,
			onAccuracy: function (accuracy, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister' || move.id === 'thunder' || move.id === 'whirlwind') {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			},
			onSourceBasePower: function (basePower, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			}
		}
	},
	focusenergy: {
		inherit: true,
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'move: Focus Energy');
			},
			onModifyMovePriority: 1,
			onModifyMove: function (move) {
				move.critRatio += 1;
			}
		}
	},
	highjumpkick: {
		inherit: true,
		onMoveFail: function (target, source, move) {
			if (target.runImmunity('Fighting')) {
				var damage = this.getDamage(source, target, move, true);
				this.damage(this.clampIntRange(damage / 8, 1), source, source, 'highjumpkick');
			}
		}
	},
	jumpkick: {
		inherit: true,
		onMoveFail: function (target, source, move) {
			if (target.runImmunity('Fighting')) {
				var damage = this.getDamage(source, target, move, true);
				this.damage(this.clampIntRange(damage / 8, 1), source, source, 'jumpkick');
			}
		}
	},
	karatechop: {
		inherit: true,
		critRatio: 3
	},
	leechseed: {
		inherit: true,
		onHit: function () {},
		effect: {
			onStart: function (target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onAfterMoveSelf: function (pokemon) {
				var leecher = pokemon.side.foe.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!leecher || leecher.fainted || leecher.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				var toLeech = this.clampIntRange(pokemon.maxhp / 8, 1);
				var damage = this.damage(toLeech, pokemon, leecher);
				if (damage) {
					this.heal(damage, leecher, pokemon);
				}
			}
		}
	},
	lightscreen: {
		inherit: true,
		effect: {
			duration: 5,
			onModifySpD: function (spd) {
				return spd * 2;
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Light Screen');
			}
		}
	},
	lowkick: {
		inherit: true,
		accuracy: 90,
		basePower: 50,
		basePowerCallback: function () {
			return 50;
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch'
		}
	},
	metronome: {
		inherit: true,
		onHit: function (target) {
			var moves = [];
			for (var i in exports.BattleMovedex) {
				var move = exports.BattleMovedex[i];
				if (i !== move.id) continue;
				if (move.isNonstandard) continue;
				var noMetronome = {
					counter:1, destinybond:1, detect:1, endure:1, metronome:1, mimic:1, mirrorcoat:1, protect:1, sketch:1, sleeptalk:1, struggle:1, thief:1
				};
				if (!noMetronome[move.id] && move.num < 252) {
					moves.push(move.id);
				}
			}
			var move = '';
			if (moves.length) move = moves[this.random(moves.length)];
			if (!move) return false;
			this.useMove(move, target);
		},
		noSketch: true
	},
	mirrorcoat: {
		inherit: true,
		effect: {
			duration: 1,
			noCopy: true,
			onStart: function (target, source, source2, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTarget: function (target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onDamagePriority: -101,
			onDamage: function (damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && source.side !== target.side && this.getCategory(effect.id) === 'Special' && target.lastMove !== 'sleeptalk') {
					this.effectData.position = source.position;
					this.effectData.damage = 2 * damage;
				}
			}
		},
		priority: -1
	},
	mimic: {
		inherit: true,
		noSketch: true
	},
	mirrormove: {
		inherit: true,
		onHit: function (pokemon) {
			var noMirror = {metronome: 1, mimic: 1, mirrormove: 1, sketch: 1, sleeptalk: 1, transform: 1};
			var foe = pokemon.side.foe.active[0];
			if (!foe || !foe.lastMove || (!pokemon.activeTurns && !foe.moveThisTurn) || noMirror[foe.lastMove] || pokemon.moves.indexOf(foe.lastMove) >= 0) {
				return false;
			}
			this.useMove(foe.lastMove, pokemon);
		},
		noSketch: true
	},
	moonlight: {
		inherit: true,
		onHit: function (pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				this.heal(pokemon.maxhp);
			} else if (this.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				this.heal(pokemon.maxhp / 4);
			} else {
				this.heal(pokemon.maxhp / 2);
			}
		}
	},
	morningsun: {
		inherit: true,
		onHit: function (pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				this.heal(pokemon.maxhp);
			} else if (this.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				this.heal(pokemon.maxhp / 4);
			} else {
				this.heal(pokemon.maxhp / 2);
			}
		}
	},
	outrage: {
		inherit: true,
		onMoveFail: function (target, source, move) {
			source.addVolatile('lockedmove');
		},
		onAfterMove: function (pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		}
	},
	petaldance: {
		inherit: true,
		onMoveFail: function (target, source, move) {
			source.addVolatile('lockedmove');
		},
		onAfterMove: function (pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		}
	},
	poisongas: {
		inherit: true,
		ignoreImmunity: false
	},
	poisonpowder: {
		inherit: true,
		ignoreImmunity: false
	},
	psywave: {
		inherit: true,
		damageCallback: function (pokemon) {
			return this.random(1, pokemon.level + Math.floor(pokemon.level / 2));
		}
	},
	rage: {
		// TODO
		// Rage boosts in Gens 2-4 is for the duration of Rage only
		// Disable does not build
		inherit: true
	},
	razorleaf: {
		inherit: true,
		critRatio: 3
	},
	razorwind: {
		inherit: true,
		accuracy: 75,
		critRatio: 3
	},
	reflect: {
		inherit: true,
		effect: {
			duration: 5,
			onModifyDef: function (def) {
				return def * 2;
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onResidualOrder: 21,
			onEnd: function (side) {
				this.add('-sideend', side, 'Reflect');
			}
		}
	},
	rest: {
		inherit: true,
		onHit: function (target) {
			if (target.hp >= target.maxhp) return false;
			if (!target.setStatus('slp') && target.status !== 'slp') return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			target.statusData.source = target;
			this.heal(target.maxhp);
			this.add('-status', target, 'slp', '[from] move: Rest');
		},
		secondary: false
	},
	roar: {
		inherit: true,
		onTryHit: function () {
			for (var i = 0; i < this.queue.length; i++) {
				// Roar only works if it is the last action in a turn, including when it's called by Sleep Talk
				if (this.queue[i].choice === 'move' || this.queue[i].choice === 'switch') return false;
			}
		},
		priority: -1
	},
	selfdestruct: {
		inherit: true,
		basePower: 200,
		noSketch: true
	},
	sketch: {
		inherit: true,
		onHit: function () {
			// Sketch always fails in Link Battles
			this.add('-nothing');
		}
	},
	skyattack: {
		inherit: true,
		critRatio: 1,
		secondary: {}
	},
	slash: {
		inherit: true,
		critRatio: 3
	},
	sleeptalk: {
		inherit: true,
		onHit: function (pokemon) {
			var moves = [];
			for (var i = 0; i < pokemon.moveset.length; i++) {
				var move = pokemon.moveset[i].id;
				var NoSleepTalk = {
					bide:1, dig:1, fly:1, metronome:1, mirrormove:1,
					skullbash:1, skyattack:1, sleeptalk:1, solarbeam:1, razorwind:1
				};
				if (move && !NoSleepTalk[move]) {
					moves.push(move);
				}
			}
			var move = '';
			if (moves.length) move = moves[this.random(moves.length)];
			if (!move) return false;
			move.isSleepTalk = true;
			this.useMove(move, pokemon);
		},
		noSketch: true
	},
	solarbeam: {
		inherit: true,
		onBasePower: function (basePower, pokemon, target) {
			if (this.isWeather('raindance')) {
				return this.chainModify(0.5);
			}
		}
	},
	spikes: {
		inherit: true,
		effect: {
			// this is a side condition
			onStart: function (side) {
				if (!this.effectData.layers || this.effectData.layers === 0) {
					this.add('-sidestart', side, 'Spikes');
					this.effectData.layers = 1;
				} else {
					return false;
				}
			},
			onSwitchIn: function (pokemon) {
				var side = pokemon.side;
				if (!pokemon.runImmunity('Ground')) return;
				var damageAmounts = [0, 3];
				var damage = this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			}
		}
	},
	substitute: {
		inherit: true,
		effect: {
			onStart: function (target) {
				this.add('-start', target, 'Substitute');
				this.effectData.hp = Math.floor(target.maxhp / 4);
				delete target.volatiles['partiallytrapped'];
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit: function (target, source, move) {
				if (move.stallingMove) {
					this.add('-fail', source);
					return null;
				}
				if (target === source) {
					this.debug('sub bypass: self hit');
					return;
				}
				if (move.drain) {
					this.add('-hint', "In Gold/Silver/Crystal, draining moves always miss against Substitute.");
					this.add('-miss', source);
					return null;
				}
				if (move.category === 'Status') {
					var SubBlocked = {
						leechseed:1, lockon:1, mindreader:1, nightmare:1, painsplit:1, sketch:1
					};
					if (move.id === 'swagger') {
						// this is safe, move is a copy
						delete move.volatileStatus;
					}
					if (move.status || (move.boosts && move.id !== 'swagger') || move.volatileStatus === 'confusion' || SubBlocked[move.id]) {
						this.add('-activate', target, 'Substitute', '[block] ' + move.name);
						return null;
					}
					return;
				}
				var damage = this.getDamage(source, target, move);
				if (!damage) {
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['substitute'].hp) {
					damage = target.volatiles['substitute'].hp;
				}
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					target.removeVolatile('substitute');
				} else {
					this.add('-activate', target, 'Substitute', '[damage]');
				}
				if (move.recoil) {
					this.damage(Math.round(damage * move.recoil[0] / move.recoil[1]), source, target, 'recoil');
				}
				if (move.drain) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return 0; // hit
			},
			onEnd: function (target) {
				this.add('-end', target, 'Substitute');
			}
		}
	},
	synthesis: {
		inherit: true,
		onHit: function (pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				this.heal(pokemon.maxhp);
			} else if (this.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				this.heal(pokemon.maxhp / 4);
			} else {
				this.heal(pokemon.maxhp / 2);
			}
		}
	},
	thrash: {
		inherit: true,
		onMoveFail: function (target, source, move) {
			source.addVolatile('lockedmove');
		},
		onAfterMove: function (pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		}
	},
	toxic: {
		inherit: true,
		ignoreImmunity: false
	},
	transform: {
		inherit: true,
		noSketch: true
	},
	triattack: {
		inherit: true,
		secondary: {
			chance: 20,
			onHit: function (target, source) {
				if (!target.hasType('Normal')) {
					var result = this.random(3);
					if (result === 0) {
						target.trySetStatus('brn', source);
					} else if (result === 1) {
						target.trySetStatus('par', source);
					} else {
						target.trySetStatus('frz', source);
					}
				}
			}
		}
	},
	whirlwind: {
		inherit: true,
		onTryHit: function () {
			for (var i = 0; i < this.queue.length; i++) {
				// Whirlwind only works if it is the last action in a turn, including when it's called by Sleep Talk
				if (this.queue[i].choice === 'move' || this.queue[i].choice === 'switch') return false;
			}
		},
		priority: -1
	}
};
