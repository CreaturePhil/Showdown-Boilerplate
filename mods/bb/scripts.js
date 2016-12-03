exports.BattleScripts = {
	pokemon: {
		faint: function(source, effect) {
			if (this.fainted || this.faintQueued) return 0;
			if (this.devolvedThisTurn) {
				this.devolvedThisTurn =false;
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
