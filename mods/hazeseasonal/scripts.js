"use strict";

exports.BattleScripts = {
        	tryMoveHit: function (target, pokemon, move, spreadHit) {
		if (move.selfdestruct && spreadHit) pokemon.hp = 0;

		this.setActiveMove(move, pokemon, target);
		let hitResult = true;

		hitResult = this.singleEvent('PrepareHit', move, {}, target, pokemon, move);
		if (!hitResult) {
			if (hitResult === false) this.add('-fail', target);
			return false;
		}
		this.runEvent('PrepareHit', pokemon, target, move);

		if (!this.singleEvent('Try', move, null, pokemon, target, move)) {
			return false;
		}

		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			if (move.target === 'all') {
				hitResult = this.runEvent('TryHitField', target, pokemon, move);
			} else {
				hitResult = this.runEvent('TryHitSide', target, pokemon, move);
			}
			if (!hitResult) {
				if (hitResult === false) this.add('-fail', target);
				return true;
			}
			return this.moveHit(target, pokemon, move);
		}

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		if (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type] && !target.runImmunity(move.type, true)) {
			return false;
		}

		if (move.flags['powder'] && target !== pokemon && !this.getImmunity('powder', target)) {
			this.debug('natural powder immunity');
			this.add('-immune', target, '[msg]');
			return false;
		}

		hitResult = this.runEvent('TryHit', target, pokemon, move);
		if (!hitResult) {
			if (hitResult === false) this.add('-fail', target);
			return false;
		}

		let boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

		// calculate true accuracy
		let accuracy = move.accuracy;
		let boosts, boost;
		if (accuracy !== true) {
			if (!move.ignoreAccuracy) {
				boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
				boost = this.clampIntRange(boosts['accuracy'], -6, 6);
				if (boost > 0) {
					accuracy *= boostTable[boost];
				} else {
					accuracy /= boostTable[-boost];
				}
			}
			if (!move.ignoreEvasion) {
				boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
				boost = this.clampIntRange(boosts['evasion'], -6, 6);
				if (boost > 0) {
					accuracy /= boostTable[boost];
				} else if (boost < 0) {
					accuracy *= boostTable[-boost];
				}
			}
		}
		if (move.ohko) { // bypasses accuracy modifiers
			if (!target.isSemiInvulnerable()) {
				accuracy = (move.id=="kickmyass")?100:30;
				if (pokemon.level >= target.level) {
					accuracy += (pokemon.level - target.level);
				} else {
					this.add('-immune', target, '[ohko]');
					return false;
				}
			}
		} else {
			accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
		}
		if (move.alwaysHit || (move.id === 'toxic' && this.gen >= 6 && pokemon.hasType('Poison'))) {
			accuracy = true; // bypasses ohko accuracy modifiers
		} else {
			accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
		}
		if (accuracy !== true && this.random(100) >= accuracy) {
			if (!move.spreadHit) this.attrLastMove('[miss]');
			this.add('-miss', pokemon, target);
			return false;
		}

		if (move.breaksProtect) {
			let broke = false;
			for (let i in {kingsshield:1, protect:1, spikyshield:1}) {
				if (target.removeVolatile(i)) broke = true;
			}
			if (this.gen >= 6 || target.side !== pokemon.side) {
				for (let i in {craftyshield:1, matblock:1, quickguard:1, wideguard:1}) {
					if (target.side.removeSideCondition(i)) broke = true;
				}
			}
			if (broke) {
				if (move.id === 'feint') {
					this.add('-activate', target, 'move: Feint');
				} else {
					this.add('-activate', target, 'move: ' + move.name, '[broken]');
				}
			}
		}

		let totalDamage = 0;
		let damage = 0;
		pokemon.lastDamage = 0;
		if (move.multihit) {
			let hits = move.multihit;
			if (hits.length) {
				// yes, it's hardcoded... meh
				if (hits[0] === 2 && hits[1] === 5) {
					if (this.gen >= 5) {
						hits = [2, 2, 3, 3, 4, 5][this.random(6)];
					} else {
						hits = [2, 2, 2, 3, 3, 3, 4, 5][this.random(8)];
					}
				} else {
					hits = this.random(hits[0], hits[1] + 1);
				}
			}
			hits = Math.floor(hits);
			let nullDamage = true;
			let moveDamage;
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			let isSleepUsable = move.sleepUsable || this.getMove(move.sourceEffect).sleepUsable;
			let i;
			for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
				if (pokemon.status === 'slp' && !isSleepUsable) break;

				if (move.multiaccuracy && i > 0) {
					accuracy = move.accuracy;
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
							boost = this.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
							boost = this.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (!move.alwaysHit) {
						accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
						if (accuracy !== true && this.random(100) >= accuracy) break;
					}
				}

				moveDamage = this.moveHit(target, pokemon, move);
				if (moveDamage === false) break;
				if (nullDamage && (moveDamage || moveDamage === 0 || moveDamage === undefined)) nullDamage = false;
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage = (moveDamage || 0);
				// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
				totalDamage += damage;
				this.eachEvent('Update');
			}
			if (i === 0) return true;
			if (nullDamage) damage = false;
			this.add('-hitcount', target, i);
		} else {
			damage = this.moveHit(target, pokemon, move);
			totalDamage = damage;
		}

		if (move.recoil && totalDamage) {
			this.damage(this.calcRecoilDamage(totalDamage, move), pokemon, target, 'recoil');
		}

		if (target && pokemon !== target) target.gotAttacked(move, damage, pokemon);

		if (move.ohko) this.add('-ohko');

		if (!damage && damage !== 0) return damage;

		if (target && !move.negateSecondary && !(pokemon.hasAbility('sheerforce') && pokemon.volatiles['sheerforce'])) {
			this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
			this.runEvent('AfterMoveSecondary', target, pokemon, move);
		}

		return damage;
	},
	randomSeasonalMeleeTeam: function (side) {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
			'Digital Edge': {
				species: 'Flareon', ability: 'Flair Hax', item: 'Focus Sash', shiny:true,
				moves: ['iciclecrash', 'ironhead', 'uturn'],
				signatureMove: "Sacred Hax",
				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant',
			},
			'PennyGadget': {
				species: 'infernape', ability: 'ironfist', item: 'life orb', gender: 'M',
				moves: ['honeclaws', 'gunkshot', ['machpunch', 'firepunch'][this.random(2)]],
				signatureMove: 'Flame Dash',
				evs: {atk:248, spd:8, spe:252}, nature: 'jolly',
			},

			'Powerpackbot': {
				species: 'klinklang', ability: 'skilllink', item: 'kingsrock', gender: 'M',
				moves: ['iciclespear', 'geargrind', 'shiftgear'],
				signatureMove: 'Grinding Hax',
				evs: {atk:226, spd:16, spe:248}, nature: 'serious',
			},
			'TheRittz': {
				species: 'mew', ability: 'protean', item: 'leftovers', gender: 'M',
				moves: ['hyperspacehole', 'ancientpower', 'thunderwave'],
				signatureMove: 'Ancestral Power',
				evs: {hp:252, spd:252, def:4}, nature: 'timid',
			},
			'The Forgotten Hope': {
				species: 'absol-mega', ability: 'magicbounce', item: 'focussash', gender: 'M',
				moves: ['swordsdance', 'powerwhip', 'playrough'],
				signatureMove: 'celestialpower',
				evs: {atk:252, spd:4, spe:252}, nature: 'jolly',
			},
			'Halow Havoc': {
				species: 'umbreon', ability: 'magic bounce', item: 'leftovers', gender: 'M', shiny: true,
				moves: ['psychic', 'nightdaze', 'wish'],
				signatureMove: 'insperation',
				evs: {hp:252, spd:120, def:136}, nature: 'serious',
			},
			'Flareondriod': {
				species: 'Flareon', ability: 'quickfeet', item: 'toxicorb', gender: 'F',
				moves: ['facade', 'attract', 'milkdrink'],
				signatureMove: 'decentfiremove',
				evs: {atk:252, spd:4, spe:252}, nature: 'adamant',
			},

			'Cleffa Note': {
				species: 'clefable', ability: 'simple', item: 'keeberry', gender: 'F',
				moves: ['storedpower', 'moonblast', 'drainingkiss'],
				signatureMove: 'CalmPool',
				evs: {spa:252, spd:128, def:128}, nature: 'modest',
			},

			'The Last Hour': {
				species: 'diancie-mega', ability: 'speedboost', item: 'focussash', gender: 'M',
				moves: ['nastyplot', 'moonblast', 'earthpower'],
				signatureMove: 'light durst',
				evs: {spa:252, def:4, spe:252}, nature: 'jolly',
			},
			'JadeTheBot': {
				species: 'espeon', ability: 'Speciesball', item: 'lifeorb', gender: 'F',
				moves: ['morningsun', 'moonblast', ['psychic', 'psyshock'][this.random(2)]],
				signatureMove: 'free hax',
				evs: {spa:252, spd:128, def:128}, nature: 'modest',
			},
			'Fischgrat': {
				species: 'Weavile', ability: 'untouchable', item: 'life orb', gender: 'M',
				moves: ['icepunch', 'knockoff', ['pursuit', 'poisonjab'][this.random(2)]],
				signatureMove: 'Frozen shard',
				evs: {atk:248, spd:8, spe:252}, nature: 'jolly',
			},
			'Mogstarz': {
				species: 'sylveon', ability: 'pixilate', item: 'power herb', gender: 'M', shiny: true,
				moves: ['geomancy', 'spacialrend', 'blueflare'],
				signatureMove: 'memezpeed',
				evs: {spa:252, spd:24, def:228, hp: 4}, nature: 'bold',
			},
			'Astr05': {
				species: 'deoxys-speed', ability: 'speedboost', item: 'focussash', gender: 'M',
				moves: ['workup', 'batonpass', ['nastyplot', 'swords dance'][this.random(2)]],
				signatureMove: 'hardedge',
				evs: {hp:252, spd:4, spe:252}, nature: 'timid',
			},
			'Kaushik': {
				species: 'diancie-mega', ability: 'pixilate', item: 'focussash', gender: 'F',
				moves: ['diamondstorm', 'extremespeed','spikyshield'],
				signatureMove: 'urfuckingcustommoveherexaa',
				evs: {atk:252, hp:4, spe:252}, nature: 'jolly',
		},
			'Austin0602': {
				species: 'darkrai', ability: 'speedboost', item: 'focussash', gender: '', shiny: true,
				moves: ['darkvoid', 'nightmare','sludgewave'],
				signatureMove:'hazekills',
				evs: {spa:252, hp:4, spe:252}, nature: 'modest',
		},
	};

		// Generate the team randomly.
		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.level = 100;
			set.name = name;
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (let iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}

		return team;
	},
};
// http://hastebin.com/raw/zavotovonu.cs