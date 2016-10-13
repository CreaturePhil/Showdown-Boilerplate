'use strict';
exports.BattleScripts = {
		pokemon:{
				moveUsed(move) {
						this.lastMove = this.battle.getMove(move).id;
						this.lastM = this.battle.getMove(move);
						this.lastM.pp = this.lastM.maxpp;
						this.moveThisTurn = this.lastMove;
				}
		}
};
