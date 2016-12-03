exports.BattleScripts = {
	pokemon: {
		damage(d, source, effect) {
			if (!this.hp) return 0;
			if (d < 1 && d > 0) d = 1;
			d = Math.floor(d);
			if (isNaN(d)) return 0;
			if (d <= 0) return 0;
			this.hp -= d;
			if (this.hp <= 0) {
				d += this.hp;
				if (this.battle.getTemplate(this.baseTemplate.baseSpecies).prevo && !this.transformed) {
					this.willDevolve = true;
					return this.hp;
				}
				else
					this.faint(source, effect);
			}
			return d;
		},
	}
};
