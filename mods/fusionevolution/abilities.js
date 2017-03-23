'use strict';
exports.BattleAbilities = {


	"turnabouttorrent": {
		desc: "When this Pokemon has 1/3 or more of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Water attacks do 1.5x damage. Stat changes are reversed",
		onBoost: function(boost) {
			for (var i in boost) {
				boost[i] *= -1;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp >= attacker.maxhp / 3) {
				this.debug('Turnabout Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp >= attacker.maxhp / 3) {
				this.debug('Turnabout Torrent boost');
				return this.chainModify(1.5);
			}
		},
		id: "turnabouttorrent",
		name: "Turnabout Torrent",
		rating: 2,
		num: 192
	},


	"intimidatingscales": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
			}
			if (foeactive[i].volatiles['substitute']) {
				this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
			} else {
				this.boost({
					atk: -1
				}, foeactive[i], pokemon);
			}
		},
		onModifyDefPriority: 6,
		onModifyDef: function(def, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		id: "intimidatingscales",
		name: "Intimidating Scales",
		rating: 3.5,
		num: 193
	},


	"hugetorrent": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Water attacks do 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(2);
			}
		},

		id: "hugetorrent",
		name: "Huge Torrent",
		rating: 2,
		num: 194
	},
	/* Spandamn its starting to crack from here so commenting it, fix it */

	/*	"flashweather": {
			desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
			shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
			onTryHit: function (target, source, move) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				if (target !== source && move.type === 'Fire') {
					move.accuracy = true;
					if (!target.addVolatile('flashfire')) {
						this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
					}
					return null;
			}
			},
			onEnd: function (pokemon) {
				pokemon.removeVolatile('flashfire');
			},
			effect: {
				noCopy: true, // doesn't get copied by Baton Pass
				onStart: function (target) {
					this.add('-start', target, 'ability: Flash Fire');
				},
				onModifyAtkPriority: 5,
				onModifyAtk: function (atk, attacker, defender, move) {
					if (move.type === 'Fire') {
						this.debug('Flash Fire boost');
						return this.chainModify(1.5);
					}
				},
				onModifySpAPriority: 5,
				onModifySpA: function (atk, attacker, defender, move) {
					if (move.type === 'Fire') {
						this.debug('Flash Fire boost');
						return this.chainModify(1.5);
					}
				},
				onEnd: function (target) {
					this.add('-end', target, 'ability: Flash Fire', '[silent]');
				}
	},
				if (this.isWeather(['raindance', 'primordialsea'])) {
				if (target !== source && move.type === 'water') {
					move.accuracy = true;
					if (!target.addVolatile('flashwater')) {
						this.add('-immune', target, '[msg]', '[from] ability: Flash water');
					}
					return null;
				}
			},
			onEnd: function (pokemon) {
				pokemon.removeVolatile('flashwater');
			},
			effect: {
				noCopy: true, // doesn't get copied by Baton Pass
				onStart: function (target) {
					this.add('-start', target, 'ability: Flash water');
				},
				onModifyAtkPriority: 5,
				onModifyAtk: function (atk, attacker, defender, move) {
					if (move.type === 'water') {
						this.debug('Flash water boost');
						return this.chainModify(1.5);
					}
				},
				onModifySpAPriority: 5,
				onModifySpA: function (atk, attacker, defender, move) {
					if (move.type === 'water') {
						this.debug('Flash water boost');
						return this.chainModify(1.5);
					}
				},
				onEnd: function (target) {
					this.add('-end', target, 'ability: Flash water', '[silent]');
				}
	},
	if (this.isWeather(['hail'])) {
	if (target !== source && move.type === 'ice') {
					move.accuracy = true;
					if (!target.addVolatile('flashice')) {
						this.add('-immune', target, '[msg]', '[from] ability: Flash ice');
					}
					return null;
				}
			},
			onEnd: function (pokemon) {
				pokemon.removeVolatile('flashice');
			},
			effect: {
				noCopy: true, // doesn't get copied by Baton Pass
				onStart: function (target) {
					this.add('-start', target, 'ability: Flash ice');
				},
				onModifyAtkPriority: 5,
				onModifyAtk: function (atk, attacker, defender, move) {
					if (move.type === 'ice') {
						this.debug('Flash ice boost');
						return this.chainModify(1.5);
					}
				},
				onModifySpAPriority: 5,
				onModifySpA: function (atk, attacker, defender, move) {
					if (move.type === 'ice') {
						this.debug('Flash ice boost');
						return this.chainModify(1.5);
					}
				},
				onEnd: function (target) {
					this.add('-end', target, 'ability: Flash ice', '[silent]');
				}
	},

	if (this.isWeather(['sandstorm'])) {
	if (target !== source && move.type === 'rock') {
					move.accuracy = true;
					if (!target.addVolatile('flashrock')) {
						this.add('-immune', target, '[msg]', '[from] ability: Flash rock');
					}
					return null;
				}
			},
			onEnd: function (pokemon) {
				pokemon.removeVolatile('flashrock');
			},
			effect: {
				noCopy: true, // doesn't get copied by Baton Pass
				onStart: function (target) {
					this.add('-start', target, 'ability: Flash rock');
				},
				onModifyAtkPriority: 5,
				onModifyAtk: function (atk, attacker, defender, move) {
					if (move.type === 'rock') {
						this.debug('Flash rock boost');
						return this.chainModify(1.5);
					}
				},
				onModifySpAPriority: 5,
				onModifySpA: function (atk, attacker, defender, move) {
					if (move.type === 'rock') {
						this.debug('Flash rock boost');
						return this.chainModify(1.5);
					}
				},
				onEnd: function (target) {
					this.add('-end', target, 'ability: Flash rock', '[silent]');
				}

	},


			
			id: "flashfire",
			name: "Flash Fire",
			rating: 3,
			num: 195
		},

	"intenserivalry": {
		desc: "This Pokemon's attacks have their power multiplied by 1.25 against targets of the same gender or multiplied by 0.75 against targets of the opposite gender. There is no modifier if either this Pokemon or the target is genderless.",
		shortDesc: "This Pokemon's attacks do 1.25x on same gender targets; 0.75x on opposite gender.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
			if (attacker.gender === defender.gender) {
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		stopAttackEvents: true,
				} 
			}
		},
		id: "intenserivalry",
		name: "Intense Rivalry",
		rating: 0.5,
		num: 196

		},
*/
"intimidateveil": {
	desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
	shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
	onStart: function(pokemon) {
		var foeactive = pokemon.side.foe.active;
		var activated = false;
		for (var i = 0; i < foeactive.length; i++) {
			if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
			if (!activated) {
				this.add('-ability', pokemon, 'Intimidate');
				activated = true;
			}
		}
		if (foeactive[i].volatiles['substitute']) {
			this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
		} else {
			this.boost({
				atk: -1
			}, foeactive[i], pokemon);
		}
	},
	onImmunity: function(type, pokemon) {
		if (type === 'sandstorm') return false;
	},
	onModifyAccuracy: function(accuracy) {
		if (typeof accuracy !== 'number') return;
		if (this.isWeather('sandstorm')) {
			this.debug('Sand Veil - decreasing accuracy');
			return accuracy * 0.8;
		}
	},
	id: "intimidateveil",
	name: "Intimidateveil",
	rating: 3.5,
	num: 197
},


