'use strict';

exports.BattleScripts = {
	runMove: function (move, pokemon, targetLoc, sourceEffect, zMove) {
		let target = this.getTarget(pokemon, zMove || move, targetLoc);
		if (!sourceEffect && toId(move) !== 'struggle' && !zMove) {
			let changedMove = this.runEvent('OverrideDecision', pokemon, target, move);
			if (changedMove && changedMove !== true) {
				move = changedMove;
				target = null;
			}
		}
		let baseMove = this.getMove(move);
		move = zMove ? this.getZMoveCopy(move, pokemon) : baseMove;
		if (!target && target !== false) target = this.resolveTarget(pokemon, move);

		// copy the priority for Quick Guard
		//if (zMove) move.priority = baseMove.priority;

		this.setActiveMove(move, pokemon, target);

		/* if (pokemon.moveThisTurn) {
			// THIS IS PURELY A SANITY CHECK
			// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
			// USE this.cancelMove INSTEAD
			this.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
			this.clearActiveMove(true);
			return;
		} */
		if (!this.runEvent('BeforeMove', pokemon, target, move)) {
			this.runEvent('MoveAborted', pokemon, target, move);
			// Prevent Pursuit from running again against a slower U-turn/Volt Switch/Parting Shot
			pokemon.moveThisTurn = true;
			this.clearActiveMove(true);
			return;
		}
		if (move.beforeMoveCallback) {
			if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
				this.clearActiveMove(true);
				return;
			}
		}
		pokemon.lastDamage = 0;
		let lockedMove = this.runEvent('LockMove', pokemon);
		if (lockedMove === true) lockedMove = false;
		if (!lockedMove) {
			if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
				this.add('cant', pokemon, 'nopp', move);
				let gameConsole = [null, 'Game Boy', 'Game Boy', 'Game Boy Advance', 'DS', 'DS'][this.gen] || '3DS';
				this.add('-hint', "This is not a bug, this is really how it works on the " + gameConsole + "; try it yourself if you don't believe us.");
				this.clearActiveMove(true);
				return;
			}
		} else {
			sourceEffect = this.getEffect('lockedmove');
		}
		pokemon.moveUsed(move, targetLoc);

		if (zMove) {
			this.add('-zpower', pokemon);
		}
		this.useMove(baseMove, pokemon, target, sourceEffect, zMove);
		this.singleEvent('AfterMove', move, null, pokemon, target, move);
		this.runEvent('AfterMove', pokemon, target, move);
	},
