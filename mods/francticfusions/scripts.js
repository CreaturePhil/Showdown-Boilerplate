'use strict';

exports.BattleScripts = {
	init: function()
	{
			Object.values(this.data.Abilities).forEach(ability => {
					this.data.Statuses[ability.id] = ability;
					this.data.Statuses[ability.id].effectType = "Ability";
					this.data.Statuses[ability.id].noCopy = true;
			});
	},
	pokemon: {
                 constructor(set, side) {
		this.side = side;
		this.battle = side.battle;

		let pokemonScripts = this.battle.data.Scripts.pokemon;
		if (pokemonScripts) Object.assign(this, pokemonScripts);

		if (typeof set === 'string') set = {name: set};

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
		this.name = set.name.substr(0, 20);
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

		this.level = this.battle.clampIntRange(set.forcedLevel || set.level || 100, 1, 9999);

		let genders = {M:'M', F:'F', N:'N'};
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
		this.abilityData = {id: this.ability};
		this.itemData = {id: this.item};
		this.speciesData = {id: this.speciesid};

		this.types = this.baseTemplate.types;
		this.addedType = '';
		this.knownType = true;

		if (this.set.moves) {
			for (let i = 0; i < this.set.moves.length; i++) {
				let move = this.battle.getMove(this.set.moves[i]);
				if (!move.id) continue;
				if (move.id === 'hiddenpower' && move.type !== 'Normal') {
					const ivValues = this.set.ivs && Object.values(this.set.ivs);
					if (this.battle.gen && this.battle.gen <= 2) {
						if (!ivValues || Math.min.apply(null, ivValues) >= 30) {
							let HPdvs = this.battle.getType(move.type).HPdvs;
							this.set.ivs = {hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30};
							for (let i in HPdvs) {
								this.set.ivs[i] = HPdvs[i] * 2;
							}
						}
					} else {
						if (!ivValues || ivValues.every(val => val === 31)) {
							this.set.ivs = this.battle.getType(move.type).HPivs;
						}
					}
					move = this.battle.getMove('hiddenpower');
				}
				this.baseMoveset.push({
					move: move.name,
					id: move.id,
					pp: (move.noPPBoosts ? move.pp : move.pp * 8 / 5),
					maxpp: (move.noPPBoosts ? move.pp : move.pp * 8 / 5),
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
			this.set.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
		}
		if (!this.set.ivs) {
			this.set.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
		}
		let stats = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
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
			let hpTypeX = 0, hpPowerX = 0;
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

		this.boosts = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0};
		this.stats = {atk:0, def:0, spa:0, spd:0, spe:0};
		this.baseStats = {atk:10, def:10, spa:10, spd:10, spe:10};
		// This is used in gen 1 only, here to avoid code repetition.
		// Only declared if gen 1 to avoid declaring an object we aren't going to need.
		if (this.battle.gen === 1) this.modifiedStats = {atk:0, def:0, spa:0, spd:0, spe:0};
if(toId(this.set.name) !== toId(this.set.species) && this.battle.getTemplate(toId(this.set.name)))
{
let template = this.battle.getTemplate(this.set.species);
			let crossTemplate = this.battle.getTemplate(this.set.name);
			if (!crossTemplate.exists) return false;
			if (!template.abilities) return false;
			this.illusion = null;
			this.template = template;
			this.types = template.types;
			this.addedType = '';
			// Base Stat changes
			let delta = Math.floor((crossTemplate.baseStats["hp"]+this.baseStats["hp"])/2);
			let boostedHP = Math.floor(Math.floor(2 * (delta) + this.set.ivs['hp'] + Math.floor(this.set.evs['hp'] / 4) + 100) * this.level / 100 + 10);
			if (this.maxhp > 1 && this.maxhp < boostedHP) this.hp = this.maxhp = boostedHP;
			let stets = ['atk','def','spa','spd','spe'];
			for (let jj=0;jj<stets.length;jj++) {
				let stat = this.template.baseStats[stets[jj]];
				stat = (crossTemplate.baseStats[stets[jj]] + stat)/2;
				stat = Math.floor(Math.floor(2 * stat + this.set.ivs[stets[jj]] + Math.floor(this.set.evs[stets[jj]] / 4)) * this.level / 100 + 5);

				let nature = this.battle.getNature(this.set.nature);
				if (stets[jj] === nature.plus) stat *= 1.1;
				if (stets[jj] === nature.minus) stat *= 0.9;
				this.baseStats[stets[jj]] = this.stats[stets[jj]] = Math.floor(stat);
			}
			//Second Ability
			this.abilitwo = crossTemplate.abilities[0];
			// Type changes
			if(this.types[0]!=crossTemplate.types[0])
				this.types[1]= crossTemplate.types[0];
			this.fusion = true;
}
else {
		for (let statName in this.baseStats) {
			let stat = this.template.baseStats[statName];
			stat = Math.floor(Math.floor(2 * stat + this.set.ivs[statName] + Math.floor(this.set.evs[statName] / 4)) * this.level / 100 + 5);
			let nature = this.battle.getNature(this.set.nature);
			if (statName === nature.plus) stat *= 1.1;
			if (statName === nature.minus) stat *= 0.9;
			this.baseStats[statName] = Math.floor(stat);
		}

		this.maxhp = Math.floor(Math.floor(2 * this.template.baseStats['hp'] + this.set.ivs['hp'] + Math.floor(this.set.evs['hp'] / 4) + 100) * this.level / 100 + 10);
		if (this.template.maxHP) this.maxhp = this.template.maxHP; // Shedinja
}
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
		formeChange: function (template) {
			template = this.battle.getTemplate(template);
			let crossTemplate = this.battle.getTemplate(this.set.name);
			if (!crossTemplate.exists) return false;
			if (!template.abilities) return false;
			this.illusion = null;
			this.template = template;
			this.types = template.types;
			this.addedType = '';
			// Base Stat changes
			let delta = Math.floor((crossTemplate.baseStats["hp"]+this.baseStats["hp"])/2);
			let boostedHP = Math.floor(Math.floor(2 * (delta) + this.set.ivs['hp'] + Math.floor(this.set.evs['hp'] / 4) + 100) * this.level / 100 + 10);
			if (this.maxhp > 1 && this.maxhp < boostedHP) this.hp = this.maxhp = boostedHP;
			let stets = ['atk','def','spa','spd','spe'];
			for (let jj=0;jj<stets.length;jj++) {
				let stat = this.template.baseStats[stets[jj]];
				stat = (crossTemplate.baseStats[stets[jj]] + stat)/2;
				stat = Math.floor(Math.floor(2 * stat + this.set.ivs[stets[jj]] + Math.floor(this.set.evs[stets[jj]] / 4)) * this.level / 100 + 5);

				let nature = this.battle.getNature(this.set.nature);
				if (stets[jj] === nature.plus) stat *= 1.1;
				if (stets[jj] === nature.minus) stat *= 0.9;
				this.baseStats[stets[jj]] = this.stats[stets[jj]] = Math.floor(stat);
			}
			//Second Ability
			this.abilitwo = crossTemplate.abilities[0];
			// Type changes
			if(this.types[0]!=crossTemplate.types[0])
				this.types[1]= crossTemplate.types[0];
			this.fusion = true;
			return true;
		},
		isGrounded(negateImmunity) {
			if ('gravity' in this.battle.pseudoWeather) return true;
			if ('ingrain' in this.volatiles) return true;
			if ('smackdown' in this.volatiles) return true;
			let item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			if (!negateImmunity && this.hasType('Flying')) return false;
			if ((this.hasAbility('levitate') || this.volatiles["levitate"]) && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		}
	},
};