"levipoison": {
	desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
	shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
	onImmunity: function(type) {
		if (type === 'Ground') return false;
		{
			source.trySetStatus('psn', target, move);
		}

	},
	id: "levipoison",
	name: "Levipoison",
	rating: 3.5,
	num: 198,

	"unburden": {
		desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
		shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
		onAfterUseItem: function(item, pokemon) {
			if (pokemon !== this.effectData.target)
				return this.boost({
					atk: 2,
					spe: 2
				});
			return this.boost({
				def: -1,
				spd: -1
			});
		},
		onTakeItem: function(item, pokemon) {
			return this.boost({
				atk: 2,
				spe: 2
			});
			return this.boost({
				def: -1,
				spd: -1
			});
		},

		id: "armorcast",
		name: "Armor Cast",
		rating: 3.5,
		num: 199
	},

	"obliviousabsorb": {
		desc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability while affected cures it.",
		shortDesc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability cures it.",
		onUpdate: function(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'attract') {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Oblivious');
				return null;
			}
		},
		onTryHit: function(pokemon, target, move) {
			if (move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Oblivious');
				this.heal(target.maxhp / 8);
				return null;
			}
		},
		id: "obliviousabsorb",
		name: "Oblivious Absorb",
		rating: 1,
		num: 200
	},

	"fear": {
		desc: "This Pokemon does not take recoil damage besides Struggle, Life Orb, and crash damage.",
		shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
		onDamage: function(damage, target, source, effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
			onStart: function(pokemon) {
				var foeactive = pokemon.side.foe.active;
				var activated = false;
				for (var i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Intimidate');
						activated = true;
					}
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
				} else {
					this.boost({
						atk: -1
					}, foeactive[i], pokemon);
				}
			}
		},
		id: "fear",
		name: "FEAR",
		rating: 3,
		num: 201
	},

	"cactuspower": {
		shortDesc: "On switch-in, this Pokemon summons Sandstorm.",
		onStart: function(source) {
			this.setWeather('sandstorm');
		},
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		}
	},
	id: "cactuspower",
	name: "Cactus Power",
	rating: 4.5,
	num: 202
},

