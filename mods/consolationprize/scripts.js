'use strict';

exports.BattleScripts = {
	pokemon: {
		formeChange: function (template, source) {
			template = this.battle.getTemplate(template);

			if (!template.abilities) return false;

			template = this.battle.singleEvent('ModifyTemplate', this.battle.getFormat(), null, this, source, null, template);

			if (!template) return false;

			this.template = template;

			this.types = template.types;
			this.addedType = template.addedType || '';
			this.knownType = true;

			if (!source) {
				let stats = this.battle.spreadModify(this.template.baseStats, this.set);
				let lowest = stats.atk, lStat = 'atk';
				if (!this.baseStats) this.baseStats = stats;
				for (let statName in this.stats) {
					this.stats[statName] = stats[statName];
					this.baseStats[statName] = stats[statName];
					if (this.baseStats[statName] < lowest) {
						lStat = statName;
						lowest = this.baseStats[statName];
					}
				}
				if (Object.values(this.baseStats).indexOf(lowest) === Object.values(this.baseStats).lastIndexOf(lowest)) this.stats[lStat] = this.baseStats[lStat] = this.baseStats[lStat] * 2;
				this.speed = this.stats.spe;
			}
			return true;
		},
	},
};