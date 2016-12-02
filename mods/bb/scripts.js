exports.BattleScripts = {
	pokemon: {
		faint: function(source, effect) {
			if (this.fainted || this.faintQueued) return 0;
			if (this.baseTemplate.prevo) {
				let template = this.battle.getTemplate(this.baseTemplate.prevo);
				this.formeChange(template);
				this.baseTemplate = template;
				this.details = template.species + (this.level === 100 ? '' : ', L' + this.level) + (this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
				this.battle.add('detailschange', this, this.details);
				this.battle.add('-message', "" + this.name + " has de-volved into "+template.name+"!");
				this.setAbility(template.abilities['0']);
				this.baseAbility = this.ability;
				let newHP = Math.floor(Math.floor(2 * this.template.baseStats['hp'] + this.set.ivs['hp'] + Math.floor(this.set.evs['hp'] / 4) + 100) * this.level / 100 + 10);
				this.hp = this.maxhp = newHP;
				return;
			}
			let d = this.hp;
			this.hp = 0;
			this.switchFlag = false;
			this.faintQueued = true;
			this.battle.faintQueue.push({
				target: this,
				source: source,
				effect: effect,
			});
			return d;
		}
	}
};