"snowforce": {
	desc: "If Sandstorm is active, this Pokemon's Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
	shortDesc: "This Pokemon's Ice attacks do 1.3x in Hail; immunity to it.",
	onBasePowerPriority: 8,
	onBasePower: function(basePower, attacker, defender, move) {
		if (this.isWeather('hail')) {
			if (move.type === 'Ice) {
				this.debug('Snow Force boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		}
	},
	"sandyskin": {
		desc: "This Pokemon has its major status condition cured at the end of each turn if Rain Dance is active.",
		shortDesc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active.",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function(pokemon) {
			if (pokemon.status && this.isWeather(['sandstorm'])) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		id: "sandyskin",
		name: "Sandy Skin",
		rating: 2,
		num: 203
	},
	"technicutter": {
		desc: "This Pokemon's moves of 60 power or less have their power multiplied by 1.5. Does affect Struggle.",
		shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. Includes Struggle.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		onBoost: function(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost['atk'] && boost['atk'] < 0) {
				boost['atk'] = 0;
				if (!effect.secondaries) this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", "[of] " + target);
			}
		},
		id: "technicutter",
		name: "Technicutter",
		rating: 4,
		num: 204
	},
	"chlorovolt": {
		shortDesc: "If Electric Terrain is active, this Pokemon's Speed is multiplied by 1.5.",
		onModifySpePriority: 6,
		onModifySpe: function(pokemon) {
			if (this.isTerrain('electricterrain')) return this.chainModify(1.5);
		},
		id: "chlorvolt",
		name: "Chloro Volt",
		rating: 0.5,
		num: 205
	},
	"healingfat": {
		desc: "If this Pokemon is poisoned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss.",
		onDamage: function(damage, target, source, effect) {
			if (effect.id === 'brn' || effect.id === 'frz') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onUpdate: function(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		id: "healingfat",
		name: "Healing Fat",
		rating: 4,
		num: 206
	},

	"mummyfortitude": {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onTryHit: function(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function(damage, target, source, effect) {
			if (source.ability === 'mummy' && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-activate', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		id: "mummmyfortitude",
		name: "Mummy Fortitude",
		rating: 3,
		num: 207
	},
	"blazingbody": {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onTryHit: function(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		id: "blazingbody",
		name: "blazing body",
		rating: 3,
		num: 208
	},
	"staticstorm": {
		desc: "If Hail is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Hail.",
		shortDesc: "If Hail is active, this Pokemon heals 1/16 of its max HP each turn; immunity to Hail.",
		onWeather: function(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.maxhp / 16);
			}
		},
		onAfterDamage: function(damage, target, source, effect) {
			if (this.random(10) < 3) {
				source.trySetStatus('par', target, effect);
			}

		},
		onImmunity: function(type, pokemon) {
			if (type === 'hail') return false;
		},
		id: "staticstorm",
		name: "static storm",
		rating: 1.5,
		num: 209
	},
	"dreadedflames": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
			}
			if (foeactive[i].volatiles['substitute']) {
				this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
			} else {
				this.boost({
					atk: -1
				}, foeactive[i], pokemon);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		id: "dreadedflames",
		name: "Dreaded Flames",
		rating: 3.5,
		num: 210
	},
	"rockygrowth": {
		desc: "This Pokemon does not take recoil damage besides Struggle, Life Orb, and crash damage.",
		shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
		onDamage: function(damage, target, source, effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		id: "rockygrowth",
		name: "Rocky Growth",
		rating: 3,
		num: 211
	},
	"pristine": {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onTryHit: function(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		onUpdate: function(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'frz' || pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'par' && target.hp = minhp) {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'brn' || type === 'frz' || type === 'psn' || type === 'tox' || type === 'par' && target.hp = minhp) return false;
		},
		id: "pristine",
		name: "Pristine",
		rating: 3,
		num: 212
	},
	"innerbody": {
		shortDesc: "This Pokemon cannot be made to flinch.",
		onFlinch: false,
		onAfterDamage: function(damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.trySetStatus('brn', target, move);
				}
			}
		},
		id: "innerbody",
		name: "Inner Body",
		rating: 1.5,
		num: 213
	},
	"intimidatingfangs": {
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be poisoned.",
		onAfterDamage: function(damage, target, source, move) {
			if (move && move.flags['contact']) {
				{
					var foeactive = pokemon.side.foe.active;
					var activated = false;
					for (var i = 0; i < foeactive.length; i++) {
						if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Intimidate');
							activated = true;
						}
					}
					if (foeactive[i].volatiles['substitute']) {
						this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
					} else {
						this.boost({
							atk: -1
						}, foeactive[i], pokemon);
					}
				}
			}
		},
		id: "intimidatingfangs",
		name: "Intimidating Fangs",
		rating: 2,
		num: 214
	},
	"intimidatingabsorption": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
				} else {
					this.boost({
						atk: -1
					}, foeactive[i], pokemon);
				}
			}
		},
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Water Absorb');
				}
				return null;
			}
		},

		id: "intimidatingabsorption",
		name: "Intimidating Absorption",
		rating: 3.5,
		num: 215
	},
	"keenfeet": {
		desc: "This Pokemon's Attack is raised by 2 stages for each of its stat stages that is lowered by an opposing Pokemon.",
		shortDesc: "This Pokemon's Attack is raised by 2 for each of its stats that is lowered by a foe.",
		onAfterEachBoost: function(boost, target, source) {
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
				this.boost({
					evasion: 2
				});
			}
		},
		id: "keen feet",
		name: "keen feet",
		rating: 2.5,
		num: 216
	},
	"swiftabsorb": {
		desc: "This Pokemon is immune to water-type moves. The first time it is hit by a water-type move, its attacking stat is multiplied by 1.5 while using a water-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by water-type attacks.",
		shortDesc: "This Pokemon's water attacks do 1.5x damage if hit by one water move; water immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'water') {
				move.accuracy = true;
				if (!target.addVolatile('swiftabsorb')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash water');
				}
				return null;
			}
		},
		onEnd: function(pokemon) {
			pokemon.removeVolatile('swiftabsorb');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function(target) {
				this.add('-start', target, 'ability: Swift Absorb');
			},
			onModifySpePriority: 5,
			onModifySpe: function(atk, attacker, defender, move) {
				this.debug('Flash water boost');
				return this.chainModify(2);

			},

			onEnd: function(target) {
				this.add('-end', target, 'ability: Flash water', '[silent]');
			}
		},
		id: "swiftabsorb",
		name: "Swift Absorb",
		rating: 3,
		num: 217
	},

	"mathsurge": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Bug attacks do 1.5x damage.",
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Math surge');
				return this.chainModify(1.5);
			}
		},
		id: "mathsurge",
		name: "Math Surge",
		rating: 2,
		num: 218
	},

	"flameessence": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Flame Essence');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Flame Essence');
				return this.chainModify(1.5);
			}
		},
		id: "flameessence",
		name: "Flame Essence",
		rating: 2,
		num: 219
	},

	"naturalguard": {
		shortDesc: "Every move used by or against this Pokemon will always hit.",
		onAnyAccuracy: function(accuracy, target, source, move) {
			if (move && (source === this.effectData.target || pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'brn' || pokemon.status === 'frz' || pokemon.status === 'par')) {
				return true;
			}
			return accuracy;
			pokemon.cureStatus();
		},
		id: "naturalguard",
		name: "Natural Guard",
		rating: 4,
		num: 220
	},

	"stickylevitation": {
		shortDesc: "This Pokemon cannot lose its held item due to another Pokemon's attack.",
		onTakeItem: function(item, pokemon, source) {
			if (this.suppressingAttackEvents() && pokemon !== this.activePokemon) return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		onImmunity: function(type) {
			if (type === 'Ground') return false;
		},
		id: "stickylevitation",
		name: "Sticky Levitation",
		rating: 1.5,
		num: 221
	},

	"serenefire": {
		desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd: function(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},

			onModifyMove: function(move) {
				if (!move || !move.type === 'Fire']) return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
				status: 'brn'
			});
		},

		onEnd: function(target) {
			this.add('-end', target, 'ability: Flash Fire', '[silent]');
		}
	},
	id: "serenefire",
	name: "Serene Fire",
	rating: 3,
	num: 222
},

