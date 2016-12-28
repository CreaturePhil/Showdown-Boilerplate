'use strict';
exports.BattleScripts = {
	pokemon: {
		constructor(set, side) {
			this.side = side;
			this.battle = side.battle;
			let pokemonScripts = this.battle.data.Scripts.pokemon;
			if (pokemonScripts) Object.assign(this, pokemonScripts);
			if (typeof set === 'string') set = {
				name: set
			};
			// "pre-bound" functions for nicer syntax (avoids repeated use of `bind`)
			this.getHealth = (this.getHealth || BattlePokemon.getHealth).bind(this);
			this.getDetails = (this.getDetails || BattlePokemon.getDetails).bind(this);
			this.set = set;
			this.baseTemplate = this.battle.getTemplate(set.species || set.name);
			if (!this.baseTemplate.exists) {
				this.battle.debug('Unidentified species: ' + this.species);
				this.baseTemplate = this.battle.getTemplate('Unown');
			}
			this.species = Tools.getSpecies(set.species);
			if (set.name === set.species || !set.name) {
				set.name = this.baseTemplate.baseSpecies;
			}
			this.donorSpecies = this.battle.getTemplate(toId(set.name.split(" (")[1])).species;
			this.name = set.name.split(" (")[0].substr(0, 20);
			this.speciesid = toId(this.species);
			this.template = this.baseTemplate;
			this.moves = [];
			this.baseMoves = this.moves;
			this.movepp = {};
			this.moveset = [];
			this.baseMoveset = [];
			this.trapped = false;
			this.maybeTrapped = false;
			this.maybeDisabled = false;
			this.illusion = null;
			this.fainted = false;
			this.faintQueued = false;
			this.lastItem = '';
			this.ateBerry = false;
			this.status = '';
			this.position = 0;
			this.lastMove = '';
			this.moveThisTurn = '';
			this.lastDamage = 0;
			this.lastAttackedBy = null;
			this.usedItemThisTurn = false;
			this.newlySwitched = false;
			this.beingCalledBack = false;
			this.isActive = false;
			this.isStarted = false; // has this pokemon's Start events run yet?
			this.transformed = false;
			this.duringMove = false;
			this.speed = 0;
			this.abilityOrder = 0;
			set.level = this.battle.clampIntRange(set.forcedLevel || set.level || 100, 1, 9999);
			this.level = set.level;
			let genders = {
				M: 'M',
				F: 'F',
				N: 'N'
			};
			this.gender = genders[set.gender] || this.template.gender || (Math.random() * 2 < 1 ? 'M' : 'F');
			if (this.gender === 'N') this.gender = '';
			this.happiness = typeof set.happiness === 'number' ? this.battle.clampIntRange(set.happiness, 0, 255) : 255;
			this.pokeball = this.set.pokeball || 'pokeball';
			this.fullname = this.side.id + ': ' + this.name;
			this.details = this.species + (this.level === 100 ? '' : ', L' + this.level) + (this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
			this.id = this.fullname; // shouldn't really be used anywhere
			this.statusData = {};
			this.volatiles = {};
			this.height = this.template.height;
			this.heightm = this.template.heightm;
			this.weight = this.template.weight;
			this.weightkg = this.template.weightkg;
			this.baseAbility = toId(set.ability);
			this.ability = this.baseAbility;
			this.item = toId(set.item);
			this.abilityData = {
				id: this.ability
			};
			this.itemData = {
				id: this.item
			};
			this.speciesData = {
				id: this.speciesid
			};
			this.types = this.baseTemplate.types;
			this.addedType = '';
			this.knownType = true;
			let desiredHPType;
			if (this.set.moves) {
				for (let i = 0; i < this.set.moves.length; i++) {
					let move = this.battle.getMove(this.set.moves[i]);
					if (!move.id) continue;
					if (move.id === 'hiddenpower' && move.type !== 'Normal') {
						const ivValues = this.set.ivs && Object.values(this.set.ivs);
						desiredHPType = move.type;
						if (this.battle.gen && this.battle.gen <= 2) {
							if (!ivValues || Math.min.apply(null, ivValues) >= 30) {
								let HPdvs = this.battle.getType(desiredHPType).HPdvs;
								this.set.ivs = {
									hp: 30,
									atk: 30,
									def: 30,
									spa: 30,
									spd: 30,
									spe: 30
								};
								for (let i in HPdvs) {
									this.set.ivs[i] = HPdvs[i] * 2;
								}
							}
						} else if (this.battle.gen <= 6) {
							if (!ivValues || ivValues.every(val => val === 31)) {
								this.set.ivs = this.battle.getType(desiredHPType).HPivs;
							}
						}
						move = this.battle.getMove('hiddenpower');
					}
					this.baseMoveset.push({
						move: move.name,
						id: move.id,
						pp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						disabledSource: '',
						used: false,
					});
					this.moves.push(move.id);
				}
			}
			this.canMegaEvo = this.battle.canMegaEvo(this);
			if (!this.set.evs) {
				this.set.evs = {
					hp: 0,
					atk: 0,
					def: 0,
					spa: 0,
					spd: 0,
					spe: 0
				};
			}
			if (!this.set.ivs) {
				this.set.ivs = {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				};
			}
			let stats = {
				hp: 31,
				atk: 31,
				def: 31,
				spe: 31,
				spa: 31,
				spd: 31
			};
			for (let i in stats) {
				if (!this.set.evs[i]) this.set.evs[i] = 0;
				if (!this.set.ivs[i] && this.set.ivs[i] !== 0) this.set.ivs[i] = 31;
			}
			for (let i in this.set.evs) {
				this.set.evs[i] = this.battle.clampIntRange(this.set.evs[i], 0, 255);
			}
			for (let i in this.set.ivs) {
				this.set.ivs[i] = this.battle.clampIntRange(this.set.ivs[i], 0, 31);
			}
			if (this.battle.gen && this.battle.gen <= 2) {
				// We represent DVs using even IVs. Ensure they are in fact even.
				for (let i in this.set.ivs) {
					this.set.ivs[i] &= 30;
				}
			}
			let hpTypes = ['Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark'];
			if (this.battle.gen && this.battle.gen === 2) {
				// Gen 2 specific Hidden Power check. IVs are still treated 0-31 so we get them 0-15
				let atkDV = Math.floor(this.set.ivs.atk / 2);
				let defDV = Math.floor(this.set.ivs.def / 2);
				let speDV = Math.floor(this.set.ivs.spe / 2);
				let spcDV = Math.floor(this.set.ivs.spa / 2);
				this.hpType = hpTypes[4 * (atkDV % 4) + (defDV % 4)];
				this.hpPower = Math.floor((5 * ((spcDV >> 3) + (2 * (speDV >> 3)) + (4 * (defDV >> 3)) + (8 * (atkDV >> 3))) + (spcDV > 2 ? 3 : spcDV)) / 2 + 31);
			} else {
				// Hidden Power check for gen 3 onwards
				let hpTypeX = 0,
					hpPowerX = 0;
				let i = 1;
				for (let s in stats) {
					hpTypeX += i * (this.set.ivs[s] % 2);
					hpPowerX += i * (Math.floor(this.set.ivs[s] / 2) % 2);
					i *= 2;
				}
				this.hpType = hpTypes[Math.floor(hpTypeX * 15 / 63)];
				// In Gen 6, Hidden Power is always 60 base power
				this.hpPower = (this.battle.gen && this.battle.gen < 6) ? Math.floor(hpPowerX * 40 / 63) + 30 : 60;
			}
			if (this.battle.gen >= 7 && desiredHPType && (this.level === 100 || set.forcedLevel || this.battle.getFormat().team)) {
				this.hpType = desiredHPType;
			}
			this.boosts = {
				atk: 0,
				def: 0,
				spa: 0,
				spd: 0,
				spe: 0,
				accuracy: 0,
				evasion: 0
			};
			this.stats = {
				atk: 0,
				def: 0,
				spa: 0,
				spd: 0,
				spe: 0
			};
			this.baseStats = this.battle.spreadModify(this.template.baseStats, this.set);
			// This is used in gen 1 only, here to avoid code repetition.
			// Only declared if gen 1 to avoid declaring an object we aren't going to need.
			if (this.battle.gen === 1) this.modifiedStats = {
				atk: 0,
				def: 0,
				spa: 0,
				spd: 0,
				spe: 0
			};
			this.maxhp = this.template.maxHP || this.baseStats.hp;
			this.hp = this.hp || this.maxhp;
			this.isStale = 0;
			this.isStaleCon = 0;
			this.isStaleHP = this.maxhp;
			this.isStalePPTurns = 0;
			// Transform copies IVs in gen 4 and earlier, so we track the base IVs/HP-type/power
			this.baseIvs = this.set.ivs;
			this.baseHpType = this.hpType;
			this.baseHpPower = this.hpPower;
			this.clearVolatile(true);
		},
	}
};