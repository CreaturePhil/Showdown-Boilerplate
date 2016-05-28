'use strict';

exports.BattleScripts = {
	pokemon: {
		formeChange: function (template) {
			template = this.battle.getTemplate(template);
			let crossTemplate = this.battle.getTemplate(this.set.name);
			if (!crossTemplate.exists) return false;
			let crossPrevoTemplate = this.battle.getTemplate(crossTemplate.prevo);
			if (!crossPrevoTemplate.exists) return false;

			if (!template.abilities) return false;
			this.illusion = null;
			this.template = template;

			this.types = template.types;
			this.addedType = '';

			// Base Stat changes
			let delta = crossTemplate.baseStats['hp'] - crossPrevoTemplate.baseStats['hp'];
			let boostedHP = Math.floor(Math.floor(2 * (this.template.baseStats['hp'] + delta) + this.set.ivs['hp'] + Math.floor(this.set.evs['hp'] / 4) + 100) * this.level / 100 + 10);
			if (this.maxhp > 1 && this.maxhp < boostedHP) this.hp = this.maxhp = boostedHP;

			for (let statName in this.stats) {
				let stat = this.template.baseStats[statName]; 
				stat += crossTemplate.baseStats[statName] - crossPrevoTemplate.baseStats[statName];
				stat = Math.floor(Math.floor(2 * stat + this.set.ivs[statName] + Math.floor(this.set.evs[statName] / 4)) * this.level / 100 + 5);

				let nature = this.battle.getNature(this.set.nature);
				if (statName === nature.plus) stat *= 1.1;
				if (statName === nature.minus) stat *= 0.9;
				this.baseStats[statName] = this.stats[statName] = Math.floor(stat);
			}
			this.speed = this.stats.spe;

			// Type changes
			let newType = this.types;
			if (this.types.length > 1)  {
				// Primary type
				if (crossPrevoTemplate.types[0] !== crossTemplate.types[0]) {
					newType[0] = crossTemplate.types[0];
				}
				// Possible secondary typing
				if (crossTemplate.types.length > 1) {
					if (crossPrevoTemplate.types[1] !== crossTemplate.types[1]) {
						newType[1] = crossTemplate.types[1];
					}
				}
			} else {
				if (crossPrevoTemplate.types[0] !== crossTemplate.types[0]) {
					newType[0] = crossTemplate.types[0];
				}
				if (crossTemplate.types.length > 1) {
					if (crossPrevoTemplate.types.length < 2 || crossPrevoTemplate.types[1] !== crossTemplate.types[1]) {
						newType.push(crossTemplate.types[1]);
					}
				}
			}
			if (newType !== this.types) this.types = newType;

			this.crossEvolved = true;
			return true;
		},
	},
};