"healingblaze": {
	desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
	shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
	onModifyAtkPriority: 5,
	onModifyAtk: function(atk, attacker, defender, move) {
		if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
			this.debug('Blaze boost');
			return this.chainModify(1.5);
			pokemon.cureStatus();
		}
	},
	onModifySpAPriority: 5,
	onModifySpA: function(atk, attacker, defender, move) {
		if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
			this.debug('Blaze boost');
			return this.chainModify(1.5);
			pokemon.cureStatus();
		}
	},
	id: "healingblaze",
	name: "Healing Blaze",
	rating: 2,
	num: 223
},

"barbstance": {
	desc: "If this Pokemon is an Ferroslash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
	shortDesc: "If Ferroslash, changes Forme to Blade before attacks and Shield before King's Shield.",
	onBeforeMovePriority: 11,
	onBeforeMove: function(attacker, defender, move) {
		if (attacker.template.baseSpecies !== 'Ferroslash') return;
		if (move.category === 'Status' && move.id !== 'kingsshield') return;
		var targetSpecies = (move.id === 'kingsshield' ? 'Ferroslash' : 'Ferroslash-Blade');
		if (attacker.template.species !== targetSpecies && attacker.formeChange(targetSpecies)) {
			this.add('-formechange', attacker, targetSpecies);
		}
	},
	id: "barbstance",
	name: "Barb Stance",
	rating: 5,
	num: 224
},

