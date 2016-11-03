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
                 fusethatshit: function() {
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
                        		for (let statName in this.baseStats) {
			let stat = Math.floor((this.template.baseStats[statName]+crossTemplate.baseStats[statName])/2);
			stat = Math.floor(Math.floor(2 * stat + this.set.ivs[statName] + Math.floor(this.set.evs[statName] / 4)) * this.level / 100 + 5);
			let nature = this.battle.getNature(this.set.nature);
			if (statName === nature.plus) stat *= 1.1;
			if (statName === nature.minus) stat *= 0.9;
			this.baseStats[statName] = Math.floor(stat);
		}

		this.maxhp = Math.floor(Math.floor(2 * Math.floor((this.template.baseStats['hp']+crossTemplate.baseStats['hp'])/2) + this.set.ivs['hp'] + Math.floor(this.set.evs['hp'] / 4) + 100) * this.level / 100 + 10);
		this.hp = this.hp || this.maxhp;

                        /*
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
			}*/
			//Second Ability
			this.abilitwo = crossTemplate.abilities[0];
			// Type changes
			if(this.types[0]!=crossTemplate.types[0])
				this.types[1]= crossTemplate.types[0];
			this.fusion = true;*/
}
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
