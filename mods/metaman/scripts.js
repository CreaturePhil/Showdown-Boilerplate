'use strict';
exports.BattleScripts = {
		pokemon:{
				moveUsed(move) {
						this.lastMove = this.battle.getMove(move).id;
						this.lastM = move;//this.baseMoveset[this.baseMoveset.indexOf(this.battle.getMove(move).id)];
						this.lastM.pp = this.lastM.maxpp;
						this.moveThisTurn = this.lastMove;
				}
		}
};