"poweruppinch": {
	desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
	shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
	onModifyAtkPriority: 5,
	onModifyAtk: function(atk, attacker, defender, move) {
		if (attacker.hp <= attacker.maxhp / 5) {
			this.debug('Blaze boost');
			return this.chainModify(1.25);
		}
	},
	onModifySpAPriority: 5,
	onModifySpA: function(atk, attacker, defender, move) {
		if (attacker.hp <= attacker.maxhp / 5) {
			this.debug('Blaze boost');
			return this.chainModify(1.25);
		}
	},
	id: "poweruppinch",
	name: "Power Up Pinch",
	rating: 2,
	num: 225
},

"electrotechnic": {
	desc: "This Pokemon's moves of 60 power or less have their power multiplied by 1.5. Does affect Struggle.",
	shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. Includes Struggle.",
	onBasePowerPriority: 8,
	onBasePower: function(basePower, attacker, defender, move) {
		if (basePower <= 60) {
			this.debug('Technician boost');
			return this.chainModify(1.5);
		}
	},
	onModifySpAPriority: 5,
	onModifySpA: function(spa, pokemon) {
		var allyActive = pokemon.side.active;
		if (allyActive.length === 1) {
			return;
		}
		for (var i = 0; i < allyActive.length; i++) {
			if (allyActive[i] && allyActive[i].position !== pokemon.position && !allyActive[i].fainted && allyActive[i].hasAbility(['minus', 'plus'])) {
				return this.chainModify(1.5);
			}
		}
	},
	id: "electrotechnic",
	name: "ElectroTechnic",
	rating: 4,
	num: 226
},

"speedbreak": {
	shortDesc: "If this Pokemon has a stat stage raised it is lowered instead, and vice versa.",
	onBoost: function(boost) {
		boost.spe *= -1;
	},
	id: "speedbreak",
	name: "Speed Break",
	rating: 4,
	num: 227
},

"justicepower": {
	shortDesc: "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move.",
	onAfterDamage: function(damage, target, source, effect) {
		if (effect && effect.type === 'Dark') {
			this.boost({
				atk: 1
			});
		}
	},

	onDeductPP: function(damage, target, source, effect) {
		if (effect && effect.type === 'Dark') return;
		return 1;
	},
	id: "justicepower",
	name: "Justice Power",
	rating: 2,
	num: 228
},

