exports.BattleMovedex = {
	acupressure: {
		inherit: true,
		accuracy: true,
		onHit: function (target) {
			var toBoost = 'atk';
			var previousMax = 0;
			var found = 0;
			for (var i in pokemon.baseStats) {
				if (pokemon.baseStats[i] > previousMax && pokemon.boosts[i] < 6) {
					toBoost = i;
					previousMax = pokemon.baseStats[i];
					found++;
				}

			}
			if (found > 0) {
				var boost = {};
				boost[toBoost] = 2;
				this.boost(boost);
			} else {
				return false;
			}
		}
	},
	aerialace: {
		inherit: true,
		accuracy: true,
		basePower: 80,
		ignoreDefensive: true
	},
	aurasphere: {
		inherit: true,
		basePower: 80,
		ignoreDefensive: true
	},
	blizzard: {
		inherit: true,
		accuracy: true,
		basePower: 77,
		onModifyMove: function (move) {
			if (this.isWeather('hail')) move.basePower = 110;
		}
	},
	bonerush: {
		inherit: true,
		accuracy: true,
		basePower: 26,
		multihit: 3
	},
	bulletseed: {
		inherit: true,
		accuracy: true,
		basePower: 26,
		multihit: 3
	},
	chargebeam: {
		inherit: true,
		accuracy: true,
		basePower: 31,
		secondary: {
			chance: 100,
			self: {boosts: {spa: 1}}
		}
	},
	coil: {
		inherit: true,
		boosts: {
			atk: 2,
			def: 1,
			spa: 1
		}
	},
	cometpunch: {
		inherit: true,
		accuracy: true,
		basePower: 19,
		multihit: 3
	},
	conversion2: {
		inherit: true,
		accuracy: true,
		onHit: function (target, source) {
			if (!target.lastMove) {
				return false;
			}
			var possibleTypes = [];
			var attackType = this.getMove(target.lastMove).type;
			for (var type in this.data.TypeChart) {
				if (source.hasType(type) || target.hasType(type)) continue;
				var typeCheck = this.data.TypeChart[type].damageTaken[attackType];
				if (typeCheck === 2 || typeCheck === 3) {
					possibleTypes.push(type);
				}
			}
			if (!possibleTypes.length) {
				return false;
			}
			var type = possibleTypes[0];
			if (possibleTypes.length > 1) {
				// If there's more than one, let's find if a move has STAB.
				var hasMoveTypes = {};
				for (var n in source.moveset) {
					if (source.moveset[n].category !== 'Status') hasMoveTypes[source.moveset[n].type] = 1;
				}
				for (var i = 0; i < possibleTypes.length; i++) {
					if (possibleTypes[i] in hasMoveTypes) {
						type = possibleTypes[i];
						break;
					}
				}
			}

			if (!source.setType(type)) return false;
			this.add('-start', source, 'typechange', type);
		}
	},
	crushclaw: {
		inherit: true,
		accuracy: true,
		basePower: 36,
		secondary: {chance: 100, boosts: {def: -1}}
	},
	darkvoid: {
		inherit: true,
		accuracy: true,
		status: false,
		volatileStatus: 'darkvoid',
		secondary: {chance: 80, status: 'slp'}
	},
	defog: {
		inherit: true,
		accuracy: true,
		onHit: function (target, source) {
			if (!target.volatiles['substitute']) this.boost({def:-1, spd:-1});
			var sideConditions = {reflect:1, lightscreen:1, safeguard:1, mist:1, spikes:1, toxicspikes:1, stealthrock:1, stickyweb:1};
			for (var i in sideConditions) {
				if (target.side.removeSideCondition(i)) {
					this.add('-sideend', target.side, this.getEffect(i).name, '[from] move: Defog', '[of] ' + target);
				}
			}
			for (var i in sideConditions) {
				if (i === 'reflect' || i === 'lightscreen') continue;
				if (source.side.removeSideCondition(i)) {
					this.add('-sideend', source.side, this.getEffect(i).name, '[from] move: Defog', '[of] ' + source);
				}
			}
		}
	},
	diamondstorm: {
		inherit: true,
		accuracy: true,
		basePower: 47,
		secondary: {
			chance: 100,
			self: {boosts: {def: 1}}
		}
	},
	disarmingvoice: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	doubleteam: {
		inherit: true,
		accuracy: true,
		boosts: {
			def: 1,
			spd: 1
		}
	},
	dynamicpunch: {
		inherit: true,
		accuracy: true,
		basePower: 50,
		secondary: {chance: 100, volatileStatus: 'confusion'}
	},
	feintattack: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	fierydance: {
		inherit: true,
		accuracy: true,
		basePower: 40,
		secondary: {chance: 100, self: {boosts: {spa: 1}}}
	},
	fissure: {
		inherit: true,
		accuracy: true,
		basePower: 90,
		ignoreDefensive: true
	},
	flash: {
		inherit: true,
		accuracy: true,
		boosts: {
			atk: -1,
			spa: -1
		}
	},
	focusenergy: {
		inherit: true,
		accuracy: true,
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'move: Focus Energy');
			},
			onModifyMove: function (move) {
				move.basePower *= 1.25;
			}
		}
	},
	frostbreath: {
		inherit: true,
		accuracy: true,
		basePower: 81,
		ignoreDefensive: true
	},
	glaciate: {
		inherit: true,
		accuracy: true,
		basePower: 61,
		secondary: {chance: 100, boosts: {spe: -1}}
	},
	grasswhistle: {
		inherit: true,
		accuracy: true,
		status: false,
		volatileStatus: 'grasswhistle',
		secondary: {chance: 55, status: 'slp'}
	},
	gravity: {
		inherit: true,
		accuracy: true,
		effect: {
			duration: 5,
			onStart: function () {
				this.add('-fieldstart', 'move: Gravity');
			},
			onBasePowerPriority: 3,
			onBasePower: function (basePower) {
				return this.chainModify(5 / 3);
			},
			onModifyPokemonPriority: 100,
			onModifyPokemon: function (pokemon) {
				pokemon.negateImmunity['Ground'] = true;
				var disabledMoves = {bounce:1, fly:1, highjumpkick:1, jumpkick:1, magnetrise:1, skydrop:1, splash:1, telekinesis:1};
				for (var m in disabledMoves) {
					pokemon.disableMove(m);
				}
				var applies = false;
				if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
					applies = true;
					this.cancelMove(pokemon);
				}
				if (pokemon.volatiles['skydrop']) {
					applies = true;
					this.cancelMove(pokemon);

					if (pokemon.volatiles['skydrop'].source) {
						this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
					}
					pokemon.removeVolatile('skydrop');
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (applies) this.add('-activate', pokemon, 'Gravity');
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				var disabledMoves = {bounce:1, fly:1, highjumpkick:1, jumpkick:1, magnetrise:1, skydrop:1, splash:1, telekinesis:1};
				if (disabledMoves[move.id]) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd: function () {
				this.add('-fieldend', 'move: Gravity');
			}
		}
	},
	guillotine: {
		inherit: true,
		accuracy: true,
		basePower: 90,
		ignoreDefensive: true
	},
	honeclaws: {
		inherit: true,
		accuracy: true,
		boosts: {
			atk: 2,
			spa: 1
		}
	},
	horndrill: {
		inherit: true,
		accuracy: true,
		basePower: 90,
		ignoreDefensive: true
	},
	hurricane: {
		inherit: true,
		accuracy: true,
		basePower: 77,
		onModifyMove: function (move) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				move.basePower = 110;
			} else if (this.isWeather(['sunnyday', 'desolateland'])) {
				move.basePower = 62;
			}
		}
	},
	hypnosis: {
		inherit: true,
		accuracy: true,
		status: false,
		volatileStatus: 'hypnosis',
		secondary: {chance: 60, status: 'slp'}
	},
	inferno: {
		inherit: true,
		accuracy: true,
		basePower: 50,
		secondary: {chance: 100, status: 'brn'}
	},
	kinesis: {
		inherit: true,
		accuracy: true,
		secondary: {chance: 100, boosts: {def: -1, spd: -1}}
	},
	leaftornado: {
		inherit: true,
		accuracy: true,
		basePower: 29,
		secondary: {chance: 100, boosts: {atk: -1, spa: -1}}
	},
	lockon: {
		inherit: true,
		accuracy: true,
		effect: {
			duration: 2,
			onFoeModifyMove: function (move, source, target) {
				if (source === this.effectData.source && move.ohko) {
					move.basePower *= 2;
				}
			}
		}
	},
	lovelykiss: {
		inherit: true,
		accuracy: true,
		status: false,
		volatileStatus: 'lovelykiss',
		secondary: {chance: 75, status: 'slp'}
	},
	luckychant: {
		inherit: true,
		accuracy: true,
		effect: {
			duration: 5,
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Lucky Chant');
			},
			onDamage: function (damage) {
				return damage * 0.875;
			},
			onResidualOrder: 21,
			onResidualSubOrder: 5,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Lucky Chant');
			}
		}
	},
	lusterpurge: {
		inherit: true,
		accuracy: true,
		basePower: 35,
		secondary: {chance: 100, boosts: {spd: -1}}
	},
	magicalleaf: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	magnetbomb: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	magnitude: {
		inherit: true,
		accuracy: true,
		basePower: 90,
		onModifyMove: function () {}
	},
	metronome: {
		inherit: true,
		accuracy: true,
		onHit: function (target, source) {
			var moves = [];
			for (var i in exports.BattleMovedex) {
				var move = exports.BattleMovedex[i];
				if (i !== move.id) continue;
				if (move.isNonstandard) continue;
				var noMetronome = {
					afteryou:1, assist:1, belch:1, bestow:1, celebrate:1, chatter:1, copycat:1, counter:1, covet:1, craftyshield:1, destinybond:1, detect:1, diamondstorm:1, dragonascent:1, endure:1, feint:1, focuspunch:1, followme:1, freezeshock:1, happyhour:1, helpinghand:1, holdhands:1, hyperspacefury:1, hyperspacehole:1, iceburn:1, kingsshield:1, lightofruin:1, matblock:1, mefirst:1, metronome:1, mimic:1, mirrorcoat:1, mirrormove:1, naturepower:1, originpulse:1, precipiceblades:1, protect:1, quash:1, quickguard:1, ragepowder:1, relicsong:1, secretsword:1, sketch:1, sleeptalk:1, snarl:1, snatch:1, snore:1, spikyshield:1, steameruption:1, struggle:1, switcheroo:1, technoblast:1, thief:1, thousandarrows:1, thousandwaves:1, transform:1, trick:1, vcreate:1, wideguard:1
				};
				if (!noMetronome[move.id]) {
					moves.push(move);
				}
			}
			var move = '';
			if (moves.length) {
				if (source.metronome) {
					source.metronome++;
				} else {
					source.metronome = 0;
				}
				move = moves[source.metronome].id;
			}
			if (!move) {
				return false;
			}
			this.useMove(move, target);
		}
	},
	mindreader: {
		inherit: true,
		accuracy: true,
		effect: {
			duration: 2,
			onFoeModifyMove: function (move, source, target) {
				if (source === this.effectData.source && move.ohko) {
					move.basePower *= 2;
				}
			}
		}
	},
	minimize: {
		inherit: true,
		accuracy: true,
		effect: {
			noCopy: true,
			onSourceModifyDamage: function (damage, source, target, move) {
				if (move.id in {'stomp':1, 'steamroller':1, 'bodyslam':1, 'flyingpress':1, 'dragonrush':1, 'phantomforce':1}) {
					return this.chainModify(4);
				}
			}
		},
		boosts: {
			def: 2,
			spd: 2
		}
	},
	miracleeye: {
		inherit: true,
		accuracy: true,
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Miracle Eye');
			},
			onModifyPokemon: function (pokemon) {
				pokemon.negateImmunity['Psychic'] = true;
				pokemon.negateImmunity['Normal'] = true;
				pokemon.negateImmunity['Ghost'] = true;
				pokemon.negateImmunity['Fighting'] = true;
				pokemon.negateImmunity['brn'] = true;
				pokemon.negateImmunity['par'] = true;
				pokemon.negateImmunity['psn'] = true;
				pokemon.negateImmunity['tox'] = true;
				pokemon.negateImmunity['frz'] = true;
				pokemon.negateImmunity['sandstorm'] = true;
				pokemon.negateImmunity['hail'] = true;
			},
			onFoeModifyMove: function (move, source, target) {
				move.ignoreDefensive = true;
			}
		}
	},
	mistball: {
		inherit: true,
		accuracy: true,
		basePower: 35,
		secondary: {chance: 100, boosts: {spa: -1}}
	},
	mudslap: {
		inherit: true,
		accuracy: true,
		secondary: {chance: 100, boosts: {atk: -1, spa: -1}}
	},
	octazooka: {
		inherit: true,
		accuracy: true,
		basePower: 28,
		secondary: {chance: 100, boosts: {atk: -1, spa: -1}}
	},
	odorsleuth: {
		inherit: true,
		accuracy: true,
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Odor Sleuth');
			},
			onModifyPokemon: function (pokemon) {
				pokemon.negateImmunity['Psychic'] = true;
				pokemon.negateImmunity['Normal'] = true;
				pokemon.negateImmunity['Ghost'] = true;
				pokemon.negateImmunity['Fighting'] = true;
				pokemon.negateImmunity['brn'] = true;
				pokemon.negateImmunity['par'] = true;
				pokemon.negateImmunity['psn'] = true;
				pokemon.negateImmunity['tox'] = true;
				pokemon.negateImmunity['frz'] = true;
				pokemon.negateImmunity['sandstorm'] = true;
				pokemon.negateImmunity['hail'] = true;
			},
			onFoeModifyMove: function (move, source, target) {
				move.ignoreDefensive = true;
			}
		}
	},
	poisonfang: {
		inherit: true,
		accuracy: true,
		basePower: 25,
		secondary: {
			chance: 100,
			status: 'tox'
		}
	},
	present: {
		inherit: true,
		accuracy: true,
		basePower: 1,
		onModifyMove: function () {},
		onHit: function (target, source) {
			this.heal(Math.ceil(target.maxhp * 0.25));
		},
		onBasePower: function (basePower, pokemon, target) {
			var percent = Math.ceil(target.hp * target.maxhp / 100);
			var basePower = 60;
			if (percent > 75) {
				basePower = 120;
			} else if (percent > 50) {
				basePower = 100;
			} else if (percent > 25) {
				basePower = 80;
			}
			return basePower;
		}
	},
	psywave: {
		inherit: true,
		accuracy: true,
		damageCallback: function (pokemon) {
			return pokemon.level + 50;
		}
	},
	rockblast: {
		inherit: true,
		accuracy: true,
		basePower: 26,
		multihit: 3
	},
	rocksmash: {
		inherit: true,
		accuracy: true,
		basePower: 20,
		secondary: {chance: 100, boosts: {def: -1}}
	},
	sandattack: {
		inherit: true,
		accuracy: true,
		boosts: {
			atk: -1,
			spa: -1
		}
	},
	seedflare: {
		inherit: true,
		accuracy: true,
		secondary: {
			chance: 80,
			boosts: {
				spd: -1
			}
		},
	},
	shadowpunch: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	sheercold: {
		inherit: true,
		accuracy: true,
		basePower: 90,
		ignoreDefensive: true
	},
	shockwave: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	sing: {
		inherit: true,
		accuracy: true,
		status: false,
		volatileStatus: 'sing',
		secondary: {chance: 55, status: 'slp'}
	},
	sleeptalk: {
		inherit: true,
		accuracy: true,
		onHit: function (pokemon) {
			var moves = [];
			for (var i = 0; i < pokemon.moveset.length; i++) {
				var move = pokemon.moveset[i].id;
				var NoSleepTalk = {
					assist:1, bide:1, chatter:1, copycat:1, focuspunch:1, mefirst:1, metronome:1, mimic:1, mirrormove:1, naturepower:1, rest:1, sketch:1, sleeptalk:1, uproar:1
				};
				if (move && !(NoSleepTalk[move] || this.getMove(move).isTwoTurnMove)) {
					moves.push(move);
				}
			}
			var move = '';
			if (moves.length) move = moves[0];
			if (!move) {
				return false;
			}
			this.useMove(move, pokemon);
		},
	},
	sleeppowder: {
		inherit: true,
		accuracy: true,
		status: false,
		volatileStatus: 'sleeppowder',
		secondary: {chance: 75, status: 'slp'}
	},
	sleeptalk: {
		inherit: true,
		accuracy: true,
		onHit: function (pokemon) {
			if (pokemon.status !== 'slp') return false;
			var moves = [];
			for (var i = 0; i < pokemon.moveset.length; i++) {
				var move = pokemon.moveset[i].id;
				var NoSleepTalk = {
					assist:1, bide:1, chatter:1, copycat:1, focuspunch:1, mefirst:1, metronome:1, mimic:1, mirrormove:1, naturepower:1, sketch:1, sleeptalk:1, uproar:1
				};
				if (move && !(NoSleepTalk[move] || this.getMove(move).isTwoTurnMove)) {
					moves.push(move);
				}
			}
			var move = '';
			if (moves.length) move = moves[this.random(moves.length)];
			if (!move) {
				return false;
			}
			this.useMove(move, pokemon);
		}
	},
	smokescreen: {
		inherit: true,
		accuracy: true,
		boosts: {
			atk: -1,
			spa: -1
		}
	},
	spikecannon: {
		inherit: true,
		accuracy: true,
		basePower: 21,
		multihit: 3
	},
	stormthrow: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	sweetscent: {
		inherit: true,
		accuracy: true,
		boosts: {
			def: -2,
			spd: -2
		}
	},
	swift: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	tailslap: {
		inherit: true,
		accuracy: true,
		basePower: 26,
		multihit: 3
	},
	telekinesis: {
		inherit: true,
		accuracy: true,
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Telekinesis');
			},
			onModifyPokemon: function (pokemon) {
				pokemon.negateImmunity['Psychic'] = true;
				pokemon.negateImmunity['Normal'] = true;
				pokemon.negateImmunity['Ghost'] = true;
				pokemon.negateImmunity['Fighting'] = true;
				pokemon.negateImmunity['brn'] = true;
				pokemon.negateImmunity['par'] = true;
				pokemon.negateImmunity['psn'] = true;
				pokemon.negateImmunity['tox'] = true;
				pokemon.negateImmunity['frz'] = true;
				pokemon.negateImmunity['sandstorm'] = true;
				pokemon.negateImmunity['hail'] = true;
			},
			onFoeModifyMove: function (move, source, target) {
				move.ignoreDefensive = true;
			}
		}
	},
	thunder: {
		inherit: true,
		accuracy: true,
		onModifyMove: function (move) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				move.basePower = 110;
			} else if (this.isWeather(['sunnyday', 'desolateland'])) {
				move.basePower = 62;
			}
		}
	},
	triattack: {
		inherit: true,
		secondaries: [{
			chance: 20,
			status: 'brn'
		}, {
			chance: 20,
			status: 'par'
		} ,{
			chance: 20,
			status: 'frz'
		}]
	},
	vitalthrow: {
		inherit: true,
		accuracy: true,
		ignoreDefensive: true
	},
	watershuriken: {
		inherit: true,
		accuracy: true,
		basePower: 16,
		multihit: 3
	},
	willowisp: {
		inherit: true,
		accuracy: true,
		status: false,
		volatileStatus: 'willowisp',
		secondary: {chance: 85, status: 'brn'}
	}
};
