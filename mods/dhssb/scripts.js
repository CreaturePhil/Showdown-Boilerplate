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
                        'Zmeeed': {
				species: 'Latios', ability: 'Snow Warning', item: 'Safety Goggles', gender: 'M',
				moves: ['psystrike', 'aurasphere', 'blizzard'],
				signatureMove: "Rush B",
				evs: {spd:4, spa:252, spe:252}, nature: 'Timid',
			},
			'Loominite': {
				species: 'Giratina-Origin', ability: 'The Underlord', item: 'Griseous Orb', gender: 'M', shiny:true,
				moves: ['willowisp', 'shadowball', 'dragonpulse'],
				signatureMove: "The Loom Effect",
				ivs: {hp:31, atk:0, def:31, spa:31, spd:31, spe:31}, nature: 'Modest',
			},
			'charizard8888': {
				species: 'Charizard-Mega-X', ability: 'Refrigerate', item: 'Charizardite X', gender: 'M',
				moves: ['fakeout', 'extremespeed', 'flareblitz'],
				signatureMove: "ggm8",
				evs: {spd:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Tejas10': {
				species: 'Darkrai', ability: 'Dankster', item: 'Black Glasses', gender: 'M',
				moves: ['nastyplot', 'darkpulse', 'dracometeor'],
				signatureMove: "Too Dank for ya",
				evs: {spe:4, spa:252, spd:252}, nature: 'Modest',
			},
			'Lost Cause 146': {
				species: 'Weavile', ability: 'Sheer Force', item: 'Life Orb', gender: 'M',
				moves: ['icepunch', 'knockoff', 'poisonjab'],
				signatureMove: "Dragon Blades",
				evs: {spd:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Quiet Chimchar': {
				species: 'Chimchar', ability: 'Flame Guard', item: 'Focus Sash', gender: 'M',
				moves: ['batonpass', 'firepunch', 'uturn'],
				signatureMove: "Cha Cha Dance",
				evs: {hp:4, atk:252, spe:252}, nature: 'Quiet',
			},
			'Paul☯71': {
				species: 'Palkia', ability: 'discover me', item: 'Leftovers', gender: 'M',
				moves: ['hyperbeam', 'outrage', 'waterspout'],
				signatureMove: "Kick My Ass",
				evs: {spd:4, atk:252, spe:252}, nature: 'Adamant',
			},
			'ClassyZ': {
				species: 'Scizor-Mega', ability: 'Technician', item: 'Scizorite', gender: 'F', shiny: true,
				moves: ['machpunch', 'bulletpunch', 'swordsdance'],
				signatureMove: 'Hyperspeed Punch',
				evs: {atk:252, spd:4, hp:252}, nature: 'Adamant',
			},
			'PI EddyChomp': {
				species: 'Garchomp-Mega', ability: 'Epic Claws', item: 'Focus Sash',
				moves: ['precipiceblades', 'dragonclaw', 'sacredfire'],
				signatureMove: "GARCHOMP EPICNESS",
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant',
			},
			'Snaq': {
				species: 'Magikarp', ability: 'Parting Shot Spam', item: 'Air Balloon',
				moves: ['splash'],
				evs: {}, nature: 'Serious',
			},
			'Snaquaza': {
				species: 'Lapras', ability: 'Shell Armor Clone', item: 'Leftovers',
				moves: ['icebeam', 'surf', 'ancientpower'],
				signatureMove: "Ice Shard",
				evs: {hp:252, atk:252, def:252, spa:252, spd:252, spe:252}, nature: 'Serious',
			},
			'Hydrostatics': {
				species: 'Palkia', ability: 'Pressure Breaker', item: 'Leftovers', gender: 'M' , shiny:true,
				moves: ['spacialrend', 'hydropump', 'flashcannon'],
				signatureMove: "Space Compress",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest',
			},
			'Digital Edge': {
				species: 'Flareon', ability: 'Flair Hax', item: 'Focus Sash', shiny:true,
				moves: ['iciclecrash', 'ironhead', 'uturn'],
				signatureMove: "Sacred Hax",
				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant',
			},
			'Ransei': {
				species: 'Rayquaza', ability: 'Wonder Breaker', item: 'Life Orb', gender: ['M'],shiny:true,
				moves: ['dragonpulse', 'tailglow', 'dracometeor'],
				signatureMove: "Legend's Ambition",
				evs: {hp:248, atk:252, spa:252, spe:252}, nature: 'Mild',
			},
			'Flygonerz': {
				species: 'Flygon', ability: 'Tough Bounce', item: 'Focus Sash', gender: ['F'],shiny:true,
				moves: ['outrage', 'thousandarrows', 'extremespeed'],
				signatureMove: "Dragon Shift",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Eternal Mayhem': {
				species: 'Kyurem-B', ability: 'Breakthrough', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['outrage','icebeam','fusionbolt'], name: 'Eternal Mayhem',
				signatureMove: "Dragon Symphony",
				evs: {hp:248, spa:8, atk:252}, nature: 'Naughty',
			},
			'Spandan': {
			    species: 'Salamence', ability: 'Multiscale', item: 'Salamencite', gender: 'M',
				moves: ['extremespeed', 'shiftgear', 'boomburst'],
				signatureMove: "Yo MaMMa Joke",
				evs: {hp: 252, atk:252, def:252, spa:252, spd:252, spe:252}, nature: 'Naive',
			},
			'SnakeXZero5': {
			    species: 'Sneasel', ability: 'Knowledge', item: 'Liechi Berry', gender: 'M',
				moves: ['icepunch', 'knockoff', 'fakeout'],
				signatureMove: "Logic Power",
				evs: {atk:252, spd:6, spe:252}, nature: 'Adamant',
			},
			'Theswordbreaker': {
			    species: 'Arceus-Dragon', ability: 'Breaking Point', item: 'Draco Plate', gender: 'M',
				moves: ['spacialrend', 'focusblast', 'blizzard'],
				signatureMove: "Wait and hope",
				evs: {spa:252, spd:4, spe:252}, nature: 'Modest',
			},
			'The God of Haxorus': {
				species: 'Haxorus', ability: 'Blessed Hax', item: 'Life Orb', gender: 'M',
				moves: ['ironhead', 'diamondstorm', 'sacredfire'],
				signatureMove: "Haxing Rage",
				evs: {atk:252, spe:252, spd:4}, nature: 'Adamant',
			},
			'XpRienzo ☑-☑': {
 				species: 'Reshiram', ability: 'Adaptability', item: 'Charcoal', gender: 'M',
 				moves: ['fusionflare', 'spacialrend', 'voltswitch'],
 				signatureMove: "blehflame",
 				evs: {spa:252, spd:4, spe:252}, nature: 'Timid',
 			},
			'BatterBotto': {
 				species: 'Dragonite', ability: 'Protean', item: 'Iron Ball', gender: 'M', shiny:true,
 				moves: ['highjumpkick', 'extremespeed', 'vcreate'],
 				signatureMove: "massacre",
 				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant',
 			},
			'OutrageousBoT': {
 				species: 'Gyarados', ability: 'Dragon Fury', item: 'Life Orb', gender: 'M',
 				moves: ['outrage', 'dragondance', 'dracometeor'],
 				signatureMove: "Raging Lake",
 				evs: {spa:252, spd:4, spe:252}, nature: 'Jolly',
 			},
			'FlareonDriod': {
 				species: 'Flareon', ability: 'Slowchat', item: 'Charcoal', gender: 'F',
 				moves: ['vcreate', 'recover', 'bellydrum'],
 				signatureMove: "banhammah",
 				evs: {hp: 252, atk: 252, spe:252}, nature: 'Jolly',
 			},
			'Dragitbot': {
 				species: 'Dratini', ability: 'Hidden', item: 'Leftovers', gender: 'F',
 				moves: ['swordsdance', 'agility', 'nastyplot'],
 				signatureMove: "superswitch",
 				evs: {hp:252, def:252, spd:4}, nature: 'Bold',
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