"cursedtrace": {
	desc: "On switch-in, this Pokemon copies a random adjacent opposing Pokemon's Ability. If there is no Ability that can be copied at that time, this Ability will activate as soon as an Ability can be copied. Abilities that cannot be copied are Flower Gift, Forecast, Illusion, Imposter, Multitype, Stance Change, Trace, and Zen Mode.",
	shortDesc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability.",
	onUpdate: function(pokemon) {
		var possibleTargets = [];
		for (var i = 0; i < pokemon.side.foe.active.length; i++) {
			if (pokemon.side.foe.active[i] && !pokemon.side.foe.active[i].fainted) possibleTargets.push(pokemon.side.foe.active[i]);
		}
		while (possibleTargets.length) {
			var rand = 0;
			if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
			var target = possibleTargets[rand];
			var ability = this.getAbility(target.ability);
			var bannedAbilities = {
				flowergift: 1,
				forecast: 1,
				illusion: 1,
				imposter: 1,
				multitype: 1,
				stancechange: 1,
				trace: 1,
				zenmode: 1
			};
			if (bannedAbilities[target.ability]) {
				possibleTargets.splice(rand, 1);
				continue;
			}
			this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
			pokemon.setAbility(ability);
			return;
		}
	},
	if (source.ability == target.ability)
	{
		onStart: function(pokemon) {
			this.add('-endability', pokemon);
			this.singleEvent('End', this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
		}
	},
	id: "cursedtrace",
	name: "cursed Trace",
	rating: 3,
	num: 229
},


"sheerflight": {
	desc: "This Pokemon's attacks with secondary effects have their power multiplied by 1.3, but the secondary effects are removed.",
	shortDesc: "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects.",
	onImmunity: function(move, pokemon, type) {
		{
			if (move.secondaries) {
				if (type === 'Ground') return false;
			}
		}
	},
	onModifyMove: function(move, pokemon) {
		if (move.secondaries) {
			delete move.secondaries;
			// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
			pokemon.addVolatile('sheerforce');
		}
	},
	effect: {
		duration: 1,
		onBasePowerPriority: 8,
		onBasePower: function(basePower, pokemon, target, move) {
			return this.chainModify([0x14CD, 0x1000]);
		}
	},
	id: "sheerflight",
	name: "Sheer Flight",
	rating: 4,
	num: 230
},

"evaporation": {
	desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
	shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
	onTryHit: function(target, source, move) {
		if (target !== source && move.type === 'Water') {
			move.accuracy = true;
			if (!target.addVolatile('flashfire')) {
				this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
			}
			return null;
		}
	},
	onEnd: function(pokemon) {
		pokemon.removeVolatile('flashfire');
	},
	effect: {
		noCopy: true, // doesn't get copied by Baton Pass
		onStart: function(target) {
			this.add('-start', target, 'ability: Flash Fire');
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Flash Fire boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Flash Fire boost');
				return this.chainModify(1.5);
			}
		},
		onEnd: function(target) {
			this.add('-end', target, 'ability: Flash Fire', '[silent]');
		}
	},

	"hardbody": {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onBoost: function(boost, target, source, effect) {
			{

				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
		},
		onModifySpe: function(spe, pokemon) {
			if (pokemon.status === 'par') {
				return this.chainModify(1.5);
			}
		},
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		id: "hardbody",
		name: "Hard Body",
		rating: 2,
		num: 231
	},

	"gutbreaker": {
		shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		stopAttackEvents: true,
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		id: "gutbreaker",
		name: "Gut Breaker",
		rating: 3.5,
		num: 232
	},

	"synchofloat": {
		desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
		shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
		onImmunity: function(type) {
			if (type === 'Ground') return false;
		},
		var oldAbility = source.setAbility('levitate', source, 'levitate', true);
		if (oldAbility) {
			this.add('-activate', target, 'ability: Levitate', oldAbility, '[of] ' + source);
		},
		id: "synchofloat",
		name: "Synchofloat",
		rating: 3.5,
		num: 233
	},

	"magicianswand": {
		desc: "This Pokemon is immune to Electric-type moves and raises its Special Attack by 1 stage when hit by an Electric-type move. If this Pokemon is not the target of a single-target Electric-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move.",
		shortDesc: "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity.",
		onTryHit: function(target) {
			if (target.hasAbility('stickyhold')) {
				this.add('-immune', target, '[msg]');
				return null;
			}
		},
		onHit: function(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				var yourItem = target.takeItem(source);
				var myItem = source.takeItem();
				if (target.item || source.item || (!yourItem && !myItem) ||
					(myItem.onTakeItem && myItem.onTakeItem(myItem, target) === false)) {
					if (yourItem) target.item = yourItem;
					if (myItem) source.item = myItem;
					return false;
				}
				this.add('-activate', source, 'move: Trick', '[of] ' + target);
				if (myItem) {
					target.setItem(myItem);
					this.add('-item', target, myItem, '[from] Trick');
				}
				if (yourItem) {
					source.setItem(yourItem);
					this.add('-item', source, yourItem, '[from] Trick');
				}
			}
		},
		id: "magicianswand",
		name: "Magician's Wand",
		rating: 3.5,
		num: 234
	},

	"cleanmatch": {
		desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
		shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",

		onModifySpe: function(spe, pokemon) {
			if (!pokemon.item) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtk: function(atk, pokemon) {
			if (!pokemon.item) {
				return this.chainModify(1.5);
			}

		},
		id: "cleanmatch",
		name: "cleanmatch",
		rating: 3.5,
		num: 235
	},

	"positivegrowth": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Bug attacks do 1.5x damage.",
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Math surge');
				return this.chainModify(1.5);
			}
		},
		id: "positive growth",
		name: "Positive Growth",
		rating: 2,
		num: 236
	},

	"slowandsteady": {
		desc: "If a Pokemon uses a Fire- or Ice-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "Fire/Ice-type moves against this Pokemon deal damage with a halved attacking stat.",
		onModifyAtkPriority: 8,
		onSourceModifyAtk: function(attacker, defender, move) {
			if (!this.willMove(defender)) {
				this.debug('Slow and Steady weakens');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 8,
		onSourceModifySpA: function(attacker, defender, move) {
			if (!this.willMove(defender)) {
				this.debug('Slow and Steady weakens');
				return this.chainModify(0.5);
			}
		},
		id: "slowandsteady",
		name: "Slow And Steady",
		rating: 3.5,
		num: 237
	},

	"errormacro": {
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
		shortDesc: "If Aegislash, changes Forme to Blade before attacks and Shield before King's Shield.",
		getCategory: function(move) {
			move = this.getMove(move);
			if (move.category === 'Status') return 'Status';
			if (move.category === 'Physical') return 'Special';
			return 'Physical';
		},
		onBeforeMovePriority: 11,
		onBeforeMove: function(attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Aegislash') return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			var targetSpecies = (move.id === 'kingsshield' ? 'Aegilene' : 'Aegislash-Saber');
			if (attacker.template.species !== targetSpecies && attacker.formeChange(targetSpecies)) {
				this.add('-formechange', attacker, targetSpecies);
			}
		},
		id: "errormacro",
		name: "Error Macro",
		rating: 5,
		num: 238
	},

	"latebloomer": {
		desc: "The power of this Pokemon's move is multiplied by 1.3 if it is the last to move in a turn. Does not affect Doom Desire and Future Sight.",
		shortDesc: "This Pokemon's attacks have 1.3x power if it is the last to move in a turn.",
		OnAfterDamagePriority: 8,
		onAfterDamage: function(damage, attacker, defender, move) {
			if (!this.willMove(defender)) {
				if (this.random(10) < 3) {
					source.addVolatile('attract', target);
				}
			}
		},
		id: "latebloomer",
		name: "Late Bloomer",
		rating: 2,
		num: 239
	},

	"sturdytempo": {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onUpdate: function(pokemon) {
			if (pokemon.volatiles['confusion']) {
				pokemon.removeVolatile('confusion');
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'confusion') {
				this.add('-immune', pokemon, 'confusion');
				return false;
			}
		},
		onTryHit: function(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		id: "sturdytempo",
		name: "Sturdy Tempo",
		rating: 3,
		num: 240
	},

	"tangledflames": {
		desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd: function(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, target attacker, defender, move) {
				if (move.type === 'Fire' || target && target.volatiles['confusion']) {
					this.debug('Flash Fire boost');
					return this.chainModify(2);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Fire' || target && target.volatiles['confusion']) {
					this.debug('Flash Fire boost');
					return this.chainModify(2);
				}
			},
			onEnd: function(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			}
		},
		id: "tangledflames",
		name: "Tangled Flames",
		rating: 3,
		num: 241
	},

	"hydrostream": {
		shortDesc: "On switch-in, this Pokemon summons Rain Dance.",
		onStart: function(source) {
			this.setWeather('raindance');
		},
		id: "hydrostream",
		name: "Hydro Stream",
		rating: 4.5,
		num: 242
	},

	"hydrate": {
		desc: "This Pokemon's Normal-type moves become Ice-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.3x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = 'Water';
				if (move.category !== 'Status') pokemon.addVolatile('refrigerate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "hydrate",
		name: "Hydrate",
		rating: 4,
		num: 243
	},

	"breaker": {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		stopAttackEvents: true,
		onBoost: function(boost, target, source, effect) {
			for (var i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
		},
		onAnyModifyBoost: function(boosts, target) {
			var source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		id: "breaker",
		name: "Breaker",
		rating: 2,
		num: 244
	},

	"hammerspace": {
		shortDesc: "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out.",
		onSwitchOut: function(pokemon) {
			pokemon.setItem(pokemon.lastItem);
			this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Hammer Space');
		},
		id: "hammer space",
		name: "Hammer Space",
		rating: 4,
		num: 245
	},

	"sereneeyes": {
		shortDesc: "This Pokemon's moves have their secondary effect chance doubled.",
		onModifyMovePriority: -2,
		onModifyMove: function(move) {
			if (move.secondaries && move.id !== 'secretpower') {
				this.debug('doubling secondary chance');
				move.accuracy *= 2;
			}
		},
		id: "sereneeyes",
		name: "Serene Eyes",
		rating: 4,
		num: 246
	},

	"leafstream": {
		shortDesc: "On switch-in, this Pokemon summons Sunny Day.",
		onStart: function(source) {
			this.setWeather('sunnyday');
		},
		id: "leafstream",
		name: "LeafStream",
		rating: 4.5,
		num: 247
	},

	"cybercriminal": {
		desc: "This Pokemon's Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		onSourceFaint: function(target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1
				}, source);
			}
		},
		id: "cybercriminal",
		name: "Cyber Criminal",
		rating: 3.5,
		num: 248
	},

	"seamonster": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Torrent boost');
				return this.chainModify(1.1);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Torrent boost');
				return this.chainModify(1.1);
			}
		},
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
				} else {
					this.boost({
						atk: -1
					}, foeactive[i], pokemon);
				}
			}
		},
		id: "seamonster",
		name: "Sea Monster",
		rating: 3.5,
		num: 249
	},

	"underpressure": {
		desc: "This Pokemon has its major status condition cured at the end of each turn if Rain Dance is active.",
		shortDesc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active.",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function(pokemon) {
			if (pokemon.status) {
				this.debug('under pressure');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
		},
		onDeductPP: function(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		id: "underpressure",
		name: "Under Pressure",
		rating: 2,
		num: 250
	},

	"naturaleye": {
		desc: "All non-damaging moves that check accuracy have their accuracy changed to 50% when used on this Pokemon. This change is done before any other accuracy modifying effects.",
		shortDesc: "Status moves with accuracy checks are 50% accurate when used on this Pokemon.",
		onModifyAccuracyPriority: 10,
		onModifyAccuracy: function(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof move.accuracy === 'number') {
				this.debug('Wonder Skin - setting accuracy to 50');
				return 0;
			}
		},
		id: "naturaleye",
		name: "Natural Eye",
		rating: 2,
		num: 251
	},

	"overwhelmingpresence": {
		shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
		onStart: function(pokemon) {
			this.add('-start', pokemon, 'Embargo');
			this.add('-endability', pokemon);
			this.singleEvent('End', this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid')
		},
		// Item suppression implemented in BattlePokemon.ignoringItem() within battle-engine.js
		// Ability suppression implemented in BattlePokemon.ignoringAbility() within battle-engine.js
		onResidualOrder: 18,
		onEnd: function(pokemon) {
			this.add('-end', pokemon, 'Embargo');
		},
		id: "overwhelmingpresence",
		name: "Overwhelming Presence",
		rating: 3.5,
		num: 252
	},

	"monsoon": {
		desc: "If this Pokemon is a Casting, its type changes to the current weather condition's type, except Sandstorm.",
		shortDesc: "Casting's secondary type changes to the current weather condition's type, except Sandstorm.",
		onUpdate: function(pokemon) {
			if (pokemon.baseTemplate.species !== 'Casting' || pokemon.transformed) return;
			var forme = null;
			switch (this.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					if (pokemon.template.speciesid !== 'castingsunny') forme = 'Casting-Sunny';
					break;
				case 'raindance':
				case 'primordialsea':
					if (pokemon.template.speciesid !== 'castingrainy') forme = 'Casting-Rainy';
					break;
				case 'hail':
					if (pokemon.template.speciesid !== 'castingsnowy') forme = 'Casting-Snowy';
					break;
				default:
					if (pokemon.template.speciesid !== 'casting') forme = 'Casting';
					break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme);
				this.add('-formechange', pokemon, forme, '[msg]');
			}
		},
		id: "monsoon",
		name: "Monsoon",
		rating: 3,
		num: 253
	},

	"monsoonaltered": {
		desc: "If this Pokemon is a Casting, its type changes to the current weather condition's type, except Sandstorm.",
		shortDesc: "Casting's secondary type changes to the current weather condition's type, except Sandstorm.",
		onUpdate: function(pokemon) {
			if (pokemon.baseTemplate.species !== 'Casting' || pokemon.transformed) return;
			var forme = null;
			switch (this.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					if (pokemon.template.speciesid !== 'castingsunny') forme = 'Casting-Sunny';
					break;
				case 'raindance':
				case 'primordialsea':
					if (pokemon.template.speciesid !== 'castingrainy') forme = 'Casting-Rainy';
					break;
				case 'hail':
					if (pokemon.template.speciesid !== 'castingicy') forme = 'Casting-Icy';
					break;
				default:
					if (pokemon.template.speciesid !== 'casting') forme = 'Casting';
					break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme);
				this.add('-formechange', pokemon, forme, '[msg]');
			}
		},
		onImmunity: function(type) {
			if (type === 'Ground') return false;
		},
		id: "monsoonaltered",
		name: "Monsoon-Altered",
		rating: 3,
		num: 254

	},
};
