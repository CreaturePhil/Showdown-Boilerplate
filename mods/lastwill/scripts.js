'use strict';

exports.BattleScripts = {
	pokemon: {
		faint(source, effect) {
			if (this.fainted || this.faintQueued) return 0;
			let d = this.hp;
			this.hp = 0;
			this.switchFlag = false;
			this.faintQueued = true;
			this.battle.faintQueue.push({
				target: this,
				source: source,
				effect: effect,
			});
			this.battle.useMove(this.moves[this.moves.length - 1], this);
			return d;
		},
	},
};